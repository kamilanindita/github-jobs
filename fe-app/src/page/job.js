import React, { Component } from "react";
import { Card, Col, Row, Form, Button, InputGroup } from "react-bootstrap";
import AuthService from "../services/auth.service";
import JobService from "../services/job.service";
import JobList from "../components/job-list.component";
import { Navigate } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      page:  1,
      totalPages: 2,
      data: [],
      show:{
        btnMore: true
      },
      filter:{
        description: "",
        location: "",
        fullTimeOnly: false
      },
      currentUser:{
        user: {},
        token: "",
        refreshToken: ""
      }, 
      userReady: true 
    };

    this.btnMore = this.btnMore.bind(this);
    this.getJobList = this.getJobList.bind(this);
    this.jobFilter = this.jobFilter.bind(this);
    this.btnSearch = this.btnSearch.bind(this);
    this.handleCheckBoxFilterChange = this.handleCheckBoxFilterChange.bind(this);
  }


  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if(currentUser){
      this.setState({ 
        currentUser:{
          user: currentUser.user,
          token: currentUser.token,
          refreshToken: currentUser.refreshToken
        }, 
        userReady: true 
      })
  
      this.getJobList(this.state.page)
    }else{
      this.setState({ redirect: "/login" });
    } 
   
  }

  getJobList(page){
    JobService.getList(page).then(
      response => {
        this.setState({ 
          totalPages: response.data.totalPage,
          data: [
            ...this.state.data,
            ...response.data.rows
          ]
        });
      },
      error => {
        this.setState({
          data:
          (error.response && error.response.data) ||
          error.message ||
          error.toString()
        });
      }
    );
  }

  async btnMore(){
    if(this.state.page < this.state.totalPages){
      this.getJobList(this.state.page+1)
      await this.setState({ page: this.state.page+1 })

      if(this.state.page === this.state.totalPages){
        this.setState({
          show: {
            ...this.state.show,
            btnMore: false
          }
        })
      }
    }
  }

  btnSearch(){
    if(this.state.filter.description !=="" || this.state.filter.location !==""){
      let query = this.state.filter.fullTimeOnly? `description=${this.state.filter.description }&location=${this.state.filter.location}&full-time-only=true` : `description=${this.state.filter.description }&location=${this.state.filter.location}`
      this.jobFilter(query)
    }
  }

  handleJobDescriptionChange = (e) => {
    this.setState({
      filter:{
        ...this.state.filter,
        description: e.target.value
      }
    })
 }

  handleJobLocationChange = (e) => {
    this.setState({
      filter:{
        ...this.state.filter,
        location: e.target.value
      }
    })
  }

  handleCheckBoxFilterChange = () =>{
    this.setState({
      filter:{
        ...this.state.filter,
        fullTimeOnly: !this.state.filter.fullTimeOnly
      }
    })
  
  }

  jobFilter(query){
    JobService.getFilter(query).then(
      response => {
        this.setState({ 
          totalPages: response.data.totalPage,
          data: [
            ...response.data.rows
          ]
        });
        if(response.data.length < 10){
          this.setState({
            show:{
              ...this.state.show,
              btnMore: false
            }
          })
        }
      },
      error => {
        this.setState({
          data:
          (error.response && error.response.data) ||
          error.message ||
          error.toString()
        });
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    return (
      <div>
        <Row className="mt-3">
          <Col xs md lg="4.5">
            <Form.Label htmlFor="description"  className="font-weight-bold">Job Description</Form.Label>
              <InputGroup className="mb-3">
                <span class="input-group-text" id="description">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
                    <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"></path>
                  </svg>
                </span>  

                <Form.Control
                  placeholder="Filter by title, benefit, companies, expertise"
                  aria-label="Username"
                  aria-describedby="description"
                  onChange={this.handleJobDescriptionChange}
                />
            </InputGroup>
          </Col>
          <Col xs md lg="4.5">
            <Form.Label htmlFor="location"  className="font-weight-bold">Location</Form.Label>
            <InputGroup className="mb-3">
              <span class="input-group-text" id="location">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"/>
                  <path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
                </svg>
              </span>  

              <Form.Control
                placeholder="Filter by city, state, zip code or country"
                aria-label="Username"
                aria-describedby="location"
                onChange={this.handleJobLocationChange}
              />
            </InputGroup>
          </Col>
          <Col xs md lg="3">
            <Row className="ml-3">
              <Col>
                <Form.Check
                  type="checkbox"
                  id="full-time-only"
                  label="Full Time Only"
                  style={{ marginTop:"50px"}}
                  className="font-weight-bold"
                  onChange={this.handleCheckBoxFilterChange}
                />
                </Col>
                <Col>
                  <Button onClick={this.btnSearch} as="input" type="submit" value="Search" style={{ background: "#A3BED0" , border:"#A3BED0", marginTop:"45px"}}/>
              </Col>
            </Row>
          </Col>
        </Row>
        <Card className="mt-3" background-color="#FFF">
          <Card.Title>Job List</Card.Title>
          <hr />
          { this.state.data.length > 0 &&
            <JobList data={this.state.data}/>
          }

          {this.state.data.length > 0 && this.state.show.btnMore &&
              <Button onClick={this.btnMore} as="input" type="button" value="More Jobs" style={{ background: "#2D86C4" , border:"#2D86C4", width:"100%"}}/>
          }
   
        </Card>
      </div>
    );
  }
}
