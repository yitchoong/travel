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
import TravellerButtons from '../components/traveller-buttons'
import styled from 'styled-components'
import TextInputField from "../components/text-input-field";
import DateField from '../components/date-input-field'
import ChoiceField from '../components/choice-input'
import CheckBoxField from '../components/checkbox-field'
import useForceUpdate from '../hooks/useForceUpdate'
import {sleep, range} from '../utils/general-utils'


const ProposalPage5 = () => {

  let boundFormik = undefined
  const window = useWindowSize()
  const small = window.width < 576;

  const {quote, proposal, uiState} = useAppState()
  const forceUpdate = useForceUpdate()

  const [travellerNo, setTraveller] = useState(uiState.uiState.travellerNo)

  const adultCount = quote.quote.adultCount || 1 // for testing else have to follow thru all pages
  const childrenCount = quote.quote.childrenCount || 0
  const adults = range(adultCount).map( cnt => 'Traveller ' + (cnt+1))
  const children = range(childrenCount).map(cnt => 'Child ' + (cnt+1)) 
  const data = adults.concat(children) // gives us ["Traveller 1", "Traveller 2", "Child 1"]

  const customerData = uiState.uiState.customerData
  const relations = customerData && customerData.relations ? customerData.relations : []


  let initialValues = Object.assign({}, proposal.proposal )

  useEffect(() => {
    const customerData = Object.assign({}, uiState.uiState.customerData.customer)
    const policyHolder = Object.assign({}, proposal.proposal.travellers[0])
    if (Object.keys(customerData).length > 0  && policyHolder.nric === "") {
        const phData = Object.assign({}, policyHolder, customerData)
        initialValues.travellers.splice(0,1,phData)
    }
    // console.log(">>>>>>> initialValues", JSON.stringify(initialValues), "traveller", travellerNo)
    forceUpdate()

  },[])

  const travellersCount = proposal.proposal.travellers ? proposal.proposal.travellers.length : 1
  const hasNextTraveller = (travellerNo+1)  <   travellersCount
  const nextTraveller = hasNextTraveller  ? `Traveller ${travellerNo+2}` : 'Continue'

  let submitting = false
  const onSelectRelations = () => {
      navigate("/page-5a")
  }
  const handleBack = () => {
    if (boundFormik) {
    }
    navigate("/page-4")
  }
  const submitForm = () => {
    if (boundFormik){
        submitting = true
        boundFormik.submitForm()
    }
  }

  const handleNextPage = (formik, values) => {
    const updatedProposal = Object.assign({}, proposal.proposal, values)
    proposal.updateProposal(updatedProposal)
    const hasNext = (travellerNo+1)  < proposal.proposal.travellers.length
    if (hasNext) {
          uiState.setTraveller(travellerNo+1)
          setTraveller(travellerNo+1)
          navigate('/page-5a')    
    } else {

        navigate('/page-6')
    }

  }

//   console.log("<<<<PAGE 5 initalValues>>>>", travellerNo, JSON.stringify(initialValues))
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
                            <h5 className="px-2">Tell us more about yourself</h5>

                            <TravellerButtons data={data} small={small}
                                traveller={travellerNo} setTraveller={setTraveller} />

                            <Formik initialValues={initialValues} enableReinitialize={true}
                                onSubmit={(values, formik) => {
                                sleep(200).then((() => {
                                    handleNextPage(formik, values)
                                }))
                                }}
                                validate={ values => {
                                    // console.log("##### VALIDATE PAGE 5 -- Inside validate, values = ", JSON.stringify(values))
                                    const errors = {}
                                    const hasNext = (travellerNo+1)  < proposal.proposal.travellers.length
                                    if (!hasNext) {
                                        if (!values.pdpaAgree) {
                                            errors.pdpaAgree = "Please acknowledge your agreement to the PDPA clause"
                                        }

                                        if (submitting || ('pdpaSms' in boundFormik.touched || 'pdpaPhone' in boundFormik.touched)) {
                                            if (!values.pdpaSms && !values.pdpaPhone) {
                                                errors.pdpaSms = "Please select at least one mode of contact"
                                                errors.pdpaPhone = ' '
                                            }    
                                        }
                                    }
                                    // console.log("VALIDATE PAGE 5, hasNext, values.pdpaAgree", submitting, boundFormik, errors)
                                    submitting = false
                                    return errors
                                }}      
                                >
                                {formik => { 
                                   boundFormik = formik
                                   return (
                                   <div>                                    
                                    <Button variant="link" size="sm" className="ml-1" onClick={onSelectRelations}>
                                            {travellerNo > 0 && relations.length > 0 ? "Select from pre-saved list": " "}</Button>
                                    <Form noValidate onSubmit={formik.handleSubmit}>
                                    <Container fluid>
                                        <Row>
                                            <Col sm={{span:6}} xs={{span:10}}>
                                                <Field name={`travellers[${travellerNo}].nric`}
                                                    label="NRIC/Fin" component={TextInputField} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={{span:6}} xs={{span:10}}>
                                                <Field name={`travellers[${travellerNo}].fullName`}
                                                    label="Full Name (as displayed in ID)" component={TextInputField} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{span:6}}>
                                                <Field name={`travellers[${travellerNo}].dob`}
                                                    label="Date of Birth" component={DateField} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{span:6}} style={{marginTop:'1em'}}>
                                                <Field name={`travellers[${travellerNo}].gender`}
                                                    buttonStyle={{width:'6em'}}
                                                    choices={[{text:"Male", value:"M"},{text:"Female", value:"F"}]}
                                                    label="Gender" component={ChoiceField} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={{span:6}} xs={{span:10}}>
                                                <Field name={`travellers[${travellerNo}].phoneNumber`}
                                                    label="Phone number" component={TextInputField} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={{span:6}} xs={{span:10}}>
                                                <Field name={`travellers[${travellerNo}].email`}
                                                    label="Email ID" component={TextInputField} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={{span:6}} xs={{span:10}}>
                                                <Field name={`travellers[${travellerNo}].postalCode`}
                                                    label="Postal code" component={TextInputField} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{span:10}} sm={{span:6}}>
                                                <Field name={`travellers[${travellerNo}].street`}
                                                    label="Street" component={TextInputField} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={{span:6}} xs={{span:10}}>
                                                <Field name={`travellers[${travellerNo}].unitNumber`}
                                                    label="Unit Number" component={TextInputField} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col sm={{span:6}} xs={{span:10}}>
                                                <Field name={`travellers[${travellerNo}].blockNumber`}
                                                    label="Block Number" component={TextInputField} />
                                            </Col>
                                        </Row>

                                    <h5 className="px-2">Would you like to add on coverage?</h5>

                                    <div className="addons">
                                        {formik.values.travellers && formik.values.travellers[travellerNo].addons.map((addon,idx) => { 
                                        return (
                                            <div key={idx}>
                                                <Row>
                                                    <Col xs={{span:7}} sm={{span:5}}>
                                                        <Field component={CheckBoxField} name={`travellers[${travellerNo}].addons[${idx}].selected`}
                                                        custom label={addon.label} />
                                                    </Col>
                                                    <Col xs={{span:5}} className="mt-3">
                                                        <span className="ml-5">{addon.amount}</span>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )} )}
                                    </div>
                                    { !hasNextTraveller ?
                                        <div className="pdpa">
                                            <div className="checkbox-with-link">
                                                    <Field name={`pdpaAgree`} custom component={CheckBoxField} arial-label="transit" label={(
                                                        <div >
                                                        I have read, understood, and agreed with the
                                                        <a href="#example"> {" "}
                                                            <span style={{fontSize:'90%'}}>Declaration, Terms and Conditions</span>
                                                        </a>
                                                        </div>)} />
                                            </div>
                                            <div className="mt-2 mb-2">
                                                I understand that my personal data may be used for
                                                marketing purpose by Etiqa and by checking the below 
                                                boxes, I consent to receive marketing and promotional 
                                                materials.
                                            </div>
                                            <div className="phone-sms">
                                                <div>
                                                    <Field className="mr-3"  name={`pdpaPhone`} custom component={CheckBoxField} arial-label="Phone" label="Phone Call" />
                                                </div>
                                                <div>
                                                    <Field  name={`pdpaSms`} custom component={CheckBoxField} arial-label="Sms" label="Text Messages/SMS" />
                                                </div>
                                            </div>


                                        </div> : null
                                    }

                                    </Container>
                                    </Form>
                                    </div>
                                    )
                                }}
                            </Formik>
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
            <Button variant="info" className="mt-2 float-right pl-4 pr-4" type="button" onClick={submitForm} >{nextTraveller}</Button>
        </Col>
    </Row>
  </Styles>
)}

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
    .form-group {
        margin-bottom: 0px;
        margin-top: 0px !important;
    }
    .checkbox-with-link {
        display: flex;
        flex-direction: row;
    }
    .phone-sms {
        display: flex;
        flex-direction: row;
    }
  }
  
`
export default ProposalPage5
