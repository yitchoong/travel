import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Logo from "./logo"

const Header = ({ siteTitle }) => (
  <header
    className={"tiq_navbar"}
    // style={{
    //   background: `rebeccapurple`,
    //   marginBottom: `1.45rem`,
    // }} 
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 1368,
        // padding: `1.45rem 1.0875rem`,
        padding: `0.0rem 0.0rem`,
        display: 'flex', flexDirection:'row'

      }}
    >
      <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
      >

        <div style={{height:'80px', width:'80px', paddingTop:'20px', paddingLeft:'5px'}}>
          <Logo />
        </div>
      </Link>
        
      <div style={{padding: `1.0rem 1.0rem`}}>
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>        
        </h1>
      </div>

    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
