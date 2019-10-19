import React from 'react'
import { Content, Form, Item, Input, Button, Text, Label, Icon } from 'native-base';
import { AsyncStorage, Alert, Dimensions, Image, View, TouchableOpacity, StyleSheet, ImageBackground } from "react-native"
const { width, height } = Dimensions.get('window');
import { Formik } from 'formik';

const PaymentInfo = (props) => {

    // var pay = (paymentInfo) => {
    //     let amount = 99.9;
    //     let txid = new Date().getTime() + "";
    //     let productId = "product101";
    //     let name = "asdf";
    //     let email = "hello@world.com";
    //     let phone = "1231231231";
    //     let surl = "https://mla.us.com"; //can be diffrennt for Succes
    //     let furl = "https://mla.us.com"; //can be diffrennt for Failed
    //     let id = "CODING91529930686539"; //Your Merchant ID here
    //     let key = "egdNTw4turp8WwEo"; //Your Key Here
    //     let sandbox = false; //Make sure to set false on production or you will get error

    //     fetch('https://mla.us.com/checksum', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             'PAYTM_MERCHANT_KEY': key,
    //             txnid: txid,
    //             amount: amount,
    //             productinfo: productId,
    //             firstname: name,
    //             email: email
    //         }),
    //     })
    //         .then((response) => response.text())
    //         .then((hash) => {
    //             let options = {
    //                 amount: amount,
    //                 txid: txid,
    //                 productId: productId,
    //                 name: name,
    //                 email: email,
    //                 phone: phone,
    //                 id: id,
    //                 key: key,
    //                 surl: surl,
    //                 furl: furl,
    //                 sandbox: sandbox,
    //                 hash: hash
    //             };
    //             console.log(options);
    //             PayuMoney.pay(options).then((d) => {
    //                 console.log(d); // WIll get a Success response with verification hash
    //             }).catch(e => {
    //                 console.log(e); //In case of failture 
    //             });
    //         })
    // }
    return (
        <Content style={styles.container}>
            <View style={styles.container}>
                <Formik
                    initialValues={{ email: '' }}
                    onSubmit={values => props.onPaymentInfoSubmitted(values)}
                >
                    {props => (
                        <React.Fragment>
                            <Text style={styles.mlaTitle}>Pay Now</Text>
                            <Text style={styles.mlaText}>Amount Payable: Rs 650.00</Text>
                            <TouchableOpacity onPress={props.handleSubmit} style={styles.button}>
                                <View style={styles.buttonView}>
                                    <View style={styles.loginLeftView}></View>
                                    <View style={styles.loginMiddleView}>
                                        <Text style={styles.buttonText}>Pay</Text>
                                    </View>
                                    <View style={styles.loginRight}>
                                        <Image source={require('../../images/forward.png')} style={styles.forward} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </React.Fragment>
                    )}
                </Formik>
            </View>
        </Content>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    imageStyles: {
        width: width, height: height - 25
    },
    logoStyles: {
        width: 200, height: 170, marginTop: 40, alignSelf: "center"
    },
    formStyles: {
        marginLeft: 20, marginRight: 20, marginTop: 20
    },
    labelColor: {
        color: "#dfb924"
    },
    iconStyles: {
        color: 'lightgrey'
    },
    buttonView: {
        flex: 1, flexDirection: "row"
    },
    loginLeftView: {
        flex: 0.1, justifyContent: "center"
    },
    loginMiddleView: {
        flex: 0.8, justifyContent: "center"
    },
    loginRight: {
        flex: 0.1, justifyContent: "center", alignItems: "flex-end"
    },
    forward: {
        width: 17 / 2, height: 37 / 2, marginRight: 15
    },
    button: {
        height: 44, backgroundColor: "#dfb924", width: width / 1.5, alignSelf: "center", marginTop: 20, borderRadius: 25
    },
    buttonText: {
        color: "black", textAlign: "center"
    },
    forgetText: {
        color: "#dfb924", alignSelf: "center", fontSize: 12
    },
    mlaText: {
        color:'lightgoldenrodyellow',marginTop:15,alignSelf: "center"
    },
    mlaTitle: {
        color:'lightgoldenrodyellow',marginTop:15,alignSelf: "center",fontSize:24
    }
});

export default PaymentInfo;