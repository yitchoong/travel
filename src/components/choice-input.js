import React from 'react'
import Helmet from 'react-helmet'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
// import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

// choices should be [{text:'Click here', value:'True'}, {...},...]
const ChoiceField = ({field, form, choices, label, ...props }) => {
    return (
        <>
            <label style={{marginBottom:'0px'}}>{label}</label>
            <ButtonGroup style={{margin:'1em', marginLeft: '0', marginTop:'0'}} >
                {choices.map(choice => {
                    return (<Button className="" key={choice.value} 
                    variant={choice.value === field.value ? "purple" : "outline-secondary"} 
                    onClick={() => form.setFieldValue(field.name,choice.value)}>{choice.text} </Button>)
                })}
            </ButtonGroup>
            <Helmet>
                <style>{`    
                `}</style>
            </Helmet>                  
        </>
    )
}
export default ChoiceField