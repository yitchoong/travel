import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'

export default function StageDisplay({stage}) {

    return (
    <Styles stage={stage}>
        <Container fluid>
            <Row className="stage-display justify-content-center">
                <Col xs={{span:3}}>
                    <span className={stage === 1 ? "text-success": "text-secondary"}>1. Choose Plan</span>
                </Col>
                <Col xs={{span:3}}>
                    <span className={stage === 2 ? "text-success": "text-secondary"}>2. Personal Details</span>
                </Col>
                <Col xs={{span:3}}>
                    <span className={stage === 3 ? "text-success": "text-secondary"}>3. Payment</span>
                </Col>
            </Row>
        </Container>
    </Styles>
    );
  }

const Styles = styled.div`
  .container-fluid {
      border: none;
      padding:0;
      margin:1rem;
      margin-top:0;
      margin-bottom:0;
      max-width: 100vw;
      min-height: 35px;
  }
  & > div {
    .row.stage-display {
        max-width: 100vw;
        background-color: #efefef;
        min-height: 30px;
        padding:0.3rem;
        .col {
            padding-left: 0.2rem;
            padding-right: 0.2rem;
        }
    }
  }
  span {
      font-size: 80%;
  }
  .text-success, text-secondary {
      text-align : center;      
  }
  /* .active {
      color : cornflowerblue;
  }
  .normal {
      color: grey;
  } */
`
