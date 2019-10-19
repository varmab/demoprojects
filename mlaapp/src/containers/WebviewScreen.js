import React from 'react';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import AppHeader from '../components/global/AppHeader'
import Webview from '../components/global/Webview'

class WebviewScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'MLA'
  };
  render() {
    return (
      <Container>
        <AppHeader title="MLA" navigation={this.props.navigation} backButton={true}/>
        <Webview navigation={this.props.navigation}/>
      </Container>
    );
  }
}

export default WebviewScreen;