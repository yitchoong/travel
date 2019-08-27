import React from 'react'
import Form from 'react-bootstrap/Form'
import styled from 'styled-components'

const CheckBoxField = ({field, form, label, feedback, bgColor, ...props }) => {
    const handleChange = (e) => {
        form.setFieldValue(field.name, e.target.checked)
        form.setFieldTouched(field.name, true)
    }
    const invalid = form.touched[field.name] && !!form.errors[field.name]
    return (
        <>        
            <Form.Group className="mt-3" style={{display:'inline-block'}}>
            <Styles bgColor={bgColor}>
                <Form.Check
                checked={field.value ? true :false}                                
                name={`${field.name}`}
                label={label}                
                type={"checkbox"}
                onChange={handleChange}
                isInvalid={invalid}
                feedback={feedback ? feedback : form.errors[field.name]}
                id={`CheckBoxField${field.name}`}    
                {...props}            
                />
            </Styles>
            </Form.Group>
        </>
    )
}
export default CheckBoxField
const Styles = styled.div`
    .custom-checkbox .custom-control-input:checked~.custom-control-label::before{
        background-color: ${props => props.bgColor ? props.bgColor : 'rebeccapurple'};
    }
    .form-check .form-check-input:checked~.form-check-label::before{
        background-color:${props => props.bgColor ? props.bgColor : 'rebeccapurple'};
    }


`

  