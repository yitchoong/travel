import React from 'react'
import Form from 'react-bootstrap/Form'
import styled from 'styled-components'
import Select from 'react-select';


const SelectField = ({field, form, label, onChange,options, defaultValue, style, ...props }) => {
    const handleChange = (selected) => {

        form.setFieldValue(field.name, selected)
        form.setFieldTouched(field.name, true)
        if (onChange) {
            onChange(selected)
        }
    }
    const invalid = form.touched[field.name] && !!form.errors[field.name]
    const labelLength = label ? label.length : 0
    const optionLength = options.map( o => o.label.length )
    const optlen = Math.max.apply(null, optionLength )
    return (
        <>        
        <Style labellen={labelLength} optlen={optlen} >
            <Form.Group style={style}>
                {label ?
                <Form.Label>{label}</Form.Label> : null}
                <Select
                    defaultValue={field.value}
                    options={options}
                    onChange={handleChange}
                    {...props}
                />

            {invalid ? <ErrMsg>{form.errors[field.name]}</ErrMsg> : '' }
            </Form.Group>
        </Style>
        </>
    )
}
export default SelectField

const ErrMsg = styled.div`
    font-size: 80%;
    color: red;
`
const Style = styled.div`
    min-width: ${props => props.optlen ? (props.optlen > 10 ? props.optlen : 10) + 'em;' : '10em;'}
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
    .form-group {
        min-width: ${props => props.labellen ?  '1em;' : '10em'}
    }

    div[class$="control"] {
        border-color: ${props => props.invalid ? "red" : "#dedede"}; 
        box-shadow: none !important;
    }
    div[class$="control"]:hover {
        border-color: #dedede;
        outline-width: 0px;
        outline: 0 none !important;
        box-shadow: none !important;
    }
    div[class$="control"]:active {
        border-color: #dedede;
        outline-width: 0px;
        outline: 0 none !important;
        box-shadow: none !important;
    }
    div[class$="control"] > div {
        padding: 1px 2px;
    }


`
