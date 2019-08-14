import React from 'react'
import Form from 'react-bootstrap/Form'
import styled from 'styled-components'

const RadioField = ({field, form, label, feedback,...props }) => {
    const handleChange = (e) => {
        form.setFieldValue(field.name, e.target.value)
    }
    const handleClick = (event) => {
        form.setFieldValue(field.name, props.value)
    }
    return (
        <>        
            <Form.Group className="mt-3" style={{display:'inline-block'}}>
            <Styles>
                <Form.Check
                // custom={field.value ? true :false}                
                checked={field.value === props.value ? true :false}                
                name={`${field.name}`}
                label={label}                
                type={"radio"}
                onChange={handleChange}
                onClick={handleClick}
                isInvalid={!!form.errors[field.name]}
                feedback={feedback ? feedback : form.errors[field.name]}
                id={`RadioField${field.name + props.value}`}    
                {...props}            
                />
            </Styles>
            </Form.Group>
        </>
    )
}
export default RadioField
const Styles = styled.div`

.custom-radio .custom-control-input:checked~.custom-control-label::before{
    background-color:rebeccapurple;
}
`
