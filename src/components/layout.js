/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import 'bootstrap/dist/css/bootstrap.css';
import '../css/bootstrap-plus.css'
import 'react-day-picker/lib/style.css';
import styled from 'styled-components'

const Layout = ({ children, bgColor }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  bgColor = bgColor || '#efefef'
  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Wrapper bgColor={bgColor}>
        <main>{children}</main>
      </Wrapper>
      <Footer bgColor={bgColor}>
          © {new Date().getFullYear()}, 
          {` `}
          <a href="https://tiq.com.sg">Tiq.com</a>
      </Footer>

    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
const Wrapper = styled.div`
      margin: 0 auto;
      max-width: 1400px; 
      padding: 0px 0.0rem 0.5rem 0.0rem;
      padding-top: 0 ;
      min-height: calc(100vh - 120px);
      background-color: ${props => props.bgColor || '#efefef'};

`
const Footer = styled.footer`
      background-color: ${props => props.bgColor || '#efefef'};
      height: 40px;
      bottom: 0px;
      margin-bottom: '-40px'
`


export default Layout
