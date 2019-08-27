import React, {useEffect, useState} from "react"
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
import styled from 'styled-components'
import SelectField from '../components/select-field'
import {sleep} from '../utils/general-utils'
import {FaCheckDouble, FaEnvelope, FaWhatsapp, FaRegMeh, FaRegDizzy, FaRegLaugh} from 'react-icons/fa'

const referrers = [
    {label:"Email", value:'Email'},
    {label:"Whatsapp", value:'Whatsapp'},
    {label:"Facebook", value:'Facebook'},
    {label:"TV", value:'Tv'},
    {label:"Others", value:'Others'},
]
const ProposalPage9 = () => {

    let boundFormik = undefined
    // const window = useWindowSize()
    // const small = window.width < 576;
    
    const { proposal} = useAppState()
    const [experience, setExperience] = useState(null)
    useEffect(() => {
        if (!proposal.proposal.travellers){
            if (typeof window !== `undefined`) {
                navigate("/page-4")
            }
        } // go back to page 4 if no travellers info    
    },[])

    // let initialValues = Object.assign({}, proposal.proposal )
    let initialValues = {referrer: ''}

    const handleBtnClick = (value) => {
        console.log("experience was ", value)
        setExperience(value)
    }
    const handleReferSubmit = (e) => {
        console.log("referrer value",  boundFormik.values.referrer.value)
        e.stopPropagation()
        e.preventDefault()

    }
    // const handleBack = () => {
    //     navigate("/page-8")
    // }
    // const submitForm = () => {
    //     console.log("submitform ")
    //     if (boundFormik){
    //     }
    // }
    const handleNextPage = (formik, values) => {
        if (boundFormik){
        }
    }

  console.log("<<<<Page-9, values>>>>",   JSON.stringify(boundFormik ? boundFormik.values : initialValues))

  return (
  <Styles>
    <SEO title="Tiq Travel Application" />
    
    <StageDisplay stage={3} />

    <Container fluid>
    <Formik initialValues={initialValues} enableReinitialize={true}
        onSubmit={(values, formik) => {
        sleep(100).then((() => {
            handleNextPage(formik, values)
        }))
        }}
        validate={ values => {
            const errors = {}
            return errors
        }}      
    >
        {formik => { 
            boundFormik = formik
            return (                
            <Form className="mb-2" noValidate onSubmit={formik.handleSubmit}>
                <Row className="justify-content-center">
                    <Col xs={{span:11}} sm={{span:11}} className="mt-1 pr-0 mr-0">
                        <div className="border box">
                            <div className="center-content">
                                <div className="text-success text-center"><h4>Your Payment is successful</h4></div>
                                
                                <div> <FaCheckDouble size="2em" /> </div>
                                
                                <div className="mt-2">
                                    Thank you for purchasing our travel insurance. An automated payment
                                    receipt and policy will be sent to your registered email.
                                </div>

                                <div className="mb-3">
                                    <div className="dotted-box">
                                        <div>
                                            Policy Number
                                        </div>
                                        <div className="text-success">
                                            {proposal.proposal.policyNumber}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box border mt-2">
                            <div className="center-content">
                                <div>
                                    <span className="highlight">
                                        Customer Care operating hours
                                    </span>
                                    <span>Monday to Friday, 8:30am to 5:30pm, excluding Saturday, Sundays, and Public
                                        Holidays.
                                    </span>
                                </div>

                                <div style={{display:'flex', flexDirection:'column', alignItems:'start'}}>
                                    <div style={{maxHeight:'1.2em'}}>
                                        <span ><FaEnvelope /></span>
                                        <span className="highlight ml-1">Email</span>
                                        <span><Button variant="link" className="pt-1 pl-1">customer.service@etiqa.com.sg</Button></span>
                                    </div>

                                    <div>
                                        <span><FaWhatsapp /></span>
                                        <span className="highlight">Whatsapp</span>
                                        <span><Button variant="link" className="pl-1">+65 68878777</Button></span>
                                    </div>
                                </div>

                            </div>                        
                        </div>
                        <div className="box border mt-2">
                            <div className="center-content">
                                <h4>Tell us how we are doing?</h4>
                                <div>We really want to improve our services and hope you'll take a moment to rate 
                                    your online buying experience 
                                </div>
                                <div style={{fontWeight:'500'}}>
                                    Please rate your overall online buying experience on our website 
                                </div> 
                                <div className="icons-box">
                                    <div>
                                        <FaRegLaugh size="2em"/>
                                        <div>
                                            <Button variant={experience === "NoPain" ? "info": "outline-secondary"} onClick={()=> handleBtnClick('NoPain')}>No Pain</Button>
                                        </div>
                                    </div>
                                    <div>
                                        <FaRegMeh size="2em" />
                                        <div>
                                            <Button variant={experience === "Moderate" ? "info": "outline-secondary"} onClick={()=> handleBtnClick('Moderate')}>Moderate</Button>
                                        </div>
                                    </div>
                                    <div>
                                        <FaRegDizzy  size="2em"  />
                                        <div>
                                            <Button variant={experience === "Bad" ? "info": "outline-secondary"} onClick={()=> handleBtnClick('Bad')}>Bad</Button>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="center-content">
                                <h4>How did you get to know us? </h4>
                                <Field component={SelectField}
                                
                                name="referrer" isClearable={true} options={referrers} />
                                <Button variant="info" onClick={handleReferSubmit}>Submit</Button>                                
                                
                            </div>


                        </div>

                        <div className="box border mt-2">
                        </div>

                    </Col>
                </Row>        
            </Form>
            )
        }}
    </Formik>
    </Container>
    {/* <Row className="ml-1 mr-1" >
        <Col xs={{span:6}} sm={{span:4}} >
            <Button variant="outline-secondary" className="mt-2 pl-4 pr-4" type="button" onClick={handleBack}>Back</Button>
        </Col>
        <Col xs={{span:6}} sm={{span:4}} >
            <Button variant="info" className="mt-2 float-right pl-4 pr-4" type="button" onClick={submitForm} >{"Next"}</Button>
        </Col>
    </Row> */}
  </Styles>
) } 

const Styles = styled.div`
  background-color: white;
  & > div.container-fluid {
      min-height: calc(100vh - 90px - 40px - 40px - 50px); /* 90 for header, 40 for stage, 40 for footer, 30 for button */
      overflow: auto;
  }
  .box {
    align-self: center;
    background-color: #fff;
    box-shadow: 0 0 2px 2px rgba(200,207,219,0.5);
    padding: 0.5em;

    .center-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .dotted-box {
        border: dashed 1px #28a745;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0.5em;
        margin-top:1em;
    }
    .icons-box {
        padding: 2em;
        display: flex;
        flex-direction: row;
        .btn {
            width: 6em;
        }
        & > div > div {
            padding: 0.1em;
            margin-left: 1em;
            margin-top: 1em;
        }
    }
  }  

  
`
export default ProposalPage9

