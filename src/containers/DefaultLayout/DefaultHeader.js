import React, { Component } from 'react';
import Settings from './../../views/Settings/Settings'
import { Link, NavLink } from 'react-router-dom';
import {messageSender} from './../../api'
import {
  Badge, UncontrolledDropdown, Button,
  DropdownItem, DropdownMenu, DropdownToggle,
  Nav, NavItem,
  Modal, ModalBody, ModalFooter, ModalHeader, Form, FormGroup, Label, InputGroup, InputGroupAddon, Input, Row
} from 'reactstrap';
import PropTypes from 'prop-types';

import {AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

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
      sendMessage:false
    }
  }
  toggle() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }
  handleMessageChange = (event) =>{
    //this.event.persist();
    this.setState({...this.state,[event.target.name]: event.target.value});
    console.log(this.state)
  }
  handleMessageSubmit = (event) =>{
    this.event.preventDefault();
    messageSender(this.state.message)
      .then(res=>{
        if(res.success){
          this.setState({...this.state,sendMessage:true})
        }
      })
  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

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
              <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem onClick={this.toggle}><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <NavLink to="/settings" className="nav-link"><DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem></NavLink>
              <NavLink to="/settings" className="nav-link"><DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem></NavLink>
              <DropdownItem style={{backgroundColor:'#2f353a',color:'whitesmoke'}} onClick={e => this.props.onLogout(e)}><b><i className="fa fa-lock"></i> Logout</b></DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Messenger</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleMessageSubmit}>
              <FormGroup>
                <Label for='emailId'><b>Enter Message here:</b></Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <Button disabled><i className='fa fa-envelope-open'></i></Button>
                  </InputGroupAddon>
                  <Input type='textarea' name='message' placeholder='Enter message here' onChange={this.handleMessageChange}/>
                </InputGroup>
              </FormGroup>
              {!this.state.loading?<Row style={{float:'right', marginRight:'3px'}}>
                  <Button color="primary" type='submit' style={{margin:'2px'}}><b>Take BackUp</b></Button>
                  <Button color="secondary" onClick={this.toggle} style={{margin:'2px'}}><b>Cancel BackUp</b></Button>
                </Row>:
                <Row style={{float:'right'}}>
                  <Button color="primary" type='submit' style={{margin:'2px'}} disabled><b>Send Message</b></Button>
                  <Button color="secondary" disabled style={{margin:'2px'}}><b>Cancel message</b></Button>
                </Row>
              }
            </Form>
          </ModalBody>
        </Modal>
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
