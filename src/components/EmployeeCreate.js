import React, { Component } from 'react';
import { Card, CardSection, Button } from './common';
import { connect } from 'react-redux';
import { employeeCreate } from '../actions';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
  onButtonPress() {
    const { name, phone, shift } = this.props;
   console.log('Pressing button')
    this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
  }

  render() {
    return (
      <Card>
         <EmployeeForm {...this.props} />
         <CardSection>
            <Button onPressing={this.onButtonPress.bind(this)} >
              Create
            </Button>
         </CardSection>

      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

//connect application state and action creator to the component
export default connect(mapStateToProps, { employeeCreate })(EmployeeCreate);
