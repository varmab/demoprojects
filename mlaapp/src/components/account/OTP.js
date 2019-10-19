import React, { Component } from 'react';
import { Alert, StyleSheet, Image, View, TouchableOpacity, Dimensions } from 'react-native'
import { Content, Form, Item, Input, Button, Text, Icon } from 'native-base';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
const { width, height } = Dimensions.get('window');
class OTP extends Component {

    constructor(props) {
        super(props);

        this.state = {
            otp: '',
            otpInput: '',
            phone: '+91',
            otpSent: null,
            otpVerified: null,
            loading: false,
            error: false
        };
    }

    onPhoneChange = (value) => {
        this.setState({
            phone: value
        })
    }

    onOtpChange = (value) => {
        this.setState({
            otpInput: value
        })
    }

    sendOtp = () => {
        this.props.client.query({
            query: gql`query allUsers($email: String!) {
                allUsers(
                    filter: { 
                        email:$email
                    }
                )
                {
                    id
                }
            }   `,
            variables: { email: this.state.phone }
        }).then((result) => {
            if (result.data.allUsers.length > 0) {
                Alert.alert(
                    'Account Exists',
                    'Account already exists with this phone number, Please login to access.',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                )
            }
            else {

                var otp = Math.floor(1000 + Math.random() * 9000);
                console.log("OTP:" + otp)
                this.setState({
                    otp,
                    otpSent: null,
                    otpVerified: null,
                    loading: false,
                    error: false
                }, () => {
                    // fetch('https://mla.us.com/api/account/send/sms', {
                    //     method: 'post',
                    //     headers: {
                    //         'Accept': 'application/json',
                    //         'Content-Type': 'application/x-www-form-urlencoded'
                    //     },
                    //     body: `phone=${this.state.phone}&otp=${this.state.otp}`
                    // })
                    //     .then((status) => {
                    //         this.setState({
                    //             otpSent: true
                    //         })
                    //     })
                    //     .catch((err) => {
                    //         this.setState({
                    //             error: true
                    //         })
                    //     })

                    Alert.alert(
                        'OTP',
                        otp + ' is OTP for MLA app registration',
                        [
                        {text: 'OK', onPress: () => {
                            this.setState({
                                otpSent: true
                            })
                        }},
                        ],
                        { cancelable: false }
                    )
                })
            }

        })


    }

    verifyOtp = () => {
        if (this.state.otp == this.state.otpInput) {
            this.props.onOtpVerified(this.state.phone);
        }
        else {
            Alert.alert(
                'Invalid OTP',
                'OTP entered is invalid. Please reenter valid OTP sent to your mobile phone',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            )
        }
    }

    render() {
        let { otpSent, otpVerified } = this.state;
        if (!otpSent && !otpVerified) {
            return (
                <Content>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => this.props.backOTP()}>
                            <Icon name="arrow-back" style={[styles.labelColor, { marginLeft: 20 }]} />
                        </TouchableOpacity>

                        <Image style={styles.logoStyles} source={require('../../images/logo.png')} />
                        <Text style={{fontSize:30,color:"#dfb924",marginTop:10}}>Enter Your Mobile Number!</Text>
                        <Text style={{fontSize:15,color:"#dfb924",marginTop:10}}>We will send you one time verification code</Text>
                        <Form style={styles.formStyles}>
                            <Item>
                                <Input style={{ color: 'white' }} keyboardType="number-pad" placeholder="Mobile Phone Number" onChangeText={(text) => this.onPhoneChange(text)} value={this.state.phone} />
                            </Item>
                            <TouchableOpacity onPress={this.sendOtp} style={styles.button}>
                                <View style={styles.buttonView}>
                                    <Text style={styles.buttonText}>SUBMIT</Text>
                                </View>
                            </TouchableOpacity>

                        </Form>
                    </View>
                </Content>
            )
        } else if (otpSent && !otpVerified) {
            return (
                <Content>
                    <View style={styles.container}>
                        <Image style={styles.logoStyles} source={require('../../images/logo.png')} />
                        <Form style={styles.formStyles}>
                            <Text style={styles.textStyle}>The OTP has been sent to your phone</Text>
                            <Item style={{ marginTop: 25 }}>
                                <Input style={{ color: 'white' }} placeholder="OTP" onChangeText={(text) => this.onOtpChange(text)} value={this.state.otpInput} />
                            </Item>
                            <TouchableOpacity onPress={this.verifyOtp} style={styles.button}>
                                <View style={styles.buttonView}>
                                    <Text style={styles.buttonText}>Verify</Text>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.sendOtp} style={styles.button}>
                                <View style={styles.buttonView}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </View>
                            </TouchableOpacity>
                        </Form>
                    </View>
                </Content>
            )
        }

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor:'black'
    },
    logoStyles: {
        width: 342 / 2, height: 342 / 2, alignSelf: "center"
    },
    formStyles: {
        marginLeft: 20, marginRight: 20, marginTop: 20, borderWidth: 0
    },
    labelColor: {
        color: "#dfb924"
    },
    iconStyles: {
        color: 'lightgrey'
    },
    buttonView: {
        flex: 1, justifyContent: 'center'
    },
    button: {
        height: 44, backgroundColor: "#dfb924", width: width / 1.5, alignSelf: "center", marginTop: 20, borderRadius: 25
    },
    buttonText: {
        color: "black", textAlign: "center"
    },
    textStyle: {
        color: "#dfb924",
        marginLeft: 20
    }
})

export default withApollo(OTP);
