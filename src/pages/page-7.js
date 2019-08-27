import React,{useState, useEffect} from "react"
import SEO from "../components/seo"
import {navigate} from 'gatsby'
import {useAppState} from '../providers'
import useWindowSize from '../hooks/useWindowSize'

import {Formik, Field} from 'formik'

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import StageDisplay from '../components/stage-display'
import PremiumPlan from '../components/premium-plans'
import styled from 'styled-components'
import TextInputField from "../components/text-input-field";
import {MdStar} from 'react-icons/md'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import {FaAngleUp, FaAngleDown} from 'react-icons/fa'
import {sleep} from '../utils/general-utils'


const ProposalPage7 = () => {

    let boundFormik = undefined
    const window = useWindowSize()
    const small = window.width < 576;

    const {proposal} = useAppState()
    useEffect(() => {
        if (!proposal.proposal.travellers){
            if (typeof window !== `undefined`) {
                navigate("/page-4")
            }
        } // go back to page 4 if no travellers info    
    },[])

    const [paneState, setPaneState] = useState('0-open')
    const [nextButtonText, setNextButtonText] = useState('Skip')

    const handleClick = (key) => {
        if (paneState === key+'-open') {
            setPaneState(key+'-close')
        } else if (paneState === key+'-close')  {
            setPaneState(key+'-open')
        } else {
            setPaneState(key +'-open')
        }
    }

    let initialValues = Object.assign({}, proposal.proposal )

    const handleBack = () => {
        navigate("/page-6")
    }
    const submitForm = () => {
        if (boundFormik){
            boundFormik.submitForm()
        }
    }
    const handleNextPage = () => {
        if (boundFormik){
            // save the flight details
            const updatedProposal = Object.assign({}, proposal.proposal, boundFormik.values)
            proposal.updateProposal(updatedProposal)
            navigate('page-8')
        }
    }
    console.log("<<<<Page-7, values>>>>",   JSON.stringify(boundFormik ? boundFormik.values : ''))

  return (
  <Styles>
    <SEO title="Tiq Travel Application" />
    
    <StageDisplay stage={2} />

    <Container fluid>
        <Row>
            { small ? (
                    <Col xs={{span:12}}>
                        <PremiumPlan />
                    </Col>
                ) : null
            }
            
            <Col xs={{span:12}} sm={{span:8}} className="mt-1 pr-0 mr-0">
                <div className="border box">
                    <Row>
                        <Col xs={{span:12}} className="m-2">
                            <h5 className="px-2">Enter your flight details (Optional)</h5>

                            <div className="highlighted ml-2">
                                <div><MdStar color="rebeccapurple" size="1em"/> </div>
                                <div style={{marginTop: '2px'}}>
                                    <span style={{color:'rebeccaPurple', marginRight: '0.5em'}}>Travel Benefit</span>
                                    <span>
                                        Please note that all travel delay claims are automated and would
                                        be credited to your e-Wallet account.
                                    </span>
                                </div>                                
                            </div>
                            
                            <Formik initialValues={initialValues} enableReinitialize={true}
                                onSubmit={(values, formik) => {
                                sleep(200).then((() => {
                                    handleNextPage()
                                }))
                                }}
                                validate={ values => {
                                    // console.log("##### VALIDATE PAGE 7 -- Inside validate, values = ", JSON.stringify(values))
                                    setNextButtonText(values.departureFlightNo || values.arrivalFlightNo ? 'Next' : 'Skip')
                                    const errors = {}
                                    return errors
                                }}      
                                >
                                {formik => { 
                                   boundFormik = formik
                                   return (
                                   <div>                                    
                                    <Form className="mb-2" noValidate onSubmit={formik.handleSubmit}>
                                       <Container fluid>
                                            <div className="flights">
                                                <Row>
                                                    <Col xs={10} sm={8}>
                                                      <Field name="departureFlightNo" component={TextInputField} label="Departure Flight" placeholder="Departure flight number"/>
                                                    </Col>
                                                    <Col xs={10} sm={8}>
                                                        <Field name="arrivalFlightNo" component={TextInputField} label="Arrival Flight" placeholder="Arrival flight number" />
                                                    </Col>                                  
                                                </Row>                                  
                                            </div>
                                        </Container>
                                    </Form>
                                    </div>
                                    )
                                }}
                            </Formik>
                            <div className="w-75 ml-2">
                                <Accordion className="mt-0 mb-2 border rounded">
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0" onClick={() => handleClick(0)} >
                                        <span style={{borderRadius:'5px'}}>
                                            <span className="border border-info rounded-circle badge" >i</span>
                                            <span style={{fontSize:'95%'}} className="ml-1 pt-2">
                                                <span style={{paddingTop:"2px"}} >Why provide flight details?</span>
                                            </span>
                                        </span>
                                        <span className="float-right">
                                            { paneState === '0-open' ? <FaAngleDown onClick={() => handleClick(0)} /> : <FaAngleUp onClick={() => handleClick(0)} /> }
                                        </span>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <span> Some info on the info travel plan</span>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                </Accordion>

                            </div>

                        </Col>
                    </Row>
                </div>
            </Col>
            { !small ? (
                    <Col className="wrapper-plan-premium" sm={{span:4}}>
                        <PremiumPlan />
                    </Col>
                ) : null
            }

        </Row>        
    </Container>
    <Row className="ml-1 mr-1" >
        <Col xs={{span:6}} sm={{span:4}} >
            <Button variant="outline-secondary" className="mt-2 pl-4 pr-4" type="button" onClick={handleBack}>Back</Button>
        </Col>
        <Col xs={{span:6}} sm={{span:4}} >
            <Button variant="info" className="mt-2 float-right pl-4 pr-4" type="button" onClick={submitForm} >{nextButtonText}</Button>
        </Col>
    </Row>
  </Styles>
) } 

const Styles = styled.div`
  background-color: white;
  & > div.container-fluid {
      min-height: calc(100vh - 90px - 40px - 40px - 50px); /* 90 for header, 40 for stage, 40 for footer, 30 for button */
      overflow: auto;
  }
  &  div.purplecolor {
      h4,span {
        color: rebeccapurple;
      }
  }
  .box {
    /* margin-top: 2rem; */
    align-self: center;
    background-color: #fff;
    /* box-shadow: 0 0 5 5 rgba(200,207,219,0.5); */
    box-shadow: 0 0 2px 2px rgba(200,207,219,0.5);
    /* min-height: calc(100vh - 90px - 40px - 40px - 50px); */

    .text-success {
      font-size: 120%;
    }
    .text-secondary {
      font-size: 70%;
    }    
  }  
  .addons {
    box-shadow: 0 0 2px 2px rgba(200,207,219,0.5);
    border-radius: 8px;
    padding: 1em;
    background-color: #ededed;
  }
  .pdpa {
    margin-top: 1em;
    box-shadow: 0 0 2px 2px rgba(200,207,219,0.5);
    border-radius: 8px;
    padding: 1em;
    background-color: #ededed;
  }
  .pdpa {
    .form-group {
        margin-bottom: 0px;
        margin-top: 0px !important;
    }
    .checkbox-with-link {
        display: flex;
        flex-direction: row;
    }
  }
  .highlighted {
      width: 85%;
      border: solid 1px lightgrey;
      display: flex;
      flex-direction: row;
      border-radius: 5px;
      padding: 0.5em;
      margin-bottom: 1em;
      margin-top: 1em;
  }
  h5 {
      margin-bottom: 0px;
  }
  .border-bottom {
      margin-top: 1em;
      border-bottom: solid 1px lightgrey;
      .selected-span {
          border-bottom: solid 4px rebeccapurple;
      }
      
  }
  .badge {
    background-color:#17a2b8;
    color:white;
    min-width:1.5em; 
    min-height:1em;
  }
  
`
export default ProposalPage7
