import React, { Component } from 'react'

import {
    View,
    ImageBackground,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native'

const { width, height } = Dimensions.get('window');

class PayMLA extends Component {
    render(){
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../images/ipcTopBg.png')}
                    style={styles.paymentFrame}
                    >
                    <View style={{ marginBottom: width / 25 }}>
                        <Text style={styles.paymentText}>Send Payment</Text>
                    </View>
                </ImageBackground>
                
                <View style={styles.accDetailsText}>
                    <Text style={styles.bankHeaderText}>MLA Bank Account Details</Text>
                    <View style={{ marginTop: width / 37.5, alignItems: 'center' }}>
                        <Text style={{ color: '#FAFAD2' }}>All clients / agents should submit their </Text>
                        <Text style={{ color: '#FAFAD2' }}>payments to following account number / IFSC </Text>
                        <Text style={{ color: '#FAFAD2' }}>belongs to Meenakshi Law Associates</Text>
                    </View>
                    <Text style={styles.accNumText}>A/c. No: <Text style={{ color: '#FFFF00' }}>560320110000267</Text></Text>
                    <Text style={styles.ifscText}>IFSC Code: <Text style={{ color: '#FFFF00' }}>BKID0005603</Text></Text>    
                </View>
                
            </View>
        )
    }    
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: 'black'
    },
    paymentFrame: {
        marginTop:width/7.5,
        width: width/2.2,
        height: width/3,
        justifyContent: "center",
        alignItems: "center"
    },
    paymentText: {
        color: '#EDC629', fontWeight: 'bold', fontSize: 16
    },
    accDetailsText: {
        marginTop:width/7.5, alignItems: 'center', justifyContent:'center'
    },
    bankHeaderText: {
        color: 'white', fontWeight: 'bold', fontSize: 18
    },
    accNumText: {
        color: 'white', marginTop: width/25, fontWeight: 'bold'
    },
    ifscText: {
        color: 'white', marginTop: width/37.5, fontWeight: 'bold'
    }
})

export default PayMLA;