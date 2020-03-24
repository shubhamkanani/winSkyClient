import React, { Component } from 'react';
import Settings from './../../views/Settings/Settings'
import { Link, NavLink } from 'react-router-dom';
import {animateScroll} from 'react-scroll';
import {messageSender,retrieveMsgByUser} from './../../api'
import {
  Badge, UncontrolledDropdown, Button,
  DropdownItem, DropdownMenu, DropdownToggle,
  Nav, NavItem,
  Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Label, InputGroup, InputGroupAddon, Input, Row
} from 'reactstrap';
import PropTypes from 'prop-types';
import './CSS/DefaultHeader.css'
import {AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import index from "react-phone-number-input";
import {connect} from "react-redux";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};
//defult Class

class DefaultHeader extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      modalOpen: false,
      message:'',
      sendMessage:false,
      msgHistory:[],
    }
  }
  toggle() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
    this.scrollBottom()
  }
  handleMessageChange = (event) =>{
    //this.event.persist();
    this.setState({...this.state,[event.target.name]: event.target.value});
    //console.log(this.state)
  }
  handleMessageSubmit = () =>{
    if(this.state.message!=''){
      messageSender(this.state.message).then(res=>{
          if(res.success){
            this.scrollBottom()
          }
      })
    }
    else {
      alert('Write Message')
    }
  }
  scrollBottom = () =>{
    debugger
    retrieveMsgByUser().then(res=>{
          this.setState({...this.state,msgHistory:res})
    })
    animateScroll.scrollToBottom({
      containerId: "messageList"
    });

  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const { msgHistory } = this.state;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav style={{marginRight:"1%"}}>
              <img src={process.env.REACT_APP_API_URL+'/uploads/'+this.props.items.data[0].emailId+'/'+'profileImage'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              {this.props.items.data[0].role==='user'?
                <DropdownItem onClick={this.toggle}><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>:
                <NavLink to="/message" className="nav-link"><DropdownItem><i className="fa fa-envelope-o"></i> Messagese</DropdownItem></NavLink>
              }
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <NavLink to="/settings" className="nav-link"><DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem></NavLink>
              <NavLink to="/settings" className="nav-link"><DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem></NavLink>
              <DropdownItem style={{backgroundColor:'#2f353a',color:'whitesmoke'}} onClick={e => this.props.onLogout(e)}><b><i className="fa fa-lock"></i> Logout</b></DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Modal isOpen={this.state.modalOpen} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Messenger</ModalHeader>
          <ModalBody style={{height:'50%'}}>
            <div className="mesgs">
              <div className="msg_history"  id='messageList'>
                {
                  msgHistory.map((item,index)=>{
                    return <div>
                      { item.type==='admin' &&  <div className="incoming_msg">
                        <div className="incoming_msg_img"><img className="img-avatar"  alt="sam"/>
                        </div>
                        <div className="received_msg">
                          <div className="received_withd_msg">
                            <p>{item.message}</p>
                            <span className="time_date"> {item.createdAt} </span></div>
                        </div>
                      </div>
                    }{ item.type==='user' &&<div className="outgoing_msg">
                      <div className="sent_msg">
                        <p>{item.message}</p>
                        <span className="time_date"> {item.createdAt}</span></div>
                    </div>
                      }
                    </div>
                  })
                }
              </div>
              <div className="type_msg">
                <div className="input_msg_write">
                  <input type="text" name="message" className="write_msg" placeholder="Enter message here"  onChange={this.handleMessageChange}/>
                  <button className="msg_send_btn" type="button" onClick={this.handleMessageSubmit}><i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
            <br/><br/>
                <Row style={{float:'right', marginRight:'3px'}}>
                  <Button color="secondary" onClick={this.toggle} style={{margin:'2px'}}><b>Cancel message</b></Button>
                </Row>
          </ModalBody>
        </Modal>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;
const mapStateToProps = state =>({
  ...state,
  // console.log(userData.items.data[0].role)
  // return userData.items.data[0].role
})
export default connect(mapStateToProps,null)(DefaultHeader);
