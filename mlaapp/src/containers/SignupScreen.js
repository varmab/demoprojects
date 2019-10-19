import React from 'react';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import Signup from '../components/account/Signup'
import AppHeader from '../components/global/AppHeader'

class SignupScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Join MLA'
  };
  render() {
    return (
      <Container>
        <AppHeader title="Join MLA" navigation={this.props.navigation} backButton={true} homeButton={false}/>
        <Signup navigation={this.props.navigation} userType={this.props.navigation.state.params.userType} phone={this.props.navigation.state.params.phone} />
      </Container>
    );
  }
}

export default SignupScreen;