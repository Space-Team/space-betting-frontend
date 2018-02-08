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
        return "https://cdn4.iconfinder.com/data/icons/people-of-service/512/People_Services_astronaut_man-256.png"
      case "2":
        return "https://cdn4.iconfinder.com/data/icons/people-of-service/512/People_Services_astronaut_woman-256.png"
      case "3":
        return "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Alien-256.png"
      case "4":
        return "https://cdn0.iconfinder.com/data/icons/everything-icons-vol-1/512/Earth-terra_nova-planet-space-world-globe-space-01-256.png"
      default:
        return "http://www.janetallinger.com/images/icons/big/coin.png"
        break
    }
  }

  render(){
    return(
      <div id="high">

        <div id="logo-banner">
          <a href="main"><h1 id="logo">Planet Wager</h1></a>
        </div>


        <div id="profile-menu">
          <Dropdown overlay={loggedInMenu} trigger={['click']}>
            <a className={window.sessionStorage.length ? "ant-dropdown-link" : "ant-dropdown-link hide"} href="#">
              <div className="taller">
                <img src={this.getImg(window.sessionStorage.avatar)}/>
                <Icon type="down" />
              </div>
            </a>
          </Dropdown>
        </div>

        <div id="profile-menu">
          <Dropdown overlay={loggedOutMenu} trigger={['click']}>
              <a className={window.sessionStorage.length ? "ant-dropdown-link hide" : "ant-dropdown-link"}  href="#">
                <div className="taller">
                  <img src={this.getImg(window.sessionStorage.avatar)}/>
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
