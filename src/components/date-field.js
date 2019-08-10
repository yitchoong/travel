import React, {useState, useEffect, useRef} from 'react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import {DateUtils} from 'react-day-picker';
import InputGroup from 'react-bootstrap/InputGroup'
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import {FaCalendarAlt} from 'react-icons/fa'
import styled from 'styled-components'

const DateField = ({field, form, label ,...props }) => {

    const FORMAT = 'dd/MM/yyyy';
    const travelDate = Array.isArray(field.value) && field.value.length > 0 ? new Date(field.value[0]) : undefined

    const elDate = useRef(null);
    const [selected, setSelected] = useState(travelDate)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        form.setFieldValue(field.name, [selected])        
    } ,[selected])
    // useEffect(() => {
    //     function blurHandler(e){
    //         form.setFieldTouched(field.name, true)
    //     }
    //     elDate.current && elDate.current.getInput().addEventListener("blur", blurHandler)
    //     return function cleanup() {
    //         elDate.current && elDate.current.getInput().removeEventListener("blur", blurHandler)
    //     }
    // },[])

    const parseDate = (str, format, locale) => {
        const parsed = dateFnsParse(str, format, Date.now());
        return DateUtils.isDate(parsed) && parsed.getFullYear() > 1000 ? parsed : undefined
    }      
    const formatDate = (date, format, locale) => dateFnsFormat(date, format, { locale })
    const handleChange = (selected) => setSelected(selected)
    const toggleDayPicker = () => {
        if (!open) {
            elDate.current.showDayPicker()
        } else {
            elDate.current.hideDayPicker()
        }
    }
    const today = new Date()
    const modifiers = { before: today };
    const invalid = form.touched[field.name] && !!form.errors[field.name]

    return (
    <>        
      {/* <label style={{marginBottom:'0px'}}>{label}</label> */}
      <StyledLabel>{label}</StyledLabel>
      <Style invalid={invalid}>
        <InputGroup>
         <div>
            <DayPickerInput
            ref={elDate}
            format={FORMAT}
            value={selected}
            // placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
            placeholder={`dd/mm/yyyy`}
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
                // selectedDays: [from, { from, to }],
                disabledDays: { before: new Date() },
                // toMonth: to,
                modifiers,
                numberOfMonths: 2,
                onDayClick: () => elDate.current.getInput().focus(),
            }}
            onDayChange={handleChange}
            onDayPickerShow={()=> setOpen(true)}
            onDayPickerHide={()=> setOpen(false)}
            />
            </div>

            <InputGroup.Append>
                    <span className="pl-1 mt-1" onClick={toggleDayPicker}>
                        <FaCalendarAlt />
                    </span>
            </InputGroup.Append>
        </InputGroup>        
    </Style>
    {invalid ? <ErrMsg>{form.errors[field.name]}</ErrMsg> : null }
    </>
    );
    
}
export default DateField

const StyledLabel = styled.label`
    margin-bottom: 0px;
`
const ErrMsg = styled.div`
    font-size: 80%
    color: red;
`
const Style = styled.div`
    border: solid lightgrey;
    border-width: 1px;
    width: 9rem;
    background-color: #fff;
    border-radius: 5px;
    border-color: ${props => props.invalid ? "red" : "inherited"}    

    input {
        border-width: 0px;
        text-align: center;
        width: 7rem;
        min-height:38px;
    }

    .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
        background-color: #f0f8ff !important;
        color: #4a90e2;
    }
    .DayPicker-Day {
        border-radius: 0 !important;
    }
    .DayPicker-Day--start {
        border-top-left-radius: 50% !important;
        border-bottom-left-radius: 50% !important;
    }
    .DayPicker-Day--end {
        border-top-right-radius: 50% !important;                
        border-bottom-right-radius: 50% !important;
    }
    .DayPickerInput-Overlay {
        width: 650px;
    }
    .DayPickerInput input:focus {
        outline-width: 0;
    }
    .DayPickerInput input {
        border-radius: 5px;
        min-height:38px;
        text-align: center;
        width: 7rem;
        border-width: 0px;

    }
`
