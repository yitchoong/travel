import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
// import Comments from "../components/comments";
import Promotions from '../components/promotions'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
// import {useAppState} from '../providers'
import Button from 'react-bootstrap/Button'
import {Formik, Field} from 'formik'
import ChoiceField from '../components/choice-input'
import CountrySelectField from '../components/country-select-field'
import CheckBoxField from '../components/checkbox-field'
import DateRangeField from '../components/date-range-field'
import DateField from '../components/date-field'
import TextInputField from '../components/text-field'
import {formatNumber} from '../utils/general-utils'

const IndexPage = () => {
  const messages = ["TEIF Sale! 45% + 5% off with 'JULTEIF'", "Second message"]
  // const uiState = useAppState().uiState
  const initialValues = {
    tripType:'single', 
    countries:[],
    isOneWay:false, 
    travelDates:[], 
    couponCode:'', 
    adultCount:1, 
    childrenCount:0, 
    isTransitTraveller:false, 
    groupOrFamily:'', 
    totalPremium:0, 
    planType:'Entry' 
  }
  const choices = [{text:"Single Trip", value:"single"},{text:"Annual trip", value:"annual"}]

  const buttonClick = () => {
    console.log("buttonClick")    
    if (boundSubmitForm) {
      boundSubmitForm()
    }
  }
  let boundSubmitForm = undefined

  console.log("format", formatNumber(9200.9,2))

  return (
  <Layout bgColor="#efefef">
    <SEO title="Tiq Travel" />
    <div style={{backgroundColor:'transparent',padding:'0.5rem 0.5rem 0.5rem', fontWeight:'bold'}}>
      Pack your cares away when you insure your travel
    </div>
    <Promotions messages={messages} bgColor="#e8b32e" />
    
    
    <Container fluid>
    <Formik initialValues={initialValues} 
      onSubmit={(values, formik) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          formik.setSubmitting(false);
        }, 500);
      }}
      validate={ values => {
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
            <Col xs={12} md={4}>
              <Field name="countries" component={CountrySelectField} label="Where are you travelling to?" />
            </Col>
            <Col xs={12} md={4}>
              <Field name="isOneWay" component={CheckBoxField} required feedback="Required" label="One-way trip?" />
            </Col>
          </Row>
          <div style={{margin:'0.5em'}} />

          <Row>
            <Col xs={12} md={4}>
              <Field name="travelDates" component={formik.values.isOneWay ? DateField : DateRangeField} label="Select your travel dates" />
            </Col>
            <Col xs={12} md={4}>
              <Field name="couponCode" component={TextInputField} label="Do you have a coupon code? (Optional)" />
            </Col>

          </Row>


          <Button className="mt-2" type="submit" >Submit</Button>

        </Form>
      )} }
    </Formik>
    </Container>

      <Button onClick={buttonClick} >External Submit</Button>

    <Link to="/page-2/">Go to page 2</Link>
    <Link to="/page-3/">Go to page 3</Link>
  </Layout>
)}

export default IndexPage
