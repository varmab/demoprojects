import React from 'react';
import { AsyncStorage, Dimensions, ImageBackground, Image, StyleSheet } from 'react-native';
import { Container, Header, Left, Button, Right, Body, Icon, Title, } from 'native-base';
import Login from '../components/account/Login'
import AppHeader from '../components/global/AppHeader'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

class LoginScreen extends React.Component {

  static propTypes = {
    getUserProfile: PropTypes.func
  };

  static navigationOptions = {
    drawerLabel: 'Login'
  };

  onLoginSuccess = async (userId) => {
    await AsyncStorage.setItem('userId', userId);

    this.props.client.query({
      query: GET_USERPROFILE,
      variables:{
        userId
      }
    }).then(async (result) => {
      await AsyncStorage.setItem('userType', result.data.allUserProfiles[0].userType);
      this.props.navigation.navigate("App")
    }).catch((err)=>{
      console.log(err)
    })
  }

  onRegister = (token, account) => {
    console.log(JSON.stringify(account))
    var phone = "+" + account.phoneNumber.countryCode + account.phoneNumber.number;
    this.props.navigation.navigate("Join", { phone })
  }

  render() {
    return (
      <Container style={{
        flex: 1,
        backgroundColor: "black"
      }}>
        <AppHeader title="Login" navigation={this.props.navigation} backButton={false} homeButton={true} />
        <Login onLoginSuccess={this.onLoginSuccess} onRegister={this.onRegister} />
      </Container>
    );
  }
}

const GET_USERPROFILE = gql`
  query getUserProfile($userId:ID){
    allUserProfiles(filter:{user:{id:$userId}}){
      id,
      userType
    }
  }
`
export default withApollo(LoginScreen);
