import React, { Component } from 'react';
import Communications from 'react-native-communications';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Confirm } from './common';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
  state = { showModal: false }

  componentWillMount() {
    console.log(this.props.employee);
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
   console.log(name, phone, shift);
  }

  onTextPress() {
    const { phone, shift } = this.props;
    Communications.text(phone, 'Your upcoming shift is on ${shift}');
  //  this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
  }

  //Call back
  onAccept() {
    //const { uid } = this.props.employee
    this.props.employeeDelete({ uid: this.props.employee.uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }
  render() {
    return (
      <Card>
         <EmployeeForm />
         <CardSection>
            <Button onPressing={this.onButtonPress.bind(this)} >
              Save changes
            </Button>
         </CardSection>

         <CardSection>
            <Button onPressing={this.onTextPress.bind(this)} >
              Text Schedule
            </Button>
         </CardSection>

          <CardSection>
            <Button onPressing={() => this.setState({ showModal: !this.state.showModal })} >
              Fire Employee
            </Button>
          </CardSection>

          <Confirm
            visible={this.state.showModal}
            onAccept={this.onAccept.bind(this)}
            onDecline={this.onDecline.bind(this)}
          >
            Are you sure you want to delete this?
          </Confirm>

      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

//connect application state and action creator to the component
export default connect(mapStateToProps, { employeeUpdate, employeeSave, employeeDelete })(EmployeeEdit);
