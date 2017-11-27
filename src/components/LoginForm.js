import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';


class LoginForm extends Component {
  //From component's event hanlder(onChangeText) to Action creator
  onEmailChange(text) {
        this.props.emailChanged(text);
  }

  onPasswordChange(text) {
        this.props.passwordChanged(text);
  }

  onButtonPress() {
    console.log("Click");
      const { email, password } = this.props;

      this.props.loginUser({email, password});
  }

  renderError() {
    if(this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderButton() {
    if(this.props.loading) {
        return <Spinner size="large" />;
    }
    else{
      return (
        <Button onPressing={this.onButtonPress.bind(this)}>
         Logina
        </Button>
      );
    }
  };

  render() {
    return (
      <Card>
        <CardSection>
         <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
        <Input
           secureTextEntity
           label="Password"
           placeholder="password"
           onChangeText={this.onPasswordChange.bind(this)}
           value={this.props.password}
         />
        </CardSection>

          {this.renderError()}

        <CardSection>
          {this.renderButton()}
        </CardSection>

      </Card>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}
export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
