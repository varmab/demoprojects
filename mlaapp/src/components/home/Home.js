import React, { Component } from 'react'
import {
    AppRegistry,
    View,
    Modal,
    StyleSheet,
    Image,
    Text,
    Dimensions,
    ActivityIndicator,
    TextInput,
    Platform,
    Alert,
    ScrollView,
    PermissionsAndroid,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native'

import MLAButton from '../global/MLAButton';


import {
    Content
} from 'native-base'
const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height
import CameraView from './CameraView';
import Recorder from './Recorder'
import { store } from '../../redux_mla'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: WINDOW_HEIGHT,
            width: WINDOW_WIDTH,
            recordingPRogress: false,
            open: false,
            record: true,
            spinner: false,
            modalVisible: false,
        }
    }

    onSelectCourtType = (courtType) => {
        this.props.navigation.navigate("Data", { courtType, dataType:'advocate' })
    }


    onClick() {
        this.props.navigation.navigate('Webview', { title: 'MLA', url: 'https://mla.us.com' });
    }

    onMail() {
        this.props.navigation.navigate('Webview');
    }

    onback() {
        this.setState({ height: 75, width: 75 })
    }

    onRecord(open) {
        if (open) {
            this.setState({
                open,
                record: false,
            })
        } else {
            this.setState({
                open,
                height: WINDOW_HEIGHT,
                width: WINDOW_WIDTH,
                record: true,
            })
        }

    }

    onStop() {
        this.setState({
            open: false,
            record: true,
            height: WINDOW_HEIGHT, width: WINDOW_WIDTH
        })
    }
    preview() {
        this.setState({
            height: WINDOW_HEIGHT, width: WINDOW_WIDTH
        })
    }

    setModalVisible=(visible)=>{
        this.setState({modalVisible: visible});
    }

    onLoading(value) {
        this.setState({
            spinner: value
        })
    }

    render() {
        console.log("this.state.height", this.state.height, WINDOW_HEIGHT)
        return (
            <View style={{ flex: 1 }}>
                <Content style={{ flex: 1, backgroundColor: 'black' }}>
                <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.modalView}>
                                <Text style={{color:'#dfb924'}}>Choose court type</Text>
                                <MLAButton text="Supreme Court" onSubmit={() => {
                                    this.setModalVisible(false);
                                    this.onSelectCourtType("sc")
                                }} />
                                <MLAButton text="High Courts" onSubmit={() => {
                                    this.setModalVisible(false);
                                    this.onSelectCourtType("hc")
                                }} />
                                <MLAButton text="District Courts" onSubmit={() => {
                                    this.setModalVisible(false);
                                    this.onSelectCourtType("dc")
                                }} />
                            </View>
                        </View>
                    </Modal>
                    <View style={{ flex: 1, height: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <View>
                            <Image
                                style={{ width: 50, height: 50, }}
                                source={require('../../images/left.png')}
                            />
                        </View>
                        <View>
                            <Image
                                style={{ width: 120, height: 100 }}
                                source={require('../../images/logo.png')}
                            />
                        </View>
                        <View>
                            <Image
                                style={{ width: 50, height: 50 }}
                                source={require('../../images/right.png')}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}
                        >
                            {' '}
                            Meenakshi Law Associates{' '}
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Webview')}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                style={{
                                    width: WINDOW_WIDTH * 0.35,
                                    height: WINDOW_WIDTH * 0.35
                                }}
                                source={require('../../images/malLegal.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('Going to Data Screen')
                                store.dispatch({
                                    type: 'SELECT_STATE',
                                    stateId: ''
                                 })
                                this.setModalVisible(true)
                                // this.props.navigation.navigate('Data', { dataType: 'advocate' })
                            }}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                style={{
                                    width: WINDOW_WIDTH * 0.35,
                                    height: WINDOW_WIDTH * 0.35
                                }}
                                source={require('../../images/Advocates.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('Going to Data Screen')
                                store.dispatch({
                                    type: 'SELECT_STATE',
                                    stateId: ''
                                })
                                this.props.navigation.navigate('Data', { dataType: 'client' })
                            }}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                style={{
                                    width: WINDOW_WIDTH * 0.35,
                                    height: WINDOW_WIDTH * 0.35
                                }}
                                source={require('../../images/Clients.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('Going to Data Screen')
                                store.dispatch({
                                    type: 'SELECT_STATE',
                                    stateId: ''
                                })
                                this.props.navigation.navigate('Data', { dataType: 'lead' })
                            }}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                style={{
                                    width: WINDOW_WIDTH * 0.35,
                                    height: WINDOW_WIDTH * 0.35
                                }}
                                source={require('../../images/Leads.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('Going to Data Screen')
                                store.dispatch({
                                    type: 'SELECT_STATE',
                                    stateId: ''
                                })
                                this.props.navigation.navigate('Data', { dataType: 'court' })
                            }}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                style={{
                                    width: WINDOW_WIDTH * 0.35,
                                    height: WINDOW_WIDTH * 0.35
                                }}
                                source={require('../../images/Courts.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('Going to Data Screen')
                                store.dispatch({
                                    type: 'SELECT_STATE',
                                    stateId: ''
                                })
                                this.props.navigation.navigate('Data', { dataType: 'agent' })
                            }}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                style={{
                                    width: WINDOW_WIDTH * 0.35,
                                    height: WINDOW_WIDTH * 0.35
                                }}
                                source={require('../../images/Agents.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <Recorder preview={this.preview.bind(this)} onRecord={this.onRecord.bind(this)} open={this.state.open} record={this.state.record}
                        navigation={this.props.navigation}
                    />
                    <View style={{ flex: 1, height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: "flex-end" }}>
                        <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold' }}>
                            Voice Against Crime
                    </Text>
                    </View>
                </Content>
                {this.state.open === true ? (
                    this.state.height !== WINDOW_HEIGHT ? (
                        <View style={styles.backView}>
                            <CameraView
                                onback={this.onback.bind(this)}
                                recordingPRogress={this.state.recordingPRogress}
                                height={100}
                                width={100}
                                borderRadius={100 / 2}
                                onStop={this.onStop.bind(this)}
                                onLoading={this.onLoading.bind(this)}
                                record={this.state.record}
                                navigation={this.props.navigation} />
                        </View>
                    ) :
                        (
                            <View style={[styles.mainView, { height: this.state.height, width: this.state.width, }]}>
                                <CameraView
                                    onback={this.onback.bind(this)}
                                    recordingPRogress={this.state.recordingPRogress}
                                    height={this.state.height}
                                    width={this.state.width}
                                    borderRadius={100 / 2}
                                    onStop={this.onStop.bind(this)}
                                    onLoading={this.onLoading.bind(this)}
                                    record={this.state.record} />
                            </View>)
                ) : this.state.spinner ? (
                    <View style={styles.spinnerView}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : null}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'black'
    },
    spinnerView: {
        position: "absolute", width: WINDOW_WIDTH, height: WINDOW_HEIGHT, alignItems: "center", justifyContent: "center",
    },
    mainView: {
        position: 'absolute', backgroundColor: "white", alignSelf: "center"
    },
    backView: { position: 'absolute', borderRadius: 75 / 2, overflow: 'hidden', marginTop: WINDOW_HEIGHT / 1.45, marginLeft: WINDOW_WIDTH / 2, height: 75, width: 75, backgroundColor: "white", alignSelf: "center" },
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
})
