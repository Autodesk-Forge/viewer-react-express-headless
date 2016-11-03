// expand button
import React, { Component } from 'react';
import Btn from 'react-bootstrap/lib/Button';

class Button extends Component {
  render() {
  	return (
    	<Btn type="button" className="btnStyle"> Exp </Btn>
  	);
  }
}

export default Button;