import React from 'react';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import Join from '../components/account/Join'
import AppHeader from '../components/global/AppHeader'

class JoinScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Join'
  };
  
  constructor(props){
    super(props);

    this.state={
      //phone:"+919999933333"
      phone:props.navigation.state.params.phone  
    }
  }

  render() {
    return (
      <Container>
        <AppHeader title="Join MLA" navigation={this.props.navigation} backButton={true} homeButton={false}/>
        <Join navigation={this.props.navigation} phone={this.state.phone}/>
      </Container>
    );
  }
}

export default JoinScreen;