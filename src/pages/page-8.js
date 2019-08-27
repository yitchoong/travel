import React, {useEffect} from "react"
import SEO from "../components/seo"
import {navigate, useStaticQuery} from 'gatsby'
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
import CheckBoxField from '../components/checkbox-field'
import RadioField from '../components/radio-field'
import {sleep} from '../utils/general-utils'

const generatePolicy = async (proposal) => {
    // simulate xfer to backend, returns policyNumber
    return new Promise(resolve => {
        setTimeout(() => {
            resolve( Object.assign({}, proposal, {policyNumber: 'FJ0000336'}))
        }, 100)    
    })
}

const ProposalPage8 = () => {

    let boundFormik = undefined
    const window = useWindowSize()
    const small = window.width < 576;
    let submitting = false

    const data = useStaticQuery(graphql`
    query DealsQuery {
        allDealsJson {
            nodes {
                value
                label
            }
        }
    }
    `)
    const deals = data.allDealsJson.nodes

    const { proposal} = useAppState()
    useEffect(() => {
        if (!proposal.proposal.travellers){
            if (typeof window !== `undefined`) {
                navigate("/page-4")
            }
        } // go back to page 4 if no travellers info    
    },[])


    let initialValues = Object.assign({}, proposal.proposal )


    const handleBack = () => {
        navigate("/page-7")
    }
    const validateCoupon = (value) => {
        if (value) {
            if(boundFormik && boundFormik.values.dealCode) boundFormik.setFieldValue("dealCode", '')
        } 
        return
    }
    const validateDeals = (value) => {
        if (value) {
            if (boundFormik && boundFormik.values.couponCode) boundFormik.setFieldValue("couponCode", '')
        } 
        return

    }
    const submitForm = () => {
        if (boundFormik){
            submitting = true
            boundFormik.submitForm()
        }
    }
    const handleNextPage = async (formik, values) => {
        if (boundFormik){
            // save the flight details
            let updatedProposal = Object.assign({}, proposal.proposal, boundFormik.values)
            console.log("<<Page-8 updated proposal>>", JSON.stringify(updatedProposal))
            updatedProposal = await generatePolicy(updatedProposal)
            proposal.updateProposal(updatedProposal)
            navigate('/page-9')
        }
    }

  console.log("<<<<Page-8, values>>>>", submitting,  JSON.stringify(boundFormik ? boundFormik.values : initialValues))

  return (
  <Styles>
    <SEO title="Tiq Travel Application" />
    
    <StageDisplay stage={3} />

    <Container fluid>
    <Formik initialValues={initialValues} enableReinitialize={true}
        onSubmit={(values, formik) => {
        sleep(200).then((() => {
            handleNextPage(formik, values)
        }))
        }}
        validate={ values => {
            // console.log("##### VALIDATE PAGE 8 -- Inside validate, values = ", JSON.stringify(values))            
            const errors = {}
            if (!values.paymentOption) {
                errors.paymentOption = "Please select one of these payment options"
            }
            if (submitting && values.paymentOption === 'payNow' && !values.ddaAgree) {
                errors.ddaAgree = "Please acknowledge the terms and condition for the use of DDA"
            }
            submitting = false
            return errors
        }}      
    >
        {formik => { 
            boundFormik = formik
            return (                
            <Form className="mb-2" noValidate onSubmit={formik.handleSubmit}>
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
                                    <h5 className="px-2 mb-2">Enter your payment details</h5>                    
                                    <div>                                    
                                        <Container fluid>
                                            <div>Use my e-Wallet</div>
                                            <div className="ewallet-box">
                                                <div>
                                                    <span>
                                                        <EWallet /> 
                                                        <span className="ml-2">
                                                            Total Balance: {120.00} 
                                                        </span>
                                                    </span>
                                                </div>
                                                <Field className="mt-2" name="paymentOption" value="eWalletFull" custom component={RadioField} arial-label="transit" label="Full Payment" /> 
                                                <div style={{display:'flex', flexDirection:'row'}}>
                                                    <span>
                                                        <Field className="mt-0" name="paymentOption" value="eWalletPart" custom component={RadioField} arial-label="transit" 
                                                        label={
                                                        <span>
                                                            <span>"Part Payment"</span>
                                                            <span><Button variant="link" size="sm" className="ml-1" onClick={() => alert("Add Amount")}>Add Amount</Button></span>
                                                        </span>} /> 
                                                    </span>
                                                </div>
                                            </div>
                                            <div>Payment Options</div>
                                            <div className="option">
                                                <div style={{display:'flex', flexDirection:'row'}}>
                                                    <span>
                                                        <Field className="" name="paymentOption" value="creditCard" custom component={RadioField} arial-label="transit" 
                                                        label={
                                                            <span>
                                                                <span>Credit Card</span>
                                                                <span style={{marginLeft:'0.3em'}}>
                                                                    <Cards />
                                                                </span>
                                                            </span>                                                        
                                                        }/> 
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="option">
                                                <div style={{display:'flex', flexDirection:'row'}}>
                                                    <span>
                                                        <Field className="mt-0" name="paymentOption" value="payNow" custom component={RadioField} arial-label="transit" 
                                                        label={
                                                            <span>
                                                                <span>Pay Now</span>
                                                                <span> <Paynow /></span>
                                                            </span>
                                                        }/> 
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="checkbox-with-link">
                                                    <Field name={`ddaAgree`} custom component={CheckBoxField} arial-label="transit" 
                                                    label={(
                                                        <div>
                                                        <span>I have read, understood, and I accept the </span>
                                                        <a href="#example"> {" "}
                                                            <span>Terms and Conditions </span>
                                                        </a>
                                                        <span>
                                                            for the use of Direct Debit Authorization (DDA) with DBS for this policy.
                                                        </span>

                                                    </div>

                                                    )} />
                                            </div>
                                        </Container>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="box border mt-2">
                            <Row>
                                <Col xs={{span:12}} className="">
                                    <Container fluid>
                                        <Row>
                                            <Col xs={{span:12}}>
                                                <div className="mt-2"><strong>Don't miss out the flashing deals</strong></div>                    
                                            </Col>
                                        </Row>
                                        {deals.map(deal => {
                                            return (
                                                <div className="deals" key={deal.value}>
                                                    <Field onChange={validateDeals} className="mt-0" name="dealCode" value={deal.value} custom component={RadioField} arial-label="transit" label={deal.label} /> 
                                                </div>
                                            )
                                        })}
                                        <div className="line-container">
                                            <div className="circle">
                                                <span>OR</span>
                                            </div>
                                        </div>
                                        <Row>
                                            <Col xs={{span:6}}>
                                                <Field onChange={validateCoupon} name="couponCode" component={TextInputField} arial-label="transit" label="Coupon Code" placeholder="Enter coupon code" /> 
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </div>
                        <div className="box border mt-2">
                            <Row>
                                <Col xs={{span:12}}>
                                    <div className="mt-2 ml-3"><strong>Do you have a referral code (optional)</strong></div>                    
                                </Col>
                                <Col xs={{span:6}} className="ml-3 mt-1">
                                    <Field className="" name="referralCode" component={TextInputField} arial-label="transit"  placeholder="Enter referral code" /> 
                                </Col>
                            </Row>
                        </div>
                        <div className="box border mt-2">
                            <Row>
                                <Col xs={{span:12}}>
                                    <div className="mt-1 ml-3">
                                        <span className="border border-info rounded-circle badge" >i</span>
                                        <span className="ml-1">Learn more about refer and earn</span>
                                        <span className="float-right"><Button className="pt-0" variant="link">View</Button></span>                                        
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
            </Form>
            )
        }}
    </Formik>
    </Container>
    <Row className="ml-1 mr-1" >
        <Col xs={{span:6}} sm={{span:4}} >
            <Button variant="outline-secondary" className="mt-2 pl-4 pr-4" type="button" onClick={handleBack}>Back</Button>
        </Col>
        <Col xs={{span:6}} sm={{span:4}} >
            <Button variant="info" className="mt-2 float-right pl-4 pr-4" type="button" onClick={submitForm} >{"Next"}</Button>
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
  .ewallet-box {
      border: solid 1px lightgrey;
      border-radius: 5px;
      background-color: #ededed;      
      padding: 1em;
      padding-bottom: 0px;
      width: 80%;
      .form-group {
          margin-top: 0px !important;
      }
  }
  .option {
    margin-top: 0.5em;
    border: solid 1px lightgrey;
    border-radius: 5px;
    padding: 1em;
    padding-bottom: 0px;
    width: 80%;
    .form-group {
        margin-top: 0px !important;
    }
  }
  .checkbox-with-link {
      margin-top: 0.1em;
      display: flex;
      flex-direction: row;
  }
  .deals {
    .form-group {
          margin-top: 0px !important;
          margin-bottom: 0px !Important;
      }
  }
.line-container {
    margin-top: 1em;
    margin-bottom: 0.5em;   
    width: 100%;
    height: 1px;
    background-color: lightgrey;
    position: relative;
}
.circle {
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  min-width: 2rem;
  min-height: 10px;
  background-color: white;
  border: solid 1px lightgrey;
  border-radius: 20%;
  position: absolute;
  top: -0.8em;
  left: calc(50% - 5px);
}
  
`
export default ProposalPage8

// const Wallet = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="32" height="32"><path fill="#fff" d="M14,24C8.5,24,4,28.5,4,34v10v10v60c0,5.5,4.5,10,10,10h95c5.5,0,10-4.5,10-10V54V24H14z"/><path fill="#444b54" d="M4,57c-1.7,0-3-1.3-3-3V34c0-7.2,5.8-13,13-13h105c1.7,0,3,1.3,3,3s-1.3,3-3,3H14c-3.9,0-7,3.1-7,7v20C7,55.7,5.7,57,4,57z"/><path fill="#f8e390" d="M101,31c0-14.9-12.1-27-27-27c-3.5,0-6.9,0.7-10,1.9C60.9,4.7,57.5,4,54,4C39.1,4,27,16.1,27,31c0,1.4,0.1,2.7,0.3,4h73.4C100.9,33.7,101,32.4,101,31z"/><path fill="#444b54" d="M101,35c-1.7,0-3-1.3-3-3v-1C98,17.8,87.2,7,74,7c-3.1,0-6.1,0.6-8.9,1.7c-1.5,0.6-3.3-0.1-3.9-1.7s0.1-3.3,1.7-3.9C66.4,1.7,70.2,1,74,1c16.5,0,30,13.5,30,30v1C104,33.7,102.7,35,101,35z"/><path fill="#444b54" d="M81,35c-1.7,0-3-1.3-3-3v-1C78,17.8,67.2,7,54,7S30,17.8,30,31v1c0,1.7-1.3,3-3,3s-3-1.3-3-3v-1C24,14.5,37.5,1,54,1s30,13.5,30,30v1C84,33.7,82.7,35,81,35z"/><path fill="#fff" d="M53.9,44.7c-1.3,0-2.3-0.9-2.5-2.1c-0.9-0.3-1.8-0.8-2.5-1.5c-0.7-0.7-1.4-1.6-1.8-2.6c-0.6-1.3,0-2.7,1.3-3.3c1.2-0.5,2.8,0.1,3.3,1.3c0.2,0.4,0.4,0.7,0.6,0.9c0.2,0.2,0.5,0.3,0.7,0.4c0.7,0.2,1.7,0.2,2.3,0c0.3-0.1,0.5-0.2,0.6-0.4c0.2-0.2,0.3-0.4,0.4-0.7c0.1-0.3,0.2-0.7,0.2-1c0-0.6-0.1-0.9-0.2-1c-0.1-0.2-0.3-0.4-0.6-0.6c-0.3-0.2-0.7-0.4-1.1-0.5c-0.6-0.2-1.2-0.3-1.8-0.5c-0.7-0.2-1.4-0.4-2-0.7c-0.8-0.3-1.5-0.7-2.1-1.3c-0.7-0.6-1.2-1.3-1.6-2.1c-0.4-0.8-0.6-1.9-0.6-3.1c0-0.9,0.2-1.7,0.5-2.5c0.3-0.8,0.8-1.6,1.4-2.3c0.6-0.7,1.4-1.2,2.4-1.6c0.2-0.1,0.5-0.2,0.7-0.2c0.2-1.1,1.2-2,2.5-2c1.2,0,2.2,0.9,2.5,2c0.3,0.1,0.5,0.2,0.8,0.3c0.9,0.4,1.7,1,2.4,1.8c0.6,0.7,1.1,1.5,1.3,2.5c0.2,0.6,0.1,1.3-0.2,1.9c-0.3,0.6-0.8,1-1.5,1.2c-0.2,0.1-0.5,0.1-0.8,0.1c-1.1,0-2.1-0.7-2.4-1.7c-0.1-0.3-0.2-0.5-0.4-0.7c-0.1-0.2-0.3-0.3-0.6-0.4c-0.6-0.3-1.8-0.3-2.4,0c-0.3,0.1-0.5,0.3-0.7,0.4c-0.2,0.2-0.3,0.4-0.4,0.6c-0.1,0.3-0.1,0.5-0.1,0.8c0,0.7,0.1,0.9,0.1,1c0.1,0.2,0.2,0.3,0.3,0.4c0.2,0.2,0.4,0.3,0.7,0.4c0.5,0.2,1,0.4,1.5,0.5c0.7,0.2,1.3,0.4,1.9,0.6c0.9,0.3,1.7,0.6,2.4,1.1c0.9,0.6,1.6,1.3,2.1,2.2c0.6,1,0.9,2.2,0.9,3.6c0,0.9-0.1,1.8-0.4,2.6c-0.3,0.9-0.8,1.8-1.4,2.5c-0.7,0.7-1.5,1.3-2.4,1.7c-0.3,0.1-0.6,0.2-0.9,0.3C56.1,43.8,55.1,44.7,53.9,44.7z"/><g><path fill="#cadbea" d="M119,104V64h-5c-11,0-19.5,9-19.5,20s8.5,20,19.5,20H119z"/><path fill="#444b54" d="M109,127H14c-7.2,0-13-5.8-13-13V44c0-1.7,1.3-3,3-3s3,1.3,3,3v70c0,3.9,3.1,7,7,7h95c3.9,0,7-3.1,7-7V54c0-3.9-3.1-7-7-7H19c-1.7,0-3-1.3-3-3s1.3-3,3-3h90c7.2,0,13,5.8,13,13v60C122,121.2,116.2,127,109,127z"/><path fill="#fff" d="M124,94h-10c-5.5,0-10-4.5-10-10v0c0-5.5,4.5-10,10-10h10V94z"/><path fill="#444b54" d="M124,97h-10c-7.2,0-13-5.8-13-13s5.8-13,13-13h10c1.7,0,3,1.3,3,3v20C127,95.7,125.7,97,124,97z M114,77c-3.9,0-7,3.1-7,7s3.1,7,7,7h7V77H114z"/></g></svg>)

// width was 238 , height was 149 => / 5 = 50 & 30 
const Paynow = () => (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="40.000000pt" height="22.000000pt" viewBox="0 0 238.000000 149.000000"preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,149.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
<path d="M117 1393 c-4 -3 -7 -127 -7 -275 l0 -268 70 0 70 0 0 94 0 94 90 4 c81 4 93 7 126 34 57 46 76 88 71 157 -6 70 -40 120 -101 148 -33 15 -66 19 -177 19 -75 0 -139 -3 -142 -7z m271 -145 c11 -23 11 -33 0 -55 -12 -26 -19 -28 -76 -31 l-62 -3 0 59 c0 32 2 61 4 63 3 2 31 2 63 -1 51 -4 59 -8 71 -32z"/>
<path d="M713 1388 c-6 -7 -49 -112 -96 -233 -47 -121 -93 -237 -101 -257 -9 -21 -16 -40 -16 -43 0 -3 31 -5 69 -5 l69 0 18 45 17 45 101 0 102 0 16 -45 17 -45 -48 -25 c-124 -62 -203 -183 -209 -319 -6 -105 10 -171 58 -245 75 -115 188 -174 335 -174 82 -1 98 3 163 33 86 40 160 113 200 197 23 51 27 71 27 158 0 89 -3 107 -28 160 -28 61 -100 145 -124 145 -7 0 -63 -67 -124 -150 -61 -82 -114 -150 -117 -150 -4 1 -29 30 -57 65 -27 35 -58 64 -67 64 -18 1 -68 -63 -68 -87 0 -15 187 -242 200 -242 4 0 59 69 122 153 62 83 118 154 123 156 6 2 15 -14 22 -35 29 -97 5 -192 -69 -270 -61 -65 -118 -89 -208 -89 -261 2 -384 325 -186 491 82 69 174 89 271 60 l47 -15 29 32 c35 38 36 51 7 71 -22 15 -20 16 30 16 l52 0 0 115 0 115 90 157 c50 86 90 158 90 160 0 1 -35 3 -79 3 l-78 0 -47 -100 c-25 -55 -48 -100 -50 -100 -2 0 -25 45 -51 100 l-48 100 -79 0 c-43 0 -78 -2 -78 -3 0 -2 41 -74 90 -160 l90 -156 0 -111 0 -111 -47 7 c-27 3 -49 7 -49 8 -1 0 -45 114 -99 251 -54 138 -102 256 -108 263 -5 7 -32 12 -62 12 -30 0 -57 -5 -62 -12z m88 -235 c12 -38 24 -74 27 -80 3 -10 -11 -13 -53 -13 -47 0 -56 3 -51 15 3 9 13 41 22 73 17 58 22 72 29 72 2 0 13 -30 26 -67z"/>
<path d="M115 728 c-3 -7 -4 -130 -3 -273 l3 -260 67 -3 68 -3 2 165 3 165 100 -162 100 -162 75 0 75 0 0 270 0 270 -67 3 c-81 4 -77 12 -81 -172 l-2 -129 -95 149 -96 149 -72 3 c-53 2 -74 -1 -77 -10z"/>
<path d="M1420 733 c1 -5 47 -127 104 -273 l103 -265 63 0 63 0 30 78 c17 42 31 76 33 75 1 -2 16 -37 32 -78 l30 -75 60 -3 59 -3 71 173 c39 95 87 211 106 258 51 122 51 121 -35 118 l-71 -3 -33 -90 c-18 -49 -46 -125 -61 -167 -16 -43 -31 -78 -35 -78 -3 0 -16 30 -29 68 l-22 67 35 98 c27 74 32 99 23 103 -7 3 -42 4 -77 2 l-64 -3 -55 -167 c-30 -93 -58 -168 -61 -168 -4 0 -10 11 -13 24 -3 14 -29 90 -57 170 l-51 146 -74 0 c-41 0 -74 -3 -74 -7z"/>
</g>
</svg>)
const Cards = () => (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="25.000000pt" height="25.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M485 4483 c-187 -16 -362 -132 -441 -291 l-39 -77 0 -886 0 -886 39 -77 c65 -127 184 -223 336 -271 43 -14 106 -18 293 -22 l237 -5 0 -447 c0 -486 3 -518 57 -611 78 -134 185 -215 338 -256 67 -18 132 -19 1720 -19 1587 0 1652 1 1710 19 159 49 277 144 341 274 l39 77 0 886 0 886 -39 77 c-65 127 -178 219 -331 269 -50 16 -99 20 -297 24 l-238 5 0 447 c0 486 -3 518 -57 611 -75 128 -174 206 -322 254 -66 21 -68 21 -1686 22 -891 0 -1638 -1 -1660 -3z m3256 -365 c98 -34 119 -79 119 -258 l0 -130 -1755 0 -1755 0 0 144 c0 132 2 146 23 177 12 19 42 44 67 57 l44 22 1612 0 c1206 0 1620 -3 1645 -12z m119 -853 l0 -114 -1252 -3 c-1250 -3 -1253 -4 -1320 -25 -140 -45 -251 -130 -316 -244 -52 -91 -62 -150 -62 -361 l0 -188 -212 0 c-234 0 -265 7 -318 64 l-25 28 -3 479 -3 479 1756 0 1755 0 0 -115z m815 -494 c22 -10 51 -31 65 -45 l25 -28 0 -808 0 -808 -25 -28 c-14 -14 -43 -35 -65 -45 -38 -18 -106 -19 -1651 -19 -1206 0 -1620 3 -1645 12 -53 18 -87 47 -104 90 -13 33 -15 136 -15 801 0 726 1 764 19 804 19 41 38 57 96 80 23 9 434 12 1645 12 1550 1 1617 0 1655 -18z"/> <path d="M1620 1890 l0 -180 470 0 470 0 0 180 0 180 -470 0 -470 0 0 -180z"/> <path d="M1620 1415 l0 -175 245 0 245 0 0 175 0 175 -245 0 -245 0 0 -175z"/> </g> </svg>)
// const EWallet = () => (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M0 320 l0 -320 320 0 320 0 0 320 0 320 -320 0 -320 0 0 -320z"/> </g> </svg>)
const EWallet = () => (<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32.000000pt" height="32.000000pt" viewBox="0 0 334.877 334.877" ><g><path d="M333.196,155.999h-16.067V82.09c0-17.719-14.415-32.134-32.134-32.134h-21.761L240.965,9.917 C237.571,3.798,231.112,0,224.107,0c-3.265,0-6.504,0.842-9.364,2.429l-85.464,47.526H33.815 c-17.719,0-32.134,14.415-32.134,32.134v220.653c0,17.719,14.415,32.134,32.134,32.134h251.18 c17.719,0,32.134-14.415,32.134-32.134v-64.802h16.067V155.999z M284.995,62.809c9.897,0,17.982,7.519,19.068,17.14h-24.152 l-9.525-17.14H284.995z M220.996,13.663c3.014-1.69,7.07-0.508,8.734,2.494l35.476,63.786H101.798L220.996,13.663z M304.275,302.742c0,10.63-8.651,19.281-19.281,19.281H33.815c-10.63,0-19.281-8.651-19.281-19.281V82.09 c0-10.63,8.651-19.281,19.281-19.281h72.353L75.345,79.95H37.832c-3.554,0-6.427,2.879-6.427,6.427s2.873,6.427,6.427,6.427h14.396 h234.83h17.217v63.201h-46.999c-21.826,0-39.589,17.764-39.589,39.589v2.764c0,21.826,17.764,39.589,39.589,39.589h46.999V302.742z M320.342,225.087h-3.213h-59.853c-14.743,0-26.736-11.992-26.736-26.736v-2.764c0-14.743,11.992-26.736,26.736-26.736h59.853 h3.213V225.087z M276.961,197.497c0,7.841-6.35,14.19-14.19,14.19c-7.841,0-14.19-6.35-14.19-14.19s6.35-14.19,14.19-14.19 C270.612,183.306,276.961,189.662,276.961,197.497z"/></g></svg>)
