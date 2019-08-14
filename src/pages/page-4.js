import React from "react"
import SEO from "../components/seo"
import {navigate} from 'gatsby'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import StageDisplay from '../components/stage-display'
import styled from 'styled-components'
import MyInfo from '../components/myinfo'


const ProposalPage0 = () => {

  let boundForm = undefined
  const handleBack = () => {
    if (boundForm) {
    }
    navigate("/page-3")
  }
  const handleNextPage = () => {
    navigate("/page-5")
  }
  const handleTiqConnect = () => {
      alert("TiqConnect")
  }
  const handleMyInfo = () => {
      alert("MyInfo")
  }

  return (
  <Styles>  
    <SEO title="Tiq Travel Application" />
    
    <StageDisplay stage={2} />

    <Container fluid>
        <Row>
            <Col xs={{span:10, offset:1}} className="justify-content-center">
                <div className="border rounded box">
                    <Row>
                        <Col xs={{offset:1, span:10}}>
                            <div className="text-center purplecolor mt-2">
                                <h4>Would you like to login</h4>
                                <span>By logging in to either options, your details will be pre-filled
                                    for your convenience. You consent to disclose your personal data 
                                    to Etiqa for application purposes.
                                </span>                                
                            </div>
                            <div className="mt-2">
                                <Container fluid className="mb-5">
                                <Row>
                                    <Col xs={{span:5}}>
                                        <Button onClick={handleTiqConnect} variant="purple" className="float-right pl-5 pr-5"><span>TiqConnect</span></Button>
                                    </Col>
                                    <Col xs={{span:2}}>
                                        <div className="text-center mt-2 border rounded border-light" style={{fontSize:'80%'}}>OR</div>
                                    </Col>
                                    <Col xs={{span:5}} >
                                    <div onClick={handleMyInfo} className="border border-info rounded pl-5 pr-5" style={{height:'40px', width:'200px', paddingTop:'0px', marginLeft:'0.8rem'}}>
                                        <MyInfo className="mt-0" />
                                    </div>

                                    </Col>
                                </Row>
                                </Container>
                            </div>
                        </Col>    
                    </Row>
                </div>
            </Col>
        </Row>
    </Container>
    <Row className="ml-1 mr-1" >
        <Col xs={{span:4}} sm={{span:4}} >
            <Button variant="outline-secondary" className="mt-2 pl-4 pr-4" type="button" onClick={handleBack}>Back</Button>
        </Col>
        <Col xs={{span:8}} sm={{span:8}} >
            <Button variant="outline-info" className="mt-2 float-right pl-4 pr-4" type="button" onClick={handleNextPage} >Skip</Button>
        </Col>
    </Row>


  </Styles>
)}

const Styles = styled.div`
  background-color: white;
  & > div.container-fluid {
      height: calc(100vh - 90px - 40px - 40px - 50px); /* 90 for header, 40 for stage, 40 for footer, 30 for button */
      overflow: auto;
  }
  &  div.purplecolor {
      h4,span {
        color: rebeccapurple;
      }
  }
  .box {
    margin-top: 2rem;
    align-self: center;
    background-color: #fff;
    /* box-shadow: 0 0 5 5 rgba(200,207,219,0.5); */
    box-shadow: 0 0 3px 3px rgba(200,207,219,0.5);
    /* min-height: calc(100vh - 90px - 40px - 40px - 50px); */

    .text-success {
      font-size: 120%;
    }
    .text-secondary {
      font-size: 70%;
    }    
    .suitcase {
        background-color: white;
    }
  }  
`
export default ProposalPage0
