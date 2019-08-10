import React from 'react'
// import Button from 'react-bootstrap/Button'
// import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'
import styled from 'styled-components'

const CheckBoxField = ({field, form, label, feedback,...props }) => {
    const handleChange = (e) => {
        // console.log("====> handleChange check box target value", e.target.value, e.target.checked)
        // const val = field.value && e.target.value === 'on' ? false : true
        form.setFieldValue(field.name, e.target.checked)
    }
    // const handleClick = (event) => {
    //     console.log("handleClick", event)
    // }
    // console.log("checkbox, name & value", field.name, field.value)
    return (
        <>        
            <Form.Group className="mt-3" style={{display:'inline-block'}}>
            <Styles>
                <Form.Check
                // custom={field.value ? true :false}                
                checked={field.value ? true :false}                
                name={`${field.name}`}
                label={label}                
                type={props.radio ? "radio" :"checkbox"}
                onChange={handleChange}
                // onClick={handleClick}
                isInvalid={!!form.errors[field.name]}
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
    /* .custom-control-label:before{
        background-color:red;
    } */
    .custom-checkbox .custom-control-input:checked~.custom-control-label::before{
        background-color:rebeccapurple;
    }
    .form-check .form-check-input:checked~.form-check-label::before{
        background-color:rebeccapurple;
    }


`

  