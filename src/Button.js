// expand button
import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
  backgroundColor: '#EE8822',

};


class Button extends Component {
  render() {
  	return (
  		<div>
    		<FloatingActionButton style={style}>	
    		</FloatingActionButton>
    	</div>
  	);
  }
}

export default Button;