import React, {useState} from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Select,{components} from 'react-select';
import makeAnimated from 'react-select/animated';
import styled from 'styled-components'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
// import { FaChevronDown, FaCheck } from 'react-icons/fa'
// import useWindowSize from '../hooks/useWindowSize'

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
    // const window = useWindowSize()
    // const small = window.width < 800 ? true : false
    // const [menuOpen, setMenuOpen] = useState(false)
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    let keepOpen = false
    
    // customize backgroundColor for container

    //  const DropdownIndicator = (props) => {
    //     return (
    //     <components.DropdownIndicator {...props}>
    //         <span style={{}}>
    //             {props.selectProps.menuIsOpen ? <FaCheck /> : small ? null : <FaChevronDown />}
    //         </span> 
    //     </components.DropdownIndicator>
    //     )
    //   };
    //   const indicatorSeparatorStyle = {
    //     alignSelf: 'stretch',
    //     backgroundColor: 'lightgrey',
    //     marginBottom: 8,
    //     marginTop: 8,
    //     width: 1,
    //   };
    
    //   const IndicatorSeparator = (props ) => {
    //     return  small ? <span {...props.innerProps} />  :
    //             <span style={indicatorSeparatorStyle} {...props.innerProps} />
    //   };
      

      const menuHeaderStyle = {
        padding: '4px 8px',
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
                    <Row style={{height: '10em', overflowY:'auto'}}>
                        {props.children.map ? props.children.map( (child, idx) => <Col key={`${child.key+idx}`} xs={6}>{child}</Col> ) : null}
                    </Row>
                </Container>
                <Row className="justify-content-center mt-1 mb-2">
                        <Col xs={{span:5}} className="justify-content-center">
                                <Button size="sm" style={{paddingLeft:'1.5rem', paddingRight:'1.5rem'}} variant="outline-info" onClick={closeButtonClick}>{' '}Done{' '}</Button>
                        </Col>
                </Row>

          </components.MenuList>
        );
      };
      const closeMenu = () => {
          setMenuIsOpen(keepOpen ? true :false)
      }
      const openMenu = () => {
        setMenuIsOpen(true)
    }
    
    const onChange = (selected) => {
        form.setFieldValue(field.name, selected)
        keepOpen=true
    }
    const closeButtonClick = () => {
        setMenuIsOpen(false)
    }

    
      
    //   const animatedComponents = {...makeAnimated(), MenuList, IndicatorSeparator, DropdownIndicator };
      const animatedComponents = {...makeAnimated(), MenuList};      
      const invalid = form.touched[field.name] && !!form.errors[field.name]
      return (
    <>
        <Style invalid={invalid}>
            <label style={{marginBottom:'0px'}}>{label}</label>
            <Select
                closeMenuOnSelect={false}
                menuIsOpen={menuIsOpen}
                onChange={onChange} 
                openMenuOnFocus={true}   
                onMenuOpen={openMenu}
                onMenuClose={closeMenu}
                defaultValue={field.value}
                isMulti
                options={choices}
                components={animatedComponents}         
                styles={customStyles}
                placeholder="Select one or more countries"
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
