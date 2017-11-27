import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, Text } from 'react-native';
import { employeesFetch } from '../actions';
import _ from 'lodash';
import EmployeeListItem from './EmployeeListItem';

class EmployeeList extends Component {
  //Life-cyle method
  componentWillMount() {
    this.props.employeesFetch();
    this.createDataSource(this.props);
   }

 componentWillReceiveProps(nextProps) {
    //nextProps are the next set of props that this component will be rendered
    // with. this.props is still the old set of props
      this.createDataSource(nextProps);
 }

createDataSource({ employees }) {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });

  this.dataSource = ds.cloneWithRows(employees);
}

renderRow(employee) {
  return <EmployeeListItem employee={employee} />;
}

render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
  }); // { shit: 'Monday', name: 'S', id: '123123'}


  return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
