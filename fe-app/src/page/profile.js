import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: {
        user:{},
        token: "",
        refreshToken:""
      }
    };

  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/login" });
    this.setState({ 
      currentUser:{
        user: currentUser.user,
        token: currentUser.token,
        refreshToken: currentUser.refreshToken
      }, 
      userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;
   

    return (
      <div className="container-fluid">
        {/* {(this.state.userReady) ? */}
        <div>
          <h5>Name: {currentUser.user.name}</h5>
          <h5>Email: {currentUser.user.email}</h5>
      </div>
      </div>
    );
  }
}
