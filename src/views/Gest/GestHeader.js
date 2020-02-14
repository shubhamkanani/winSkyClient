import React, { Component } from 'react';

import { Menu, Icon , Button } from 'antd';
import 'antd/dist/antd.css';
import './CSS/GestHeader.css';
import logo from './img/skydrive.png';
import {Link} from 'react-router-dom';
const { SubMenu } = Menu;

class GestHeader extends Component{
  state = {
    current: 'mail',
    top: 10,
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
  render(){
    return(
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" className="ntext">
        <Menu.Item key="logo">
          <img src = {logo} alt = 'logo' height='60px' />
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              Product
            </span>
          }
        className="ntextm">
          <Menu.ItemGroup>
            <Menu.Item key="Cloud">
            <Icon type="cloud-server" /><span>Cloud Agency</span><br/>
            <span>This website For cloud storage related</span>
            </Menu.Item>
            <Menu.Item key="Hosting">
            <Icon type="global" />Hosting Provider<br></br>
            This website provied hosting services</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="Feachure" className="ntextm" >
        <Link>Feachure</Link>
        </Menu.Item>
        <Menu.Item key="Pricing" className="ntextm">
          Pricing
        </Menu.Item>
        <Menu.Item key="Company" className="ntextm">
          Company
        </Menu.Item>
        <Menu.Item key="Support" className="ntextm">
          Support
        </Menu.Item>
        <Menu.Item key="free" className="nleftmenu ntextm">
        <Link to='/register'>Get Started Free</Link>
        </Menu.Item>
        <Menu.Item key="button" className="ntextm">
        <Button type="primary" size='large'>
        <Link to='/login'>Log_In</Link>
        </Button>
        </Menu.Item>
      </Menu>
    )
  }
}

export default GestHeader;
