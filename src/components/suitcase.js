import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Suitcase = () => {
    const data = useStaticQuery(graphql`
      query {
        placeholderImage: file(relativePath: { eq: "suitcase.png" }) {
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
  
  export default Suitcase
  