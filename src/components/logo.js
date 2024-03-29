import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Logo = () => {
    const data = useStaticQuery(graphql`
      query {
        placeholderImage: file(relativePath: { eq: "logo_tiq_com2.png" }) {
          childImageSharp {
            fluid(maxWidth:200, maxHeight:130) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `)
      
    return <Img width="100" height="62" fluid={data.placeholderImage.childImageSharp.fluid} />
  }
  
  export default Logo
  