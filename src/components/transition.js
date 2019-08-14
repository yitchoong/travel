import React from "react";
import posed, { PoseGroup } from "react-pose";

// const timeout = 100;
// const RoutesContainer = posed.div({
//     enter: {
//       opacity: 1,
//       filter: "blur(0px)",
//       y: 0,
//       delay: timeout,
//       delayChildren: timeout
//     },
//     exit: {
//       opacity: 0,
//       filter: "blur(20px)",
//       y: 30
//     }
// });




const Transition = ({children, location}) => {

    const RoutesContainer2 = posed.div({
        enter: { opacity: 1, delay: 300, beforeChildren: 300 },
        exit: { opacity: 0 }
      });
    
    // const RoutesContainer = posed.div({
    //     enter: {
    //       opacity: 1,
    //       filter: "blur(0px)",
    //       y: 0,
    //       delay: timeout,
    //       delayChildren: timeout
    //     },
    //     exit: {
    //       opacity: 0,
    //       filter: "blur(10px)",
    //       y: 30
    //     }
    // });
    
      return (
        <PoseGroup>
          <RoutesContainer2 key={location.pathname}>{children}</RoutesContainer2>
        </PoseGroup>
      );
}
  
export default Transition;
