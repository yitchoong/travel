import React from "react";
import posed, { PoseGroup } from "react-pose";

const timeout = 100;

const RoutesContainer = posed.div({
    enter: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      delay: timeout,
      delayChildren: timeout
    },
    exit: {
      opacity: 0,
      filter: "blur(20px)",
      y: 30
    }
});
// const RoutesContainer2 = posed.div({
//     enter: { opacity: 1, delay: 300, beforeChildren: 300 },
//     exit: { opacity: 0 }
//   });


const Transition = ({children, location}) => {

      return (
        <PoseGroup>
          <RoutesContainer key={location.pathname}>{children}</RoutesContainer>
        </PoseGroup>
      );
}
  
export default Transition;
