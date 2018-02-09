import React from "react"
import "./style.css"
import Profile from '../Profile'
import { Menu, Dropdown, Icon } from 'antd';

const loggedInMenu = (
  <Menu>
    <Menu.Item key="0">
      <a href="/profile">Profile</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="/main">New Bets</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
      <a href="/logout">Logout</a>
    </Menu.Item>
  </Menu>
);

const loggedOutMenu = (
  <Menu>
    <Menu.Item key="0">
      <a href="/login">Login</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="/main">New Bets</a>
    </Menu.Item>
  </Menu>
);



class Header extends React.Component {
  constructor(props){
    super(props)
  }

  getImg(id){
    switch (id) {
      case "1":
        return "./astronaut.png"
      case "2":
        return "./dog.png"
      case "3":
        return "./alien.png"
      case "4":
        return "./robot.png"
      default:
        return "./earth.png"
        break
    }
  }

  render(){
    return(
      <div id="high">

        <div id="logo-banner">
          <a href="main"><img height="50px" src="./PW-LOGO.png" alt="Planet Wager Logo" /></a>
        </div>


        <div id="profile-menu">
          <Dropdown overlay={loggedInMenu} trigger={['click']}>
            <a className={window.sessionStorage.length ? "ant-dropdown-link" : "ant-dropdown-link hide"} href="#">
              <div className="taller">
                <img className="avatar-thumb" src={this.getImg(window.sessionStorage.avatar)} alt="user's avatar image" />
                <Icon type="down" />
              </div>
            </a>
          </Dropdown>
        </div>

        <div id="profile-menu">
          <Dropdown overlay={loggedOutMenu} trigger={['click']}>
              <a className={window.sessionStorage.length ? "ant-dropdown-link hide" : "ant-dropdown-link"}  href="#">
                <div className="taller">
                  <img className="avatar-thumb" src={this.getImg(window.sessionStorage.avatar)} alt="user's avatar image" />
                  <Icon type="down" />
                </div>
              </a>
          </Dropdown>
        </div>

      </div>

    )
  }
}

export default Header
