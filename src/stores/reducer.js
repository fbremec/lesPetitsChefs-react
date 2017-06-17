import {createStore} from "redux";



const reducer = function(state={}, action){
  switch(action.type){
    case 'SET_INGREDIENT_LIST':
      return {
        ...state,
        ingredientList: action.payload
      }

  }
  return state
}



class Recette{
  constructor(){
    this.ingredientList = [];
  }
}

export const recette = createStore(reducer, new Recette());