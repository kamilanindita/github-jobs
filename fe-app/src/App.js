import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";

import AuthService from "./services/auth.service";

import Login from "./page/login";
import Register from "./page/register";
import Job from "./page/job";
import Profile from "./page/profile";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import Detail from "./page/detail";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: {
        user:{},
        token: "",
        refreshToken:""
      }
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log(user)
    if (user) {
      this.setState({
        currentUser: user,
        // showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        // showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: {
        user:{

        },
        token: "",
        refreshToken:""
      }
    });
  }

  render() {
    const { currentUser } = this.state;
    // showModeratorBoard, showAdminBoard

    return (
      <div>
        {/* navbar-dark bg-dark */}
        <nav className="navbar navbar-expand navbar-dark" style={{ background: "#2D86C4" }}>
          <Link to={"/"} className="navbar-brand">
            <span className="font-weight-bold">Github</span> Jobs
          </Link>
          <div className="navbar-nav mr-auto">
          </div>

          {currentUser.user.name ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Job
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <Container fluid>
          <Routes>
            <Route path="/" element={<Job />} />
            <Route path="/job" element={<Job />} />
            <Route path="/job/detail/:jobId" element={<Detail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Container>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
