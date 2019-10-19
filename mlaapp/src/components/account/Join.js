import React from 'react'
import { Content, Form, Item, Input, Button, Text, Label, Icon } from 'native-base';
import { Modal, AsyncStorage, Alert, Dimensions, Image, View, TouchableOpacity,TouchableHighlight, StyleSheet, ImageBackground } from "react-native"
import MLAButton from '../global/MLAButton';
const { width, height } = Dimensions.get('window');

class Join extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: props.phone,
            modalVisible: false,
        }
    }

    setModalVisible=(visible)=>{
        this.setState({modalVisible: visible});
    }
    
    onJoin = (userType) => {
        console.log(userType)
        this.props.navigation.navigate("Signup", { userType, phone: this.state.phone })
    }

    render() {
        return (
            <Content style={styles.container}>
                <View style={styles.container}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.modalView}>
                                <Text style={{color:'#dfb924'}}>Choose registration type</Text>
                                <MLAButton text="Join as Individual" onSubmit={() => {
                                    this.setModalVisible(false);
                                    this.onJoin("client-individual")
                                }} />
                                <MLAButton text="Join as Company" onSubmit={() => {
                                    this.setModalVisible(false);
                                    this.onJoin("client-company")
                                }} />
                            </View>
                        </View>
                    </Modal>
                    <Image style={styles.logoStyles} source={require('../../images/logo.png')} />
                    <Text style={styles.mlaText}></Text>
                    <MLAButton text="Join as Client" onSubmit={() => this.setModalVisible(true)} />
                    <MLAButton text="Join as Advocate" onSubmit={() => this.onJoin("advocate")} />
                    <MLAButton text="Join as Agent" onSubmit={() => this.onJoin("agent")} />

                    {/* <MLAButton text="New Case" onSubmit={() => this.props.navigation.navigate("AddCase", { userType:"client", phone: this.state.phone })} /> */}

                    
                    {/* <MLAButton text="Join as Placement Agency" onSubmit={()=>this.onJoin("placementconsultant")}/>
                    <MLAButton text="Join as Employee" onSubmit={()=>this.onJoin("employee")}/> */}
                </View>
            </Content>
        )
    }
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
    forgetText: {
        color: "#dfb924", alignSelf: "center", fontSize: 12
    },
    mlaText: {
        color: 'lightgoldenrodyellow', marginTop: 15, alignSelf: "center"
    },
    modalView:{
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor : "black", 
        height: '50%',
        width: '80%',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#dfb924'
       
      },
});

export default Join;