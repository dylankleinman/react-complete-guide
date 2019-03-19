import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  state = {
    persons: [
      {name: 'Dylan', age: 22},
      {name: 'kleinma', age: 28},
      {name: 'chloe', age: 1000}
    ],
    otherState: 'some other state'
  }

  switchNameHandler = () => {
    //console.log('hello');
    // DONT DO THIS: this.state.persons[0].name = 'dylan kleinman'
    this.setState({
      persons: [
        {name: 'Dylan', age: 321},
        {name: 'kleinma', age: 28},
        {name: 'chloe', age: 22}
      ]
    })
  }

  render() {
    return (
      <div className="App">
        <h1> Hi, I'm a react app </h1>
        <p>this is working!</p>
        <button onClick={this.switchNameHandler}>Switch Name</button>
        <Person name={this.state.persons[0].name} age ={this.state.persons[0].age}/>
        <Person name={this.state.persons[1].name} age ={this.state.persons[1].age}>My hobbies: Surfing</Person>
        <Person name={this.state.persons[2].name} age ={this.state.persons[2].age}/>
      </div>
    );
    //this code above will be compiled exactly the same as this code below:
    //return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'here is some text'));
  }
}

export default App;
