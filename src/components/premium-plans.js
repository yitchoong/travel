import React,{useState} from "react"

import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import {FaAngleUp, FaAngleDown} from 'react-icons/fa'

import styled from 'styled-components'

const PremiumPlan = ({defaultActiveKey,...props}) => {
    const key = defaultActiveKey !== undefined ? defaultActiveKey + '-open' : undefined 

    const [paneState, setPaneState] = useState(key)

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
    <Styles>
        <Accordion defaultActiveKey={defaultActiveKey+''} className="mt-0">
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
                        {"Cost Breakup"}
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
    </Styles>
    )

} // end PremiumPlan
export default PremiumPlan

const Styles = styled.div`

`