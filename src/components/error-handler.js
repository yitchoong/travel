import React from 'react'

const logErrorToMyService = (error, info) => {
    console.log("****ERROR EXCEPTION HANDLER : caught exception, error & info", error, info)
    // should post to an endpoint remote, so that the errors are recorded and analysed
}
class ErrorHandler extends React.Component {
    constructor(props) {
      super(props)
      this.state = { errorOccurred: false }
    }
  
    componentDidCatch(error, info) {
      this.setState({ errorOccurred: true })
      logErrorToMyService(error, info)
    }
  
    render() {
      return this.state.errorOccurred ? 
            (<div><h1>Unexpected Error!</h1>
                <p>Something has gone wrong, please check the developer console for details of the error </p>
            </div>)
     : this.props.children
    }
  }
  export default ErrorHandler
  