import React, {Component} from 'react';
import './CSS/Gest.css';
import GestHeader from './GestHeader';
import GestContent from './GestContent';
import GestFeachure from './GestFeachure';
import GestFooter from './GestFooter';
//import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

class Gest extends Component{
  render(){
    return(
        <div>
          <GestHeader />
          <GestContent />
          <GestFeachure />
          <GestFooter />
      </div>
    )
  }

}

export default Gest;
