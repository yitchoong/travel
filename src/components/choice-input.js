import React from 'react'
import Helmet from 'react-helmet'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
// import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

// choices should be [{text:'Click here', value:'True'}, {...},...]
const ChoiceField = ({field, form, choices, label, size, ...props }) => {
    return (
        <>
            <label style={{marginBottom:'0px', display:'block'}}>{label}</label>
            <ButtonGroup style={{margin:'1em', marginLeft: '0', marginTop:'0'}} >
                {choices.map(choice => {
                    return (<Button className={choice.value === field.value ? 'selected' : undefined} key={choice.value} 
                    style={{borderStyle: choice.value === field.value ? 'solid' : 'inset'}}
                    variant={choice.value === field.value ? "purple" : "outline-secondary"} 
                    size={size}
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