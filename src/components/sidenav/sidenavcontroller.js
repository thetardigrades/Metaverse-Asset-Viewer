import React from "react"
import SideNav from "./sidenav"
import { connect } from "react-redux"
import { logoutUser } from "../../states/userslice"

const mapStateToProps = (state) => {
  return {
    user: state.user.value,
    userInfo: state.userInfo.value,
  }
}

const categories = [
  {
    name: "Science",
    icon: "flask",
    url: "/science",
  },
  {
    name: "History",
    icon: "landmark",
    url: "/history",
  },
  {
    name: "Animals",
    icon: "paw",
    url: "/animals",
  },
  {
    name: "Technology",
    icon: "microchip",
    url: "/technology",
  },
]
class Controller extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true,
      isLoggedIn: props.user && Object.keys(props.user).length !== 0,
      username: props.userInfo ? props.userInfo.displayname : "",
      userurl: props.userInfo ? props.userInfo.url : "",
    }
  }

  toggleNav = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  closeNav = () => {
    this.setState({ collapsed: true })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userInfo !== this.props.userInfo) {
      this.setState({
        username: this.props.userInfo ? this.props.userInfo.displayname : "",
        userurl: this.props.userInfo ? this.props.userInfo.url : "",
      })
    }
    if (prevProps.user !== this.props.user) {
      this.setState({
        isLoggedIn: this.props.user && Object.keys(this.props.user).length !== 0,
      })
    }
  }

  logout = () => {
    this.props.dispatch(logoutUser())
  }

  render() {
    return (
      <SideNav
        collapsed={this.state.collapsed}
        toggleNav={this.toggleNav}
        username={this.state.username}
        isLoggedIn={this.state.isLoggedIn}
        logout={this.logout}
        userUrl={this.state.userurl}
        categories={categories}
      />
    )
  }
}
export default connect(mapStateToProps)(Controller)
