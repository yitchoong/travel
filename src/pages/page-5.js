import React,{useState} from "react"
import SEO from "../components/seo"
import {navigate} from 'gatsby'
import {useAppState} from '../providers'
import useWindowSize from '../hooks/useWindowSize'

import {Formik, Field, FieldArray} from 'formik'

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import StageDisplay from '../components/stage-display'
import styled from 'styled-components'
import TextInputField from "../components/text-input-field";
import DateField from '../components/date-input-field'
import ChoiceField from '../components/choice-input'
import {FaAngleUp, FaAngleDown} from 'react-icons/fa'




// these values should come from the appState.proposal 

let initialValues = {
    proposalDate: '',
    productCode: 'TiqTravel',
    travellers: [
        {
            nric: 'S7282777J',
            fullName: '',
            dob: new Date('1986-02-11'),
            gender: '',
            phoneNumber: '',
            email: '',
            postalCode: '',
            street: '',
            unitNumber: '',
            blockNumber: ''
        },
        {
            nric: 'S7282782A',
            fullName: '',
            dob: '22/2/1988',
            gender: '',
            phoneNumber: '',
            email: '',
            postalCode: '',
            street: '',
            unitNumber: '',
            blockNumber: ''
        },
        {
            nric: 'S7282980B',
            fullName: '',
            dob: '02/09/2001',
            gender: '',
            phoneNumber: '',
            email: '',
            postalCode: '',
            street: '',
            unitNumber: '',
            blockNumber: ''
        },

    ]

}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const range = n => Array(n + 1).join(1).split('').map((x, i) => i) // range(3) => gives us [0,1,2]

const ProposalPage1 = () => {


  let boundForm = undefined
  const window = useWindowSize()
  const small = window.width < 576;
  const [travellerNo, setTravellerNo] = useState(0)

  const {quote, proposal, uiState} = useAppState()

  const adultCount = quote.quote.adultCount || 2 // for testing else have to follow thru all pages
  const childrenCount = quote.quote.childrenCount || 1
  const adults = range(adultCount).map( cnt => 'Traveller ' + (cnt+1))
  const children = range(childrenCount).map(cnt => 'Child ' + (cnt+1)) 
  const data = adults.concat(children) // gives us ["Traveller 1", "Traveller 2", "Child 1"]

  const handleBack = () => {
    if (boundForm) {
    }
    navigate("/page-4")
  }
  const handleNextPage = () => {
  }


  return (
  <Styles>
    <SEO title="Tiq Travel Application" />
    
    <StageDisplay stage={2} />

    <Container fluid>
        <Row>
            { small ? (
                    <Col xs={{span:12}}>
                        <PlanPremium />
                    </Col>
                ) : null
            }
            
            <Col xs={{span:12}} sm={{span:8}} className="mt-1 pr-0 mr-0">
                <div className="border box">
                    <Row>
                        <Col xs={{span:12}} className="m-2">
                            <h5>Tell us more about yourself</h5>

                            <TravellerButtons data={data} traveller={travellerNo} setTraveller={setTravellerNo} />

                            <Formik initialValues={initialValues} enableReinitialize={true}
                                onSubmit={(values, formik) => {
                                sleep(200).then((() => {
                                    let updatedState = Object.assign({}, values)
                                    navigate("/page-6/")  
                                }))
                                }}
                                validate={ values => {
                                    console.log("##### VALIDATE PAGE 5 -- Inside validate, values = ", JSON.stringify(values))
                                    const errors = {}
                                    return errors
                                }}      
                                >

                                {formik => { 
                                    boundForm = formik
                                    return (
                                    <Container fluid>
                                    <Form noValidate onSubmit={formik.handleSubmit}>
                                        <Row>
                                            <Col xs={{span:6}}>
                                                <Field name={`travellers[${travellerNo}].nric`}
                                                    label="NRIC/Fin" component={TextInputField} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{span:6}}>
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
                                            <Col xs={{span:6}}>
                                                <Field name={`travellers[${travellerNo}].phoneNumber`}
                                                    label="Phone number" component={TextInputField} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{span:6}}>
                                                <Field name={`travellers[${travellerNo}].email`}
                                                    label="Email ID" component={TextInputField} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{span:6}}>
                                                <Field name={`travellers[${travellerNo}].postalCode`}
                                                    label="Postal code" component={TextInputField} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{span:6}}>
                                                <Field name={`travellers[${travellerNo}].street`}
                                                    label="Street" component={TextInputField} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{span:6}}>
                                                <Field name={`travellers[${travellerNo}].unitNumber`}
                                                    label="Unit Number" component={TextInputField} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={{span:6}}>
                                                <Field name={`travellers[${travellerNo}].blockNumber`}
                                                    label="Block Number" component={TextInputField} />
                                            </Col>
                                        </Row>


                                    </Form>
                                    </Container>
                                    )
                                }}




                            </Formik>
                        </Col>
                    </Row>
                </div>
            </Col>
            { !small ? (
                    <Col className="wrapper-plan-premium" sm={{span:4}}>
                        <PlanPremium />
                    </Col>
                ) : null
            }


        </Row>        
    </Container>
    <Row className="ml-1 mr-1" >
                            <Col xs={{span:4}} sm={{span:4}} >
                                <Button variant="outline-secondary" className="mt-2 pl-4 pr-4" type="button" onClick={handleBack}>Back</Button>
                            </Col>
                            <Col xs={{span:4}} sm={{span:4}} >
                                <Button variant="outline-info" className="mt-2 float-right pl-4 pr-4" type="button" onClick={handleNextPage} >Skip</Button>
                            </Col>
    </Row>
  </Styles>
) } // end ProposalPage1


const PlanPremium = (formik) => {
    const [paneState, setPaneState] = useState('0-open')

    const handleClick = (key) => {
        if (paneState === key+'-open') {
            setPaneState(key+'-close')
        } else if (paneState === key+'-close')  {
            setPaneState(key+'-open')
        } else {
            setPaneState(key +'-open')
        }

    }

    return (
        <Accordion defaultActiveKey='0' className="mt-0">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" onClick={() => handleClick(0)} >
                    <span>
                        { "Travel Entry Plan" }
                    </span>
                    <span className="float-right">
                        { paneState === '0-open' ? <FaAngleUp onClick={() => handleClick(0)} /> : <FaAngleDown onClick={() => handleClick(0)} /> }
                    </span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <span> Some info on the info travel plan</span>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1" onClick={() => handleClick(1)}>
                    <span>
                        {"Final Premium"}
                    </span>
                    <span className="float-right">
                        { paneState === '1-open' ? <FaAngleUp onClick={() => handleClick(0)} /> : <FaAngleDown onClick={() => handleClick(0)} /> }
                    </span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <span>Some info on the premium</span>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>

    )

} // end PremiumPlan

const TravellerButtons = (props) => {
    const handleClick = (index) => {
        props.setTraveller(index)
    }
    return (
        <Container fluid>
            <Row>
                <ButtonToolbar className="mb-2 w-100">
                    {props.data.map( (p,idx) => {
                        return (
                            <Col xs={{span:4}} key={`traveller:${p}`}>
                                <ButtonGroup className="mr-2">
                                    <Button 
                                    onClick={() => handleClick(idx)}
                                    variant={idx === props.traveller ? "purple" : "outline-secondary"}> 
                                        {p}
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        )                
                    })}
                </ButtonToolbar>
            </Row>
        </Container>
    )

}


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
 .wrapper-plan-premium {
     padding-left: 0.4em;
     padding-right: 0px;
 }
 .btn-toolbar button.btn.btn-purple:after {
    content:"";
    border-style: solid;
    position: absolute;
    left: 50%;
    bottom: -10px;
    height: 0px;
    width: 0px;
    margin-left:-10px;
    border-width: 10px 12.5px 0 12.5px;
    border-color: rebeccapurple transparent transparent transparent;
}
`
export default ProposalPage1
