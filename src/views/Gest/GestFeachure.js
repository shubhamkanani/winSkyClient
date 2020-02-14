import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './CSS/GestContent.css';
import { Row, Col , Card } from 'antd';

//Feachures6

import Php from './img/php.svg';
import Cloudy from './img/cloudy.svg';
import Lock from './img/lock.svg';
import Strategy from './img/rocket.svg';
import Friendly from './img/friendship.svg';
import Paymentsec from './img/payment.svg';

//Payment

import Securepayment from './img/securepayment.png';
import Pnotification from './img/notification.svg';
import Apidriven from './img/gears.svg';

class Features6 extends Component{
    render(){
        return(
            <div style={{margin:"10% 0%"}}>
                <Row className="header" style={{textAlign:"center"}}>
                    <b> Features <br/> Less Worries More Freedom </b>
                </Row>
                <Row gutter={30} style={{marginTop:"5%",textAlign:"center"}}>
                    <Col sm={8} style={{marginBottom:"15px"}}>
                        <Card className="cardstyle">
                            <img src={Php} alt="phplogo" height="95" width="95"/><br/>
                            <span className="cardcontent"><b>Advance programing</b></span><br/><br/>
                            <span className="content">Build your website with advanced programming languages such as PHP, Apache, Curl, Python, MySQL, phpMyAdmin, Ruby on Rails and much more.
                            </span>
                        </Card>
                    </Col>
                    <Col sm={8} style={{marginBottom:"15px"}}>
                        <Card className="cardstyle">
                            <img src={Cloudy} alt="phplogo" height="95" width="95"/><br/>
                            <span className="cardcontent"><b>Multi Cloud Management</b></span><br/><br/>
                            <span className="content">Connecting cloud storage for even more flexibility.
                            Your server may break down, but your files will still be there using online back up.<br/><br/></span>
                        </Card>
                    </Col>
                    <Col sm={8} style={{marginBottom:"15px"}}>
                        <Card className="cardstyle">
                        <img src={Lock} alt="Securitylogo"/><br/>
                            <span className="cardcontent"><b>Managed Security</b></span><br/><br/>
                            <span className="content">We keep your servers safe, secure and protected. also provide two step verification services
                             for your account details.<br/><br/> </span>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={30} style={{marginTop:"3%",textAlign:"center"}}>
                    <Col sm={8} style={{marginBottom:"15px"}}>
                        <Card className="cardstyle">
                            <img src={Strategy} alt="Strategylogo" height="90" width="90"/><br/>
                            <span className="cardcontent"><b>Strategy Controll</b></span><br/><br/>
                            <span className="content">You have control over your applications, servers and data.
                                Grow your business with least restrictions and more freedom.
                            </span>
                        </Card>
                    </Col>
                    <Col sm={8} style={{marginBottom:"15px"}}>
                        <Card className="cardstyle">
                            <img src={Friendly} alt="CustomFriendly_Logo" height="90" width="90"/><br/>
                            <span className="cardcontent"><b>Coustomer Friendly</b></span><br/><br/>
                            <span className="content">  It’s developer and user-friendly enough (i.e. good easy access to the command line,
                                 but makes life easy too with a nice GUI).
                            </span>
                        </Card>
                    </Col>
                    <Col sm={8} style={{marginBottom:"15px"}}>
                        <Card className="cardstyle">
                            <img src={Paymentsec} alt="Secure_Payment_Logo" height="90" width="90"/><br/>
                            <span className="cardcontent"><b>Payment Security</b></span><br/><br/>
                            <span className="content">We access payment only through verified payment gateway like SBI or HDFC.
                             Also payment accept by paytm or phone pay.  </span>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

class Payment extends Component{
    render(){
        return(
            <Row style={{margin:"6% 0%"}}>
                    <Col sm={12} style={{marginBottom:"15px"}}>
                        <span className="header"><b>Smart Way </b><br/><b> To Collect Payment</b></span>
                        <br/>
                        <span className="content">
                        Payment gateway is an easy way to receive payments for cloud storage and services.
                        there are now even more online payment methods available to you. Online and mobile banking. Instant payment with PayID or online bank like paytm.
                        </span><br/><br/>
                        <Card className="cardlogo" hoverable>
                            <Row>
                                <Col sm={4} className="cardcoll" >
                                    <img src={Pnotification} alt="Logo" height="60" width="60"/>
                                </Col>
                                <Col sm={20} className="cardcol">
                                    <span className="cardcontent"><b>Payment Notification</b></span><br/>
                                    <span className="content">Keep your systems in sync with automated webhook based notifications each time a link is paid.</span>
                                </Col>
                            </Row>
                        </Card>
                        <br/>
                        <Card className="cardlogo" hoverable>
                        <Row>
                            <Col sm={4} className="cardcoll" >
                                <img src={Apidriven} alt="Logo" height="60" width="60"/>
                            </Col>
                            <Col sm={20} className="cardcol">
                                <span className="cardcontent"><b>Api Driven</b></span><br/>
                                <span className="content">Automate the generation and collection of payments through powerful APIs for all aspects of payment links.</span>
                            </Col>
                        </Row>
                    </Card>
                    </Col>
                    <Col sm={12} style={{marginBottom:"15px"}}>
                        <img src = { Securepayment } alt='Digital_Cloud_image' height='500px' style={{float:"right",marginTop:"6%"}}/>
                    </Col>
            </Row>
        )
    }
}

class GestFeachure extends Component{
    render(){
        return(
            <div className="mRow">
                <Features6 id="fea"/>
                <Payment />
            </div>
        )
    }
}
export default GestFeachure;
