import React, {useState, useEffect, useRef} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {DateUtils} from 'react-day-picker';
import InputGroup from 'react-bootstrap/InputGroup'
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import diffInMonths from 'date-fns/differenceInMonths'
import {FaCalendarAlt} from 'react-icons/fa'
import styled from 'styled-components'

const DateRangeField = ({field, form, label ,...props }) => {

    const FORMAT = 'dd/MM/yyyy';

    const elTo = useRef(null);
    const elFrom = useRef(null);
    const [from, setFrom] = useState(undefined)
    const [to, setTo] = useState(undefined)
    const [open,setOpen] = useState(false)

    useEffect(()=>{
        if (from && to) {
            form.setFieldValue(field.name, [from,to])
            if (diffInMonths(to,from) < 2) {
                elTo.current.getDayPicker() && elTo.current.getDayPicker().showMonth(from)
            }    
        }
    },[from, to])

    useEffect(() => {
        function blurHandler(e){
            form.setFieldTouched(field.name, true)
        }
        elTo.current && elTo.current.getInput().addEventListener("blur", blurHandler)
        return function cleanup() {
            elTo.current && elTo.current.getInput().removeEventListener("blur", blurHandler)
        }
    },[])

    const parseDate = (str, format) => {
        const parsed = dateFnsParse(str, format, Date.now());
        if (DateUtils.isDate(parsed) && parsed.getFullYear() > 1000 ) {
          return parsed;
        }
        return undefined;
    }      
    const formatDate = (date, format, locale) => {
        return dateFnsFormat(date, format, { locale })
    }
    const handleFromChange = (from) => {
        setFrom(from)
    }
    const  handleToChange = (to) =>  {
        setTo(to)
    }
    const toggleDayPicker = () => {
        if (!open){
            elFrom.current.showDayPicker()    
        } else {
            elFrom.current.hideDayPicker()    
        }
    }
    const modifiers = { start: from, end: to };
    const invalid = form.touched[field.name] && !!form.errors[field.name]

    return (
    <>        
      <label style={{marginBottom:'0px'}}>{label}</label>
      <Style invalid={invalid}>
        <InputGroup>
         <div>
            <DayPickerInput
            ref={elFrom}
            format={FORMAT}
            value={from}
            placeholder="From"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
                selectedDays: [from, { from, to }],
                // disabledDays: { after: to, before: new Date() },
                disabledDays : {before: new Date()},
                // toMonth: to,
                modifiers,
                numberOfMonths: 2,
                onDayClick: () => elTo.current.getInput().focus(),
            }}
            onDayChange={handleFromChange}
            onDayPickerShow={()=> setOpen(true)}
            onDayPickerHide={()=> setOpen(false)}

            />{' '}
            —{' '}
            <span className={"InputFromTo_to"}>
                <DayPickerInput
                    ref={elTo}
                    value={to}
                    format={FORMAT}
                    placeholder="To"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    dayPickerProps={{
                    selectedDays: [from, { from, to }],
                    disabledDays: { before: from },
                    modifiers,
                    month: from,
                    //   fromMonth: from,
                    numberOfMonths: 2,
                    }}
                    onDayChange={handleToChange}
        
                />
            </span>
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
export default DateRangeField

const ErrMsg = styled.div`
    font-size: 80%;
    color: red;
`
  
const Style = styled.div`    

    border: solid lightgrey;
    border-width: 1px;
    width: 15rem;
    background-color: #fff;
    border-radius: 5px;
    border-color: ${props => props.invalid ? "red" : "inherited"}    

    input {
      border-width: 0px;
      text-align: center;
      min-height:38px;
    }

    .DayPickerInput input {
        border-radius: 5px;
        border-width: 0px;
        text-align: center;
        width: 5.8rem;
        min-height:38px;
    }
    .DayPickerInput input:focus {
      outline-width: 0;
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
    .InputFromTo_to .DayPickerInput-Overlay {
      margin-left: -135px;
    }
  `
