import React, { Component } from 'react';
import { View, Text, StyleSheet,Dimensions,ImageBackground } from 'react-native';
import { Container } from 'native-base';
import PayMLA from '../components/global/PayMLA';
import AppHeader from '../components/global/AppHeader';


export default class PayMLAScreen extends Component {
    static navigationOptions = {
        drawerLabel: 'Pay MLA'
    };

    render() {
        return (
           <Container>
               <AppHeader title='Pay MLA' navigation={this.props.navigation} backButton={true} />
               <PayMLA />
           </Container>
        );
    }
    
}

