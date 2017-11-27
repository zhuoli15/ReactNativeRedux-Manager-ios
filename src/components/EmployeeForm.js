import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { Card, CardSection, Input } from './common';
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions';

class EmployeeForm extends Component {

  render() {
    return (
      <View>
        <Card>
           <CardSection>
            <Input
               label="Name"
               placeholder="Joe"
               value={this.props.name}
               onChangeText={text => this.props.employeeUpdate({ prop: 'name', value: text })}
            />
           </CardSection>

           <CardSection>
            <Input
               label="Phone"
               placeholder="123-456-7890"
               value={this.props.phone}
               onChangeText={text => this.props.employeeUpdate({ prop: 'phone', value: text })}
            />
           </CardSection>

           <CardSection style={{ flexDirection: 'column' }}>
              <Text style={styles.pickerTextStyle}>Shift</Text>
              <Picker
                //  style={{ flex:1 }}
                  selectedValue={this.props.shift}
                  onValueChange={text => this.props.employeeUpdate({ prop: 'shift', value: text })}
              >
                   <Picker.Item label="Monday" value="Monday" />
                   <Picker.Item label="Tuesday" value="Tuesday" />
                   <Picker.Item label="Wednesday" value="Wednesday" />
                   <Picker.Item label="Thursday" value="Thursday" />
                   <Picker.Item label="Friday" value="Friday" />
                   <Picker.Item label="Saturday" value="Saturday" />
                   <Picker.Item label="Sunday" value="Sunday" />
             </Picker>
           </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

//connect application state and action creator to the component
export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);
