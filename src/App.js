import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  state = {
    persons: [
      {name: 'Dylan', age: 22, height:511},
      {name: 'kleinma', age: 28},
      {name: 'chloe', age: 1000}
    ],
    otherState: 'some other state'
  }

  switchNameHandler = (newName) => {
    //console.log('hello');
    // DONT DO THIS: this.state.persons[0].name = 'dylan kleinman'
    this.setState({
      persons: [
        {name: newName, age: 321},
        {name: 'kleinma', age: 28},
        {name: 'chloe', age: 22, height:'im really short'}
      ]
    })
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        {name: 'Dylan', age: 321},
        {name: event.target.value, age: 28},
        {name: 'chloe', age: 22, height:'im really short'}
      ]
    })
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    };

    return (
      <div className="App">
        <h1> Hi, I'm a react app </h1>
        <p>this is working!</p>
        <button style={style} onClick={() => this.switchNameHandler('DYLANKLEINMAN')}>Switch Name</button>
        <Person
          name={this.state.persons[0].name}
           age ={this.state.persons[0].age}
           height = {this.state.persons[0].height}
        />
        <Person
          name={this.state.persons[1].name}
          age ={this.state.persons[1].age}
          click = {this.switchNameHandler.bind(this, 'DYLAN!!!')}
          changed={this.nameChangedHandler}>
          My hobbies: Surfing
        </Person>
        <Person
          name={this.state.persons[2].name}
          age ={this.state.persons[2].age}
        />
      </div>
    );
    //this code above will be compiled exactly the same as this code below:
    //return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'here is some text'));
  }
}

export default App;
