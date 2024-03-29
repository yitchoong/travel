import React from "react"
import {navigate } from "gatsby"

import SEO from "../components/seo"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import {useAppState} from '../providers'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import {Formik, Field} from 'formik'
import ChoiceField from '../components/choice-input'
import CheckBoxField from '../components/checkbox-field'
import RadioGroupField from '../components/radio-group-field'
import StageDisplay from '../components/stage-display'
import styled from 'styled-components'
import {sleep} from '../utils/general-utils'


const adults = [1,2,3,4,5,6,7,8,9].map(i => ({text:i+'', value:i}))
const children = [0,1,2,3,4,5,6].map(i => ({text:i+'', value:i}))
const groupFamily = [{label:'Group', value:'group'}, {label:'Family',value: 'family'}]

const QuotePage2 = () => {

  let boundFormik = undefined
  const {quote} = useAppState()
  let initialValues = quote.quote

  const handleBack = () => {
    if (boundFormik) {
      let updatedState = Object.assign({}, quote.quote, boundFormik.values)
      quote.updateQuote(updatedState)  
    }
    navigate("/")
  }

  console.log("**PAGE 2 -- INIT VALUES quote in state", JSON.stringify(initialValues))
  return (
  <Styles>
    <SEO title="Tiq Travel Quote" />
    
    <StageDisplay stage={1} />

    <Container fluid>
    <Row>
      <Col xs={{span:12}} sm={{span:9}} className="box">

        <Row>
          <Col xs={{span:12}} sm={{span:10}}>
            <div><b>Number of traveller(s)</b></div>
            <div className="message">
              <span>
                Enjoy group discounts when you sign up as a group of 3 or more!
              </span>
            </div>
          </Col>
        </Row>

          <Formik initialValues={initialValues} enableReinitialize={true}
            onSubmit={(values, formik) => {
              // At this point, we move to page 2, before that we save the state from the form
              // mock the totalPremium figure for use in page three, simulate a async call
              sleep(200).then(((data={premiums:[27.90, 45.20, 79.20]}) => {
                let updatedState = Object.assign({}, quote.quote, values, {totalPremium:data.premiums})
                quote.updateQuote(updatedState)
                navigate("/page-3/")  
              }))
            }}
            validate={ values => {
                console.log("##### VALIDATE -- Inside validate, values = ", JSON.stringify(values))
                const errors = {}
                if (!values.groupOrFamily) {
                  errors.groupOrFamily = "Please select group or family"
                }

                return errors
            }}      
            >

            {formik => { 
              // boundSubmitForm = formik.submitForm
              boundFormik = formik

              return (
              <Form noValidate onSubmit={formik.handleSubmit}>
                <Row>
                  <Col xs={12}>
                    <Field name="adultCount" component={ChoiceField} choices={adults} label="Adults" />
                  </Col>
                  <Col xs={12} >
                    <label>Children<Badge variant="info" onClick={() => alert("click")}>i</Badge></label>
                    <Field name="childrenCount" component={ChoiceField} choices={children} />
                  </Col>
                  <Col xs={12} >
                    <Field name="isTransitTraveller" custom component={CheckBoxField} arial-label="transit"                     
                        label={(<span>
                          <span>Are you a transit traveller</span>
                          <a href="#example"> {" "}
                            <span style={{fontSize:'90%'}}>Check if you qualify</span>
                          </a>
                        </span>)} 
                    />
                    
                  </Col>

                  <Col xs={12} >
                    <div style={{marginBottom:'0px'}}>
                      <span><b>Which option best describes your travel category</b></span>
                    </div>
                    <Field  name="groupOrFamily" custom component={RadioGroupField} choices={groupFamily} arial-label="transit" />
                  </Col>


                </Row>
                
                <Row className="justify-content-center" >
                  <Col xs={{span:4}} sm={{span:4}} >
                    <Button variant="outline-secondary" className="mt-2 pl-4 pr-4" type="button" onClick={handleBack}>Back</Button>
                  </Col>
                  <Col xs={{span:8}} sm={{span:8}} >
                    <Button variant="info" className="mt-2 float-right pl-4 pr-4" type="submit" >Next</Button>
                  </Col>

                </Row>

              </Form>
            )} }
          </Formik>
        </Col>
        <Col xs={{span:0}} sm={{span:3}} className="d-none d-sm-block box instructions">
            <h6>Individual Cover</h6>
            <p>For an individual traveller</p>

            <h6>Married Couple Cover</h6>
            <p>For two adult individuals who are legally married and travelling together</p>



      </Col>

      </Row>
    </Container>
  </Styles>
)}

export default QuotePage2

const Styles = styled.div`
  background-color: #fff;
  & > div {
    .row {
      background-color: #fff; 
    }
  }
  .box {
    padding-top: 1rem;
    min-height: calc(100vh - 80px - 40px);
    box-shadow: 2px 2px 2px 2px rgba(200,207,219,0.2);
  }
  .box.instructions {
    font-size: 85%;
  }
  div.message {
    background-color: rebeccapurple;
    /* height: 2em; */
    color: #efefef;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 1em;
  }
  label {
    margin-bottom: 0px;
    .badge {
      margin-left:0.3em;
    }
  }
  
`