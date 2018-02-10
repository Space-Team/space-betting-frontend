import React from "react"
import "./style.css"
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
    }
  }

  render(){

    if(window.sessionStorage.length > 0){
      return(
        <div id="high">

          <div id="logo-banner">
            <a href="main"><img height="50px" src="./PlanetWagerLogo.png" alt="Planet Wager Logo" /></a>
          </div>


          <div id="profile-menu">
            <Dropdown overlay={loggedInMenu} trigger={['click']}>
              <a className={window.sessionStorage.length ? "ant-dropdown-link" : "ant-dropdown-link hide"} >

                  <img className="avatar-thumb" src={this.getImg(window.sessionStorage.avatar)} alt="Profile Avatar" />
                  <Icon type="down" />

              </a>
            </Dropdown>
          </div>
        </div>
      )
    }

    return(
      <div id="high">

        <div id="logo-banner">
          <a href="main"><img height="50px" src="./PlanetWagerLogo.png" alt="Planet Wager Logo" /></a>
        </div>

        <div id="profile-menu">
          <Dropdown overlay={loggedOutMenu} trigger={['click']}>
              <a className={window.sessionStorage.length ? "ant-dropdown-link hide" : "ant-dropdown-link"}>
                <div className="taller">
                  <img className="avatar-thumb" src={this.getImg(window.sessionStorage.avatar)} alt="Profile Avatar" />
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
