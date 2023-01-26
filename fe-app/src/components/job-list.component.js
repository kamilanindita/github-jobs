import React from 'react'
import { Link} from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";

function calculateSince(datetime){
    let tTime=new Date(datetime);
    let cTime=new Date();
    let sinceMin=Math.round((cTime-tTime)/60000);
    let sinceDay=Math.round(sinceMin/1440);

    let since=sinceDay+' days ago';
    
    return since;
}

export default function JobList(props) {
    return (
        <div>
            
            {props.data.map((item, idx) =>{
                if(props.data.length >0 && item !=null){
                    return(
                     
                        <div>
                            {idx ===  props.data.length-1 && props.data.length%10 === 0  &&
                                <div>
                                    <div className="text-center mt-5" >&#9642;&#9642;&#9642;</div>
                                </div>
                            }
                            <Card.Text key={item.id}>
                                <Row>
                                    <Col xs md lg="9">
                                        <Link id="job-title" to={`/job/detail/${item.id}`} className="font-weight-bold">
                                            {item.title}
                                        </Link>
                                        <br></br>
                                        <small>{item.company} - </small><small className="font-weight-bold" style={{color:"green"}}>{item.type}</small>
                                    </Col>
                                    <Col xs md lg="3">
                                        <div className="float-right text-right">
                                        <h6>{item.location}</h6>
                                        <small>{calculateSince(item.createdAt)}</small>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Text>
                            {idx <  props.data.length-1 &&
                                <hr className="mt-0"/>
                            }
                        </div>
                        
                    )
                }
            })} 
        </div>
    )
}