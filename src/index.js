import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import injectTapEventPlugin from 'react-tap-event-plugin';
//
// injectTapEventPlugin();

// var Main = React.createClass({
//   render: function() {
//     return (
//       <a
//         href="#"
//         onTouchTap={this.handleTouchTap}
//         onClick={this.handleClick}>
//         Tap Me
//       </a>
//     );
//   },
//
//   handleClick: function(e) {
//     console.log("click", e);
//   },
//
//   handleTouchTap: function(e) {
//     console.log("touchTap", e);
//   }
// });

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
