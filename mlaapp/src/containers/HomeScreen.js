import React from 'react';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import Home from '../components/home/Home'
import AppHeader from '../components/global/AppHeader'

class HomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home'
  };
  render() {
    return (
      <Container>
        <AppHeader title="Home" navigation={this.props.navigation}/>
        <Home navigation={this.props.navigation}/>
      </Container>
    );
  }
}

export default HomeScreen;