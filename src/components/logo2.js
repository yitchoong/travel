import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Logo = () => {
    const data = useStaticQuery(graphql`
      query {
        placeholderImage: file(relativePath: { eq: "logo_tiq_com2.png" }) {
          childImageSharp {
            fixed(width:94, height:62) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `)
      
    return <Img width="100" height="62" fixed={data.placeholderImage.childImageSharp.fixed} />
  }
  
  export default Logo
  