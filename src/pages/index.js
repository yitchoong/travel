import React, {useEffect} from "react"
import { Link, navigate } from "gatsby"

// import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
// import Comments from "../components/comments";
import Promotions from '../components/promotions'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import {useAppState} from '../providers'
import Button from 'react-bootstrap/Button'
import {Formik, Field} from 'formik'
import ChoiceField from '../components/choice-input'
import CountrySelectField from '../components/country-select-field'
import CheckBoxField from '../components/checkbox-field'
import DateRangeField from '../components/date-range-field'
import DateField from '../components/date-field'
import TextInputField from '../components/text-input-field'
// import {formatNumber} from '../utils/general-utils'
import styled from 'styled-components'
import useWindowSize from '../hooks/useWindowSize'

const initValues = {
  tripType:'', 
  // countries:[{label:"Brunei", value:'Brunei'}],
  countries:[],
  isOneWay:false, 
  travelDates:[], 
  couponCode:'', 
  adultCount:1, 
  childrenCount:0, 
  isTransitTraveller:false, 
  groupOrFamily:'', 
  totalPremium:[0,0,0], 
  planType:'entry' ,
}

const IndexPage = () => {
  const messages = ["TEIF Sale! 45% + 5% off with 'JULTEIF'", "Second message"]
  const quote = useAppState().quote
  const choices = [{text:"Single Trip", value:"single"},{text:"Annual trip", value:"annual"}]
  useEffect(() => {
    if (Object.entries(quote.quote).length === 0 && quote.quote.constructor === Object) {
      quote.initQuote()
    }
  },[])
  const window = useWindowSize()
  const small = window.width < 800 ? true : false

  const emptyObject = Object.entries(quote.quote).length === 0 && quote.quote.constructor === Object

  let initialValues = emptyObject ? initValues : quote.quote  

  const buttonClick = () => {
    console.log("buttonClick")    
    if (boundSubmitForm) {
      boundSubmitForm()
    }
  }
  let boundSubmitForm = undefined
  // console.log("**INIT VALUES quote in state", JSON.stringify(initialValues))
  return (
  <Styles>
    <SEO title="Tiq Travel" />
    <div style={{backgroundColor:'transparent',padding:'0.5rem 0.5rem 0.5rem', fontWeight:'bold'}}>
      Pack your cares away when you insure your travel
    </div>
    <Promotions messages={messages} bgColor="#e8b32e" />
    
    <Container fluid>
    <Row>
      <Col xs={{span:12}} sm={{span:12}}>
          <Formik initialValues={initialValues} enableReinitialize={true}
            onSubmit={(values, formik) => {
              // At this point, we move to page 2, before that we save the state from the form
              let updatedState = Object.assign({}, quote.quote, values)
              quote.updateQuote(updatedState)
              console.log("navigate", navigate)
              navigate("/page-2/")
            }}
            validate={ values => {
                // console.log("##### VALIDATE -- Inside validate, values = ", JSON.stringify(values))
                const errors = {}
                if (values.travelDates.filter(v => v).length === 0) {
                    errors.travelDates = 'Please advise us of your travel date(s)'
                }
                if (values.countries.filter(v => v).length === 0) {
                  errors.countries = 'Please advise us of your destination countries'
                }
                if (values.couponCode && !['P20','P30'].find(c => c === values.couponCode) ) {
                  errors.couponCode = 'Invalid Coupon Code'
                }

              // console.log("validate, errors, values", errors )
                return errors
            }}      
            >
            {formik => { 
              boundSubmitForm = formik.submitForm
              return (
              <Form noValidate onSubmit={formik.handleSubmit}>
                <Row>
                  <Col xs={12} md={4}>
                    <Field name="tripType" component={ChoiceField} choices={choices} label="What is your plan type?" />
                  </Col>
                  <Col xs={12} md={5}>
                    <Field name="countries" component={CountrySelectField} label="Where are you travelling to?" />
                  </Col>
                  <Col xs={12} md={3} className="pt-3">
                    <Field name="isOneWay" component={CheckBoxField} custom label="One-way trip?" />
                  </Col>
                </Row>
                <div style={{margin:'0.5em'}} />

                <Row>
                  <Col xs={12} md={4}>
                    <Field name="travelDates" component={formik.values.isOneWay ? DateField : DateRangeField} label="Select your travel dates" />
                  </Col>
                  <Col xs={11} md={5} className={small ? "mt-3" : ""}>
                    <Field name="couponCode" component={TextInputField} label="Do you have a coupon code? (Optional)" />
                  </Col>

                </Row>
                
                <Row className="justify-content-center" >
                  <Col xs={{span:8, offset:3}} sm={{span:4, offset:2}} >
                    <Button variant="info" className="mt-2" type="submit" >Quote Now</Button>
                  </Col>
                </Row>

              </Form>
            )} }
          </Formik>
      </Col>
    </Row>
    </Container>
    {/* <Link to="/page-2/">Go to page 2</Link> */}

      {/* <Button onClick={buttonClick} >External Submit</Button>

    <Link to="/page-3/">Go to page 3</Link> */}
  </Styles>
)}

export default IndexPage

const Styles = styled.div`
  background-color: #efefef;
  /* min-height: 78vh; */

`