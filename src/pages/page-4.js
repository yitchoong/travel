import React from "react"
import SEO from "../components/seo"
import {navigate, useStaticQuery} from 'gatsby'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import StageDisplay from '../components/stage-display'
import styled from 'styled-components'
import MyInfo from '../components/myinfo'
import {useAppState} from '../providers'


const ProposalPage4 = () => {

  const data = useStaticQuery(graphql`
    query AddonsQuery {
        allAddonsJson {
            nodes {
                value
                label
                amount
            }
        }
    }
  `)
  const addons = data.allAddonsJson.nodes
    
  const {quote, proposal, uiState} = useAppState()

  const handleBack = () => {
    navigate("/page-3")
  }
  const handleNextPage = async () => {
     
    // assume, logs in, we save the customer data in uiState instead of proposal
     
    await uiState.fetchCustomer('demo','demo')

    // we need to initialize the proposal data too
    // const {adultCount, childrenCount, isTransitTraveller, isOneWay, groupOrFamily,couponCode, countries, tripType,
    //     totalPremium,planType,productCode, quoteDate} = quote.quote
    proposal.initProposal({addons, quote: quote.quote })
    uiState.setTraveller(0) // initialize to traveller 0
    // const updated = Object.assign({}, quote.quote, {adultCount})
    // quote.updateQuote(updated)

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
            <Col xs={{span:12, offset:0}} className="justify-content-center">
                <div className="border rounded box">
                    <Row>
                        <Col xs={{span:12}} sm={{span:10, offset:1}}>
                            <div className="text-center purplecolor mt-2" style={{overflow:'auto'}}>
                                <h4>Would you like to login</h4>
                                
                                <p>By logging in to either options, 
                                    your details will be pre-filled
                                    for your convenience. You consent to disclose your 
                                    personal data to Etiqa for application purposes. </p>
                                
                            </div>
                        </Col>
                        <Col>
                            <div className="mt-2">
                                <Container fluid className="mb-5">
                                <Row>
                                    <Col xs={{span:5}} className="">
                                        <Button onClick={handleTiqConnect} variant="purple" className="float-right pr-2 pl-2 mr-0"><span>TiqConnect</span></Button>
                                    </Col>
                                    <Col xs={{span:2}}>
                                        <div className="text-center mt-2 border rounded border-light" style={{fontSize:'80%'}}>OR</div>
                                    </Col>
                                    <Col xs={{span:5}} className="py-0" >
                                    {/* <div onClick={handleMyInfo} className="border border-info rounded pl-4" style={{height:'40px', width:'150px', paddingTop:'0px', marginLeft:'0.8rem'}}> */}
                                    <div onClick={handleMyInfo} className="float-left border border-info rounded pl-3" style={{height:'40px', width:'120px',  paddingTop:'0px', marginLeft:'0px'}}>
                                        <div style={{width:80, height:40}} className="mt-1">
                                        <MyInfo />
                                        </div>
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
export default ProposalPage4


