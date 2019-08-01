import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Logo = () => {
    const data = useStaticQuery(graphql`
      query {
        placeholderImage: file(relativePath: { eq: "logo_tiq_com.png" }) {
          childImageSharp {
            fluid(maxWidth:800, maxHeight:500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `)
  
    return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
  }
  
  export default Logo
  