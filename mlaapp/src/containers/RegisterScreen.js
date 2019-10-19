import React from 'react';
import Register from '../components/account/Register'
import AppHeader from '../components/global/AppHeader'
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'react-apollo';
import { AsyncStorage, Alert,StyleSheet,Dimensions } from "react-native"
import { Container } from 'native-base';
const { width, height } = Dimensions.get('window');

const ALL_STATES=gql`
  query allStates{
    allStates(orderBy:name_ASC) {
      id
      name
    }
  }
`

const CREATE_USER=gql`
  mutation createUser($phone: String!,$password: String!) {
    createUser(authProvider: { email: { email:$phone, password: $password } }) {
      id
    }
  }
`

const CREATE_APPUSER=gql`
  mutation createAppUser(
    $firstName:String!,
    $lastName:String!,
    $mobileNumber:String,
    $userId:ID!) 
  {
    createAppUser(
      firstName:$firstName,
      lastName:$lastName,
      mobileNumber:$mobileNumber,
      userId:$userId
    ) 
    {
      id
    }
  }
`

class RegisterScreen extends React.Component {
    static navigationOptions = {
      title: 'Register',
      header: null
    };

    static propTypes = {
      createUser: PropTypes.func,
      createAppUser:PropTypes.func
    };

    constructor(props){
      super(props);
      console.log(props)
      this.state={
        contact:{},
        phone:props.navigation.state.params.phone,
        states:[]
      }
    }

    componentWillReceiveProps(newProps){
      this.setState({
        states:newProps.allStates.allStates
      })
    }

    onSave = () => {
      this.props.createUser({ variables: { phone: this.state.phone,
                                           password: this.state.contact.password} })
      .then((results)=>{
        console.log(results.data.createUser.id)
        this.props.createAppUser({
          variables:{
            userId:results.data.createUser.id,
            firstName:this.state.contact.firstName,
            lastName:this.state.contact.lastName,
            mobileNumber:this.state.phone,
            password:this.state.contact.password,
          }
        })
      .then(async (result)=>{
          console.log(result.data.createAppUser.id)
          if(result.data.createAppUser.id){
            await AsyncStorage.setItem('userId', results.data.createUser.id);
          
            Alert.alert(
              'Registration Successful',
              'You have been successfully registered as member of MLA Community.',
              [
                {text: 'OK', onPress: () => {
                  this.props.navigation.navigate("App");
                }},
              ],
              { cancelable: false }
            )
          }
        })
      })
      .catch((err)=>{
        console.log(JSON.stringify(err))
        Alert.alert(
          'User account already exist',
          'User account already exists with specified phone number, Please try login to your account.',
          [
            {text: 'OK', onPress: () => {}},
          ],
          { cancelable: false }
        )
      })
    }

    onRegisterChange = (contact) => {
      this.setState({
        contact
      })
    }

    render() {
      return (
          <Container>
            <AppHeader title="Register" navigation={this.props.navigation} saveButton={true} backButton={true} onSave={this.onSave}/>
            <Register states={this.state.states} onRegisterChange={this.onRegisterChange} phone={this.state.phone} />
          </Container>
  
      );
    }
}
const styles = StyleSheet.create({

  imageStyles:{
    width:width,height:height-25,
  }
});

export default compose(
  graphql(ALL_STATES, { name: 'allStates' }),
  graphql(CREATE_USER, { name: 'createUser' }),
  graphql(CREATE_APPUSER, { name: 'createAppUser' }),
)(RegisterScreen);