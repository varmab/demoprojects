import React from 'react';
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import AppHeader from '../components/global/AppHeader'
import Data from '../components/global/Data'
import {
  View,
  Text
} from 'react-native'

class DataScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'MLA'
  };
  constructor(props){
    super(props);
    console.log(JSON.stringify(props))
    this.state={
      dataType:props.navigation.state.params.dataType,
      courtType:props.navigation.state.params.courtType
    }
  }
  render() {
    console.log('data screen')
    return (
      <Container>
        <AppHeader title="MLA" navigation={this.props.navigation} backButton={true}/>
        <Data navigation={this.props.navigation} dataType={this.state.dataType} courtType={this.state.courtType}/>
      </Container>
    );
  }
}

export default DataScreen;

//this.props.navigation.state.params.dataType