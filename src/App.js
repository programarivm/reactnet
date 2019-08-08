import React, { Component } from 'react';
import { NavBar } from "./components/NavBar.js";
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <footer className="text-center m-4">
          <small>ReactNet says: Have an awesome day!</small>
        </footer>
      </div>
    );
  }
}

export default App;
