import React from 'react'
import Form from 'react-bootstrap/Form'
import styled from 'styled-components'

const TextInputField = ({field, form, label, feedback,onChange,...props }) => {
    const handleChange = (e) => {
        form.setFieldValue(field.name, e.target.value)
        form.setFieldTouched(field.name, true)
        if (onChange) {
            onChange(e.target.value)
        }
    }
    const invalid = form.touched[field.name] && !!form.errors[field.name]
    return (
        <>        
        <Style>
            <Form.Group className="">
                {label ?
                <Form.Label>{label}</Form.Label> : null}
                <Form.Control
                type="text"
                name={field.name}
                onChange={handleChange}
                onBlur={form.onBlur}
                value={field.value}
                isInvalid={invalid}
                feedback={feedback ? feedback : form.errors[field.name]}
                id={`TextInputField_${field.name}`}    
                {...props}            
            />                
            {invalid ? <ErrMsg>{form.errors[field.name]}</ErrMsg> : '' }
            </Form.Group>
        </Style>
        </>
    )
}
export default TextInputField

const ErrMsg = styled.div`
    font-size: 80%;
    color: red;
`
const Style = styled.div`
    input.form-control {
        border-color: ${props => props.invalid ? "red" : undefined}            
    }
    input.form-control:focus  {

        border-color: #dedede;
        outline-width: 0px;
        outline: 0 none !important;
        box-shadow: none !important;
    }

    label {
        margin-bottom: 0px;
    }
    input {
        max-height: 38px;
    }

`
