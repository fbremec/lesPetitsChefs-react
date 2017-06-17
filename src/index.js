
import App from './components/Main';
import SidebarHome from './components/SidebarHome';
import Apperitifs from './components/apperitifs/Apperitifs'
import AddRecette from './components/AjouterRecette'

import {recette} from './stores/reducer.js';
import {Provider} from 'react-redux';

import { Router, Route, browserHistory, IndexRoute  } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';


// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));

const newHistory = createBrowserHistory();

class Rout extends React.Component{

  constructor(props) {
    super(props);
    this.burger1_OnClick = this.burger1_OnClick.bind(this);
    this.state = {userStatus : ''}
  };

  burger1_OnClick() {
    document.getElementById('sidebar1').style.width='250px';
  }

  render(){
      return(
        <div>
          <Router history = {newHistory}>
            <div>
              <img id='slideBar_img_home' style={{position: 'absolute', top: '10px', left: '10px'}} onClick={this.burger1_OnClick} src='/images/burgerldpi.png'/>
              <SidebarHome/>
              <Route path = '/home' component = {App} />
              <Route path = '/appéritifs' component = {Apperitifs} />
              <Route path = '/ajouter recette' component = {AddRecette} />
            </div>
         </Router>
       </div>
      );
  }
}


// Render the main component into the dom
  ReactDOM.render(
    <Provider store={recette}>
    <Rout/>
    </Provider>
  , document.getElementById('app'));
