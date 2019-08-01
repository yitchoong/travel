import React, {useState} from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Select,{components} from 'react-select';
import makeAnimated from 'react-select/animated';
import styled from 'styled-components'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
const customStyles = {
    control: (provided, state) => {
        return {...provided, backgroundColor:'#fff'}
    },
    multiValue: (provided,state) => {
        return {...provided, backgroundColor: 'transparent', border:'solid 1px', fontSize:'95%', borderColor:'rebeccapurple'}
    }

 }

// options data is from a file in src/data/travel/countries.json
const CountrySelectField = ({field, form, label, ...props }) => {

    const data = useStaticQuery(graphql`
    query CountriesQuery {
        allCountriesJson(sort: {fields: label, order: ASC}) {
            nodes {
                label
                value
            }
        }
        }
    `)
    const choices = data.allCountriesJson.nodes
    const [menuOpen, setMenuOpen] = useState(false)

    const onChange = (selected, action) => {
        const selectedCountries = selected.map(s => s.value)
        form.setFieldValue(field.name, selectedCountries)
    }
    const onBlur = () => {
        form.setFieldTouched(field.name, true)
    }

    // customize backgroundColor for container

     const DropdownIndicator = (props) => {
        return menuOpen ? (
            <components.DropdownIndicator {...props}>
              <span style={{fontSize:'0.7rem', paddingLeft:'1px', fontWeight: 300}}>OK</span>
            </components.DropdownIndicator>
          ) : (<components.DropdownIndicator {...props} />)
      };

      const menuHeaderStyle = {
        padding: '8px 12px',
        borderWidth: '0px',
        borderBottomWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#dedede',
        fontSize: '80%',
        fontWeight: 'bold',
      };
      
      const MenuList = props => {
        return (
          <components.MenuList {...props}>
            <div style={menuHeaderStyle}>Most popular (you can select more than one)</div>
                <Container fluid>
                    <Row>
                        {props.children.map( child => <Col sm={6}>{child}</Col> )}
                    </Row>
                </Container>
          </components.MenuList>
        );
      };
      
      
      const animatedComponents = {...makeAnimated(), DropdownIndicator, MenuList};
      
      const setMenuState = state => setMenuOpen(state)
      const invalid = form.touched[field.name] && !!form.errors[field.name]
    return (
    <>
        <Style invalid={invalid}>
            <label style={{marginBottom:'0px'}}>{label}</label>
            <Select
                closeMenuOnSelect={false}
                defaultValue={field.value}
                isMulti
                options={choices}
                onChange={onChange} 
                onBlur={onBlur}      
                components={animatedComponents}         
                styles={customStyles}
                onMenuOpen={() => setMenuState(true)}
                onMenuClose={()=> setMenuState(false)}
            />
        </Style>
        {invalid ? <ErrMsg>{form.errors[field.name]}</ErrMsg> : null }
    </>
    )
}
export default CountrySelectField

const ErrMsg = styled.div`
    font-size: 80%;
    color: red;
`
const Style = styled.div`
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
