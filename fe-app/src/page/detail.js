import React, { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import JobService from "../services/job.service";
import { Link } from "react-router-dom";

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }
  
  componentDidMount() {
    JobService.getDetail(window.location.href.split('/')[5]).then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
        <div>
            <Row className="mt-3">
                <Col>
                        <Link to={"/"} className="font-weight-bold">
                            <span style={{color: "#C8C8C8"}}>&#8592; </span><span style={{color: "#2D86C4"}}> Back</span>
                        </Link>
                      
                    <Card className="mt-3" background-color="#FFF">
                        <small>{this.state.content.type} / {this.state.content.location}</small>
                        <h6 className="font-weight-bold">{this.state.content.title}</h6>
                        <hr/>
                        <Row>
                            <Col xs md lg="8">
                                <Card.Text>
                                    <UnsafeComponent html={this.state.content.description} />
                                </Card.Text>
                            </Col>
                            <Col>
                                <Card className="mt-3 p-0">
                                    <Card.Header className="m-0">
                                        <Row>
                                            <Col xs md lg="8">
                                                <p className="font-weight-bold">{this.state.content.company}</p>
                                            </Col>
                                            <Col>
                                                <button className="float-right btn btn-primary btn-sm"  style={{ color: "#2D86C4", background: "#CFD1D2" , border:"#CFD1D2"}} type="button">1 other job</button>
                                            </Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body>
                                        <img alt="company-logo" style={{ maxWidth: "450px" }} src={this.state.content.company_logo}/>
                                    </Card.Body>
                                    <Card.Footer>
                                        <p>{this.state.content.company_url}</p>
                                    </Card.Footer>
                                </Card>

                                <Card className="mt-3 p-0" style={{ backgroundColor:"#FEFFEA" }}>
                                    <Card.Header className="m-0">
                                        <Row>
                                            <Col xs md lg="8">
                                                <p className="font-weight-bold">How to apply</p>
                                            </Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body>
                                        <UnsafeComponent html={this.state.content.how_to_apply} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        
                    </Card>
                </Col>
            </Row>
        </div>
    );
  }
}

function UnsafeComponent({ html }) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}