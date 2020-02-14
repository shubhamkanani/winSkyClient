import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './CSS/GestContent.css';
import { Row, Col, Button , Divider , Card } from 'antd';
import { Link } from 'react-router-dom';

//content1
import Bot from './img/bot.png';

//content card
import Support from './img/Support';
import Manage from './img/Manage';
import Performance from './img/Performance';

//content3
import DigitalCloudagency from './img/DigitalCloudagency.png';

//Digital Modules
import Easy from './img/Easy';
import Host from './img/Host';
import Managed from './img/Managed';

//easy Reporting
import Reporting1 from "./img/reporting1.png";
import Reporting2 from "./img/reporting2.png";

class Content1 extends Component{
    render(){
        return(
            <Row style={{margin:"6% 0%"}}>
                    <Col sm={12} style={{marginBottom:"15px"}}>
                        <span className="dheader"><b> Analysis Bot </b><br/><b>To Manage Data </b></span>
                        <br/>
                        <span className="dcontent">
                        Your business needs performance, security, peace of mind, empowerment to focus on your data.
                        that all think are work together by Analysis bot and then bot gives you a report.
                            <br/><br/>
                            We care about your business.
                        </span><br/><br/>
                        <Button size="large" type="primary"><Link to="/register">Get Started Free</Link></Button>
                    </Col>
                    <Col sm={12} style={{marginBottom:"15px"}}>
                        <img src = { Bot } alt='Digital_Cloud_image' width='550px' style={{float:"right"}}/>
                    </Col>
            </Row>
        )
    }
}

class ContentCard extends Component{
    render(){
        return(
            <div style={{margin:"6% 0%"}}>
            <Row className="header" style={{textAlign:"center"}}>
                <b>A platform that facilitates choice <br/> Grow your cloud</b>
            </Row>
            <Row gutter={30} className="cardrowst">
                    <Col sm={8} style={{marginBottom:"15px"}}>
                        <Card className="cardstyle">
                            <Support /><br/>
                            <span className="cardcontent"><b>24/7 Expert Support</b></span><br/><br/>
                            <span className="content">Have complete peace of mind! Our Ever Ready Support Team is always active,
                             no matter what day of the year.
                            </span>
                        </Card>
                    </Col>
                    <Col sm={8} style={{marginBottom:"15px"}}>
                        <Card className="cardstyle">
                            <Performance /><br/>
                            <span className="cardcontent"><b>Performance</b></span><br/><br/>
                            <span className="content">Performance-oriented features for better load times.
                            the time they are searching for your products & services.</span>
                        </Card>
                    </Col>
                    <Col sm={8} style={{marginBottom:"15px"}}>
                        <Card className="cardstyle">
                            <Manage /><br/>
                            <span className="cardcontent"><b>Manage</b></span><br/><br/>
                            <span className="content">Sky drive sends real-time notifications of different selected events via your favorite channels
                            such as Slack, API, and HipChat.</span>
                        </Card>
                    </Col>
            </Row>
            </div>
        )
    }
}

class Content3 extends Component{
    render(){
        return(
            <Row style={{margin:"6% 0%"}}>
                    <Col sm={12} style={{marginBottom:"15px",marginTop:"30px"}}>
                        <span className="content" style={{color:"#1890ff"}}><b>Digital Cloud agency</b></span><br/><br/>
                        <span className="header"><b>Attrect Coustomer</b><br/><b>With Digital Module</b></span>
                        <br/>
                        <span className="content">
                            Your uploaded data are scanned by the IoT(Internet Of Things) Based System and find a solution to your marketing or business problems.
                            <br/> Also, Our integrated marketing team will work directly with you to understand what makes your business unique and provide more qualified leads to achieve success in your industry.
                            <br/><br/>
                            We care about your business.
                        </span><br/><br/>
                    </Col>
                    <Col sm={12} style={{marginBottom:"15px"}}>
                        <img src = { DigitalCloudagency } alt='Digital_Cloud_image' height="450px" style={{float:"right"}}/>
                    </Col>
            </Row>
        )
    }
}

class Digitalmodules extends Component{
    render(){
        return(
            <div style={{margin:"6% 0%"}}>
                <Row className="header" style={{textAlign:"center"}}>
                    <b>Digital Modules</b>
                </Row>
                <Row className="dcontent" style={{textAlign:"center"}}>
                    Cloud management is how admins have control over everything<br/>
                    that operates in a cloud: the users, data, applications
                </Row>
                <Row style={{margin:"3% 0%",textAlign:"center"}}>
                    <Col sm={8} style={{marginBottom:"15px",textAlign:"left"}}>
                        <Card className="cardlogo" hoverable>
                            <Row>
                                <Col sm={6} className="cardcoll"><Easy /></Col>
                                <Col sm={18} className="cardcol">
                                    <span className="cardcontent"><b>Easy Reporting</b></span><br/>
                                    <span className="content">Business strategy and marketing to expanding your business.</span>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col sm={8} style={{marginBottom:"15px",textAlign:"left"}}>
                        <Card className="cardlogo" hoverable>
                            <Row>
                                <Col sm={6} className="cardcoll"><Host /></Col>
                                <Col sm={18} className="cardcol">
                                    <span className="cardcontent"><b>Hosting Platform</b></span><br/>
                                    <span className="content"></span>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col sm={8} style={{marginBottom:"15px",textAlign:"left"}}>
                        <Card className="cardlogo" hoverable>
                            <Row>
                                <Col sm={6} className="cardcoll"><Managed /></Col>
                                <Col sm={18} className="cardcol">
                                    <span className="cardcontent"><b>Managed Cloud</b></span><br/>
                                    <span className="content"></span>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

class EasyReporting extends Component{
    render(){
        return(
            <Row style={{margin:"6% 0%"}}>
                    <Col sm={12} style={{marginBottom:"15px",marginTop:"30px"}}>
                        <span className="content" style={{color:"#1890ff"}}><b>Easy Reporting</b></span><br/><br/>
                        <span className="header"><b>Enabling organizations to grow</b></span>
                        <br/>
                        <span className="content">
                            BBuilding your online presence helps attract more potential clients. Our integrated marketing team
                            will work directly with you to understand what makes your business unique, and provide more qualified
                            leads to achieve success in your industry
                            <br/><br/>
                            Everything you need to make the best decision on one page, with all the context you need.
                        </span><br/><br/>
                        <Button size="large" type="primary"><Link to="/register">Get Started Quickly</Link></Button>
                    </Col>
                    <Col sm={12} style={{marginBottom:"15px"}}>
                        <img src = { Reporting1 } alt='Digital_Cloud_image' height="350px" className="imgreport1"/>
                        <img src = { Reporting2 } alt='Digital_Cloud_image' height="250px" className="imgreport2"/>
                    </Col>
            </Row>
        )
    }
}


class GestContent extends Component{
    render(){
        return(
            <div className="mRow">
                <Content1 />
                <Divider />
                <ContentCard />
                <Content3 />
                <Digitalmodules />
                <EasyReporting />
            </div>
        )
    }
}
export default GestContent;
