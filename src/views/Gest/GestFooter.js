import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './CSS/GestFooter.css'
import { Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

import logo from './img/skydrive.png';

//footer navigation

import facebook from './img/facebook.svg'
import twitter from './img/twitter.svg'
import linkedin from './img/linkedin.svg'

var sectionStyle = {
    height: "250px",
    width: "100%",
    backgroundColor: "#1fc8db",
    backgroundImage: "linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)",
    color: "white",
    opacity: 0.95,
    textAlign: "center",
    paddingTop:"2%",
};

var btn1 = {
    backgroundColor:"#09ebaf",
    color:"#192072",
    border:"2px solid #192072",
    fontSize:"14px",
    marginRight:"2%",
};

var btn2 = {
    backgroundColor:"transparent",
    color:"darkgreen",
    border:"2px solid darkgreen",
    fontSize:"14px",
}

class SignUp extends Component{
    render(){
        return(
            <section style={sectionStyle}>
                <span className="fheader" style={{color:"darkblue"}}>|| Your Sucess Being With Us ||</span>
                <br/>
                <span className="fcontent">Ready to start your growth journey?</span>
                <br/>
                <br/>
                <Button style={btn1}><Link to="/register"><b>Get started for free</b></Link></Button>
                <Button style={btn2}><Link to="/register"><b>Get Primium Version</b></Link></Button>
                <br/><br/>
                <span>No cradit card required for free version</span>
            </section>
        )
    }
}

class Fonav extends Component{
    render(){
        return(
            <div className="mRow" style={{marginTop:"4%"}}>
                <Row>
                    <Col sm={6}>
                        <img src = {logo} alt = 'logo' height='60px' />
                        <br/><br/>
                        <span className="fncontent">
                            Government Engineering College, Modasa -016
                            <br/><br/>
                            +91 8460013290
                            <br/>
                            shubhamkanani605@gmail.com
                         </span>
                         <br/><br/>
                         <img src={facebook} alt="Logo" height="30" width="30" style={{marginRight:"4%"}}/>
                         <img src={twitter} alt="Logo" height="30" width="30" style={{marginRight:"4%"}}/>
                         <img src={linkedin} alt="Logo" height="30" width="30"/>
                         <br/><br/>
                    </Col>
                    <Col sm={6} style={{textAlign:"left",paddingLeft:"2%"}}>
                        <p className="fhncontent">
                            <b>Navigation</b>
                        </p>
                        <span className="fncontent">
                            <p> About Us</p>
                            <p>Contect </p>
                            <p> Site Map </p>
                            <p>Feachure </p>
                            <p>Pricing </p>
                         </span>
                    </Col>
                    <Col sm={6}>
                        <p className="fhncontent">
                            <b>Support</b>
                        </p>
                        <span className="fncontent">
                            <p> Knowledge Base</p>
                            <p>Blog </p>
                            <p> Community</p>
                            <p>Feedback </p>
                            <p>Free Website Migration</p>
                         </span>
                    </Col>
                    <Col sm={6}>
                    </Col>
                </Row>


            </div>
        )
    }
}
class GestFooter extends Component{
    render(){
        return(
            <div>
                <SignUp />
                <Fonav />
            </div>
        )
    }
}


export default GestFooter;
