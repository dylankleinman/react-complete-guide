import React, {useEffect, useRef, useContext} from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

//this is a functional component, not a class based.  Use useEffect to copy lifestyle hooks
const cockpit = (props) => {

  const toggleBtnRef = useRef(null);
  const authContext = useContext(AuthContext);

  console.log(authContext.authenticatd);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    //http request...
    // setTimeout(() => {
    //   alert('saved data to cloud');
    // },1000);

    toggleBtnRef.current.click();

    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect');
    };
  }, []); //passing an empty array will run only first time load.  Otherwise putting something like props.person inside will run useEffect on chnage of person

  useEffect(() => {
    console.log('[Cockpit.js] 2nd cleanup work in 2nduseEffect');
    return () => {
      console.log('[Cockpit.js]2nd useEffect');
    };
  });

  const assignedClasses = [];
  let btnClass='';
  if(props.showPersons){btnClass = classes.Red;}
  if(props.personsLength <= 2){
    assignedClasses.push(classes.red); // classes = ['red']
  }
  if(props.personsLength <= 1){
    assignedClasses.push(classes.bold); //classes = ['red, bold']
  }

  return(
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>this is working!</p>
      <button ref={toggleBtnRef} className = {btnClass} onClick={props.clicked}>Toggle Persons</button>
      <button onClick={authContext.login}>Log in</button>
    </div>
  );
}

export default React.memo(cockpit);
