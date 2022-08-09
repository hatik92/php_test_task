import React from 'react';
import snapfixLogo from './Images/snapfix.png';
import backgroundImage from './Images/Background-wave.png';
import { Button, Typography } from "@material-ui/core";
import history from './history';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (<div style={{ backgroundImage: `url(${backgroundImage})`, height: '100vh', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column', backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <img src={snapfixLogo} alt="snapfix" height="80px" />
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>Sorry, something went wrong. Please reload the page </Typography>
      </div>)
    }
    return this.props.children;
  }
}
export default ErrorBoundary;