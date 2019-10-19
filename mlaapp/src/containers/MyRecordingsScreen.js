import React from 'react';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import AppHeader from '../components/global/AppHeader'
import Recordings from '../components/home/Recordings';

class MyRecordingsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'My Recordings'
  };
  render() {
    return (
      <Container>
        <AppHeader title="Recordings" navigation={this.props.navigation}/>
        <Recordings/>
      </Container>
    );
  }
}

export default MyRecordingsScreen;