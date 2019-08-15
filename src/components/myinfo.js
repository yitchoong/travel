import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const MyInfo = () => {
    const data = useStaticQuery(graphql`
      query {
        placeholderImage: file(relativePath: { eq: "MyInfo2.png" }) {
          childImageSharp {
            fluid(maxWidth:200, maxHeight:80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `)
  
    return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
  }

  // const MyInfo = () => {
  //   const data = useStaticQuery(graphql`
  //     query {
  //       placeholderImage: file(relativePath: { eq: "MyInfo2.png" }) {
  //         childImageSharp {
  //           fixed(width:98, height:38) {
  //             ...GatsbyImageSharpFixed
  //           }
  //         }
  //       }
  //     }
  //   `)
  
  //   return <Img fixed={data.placeholderImage.childImageSharp.fixed} />
  // }


  
  export default MyInfo


  