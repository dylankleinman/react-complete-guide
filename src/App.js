import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {id:'lkja;lsd' ,name: 'Dylan', age: 22, height:511},
      {id:'lkjasdf', name: 'kleinma', age: 28},
      {id: 'jahlskjdf', name: 'chloe', age: 1000}
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

  nameChangedHandler = (event, id) => {
    //use the id passed through the input box to match which index of the persons list is the person that has our id
    // the personIndex variable will hold the index of person we are looking for
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    //set person variable to a copy (..., not a pointer) of our person with certain index in persons array
    const person = {...this.state.persons[personIndex]};
    //alternative const person =  Object.assign({}, this.state.persons[personIndex])
    //set the name of this person to the target value
    person.name = event.target.value;
    // create new object with values of persons array, use ... to not have a pointer and mutate original array
    const persons = [...this.state.persons];
    persons[personIndex] = person
    //after changing person with index [personIndex] set state to new array
    this.setState({persons: persons});
  }

  deletePersonHandler = (personIndex) => {
    //console.log(personIndex);
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons]; //this and the slice above do the same thing.
    //It is immportant to create a new object, without using slice you are just making a pointer to the list/object.  this is called immutable.
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    };

    let persons = null;

    if (this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
              return <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)}/>
            })}
        </div>
      );
      style.backgroundColor = 'red';
    };

    const assignedClasses = [];
    if(this.state.persons.length <= 2){
      assignedClasses.push(classes.red); // classes = ['red']
    }
    if(this.state.persons.length <= 1){
      assignedClasses.push(classes.bold); //classes = ['red, bold']
    }


    return (
        <div className={classes.App}>
          <h1> Hi, I'm a react app </h1>
          <p className={assignedClasses.join(' ')}>this is working!</p>
          <button style={style} onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
        </div>
    );
    //this code above will be compiled exactly the same as this code below:
    //return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'here is some text'));
  }
}

export default App;
