import React from 'react'
import Form from 'react-bootstrap/Form'
import styled from 'styled-components'


const RadioGroupField = ({field, form, choices, label, feedback,...props }) => {
    const handleChange = (e) => {
        const index = parseInt( e.target.name.substring(e.target.name.length-1))
        const value = choices[index].value
        form.setFieldValue(field.name, value)
    }
    return (
        <>        
        <Styles>
            <Form.Group className="mt-0" style={{display:'inline-block'}}>
                {
                    choices.map( (choice,idx) => {
                        return (
                            <Form.Check
                            key={`RadioGroupField${field.name+idx}`}
                            // custom={field.value ? true : false}          
                            type={"radio"}      
                            checked={field.value === choice.value ? true :false}                
                            name={`${field.name + idx}`}
                            label={choice.label}                
                            onChange={handleChange}
                            isInvalid={!!form.errors[field.name]}
                            feedback={feedback ? feedback : form.errors[field.name]}
                            id={`RadioGroupField${field.name+idx}`}    
                            {...props}            
                            />
                        )
                    })
                }
            </Form.Group>
        </Styles>
        </>
    )
}
export default RadioGroupField
const Styles = styled.div`
    /* .custom-control-label:before{
        background-color:red;
    } */
    .custom-radio .custom-control-input:checked~.custom-control-label::before{
        background-color:rebeccapurple;
    }
`
