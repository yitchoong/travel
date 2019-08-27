import React, {useEffect} from "react"
import {  navigate, useStaticQuery } from "gatsby"

import SEO from "../components/seo"
import Promotions from '../components/promotions'
import Container from 'react-bootstrap/Container'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
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
import {useAppState} from '../providers'

const IndexPage = () => {

  const data = useStaticQuery(graphql`
  query PromoQuery {
      allDealsJson {
          nodes {
              value
              label
          }
      }
  }
  `)
  const messages = data.allDealsJson.nodes.map( m => m.label)
  const quote = useAppState().quote
  const choices = [{text:"Single Trip", value:"single"},{text:"Annual trip", value:"annual"}]
  useEffect(() => {
    if (Object.entries(quote.quote).length === 0 && quote.quote.constructor === Object) {
      quote.initQuote()
    }
  },[])
  const window = useWindowSize()
  const small = window.width < 576 ? true : false

  let initialValues = quote.quote.quoteDate ? quote.quote : quote.quoteInitialState

  let boundFormik = undefined // eslint-disable-line

  console.log("INDEX.js initialValues", quote.quote.quoteDate, initialValues)
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
              // At this point, we can move to page 2, before that we save the state from the form to global state
              quote.updateQuote( Object.assign({}, quote.quote, values) )
              navigate("/page-2/")
            }}
            validate={ values => {
                console.log("##### VALIDATE INDEX.JS, values = ", JSON.stringify(values))
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

                return errors
            }}      
            >
            {formik => { 
              boundFormik = formik
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
                    <Field name="isOneWay" component={CheckBoxField}  custom label="One-way trip?" />
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
  </Styles>
)}

export default IndexPage

const Styles = styled.div`
  background-color: #efefef;
  /* min-height: 78vh; */

`