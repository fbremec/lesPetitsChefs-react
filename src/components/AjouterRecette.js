import React from 'react';
import ReactDOM from 'react-dom';
import setIngredientList from '../stores/reducerAction'
import {connect} from 'react-redux';

const typeSecondaire = {
	'Appéritif':['Vérine','Soupe','Toast'],
	'Entrée':['Salade'],
	'Plat':['pâte'],
	'Dessert':['Gateau']
}

var ingredientList = []

@connect((store) => {
  return {
    recette : store
  };
})
class Ingredient extends React.Component{

	supprimerIngredient(){
		var id = 'ingredient'+this.props.lineId
		ingredientList.splice(this.props.lineId, 1);
		this.props.dispatch({
  				type: 'SET_INGREDIENT_LIST',
  				payload: ingredientList
		})
		document.getElementById(id).remove();
	}

	render(props){
		return(
				<tr id={'ingredient'+this.props.lineId} >
					<td id={'ingredient'+this.props.lineId+'nom'} style={{textAlign:'center'}}>{this.props.nom}</td>
					<td id={'ingredient'+this.props.lineId+'nom'} style={{textAlign:'center'}}>{this.props.quantite}</td>
					<td><button >modifier</button></td>
					<td><button onClick={()=>this.supprimerIngredient(this.props.lineId)}>supprimer</button></td>
				</tr>
		)
	}
}

@connect((store) => {
  return {
    recette : store
  };
})
class AddRecette extends React.Component{

	constructor(props){
    super(props)
    	
		this.state={typePrincipalSelected:'Type',recette:this.props.recette};
		console.log(this.state.recette)

	}

	setTypeSecondaire(){
		var e = document.getElementById("type");
		var typePrincipal = e.options[e.selectedIndex].value;
		this.setState({typePrincipalSelected:typePrincipal});
	}

	renderTypeSecondaireByTypePrincipal(typePrincipal){
		var secondPart = document.getElementById("secondPart");
		var selectOptions = [];
		if(typePrincipal != 'Type' ){
			secondPart.style.display = 'inline-block'
			for(var i=0; i<typeSecondaire[typePrincipal].length; i++){
				selectOptions.push(<option value={typeSecondaire[typePrincipal][i]}>{typeSecondaire[typePrincipal][i]}</option>)
			}
		}else if(secondPart!=null){
			secondPart.style.display = 'none'
		}
		return selectOptions;
	}

	renderTableIngredient(listeIngredients){
		var renderTable =[];
		for(var i=0;i<listeIngredients.length; i++){
			console.log(i)
			if(listeIngredients[i]!=null){
				renderTable.push(<Ingredient nom={listeIngredients[i].nom} quantite={listeIngredients[i].quantite} lineId={i}/>)
			}else{
				i++
			}
		}
		return renderTable;
	}

	setIngredient(){


		var e1 = document.getElementById("ingredientNom");
		var nom = e1.value;
		
		var e2 = document.getElementById("ingredientQuantiteNombre");
		var nombre = e2.value;

		var e3 = document.getElementById("ingredientQuantiteUnite");
		var quantite = e3.options[e3.selectedIndex].value;
		
		if(!/^\d+$/.test(nombre)){
			alert("La quantité ne doit pas etre une chaine")
			e2.value="";
			
		}else if(nom == ""){
			alert("Le nom de l'ingrédient ne doit pas être vide")

		}else if(quantite=="Quantite"){
			alert("Il faut saisir une quantité")
		}
		else if(nom != "" && quantite!="Quantite" && /^\d+$/.test(nombre)){
			console.log(this.props.recette)
			ingredientList.push({nom:nom,quantite:nombre+""+quantite})
			this.props.dispatch({
  				type: 'SET_INGREDIENT_LIST',
  				payload: ingredientList
			})
			e1.value="";
			e2.value="";
			e3.selectedIndex = 0;
		}


		

		
		
	}

	render(){
		return(
			<div className='container'>
				<h1 style={{textAlign:'center'}}>Ajouter une recette</h1>
				<div className="row" style={{margin:'20px'}}>
					<div className='row'>
						<div className='col-lg-5'>
							<input type="text" name="nom" placeholder="nom de la recette"/>
							<select name="type" id="type" onChange={()=>this.setTypeSecondaire()}>
								<option value="Type">Type</option>
								<option value="Appéritif">Appéritif</option>
								<option value="Entrée">Entrée</option>
								<option value="Plat">Plat</option>
								<option value="Dessert">Dessert</option>
							</select>
						</div>
						<div className='col-lg-5' style={{display:'none'}} id='secondPart'>
							<select>
							<option value="TypeSecondaire">Type secondaire</option>
							{this.renderTypeSecondaireByTypePrincipal(this.state.typePrincipalSelected)}
							</select>
							<br/>
							<input 	style={{width:'250px'}} type="text" 	name="ingredientNom" 			id='ingredientNom' 				placeholder="nom de l'ingredient"/>
							<input 	style={{width:'100px'}} 	type="number" 	name="ingredientQuantiteNombre" id='ingredientQuantiteNombre' 	placeholder="nb"/>
							<select style={{width:'100px'}} id='ingredientQuantiteUnite' name="Quantite">
								<option value="Quantite">unité</option>
								<option value="kg">Kg</option>
								<option value="cuill">cuilère</option>
								<option value="Plat">Plat</option>
								<option value="Dessert">Dessert</option>
							</select>
							<button onClick={()=>this.setIngredient()}>ajouter</button>
							<table style={{borderCollapse:'collapse'}}>
							   <tr>
							       <th style={{width:'250px',textAlign:'center',border:'solid 1px black'}}>nom</th>
							       <th style={{width:'200px',textAlign:'center',border:'solid 1px black'}}>quanité</th>
							   </tr>
							   {this.renderTableIngredient(this.props.recette.ingredientList)}
							</table>
						</div>
					</div>
				</div>
			</div>
		)
	}

}

AddRecette.defaultProps = {
};

export default AddRecette;
