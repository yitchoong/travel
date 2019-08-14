import React, {useEffect} from 'react'
import Helmet from 'react-helmet'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
// import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import styled from 'styled-components'

// choices should be [{text:'Click here', value:'True'}, {...},...]
const ChoiceField = ({field, form, choices, label, size, buttonStyle, ...props }) => {
    useEffect(() => {
        if (!field.value) {
            form.setFieldValue(field.name, choices[0].value) // default 1st value if not set
        }
    },[field.name])
    return (
        <>
        <Styles>
            <label style={{marginBottom:'0px', display:'block'}}>{label}</label>
            <ButtonGroup style={{margin:'1em', marginLeft: '0', marginTop:'0'}} >
                {choices.map(choice => {

                    return (<Button className={choice.value === field.value ? 'selected' : undefined} key={choice.value} 
                    variant={choice.value === field.value ? "purple" : "outline-secondary"} 
                    style={{...buttonStyle}}
                    size={size} 
                    onClick={() => form.setFieldValue(field.name,choice.value)}>{choice.text} </Button>)
                })}
            </ButtonGroup>
            <Helmet>
                <style>{`    
                `}</style>
            </Helmet>                  
        </Styles>
        </>
    )
}
export default ChoiceField

const Styles = styled.div`
    button.btn {
        border-style: inset;
        &.selected {
            border-style: solid;
        }

    }

`