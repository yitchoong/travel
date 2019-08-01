import React from 'react'
// import Button from 'react-bootstrap/Button'
// import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'

const CheckBoxField = ({field, form, label, feedback,...props }) => {
    const handleChange = (e) => {
        const val = field.value && e.target.value === 'on' ? false : true
        form.setFieldValue(field.name, val)
    }
    return (
        <>        
            <Form.Group className="mt-3 pt-3">
                <Form.Check
                custom
                checked={field.value ? true :false}                
                name={`${field.name}`}
                label={label}                
                onChange={handleChange}
                isInvalid={!!form.errors[field.name]}
                feedback={feedback ? feedback : form.errors[field.name]}
                id={`CheckBoxField${field.name}`}    
                {...props}            
                />
            </Form.Group>
        </>
    )
}
export default CheckBoxField