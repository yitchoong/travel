import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Blank = ({height,width}) => {
    const data = useStaticQuery(graphql`
      query {
        placeholderImage: file(relativePath: { eq: "blank.png" }) {
          childImageSharp {
            fluid(maxWidth:800, maxHeight:500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `)
    return (
    <div style={{height:height, width:width}}>
        <Img fluid={data.placeholderImage.childImageSharp.fluid} />
    </div>)
  }
  
  export default Blank
  