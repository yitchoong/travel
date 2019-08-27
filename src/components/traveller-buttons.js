import React from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import styled from 'styled-components'

const TravellerButtons = (props) => {
    const handleClick = (index) => {
        props.setTraveller(index)
    }
    return (
        <Styles>
        <Container fluid>
            <Row className="ml-0">
                <ButtonToolbar className={props.small ? "mb-2 w-100" :"mb-2 w-75"}>
                    {props.data.map( (p,idx) => {
                        return (
                            <Col xs={{span:4}} sm={{span:4}} key={`traveller:${p}`}  className="px-0" >
                                    <ButtonGroup  className="mb-2">
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
        </Styles>
    )

}
export default TravellerButtons

const Styles = styled.div`
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
.btn-group button {
    font-size: 90%;
}
`