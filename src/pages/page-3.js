import React, {useState} from "react"
import {navigate} from 'gatsby'
import SEO from "../components/seo"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import {useAppState} from '../providers'
import useWindowSize from '../hooks/useWindowSize'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import {Formik, Field} from 'formik'
import RadioField from '../components/radio-field'
import StageDisplay from '../components/stage-display'
import {formatNumber} from '../utils/general-utils'
import styled from 'styled-components'
import Suitcase from '../components/suitcase'

const TEXT = {'0' : "Personal Accident",
    "1" : "Medical and Travel Benefits",
    "2" : "Travel Assistance Benefit",
    "3" : "Travel Inconvenience Benefit",
    "4" : "Liability Benefit",
    "5" : "Special Benefit"
}

const QuotePage3 = () => {
  let boundForm = undefined
  const [activeKey, setActiveKey] = useState('0')
  const window = useWindowSize()
  const small = window.width < 800;
  const quote = useAppState().quote
  const planType = quote.quote.planType || 'entry'
  const totalPremium = quote.quote.totalPremium || [0,0,0]
  let initialValues = { planType: planType }
  const handleBack = () => {
    if (boundForm) {
      let updatedState = Object.assign({}, quote.quote, boundForm.values)
      quote.updateQuote(updatedState)  
    }
    navigate("/page-2")
  }
  const handleNextPage = () => {
    if (boundForm) {
        if (boundForm) {
            boundForm.submitForm()
        }      
    }
  }

  const handleAccordionClick = (e) => {
      const text = e.target.innerText
      const key = text.indexOf(TEXT[0]) >= 0 ? 0 :
                  text.indexOf(TEXT[1]) >= 0 ? 1 :
                  text.indexOf(TEXT[2]) >= 0 ? 2 :
                  text.indexOf(TEXT[3]) >= 0 ? 3 :
                  text.indexOf(TEXT[4]) >= 0 ? 4 :
                  text.indexOf(TEXT[5]) >= 0 ? 5 : 0
      setActiveKey(key+'')
  }

  console.log("**PAGE 3 -- INIT VALUES quote in state", planType, JSON.stringify(initialValues))

  return (
<Styles>
    <SEO title="Tiq Travel Quote Plan" />
    
    <StageDisplay stage={1} />

    <Container fluid>

    <Row className="main-content" >

      <Col xs={{span:11}} sm={{span:11}} className="box justify-content-center">

            <Row style={{minWidth:'100vw', overflow:'auto'}}>
                <Col xs={{span:8}} sm={{span:8}}>
                    <span>Total Premium</span>
                    <div className="text-success">27.90</div>
                    <div className="text-secondary">$10.45 x 2 adults</div>
                    <div className="text-secondary">$7.00 x 1 child</div>
                    <div className="border border-info rounded p-2 mt-1 recommendation">
                        <span>* Recommended Entry Plan: This plan is suggested based on the 
                            medical treatment costs in the country that you are travelling to 
                        </span>
                    </div>
                </Col>
                <Col xs={{span:0}} sm={{span:4}} className="suitcase d-none d-sm-block">
                    <Suitcase />
                </Col>
            </Row>
        </Col>
        <Col>

            <Formik initialValues={initialValues} enableReinitialize={true}
                onSubmit={(values, formik) => {
                // At this point, we move to page 2, before that we save the state from the form
                let updatedState = Object.assign({}, quote.quote, values)
                quote.updateQuote(updatedState)
                navigate("/page-2/")
                }}
                validate={ values => {
                    console.log("##### VALIDATE PAGE 3-- Inside validate, values = ", JSON.stringify(values))
                    const errors = {}
                    return errors
                }}      
            >

                {formik => { 
                boundForm = formik
                return (

                <Row>
                  <Col>
          
                    <Form noValidate onSubmit={formik.handleSubmit} className="mb-0">
                        <Row style={{minWidth:small ? '160vw':'100vw', overflow:'auto', backgroundColor:'#efefef'}}>
                            <Col xs={{offset:5, span:2}}  className="border border-1 mt-0">
                                <Field className="ml-2" name="planType" value="entry" component={RadioField} arial-label="transit" label=" " /> 
                                <label><div>Entry</div><div>{formatNumber(totalPremium[0],2)}</div></label>
                            </Col>

                            <Col xs={{span:2}} className="border border-1 mt-0">
                                <Field className="ml-2" name="planType" value="savvy" component={RadioField} arial-label="transit" label=" " /> 
                                <label> <div>Savvy</div><div>{formatNumber(totalPremium[1],2)}</div></label>
                            </Col>

                            <Col xs={{span:3}} className="border border-1 mt-0">
                                <Field className="ml-2" name="planType" value="luxury" component={RadioField} arial-label="transit" label=" " /> 
                                <label> <div>Luxury</div><div>{formatNumber(totalPremium[2],2)}</div></label>
                            </Col>
                        </Row>
                        <Row style={{minWidth:small ? '160vw':'100vw', overflow:'auto'}}>

                            <Col xs={{span:12}} className="ml-0 mr-0 pr-0 pl-0">
                                <Accordion activeKey={activeKey} className="mt-0">
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="0" onClick={handleAccordionClick} >
                                            <span>
                                                { (activeKey === '0' ? '-' : '+')  +  " Personal Accident"}
                                            </span>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <Row className="mt-0">
                                                <Col xs={{span:12}} className="mb-2">
                                                    <div>Accident death and permanent disability</div>
                                                </Col>

                                                <Col xs={{span:5}}  >
                                                        <ul>
                                                            <li> Adult aged below 70 </li>
                                                            <li> Adult aged 70 - 80 </li>
                                                            <li> Child </li>
                                                        </ul>
                                                </Col>
                                                <Col  xs={{span:2}} className="float-left">
                                                            <ul className="bullet-0">
                                                                <li> $1,200,000 </li>
                                                                <li> 40</li>
                                                                <li> 60 </li>
                                                            </ul>
                                                </Col>            
                                                <Col xs={{span:2}}>
                                                            <ul className="bullet-0">
                                                                <li> 40 </li>
                                                                <li> 60</li>
                                                                <li> 80 </li>
                                                            </ul>
                                                </Col>
                                                <Col  xs={{span:2}}>
                                                            <ul className="bullet-0">
                                                                <li> 40 </li>
                                                                <li> 60</li>
                                                                <li> 180 </li>
                                                            </ul>
                                                </Col>

                                                {/* {
                                                    formik.values.planType === 'entry' ? (
                                                        <Col  xs={{span:3}} className="float-left">
                                                            <ul className="bullet-0">
                                                                <li> $1,200,000 </li>
                                                                <li> 40</li>
                                                                <li> 60 </li>
                                                            </ul>
                                                        </Col>            
                                                    ) : formik.values.planType === 'savvy' ? (
                                                        <Col  xs={{span:3}}>
                                                            <ul className="bullet-0">
                                                                <li> 40 </li>
                                                                <li> 60</li>
                                                                <li> 80 </li>
                                                            </ul>
                                                        </Col>

                                                    ) : (
                                                        <Col  xs={{span:3}}>
                                                            <ul className="bullet-0">
                                                                <li> 60 </li>
                                                                <li> 80</li>
                                                                <li> 100 </li>
                                                            </ul>
                                                        </Col>

                                                    )                                            
                                                } */}
                                            </Row>
                                            
                                        </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="1" onClick={handleAccordionClick}>
                                            <span>
                                                {( activeKey === '1' ? '- ' : '+ ')  + TEXT['1']}
                                            </span>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="1">
                                        <Card.Body>Hello! I'm another body</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="1" onClick={handleAccordionClick}>
                                            <span>
                                                {( activeKey === '2' ? '- ' : '+ ')  + TEXT['2']}
                                            </span>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="2">
                                        <Card.Body>Hello! I'm another body</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="1" onClick={handleAccordionClick}>
                                            <span>
                                                {( activeKey === '3' ? '- ' : '+ ')  + TEXT['3']}
                                            </span>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="3">
                                        <Card.Body>Hello! I'm another body</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="1" onClick={handleAccordionClick}>
                                            <span>
                                                {( activeKey === '4' ? '- ' : '+ ')  + TEXT['4']}
                                            </span>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="4">
                                        <Card.Body>Hello! I'm another body</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} eventKey="1" onClick={handleAccordionClick}>
                                            <span>
                                                {( activeKey === '5' ? '- ' : '+ ')  + TEXT['5']}
                                            </span>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="5">
                                        <Card.Body>Hello! I'm another body</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>


                                </Accordion>

                            </Col>
                        </Row>


                    </Form>
                </Col>
                </Row>

                )} }
            </Formik>

        </Col>

      </Row>
    </Container>
    <Row className="ml-1 mr-1" >
                            <Col xs={{span:4}} sm={{span:4}} >
                                <Button variant="outline-secondary" className="mt-2 pl-4 pr-4" type="button" onClick={handleBack}>Back</Button>
                            </Col>
                            <Col xs={{span:8}} sm={{span:8}} >
                                <Button variant="info" className="mt-2 float-right pl-4 pr-4" type="button" onClick={handleNextPage} >Next</Button>
                            </Col>
    </Row>

    {/* <Link to="/page-2/">Go to page 2</Link> */}

      {/* <Button onClick={buttonClick} >External Submit</Button> */}

  </Styles>
)}

export default QuotePage3

const Styles = styled.div`
  background-color: #efefef;
  & > div.container-fluid {
      height: calc(100vh - 80px - 40px - 40px - 30px);
      overflow: auto;
  }
  .box {
    align-self: center;
    background-color: #fff;
    margin-left: 1rem;
    box-shadow: 3px 0px 3px 3px rgba(200,207,219,0.5);
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
  .recommendation {
      margin-bottom: 1rem;
      font-size: 90%;
  }
  label {
    margin-bottom: 0px;
  }
  form {
      label {
          display: block;
      }
  }
  .accordion > .card .card-header {
      background-color: #428bca;
      color: #fff;
  }
  div.card-body {
      padding: 1rem;
      padding-top: 0.5rem;
  }
  ul.bullet-0 {
      margin-left: 0px;
      li {
        list-style: none;
      }
  }
  li {
      font-size:80%;
  }


`