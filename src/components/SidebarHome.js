'use strict';
require('styles/slidebarHome.css');
import React from 'react';
import { Link} from 'react-router-dom'
let iconAuxylium = ('../images/Icones Poste Geo/logo_auxylium.png');
let iconMaps = ('../images/Icone Auxylium/ic_homepage_maps.png');
let iconDirectView = ('../images/Icone Auxylium/ic_homepage_direct_view.png');
let iconProfile = ('../images/Icone Auxylium/ic_homepage_profile.png');
let iconPresentation = ('../images/Icones Poste Geo/presentation.png');
let iconClose = require('../images/close_sidebar.png');

class SidebarComponent extends React.Component {
  constructor(props) {
      super(props);
      this.onClickClose = this.onClickClose.bind(this);
   };

   onClickClose() {
     document.getElementById('sidebar1').style.width='0px';
   }
  render() {
    var style = {verticalAlign: 'middle', margin: '10px', overflow: 'hidden', width:'25%'};
    var onClick = this.props.onClick;
    return (
      <div id='sidebar1' >
        <div className='sidebarImage' >
          <div style={{overflow: 'hidden', textAlign: 'right', filter: "invert(1) brightness(3)"}}><img src={iconClose} onClick={this.onClickClose}/></div>
          <div className='sidebarLogo'><img src={iconAuxylium} style={{verticalAlign: 'middle'}} width="50" height="50"/></div>
          <div className='sidebarTitre' style={{marginTop: '15px'}}> Les petits chefs</div>
        </div>
        <Link className="link" to="/home"><div id='sidebar_referential' onClick={this.onClickClose}>Home  </div></Link>
        <Link className="link" to="/appéritifs"><div id='sidebar_map_library' onClick={this.onClickClose}>  Appéritifs  </div></Link>
        <Link className="link" to="/profile"><div id='sidebar_atlas' style={{ overflow: 'hidden', borderBottom: 'solid 1px gray'}} onClick={this.onClickClose}> Entrées </div></Link>
        <Link className="link" to="/ajouter recette"><div id='sidebar_map_library' onClick={this.onClickClose}>  Ajouter une recette  </div></Link>
      </div>
    );
  }
}

SidebarComponent.displayName = 'NetAtosAuxyliumGeoReferentialSidebarComponent';

function mapStateToProps(state) {
  return {
  };
}



// Uncomment properties you need
// SidebarComponent.propTypes = {};
// SidebarComponent.defaultProps = {};

export default SidebarComponent;
