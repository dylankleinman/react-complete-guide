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
    otherState: 'some other state',
    showPersons: false,
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

  deletePersonHandler = (personIndex) => {
    console.log('hello');
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    };

    let persons = null;

    if (this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map(
            (person, index) => {
              return <Person click={this.deletePersonHandler(index)} name={person.name} age={person.age}/>
            }
          )}

        </div>
      )
    };

    return (
      <div className="App">
        <h1> Hi, I'm a react app </h1>
        <p>this is working!</p>
        <button style={style} onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
    //this code above will be compiled exactly the same as this code below:
    //return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'here is some text'));
  }
}

export default App;
