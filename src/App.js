import React, { Component } from 'react';
import routes from './router.js';



class App extends Component {
  render() {
    return (
      <div>
        { routes }
        </div>
    );  
  }
}

export default App;
