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
import CheckBoxField from '../components/checkbox-field'
import {sleep} from '../utils/general-utils'

const ProposalPage6 = () => {

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

    let initialValues = Object.assign({}, {travellers:[{addons:[]}]}, proposal.proposal )
    const preExCount = initialValues.travellers.filter(t => t.hasPreExCondition).length
    const [preEx, setPreEx] = useState(preExCount > 0 ? true : false)

    const handleBack = () => {
        navigate("/page-5")
    }
    const submitForm = () => {
        if (boundFormik){
            boundFormik.submitForm()
        }
    }
    const handleNextPage = () => {
      if (boundFormik){
        // save traveller's pre-ex detail
        const updatedProposal = Object.assign({}, proposal.proposal, boundFormik.values)
        proposal.updateProposal(updatedProposal)
      }
      navigate('/page-7')
  }
  let nextButtonText = !preEx ? 'Skip' : 'Next'

//   if (boundFormik){
//     console.log("<<<<Page-6, values>>>>",  preEx, JSON.stringify(boundFormik.values))
//   }
  

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
                            <h5 className="px-2">Do you have a pre-existing medical condition?</h5>
                            <div className="muted-text ml-2">
                                Get covered for conditions such as asthma, diabetes, heart conditions, and more.
                            </div>
                            <div className="border-bottom px-2">
                                <span className={"mx-3 " + (proposal.proposal.planType === 'entry' ? 'selected-span' : '')}>
                                    Entry
                                </span>
                                <span className={"mx-3 " +  (proposal.proposal.planType === 'savvy' ? 'selected-span' : '')}>
                                    Savvy
                                </span>
                                <span className={"mx-3 " + (proposal.proposal.planType === 'luxury' ? 'selected-span' : '')}>
                                    Luxury
                                </span>
                            </div>

                            <Formik initialValues={initialValues} enableReinitialize={true}
                                onSubmit={(values, formik) => {
                                    sleep(200).then(() => {
                                        handleNextPage()
                                    })
                                }}
                                validate={ values => {
                                    // console.log("##### VALIDATE PAGE 6 -- Inside validate, values = ", JSON.stringify(values))
                                    const preExCount = values.travellers.filter(t => t.hasPreExCondition).length
                                    setPreEx( preExCount > 0 ? true : false)
                                    const errors = {}
                                    return errors
                                }}      
                                >

                                {formik => { 
                                   boundFormik = formik
                                   return (
                                   <div>                                    
                                    <Form noValidate onSubmit={formik.handleSubmit}>
                                       <Container fluid>
                                            <div className="pre-exs">
                                                {formik.values.travellers.map((traveller,idx) => { 
                                                return (
                                                    <div key={idx}>
                                                        <Row>
                                                            <Col xs={{span:7}} sm={{span:5}}>
                                                                <Field component={CheckBoxField} name={`travellers[${idx}].hasPreExCondition`}
                                                                custom label={traveller.fullName} />
                                                            </Col>
                                                            <Col xs={{span:5}} className="mt-3">
                                                                <span className="ml-5">{traveller.preExAmount}</span>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                )} )}
                                            </div>
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
                        <PremiumPlan   defaultActiveKey={0} />
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
    align-self: center;
    background-color: #fff;
    box-shadow: 0 0 2px 2px rgba(200,207,219,0.5);
    /* min-height: calc(100vh - 90px - 40px - 40px - 50px); */

    .text-success {
      font-size: 120%;
    }
    .text-secondary {
      font-size: 70%;
    }    
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
  
`
export default ProposalPage6
