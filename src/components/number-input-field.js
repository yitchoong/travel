import React from 'react'
import Form from 'react-bootstrap/Form'
import styled from 'styled-components'
import {formatNumber} from '../utils/general-utils'

const NumberInputField = ({field, form, label, feedback,...props }) => {
    const handleChange = (e) => {
        let val = (e.target.value+'' || '').replace(/,/g,'')
        if (!isNaN(val) ) {            
            if (val.endsWith(".")) {
                val = val ? formatNumber(val.substring(0,val.length-1), props.dp || 0) : ''
                val = val + '.'
            } else {
                val = val ? formatNumber(val, props.dp || 0) : ''
            }
            form.setFieldValue(field.name, val)
            form.setFieldTouched(field.name, true)    
        }
    }
    const invalid = form.touched[field.name] && !!form.errors[field.name]
    return (
        <>        
        <Style>
            <Form.Group className="">
                <Form.Label>{label}</Form.Label>
                <Form.Control
                type="text"
                name={field.name}
                onChange={handleChange}
                onBlur={form.onBlur}
                value={field.value}
                isInvalid={invalid}
                feedback={feedback ? feedback : form.errors[field.name]}
                id={`NumberInputField_${field.name}`}    
                {...props}            
            />                
            {invalid ? <ErrMsg>{form.errors[field.name]}</ErrMsg> : '' }
            </Form.Group>
        </Style>
        </>
    )
}
export default NumberInputField

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
