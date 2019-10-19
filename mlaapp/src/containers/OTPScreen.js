import React from 'react';
import { ImageBackground, StyleSheet,Dimensions } from 'react-native';
import { Container, Header, Left, Button, Right, Body, Icon, Title} from 'native-base';
import OTP from '../components/account/OTP'
import { NavigationActions } from 'react-navigation';
const { width, height } = Dimensions.get('window');

class OTPScreen extends React.Component {
    static navigationOptions = {
        title:  'Verify Phone'
    };

    onOtpVerified=(phone)=>{
      this.props.navigation.navigate("Register",{ phone })
    }
    
    backOTP=()=>{
      let backAction = NavigationActions.back();
      this.props.navigation.dispatch(backAction)
    }

    render() {
      return (
        <Container style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: "black"
        }}>
          <OTP onOtpVerified={this.onOtpVerified} backOTP = {this.backOTP}/>
        </Container>
      );
    }
  }

  export default OTPScreen;