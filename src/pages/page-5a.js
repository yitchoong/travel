import React,{useState} from "react"
import {navigate} from 'gatsby'
import styled from 'styled-components'

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import SEO from "../components/seo"
import StageDisplay from '../components/stage-display'
import PremiumPlan from '../components/premium-plans'
import TravellerButtons from '../components/traveller-buttons'

import {useAppState} from '../providers'
import useWindowSize from '../hooks/useWindowSize'
import {range} from '../utils/general-utils'

const SelectSavedPeople = () => {

  const window = useWindowSize()
  const small = window.width < 576;
    
  const {quote, proposal, uiState} = useAppState()
  const [travellerNo, setTraveller] = useState(uiState.uiState.travellerNo)
  const [selectedSaved, setSelectedSaved] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const adultCount = quote.quote.adultCount || 1 // for testing else have to follow thru all pages
  const childrenCount = quote.quote.childrenCount || 0
  const adults = range(adultCount).map( cnt => 'Traveller ' + (cnt+1))
  const children = range(childrenCount).map(cnt => 'Child ' + (cnt+1)) 
  const data = adults.concat(children) // gives us ["Traveller 1", "Traveller 2", "Child 1"]
  const customerData = uiState.uiState.customerData
  const savedPeople = customerData && customerData.relations ? customerData.relations : []

  const handleSelect = (travellerName) => {
    setErrorMsg(null)
    setSelectedSaved(travellerName)
  }
  const handleSkip = () => {
    navigate("/page-5")
  }
  const handleNextPage = () => {
    // console.log(">>>>>>>>>handleNextPage, selectedSaved", selectedSaved)
    if (!selectedSaved) {
        setErrorMsg("Please select a saved contact to confirm!")
        return
    }
    uiState.setPrevSaved( Object.assign({}, uiState.uiState.prevSavedMap, {[travellerNo]:selectedSaved}))
    // console.log("***handleNextPage, prevSaved, selectedSaved", uiState.uiState.prevSavedMap, selectedSaved)
    const person = savedPeople.find( p => p.fullName === selectedSaved)    
    const updated = Object.assign({}, proposal.proposal)
    updated.travellers[travellerNo] = Object.assign({}, updated.travellers[travellerNo], person)
    proposal.updateProposal(updated)
    navigate("/page-5")

  }

//   console.log("***Page5A, prevSaved, selectedSaved", uiState.uiState.prevSavedMap, selectedSaved)
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
                            <h5 className="px-2 mb-3">{`Select Traveller ${travellerNo+1} from saved list?`}</h5>
                            <TravellerButtons data={data} small={small}
                                traveller={travellerNo} setTraveller={setTraveller} />
                        </Col>
                    </Row>
                    {errorMsg ? (
                        <Row>
                            <Col xs={{span:11}} className="ml-4">
                                <Alert variant='warning'>
                                    {errorMsg}
                                </Alert>
                            </Col>
                        </Row>
                        ) : null                    
                    }
                    {savedPeople.map( (person, idx) => {
                            return (
                                <Row key={person.fullName || 'person-'+idx} className="pl-3">
                                    <Col xs={{span:12}} sm={{span:10}} className="pl-0">
                                        <span>
                                            <CheckBox  selectedValue={selectedSaved} onSelect={handleSelect} name={person.fullName}  />
                                        </span>
                                    </Col>
                                </Row>
                            )
                        })
                    }
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
            <Button variant="outline-secondary" className="mt-2 pl-4 pr-4" type="button" onClick={handleSkip}>Skip</Button>
        </Col>
        <Col xs={{span:6}} sm={{span:4}} >
            <Button variant="info" className="mt-2 float-right pl-4 pr-4" type="button" onClick={handleNextPage} >Confirm</Button>
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
    padding-bottom: 1em;
    .text-success {
      font-size: 120%;
    }
    .text-secondary {
      font-size: 70%;
    }    
  }
 
`
export default SelectSavedPeople

const CheckBox = ({onSelect, selectedValue,name, ...props}) => {

    const handleSelect = (e) => {
        onSelect(name)
    }

    return (
        <CheckBoxStyle>        
            <Form.Group className="mt-3" style={{display:'inline-block'}}>
                <Form.Check
                custom
                checked={selectedValue === name}                                
                name={`${name}`}
                label={`${name}`}                
                type={"checkbox"}
                onChange={handleSelect}
                id={`CheckBoxSelect:${name}`}    
                {...props}            
                />
            </Form.Group>
        </CheckBoxStyle>
    )
}

const CheckBoxStyle = styled.div`
      width: 100%;
      padding-left: 1em;
      padding-right: 1em;
    .custom-checkbox .custom-control-input:checked~.custom-control-label::before{
        background-color:rebeccapurple;
    }
    .form-check .form-check-input:checked~.form-check-label::before{
        background-color:rebeccapurple;
    }
    .form-group {
        background-color: #dedede;
        width: 100%;
        padding: 0.8rem;
        border-radius: 8px;
        margin: 0.2em !important;
    }

`
