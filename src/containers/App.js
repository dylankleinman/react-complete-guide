import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

class App extends Component {

  constructor(props){
    super(props);
    console.log('[App.js] constructor');
    //you can also set state here if you want using this.setState

  }

  state = {
    persons: [
      {id:'lkja;lsd' ,name: 'Dylan', age: 22, height:511},
      {id:'lkjasdf', name: 'kleinma', age: 28},
      {id: 'jahlskjdf', name: 'chloe', age: 1000}
    ],
    otherState: 'some other state',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false,
  }

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount(){
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
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
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: this.state.changeCounter + 1
      };
    });
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

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log('[app.js] render');
    let persons = null;
    if (this.state.showPersons){
      persons = <Persons persons={this.state.persons} clicked={this.deletePersonHandler} changed={this.nameChangedHandler} isAuthenticated={this.state.authenticated}/>
    };

    return (
        <Aux>
          <button onClick={() => {this.setState({showCockpit: false});}}>Remove Cockpit</button>
          <AuthContext.Provider value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler
          }}>
            {this.state.showCockpit? <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandler}
              /> : null}
            {persons}
          </AuthContext.Provider>
        </Aux>
    );
    //this code above will be compiled exactly the same as this code below:
    //return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'here is some text'));
  }
}

export default withClass(App, classes.App);
