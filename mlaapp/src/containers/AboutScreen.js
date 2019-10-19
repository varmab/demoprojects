import React from 'react';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import About from '../components/home/About'
import AppHeader from '../components/global/AppHeader'

class AboutScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'About'
  };
  render() {
    return (
      <Container>
        <AppHeader title="About" navigation={this.props.navigation}/>
        <About/>
      </Container>
    );
  }
}

export default AboutScreen;