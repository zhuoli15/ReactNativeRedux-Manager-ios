import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS
} from './type';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

//Actin creator generates action (object / function) and send too all Reducers
export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const employeeCreate = ({ name, phone, shift }) => {
  console.log('employeeCreator')
  const { currentUser } = firebase.auth();

   //Option 1:
   //Because it' No need to dispatch a action,
  // //Return statement is to get rid of the warning from redux-flux
  // return () => {
  //   firebase.database().ref(`/users/${currentUser.uid}/employee`)
  //     .push({ name, phone, shift })
  //     .then(() => Actions.employeeList({ type: 'reset' }));
  // };

  //Option 2:
  //Dispatch a action to clear out employeeCreate form
 return (dispatch) => {
   firebase.database().ref(`/users/${currentUser.uid}/employee`)
     .push({ name, phone, shift })
     .then(() => {
       //Reset all attributes to clear out
       dispatch({ type: EMPLOYEE_CREATE });
       //Reset the stack
       Actions.employeeList({ type: 'reset' })
     });
 };
};


export const employeesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    //event handler watching the entire application life cycle
    firebase.database().ref(`/users/${currentUser.uid}/employee`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
  console.log('employeeSave')
  const { currentUser } = firebase.auth();

 return (dispatch) => {
   firebase.database().ref(`/users/${currentUser.uid}/employee/${uid}`)
     .set({ name, phone, shift })
     .then(() => {
       dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
       Actions.employeeList({ type: 'reset' })
     });
 };
};

export const employeeDelete = ({ uid }) => {
  console.log('employeeDelete')
  const { currentUser } = firebase.auth();

 return () => {
   firebase.database().ref(`/users/${currentUser.uid}/employee/${uid}`)
     .remove()
     .then(() => {
       Actions.employeeList({ type: 'reset' })
     });
 };
};
