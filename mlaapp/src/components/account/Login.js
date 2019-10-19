import React, { Component } from 'react'
import { Content, Form, Item, Input, Button, Text, Label, Icon } from 'native-base';
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { AsyncStorage, Alert, Dimensions, Image, View, TouchableOpacity, StyleSheet, ImageBackground } from "react-native"
const { width, height } = Dimensions.get('window');

import AccountKit, {
  LoginButton
} from "react-native-facebook-account-kit";


const SIGNIN_USER = gql`
  mutation signinUser($email: String!,$password: String!) {
    signinUser(email: { email:$email, password:$password })
    {
        token
        user {
            id
        }
    }
  }
`
class Login extends Component {
  static propTypes = {
    signinUser: PropTypes.func
  };

  constructor() {
    super();

    this.state = {
      login: {
        mobileNumber: '+91',
        password: ''
      }
    }
  }

  onLogin() {
    this.props.signinUser({
      variables: {
        email: this.state.login.mobileNumber,
        password: this.state.login.password
      }
    })
      .then((results) => {
        console.log(JSON.stringify(results))
        this.props.onLoginSuccess(results.data.signinUser.user.id);
      })
      .catch((err) => {
        Alert.alert(
          'Login failed',
          "The mobile number or password you have entered is invalid.",
          [
            { text: 'OK', onPress: () => { } },
          ],
          { cancelable: false }
        )
        console.log("Failed to login" + JSON.stringify(err))
      })
  }

  onRegister(token) {
    if (!token) {
      console.warn("User canceled login");
      this.setState({});
    } else {
      AccountKit.getCurrentAccount().then(account => {
        this.props.onRegister(token, account);
      });
    }
  }

  onRegisterError = (err) => {
    console.log(err)
  }

  onChange = (fieldName, fieldValue) => {
    var login = Object.assign({}, this.state.login);
    login[fieldName] = fieldValue;
    this.setState({
      login
    })
  }

  configureAccountKit = () => {
    AccountKit.configure({
      responseType: 'token', // 'token' by default,
      titleType: 'login',
      receiveSMS:false,
      initialAuthState: '',
      initialPhoneCountryPrefix: '+91', // autodetected if none is provided
      initialPhoneNumber: '',
      defaultCountry: 'IN',
      viewControllerMode: 'present', // for iOS only, 'present' by default
    });
  }

  componentWillMount(){
    this.configureAccountKit();
  }


  render() {
    return (
      <Content>
        <View style={styles.container}>
          <Image style={styles.logoStyles} source={require('../../images/logo.png')} />
          <Form style={styles.formStyles}>
            <Item>
              <Input style={{ color: 'white' }} keyboardType="number-pad" placeholder="Enter Mobile Phone Number" value={this.state.login.mobileNumber} onChangeText={(text) => this.onChange('mobileNumber', text)} value={this.state.login.mobileNumber} />
            </Item>
            <Item>
              <Input style={{ color: 'white' }} keyboardType="default" secureTextEntry={true} placeholder="Password" value={this.state.login.password} onChangeText={(text) => this.onChange('password', text)} value={this.state.login.password} />
            </Item>
          </Form>
          <TouchableOpacity onPress={this.onLogin.bind(this)} style={styles.button}>
            <View style={styles.buttonView}>
              <View style={styles.loginLeftView}></View>
              <View style={styles.loginMiddleView}>
                <Text style={styles.buttonText}>SIGN IN</Text>
              </View>
              <View style={styles.loginRight}>
                <Image source={require('../../images/forward.png')} style={styles.forward} />
              </View>
            </View>
          </TouchableOpacity>
          <LoginButton
            style={styles.button}
            type="phone"
            onLogin={token => this.onRegister(token)}
            onError={e => this.onRegisterError(e)}
          >
            <View style={styles.buttonView}>
              <View style={styles.loginLeftView}></View>
              <View style={styles.loginMiddleView}>
                <Text style={styles.buttonText}>REGISTER</Text>
              </View>
              <View style={styles.loginRight}>
                <Image source={require('../../images/forward.png')} style={styles.forward} />
              </View>
            </View>
          </LoginButton>
        </View>
      </Content>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  imageStyles: {
    width: width, height: height - 25
  },
  logoStyles: {
    width: 200, height: 170, marginTop: 40, alignSelf: "center"
  },
  formStyles: {
    marginLeft: 20, marginRight: 20, marginTop: 20
  },
  labelColor: {
    color: "#dfb924"
  },
  iconStyles: {
    color: 'lightgrey'
  },
  buttonView: {
    flex: 1, flexDirection: "row"
  },
  loginLeftView: {
    flex: 0.1, justifyContent: "center"
  },
  loginMiddleView: {
    flex: 0.8, justifyContent: "center"
  },
  loginRight: {
    flex: 0.1, justifyContent: "center", alignItems: "flex-end"
  },
  forward: {
    width: 17 / 2, height: 37 / 2, marginRight: 15
  },
  button: {
    height: 44, backgroundColor: "#dfb924", width: width / 1.5, alignSelf: "center", marginTop: 20, borderRadius: 25
  },
  buttonText: {
    color: "black", textAlign: "center"
  },
  forgetText: {
    color: "#dfb924", alignSelf: "center", fontSize: 12
  }
});

export default compose(
  graphql(SIGNIN_USER, { name: 'signinUser' })
)(Login);
