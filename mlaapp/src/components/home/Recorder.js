import React, { Component } from 'react'
import {
    Dimensions,
    StyleSheet,
    Platform,
    View,
    TouchableOpacity,
    Image,
    Alert,
    Text,
    AsyncStorage
} from 'react-native'

import Permissions from 'react-native-permissions'
import BlinkView from 'react-native-blink-view'
import CameraView from './CameraView';
const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height

class Recorder extends Component {
    constructor() {
        super();

        this.state = {
            record: true,
            recordingPRogress: false,
            height: WINDOW_HEIGHT,
            width: WINDOW_WIDTH,
            open: false,
            photoPermission: "",
            storagePermission: "",
            microphonePermission: "",
            cameraPermission: ""
        }
    }

    onback() {
        this.setState({ height: 75, width: 75 })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                open: nextProps.open,
                record: nextProps.record
            })
        }
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            Permissions.checkMultiple(['storage', 'photo', 'microphone', 'camera']).then(response => {
                console.log("responseresponse", response)
                this.setState({ photoPermission: response.photo, storagePermission: response.storage, microphonePermission: response.microphone, cameraPermission: response.camera })
                if (response.storage) {
                    Permissions.request('storage').then(responsestorage => {
                        console.log("responsestorage", responsestorage)
                        this.setState({ storagePermission: responsestorage })
                        if (responsestorage) {
                            if (response.photo) {
                                Permissions.request('photo').then(responsephoto => {
                                    console.log("responsephoto..........", responsephoto)
                                    this.setState({ photoPermission: responsephoto })
                                    if (responsephoto) {
                                        if (response.microphone) {
                                            Permissions.request('microphone').then(responsemicrophone => {
                                                console.log("responseresponspppppppe", responsemicrophone)
                                                this.setState({ microphonePermission: responsemicrophone })
                                                if (responsemicrophone) {
                                                    if (response.camera === 'undetermined') {
                                                        Permissions.request('camera').then(responsecamera => {
                                                            console.log("responsecamera", responsecamera)
                                                            this.setState({ cameraPermission: responsecamera })
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    }

                                })
                            }
                        }
                    })
                }
            })
        } else {
            Permissions.checkMultiple(['photo', 'microphone', 'camera']).then(response => {
                console.log("responseresponse", response)
                this.setState({ photoPermission: response.photo, microphonePermission: response.microphone, cameraPermission: response.camera })
                if (response.photo) {
                    Permissions.request('photo').then(responsephoto => {
                        console.log("responsephoto..........", responsephoto)
                        this.setState({ photoPermission: responsephoto })
                        if (responsephoto) {
                            if (response.microphone) {
                                Permissions.request('microphone').then(responsemicrophone => {
                                    console.log("responseresponspppppppe", responsemicrophone)
                                    this.setState({ microphonePermission: responsemicrophone })
                                    if (responsemicrophone) {
                                        if (response.camera) {
                                            Permissions.request('camera').then(responsecamera => {
                                                console.log("responsecamera", responsecamera)
                                                this.setState({ cameraPermission: responsecamera })
                                            })
                                        }
                                    }
                                })
                            }
                        }

                    })

                }
            })
        }
    }
    checkpermission() {
        if (Platform.OS === 'android') {
            console.log("kk", this.state.photoPermission + "  " + this.state.storagePermission + "  " + this.state.microphonePermission + "  " + this.state.cameraPermission)
            if (this.state.photoPermission === 'authorized' &&
                this.state.cameraPermission === 'authorized' &&
                this.state.microphonePermission === 'authorized' &&
                this.state.storagePermission === 'authorized'
            ) {
                this.props.onRecord(true)
                // this.setState({
                //     record: false,
                //     open: true,
                // })
            }
            else {
                console.log("kkelse....", this.state.photoPermission)
                if (this.state.photoPermission === 'undetermined' || this.state.photoPermission === 'denied' || this.state.photoPermission === 'restricted') {
                    console.log("kkelsephoto....")
                    Permissions.request('photo').then(responsephoto => {
                        this.setState({ photoPermission: responsephoto })
                        if (responsephoto !== 'authorized') {
                            Alert.alert("Alert", "You cannot record video unless you accept the Permissions");
                        }

                    })
                }
                if (this.state.storagePermission === 'undetermined' || this.state.storagePermission === 'denied' || this.state.storagePermission === 'restricted') {
                    console.log("kkelsephstoragePermissionoto....")
                    Permissions.request('storage').then(responsestorage => {
                        this.setState({ storagePermission: responsestorage })
                        if (responsestorage !== 'authorized') {
                            Alert.alert("Alert", "You cannot record video unless you accept the Permissions");
                        }


                    })
                }
                if (this.state.microphonePermission === 'undetermined' || this.state.microphonePermission === 'denied' || this.state.microphonePermission === 'restricted') {
                    console.log("microphonePermission....")
                    Permissions.request('microphone').then(responsemicrophone => {
                        this.setState({ microphonePermission: responsemicrophone })
                        if (responsemicrophone !== 'authorized') {
                            Alert.alert("Alert", "You cannot record video unless you accept the Permissions");
                        }

                    })
                }
                if (this.state.cameraPermission === 'undetermined' || this.state.cameraPermission === 'denied' || this.state.cameraPermission === 'restricted') {
                    console.log("cameraPermission....")
                    Permissions.request('camera').then(responsecamera => {
                        this.setState({ cameraPermission: responsecamera })
                        if (responsecamera !== 'authorized') {
                            Alert.alert("Alert", "You cannot record video unless you accept the Permissions");
                        }
                    })
                }
            }

        } else {
            this.props.onRecord(true)
            // this.setState({
            //     record: false,
            //     open: true,
            // })
        }
    }

    getUserId = async () => {
        return await AsyncStorage.getItem('userId');
    }

    async recordFunc() {

        this.getUserId()
            .then((userId) => {
                if (userId) {
                    var camera = {}
                    if (this.state.record != false) {

                        camera = { record: 'started' }
                        this.checkpermission();
                        // this.setState({
                        //   record: false,
                        //   open:true,
                        // })


                    } else {
                        camera = { record: 'stoped' }
                        this.props.onRecord(false);
                        // this.setState({
                        //     record: true,
                        // })
                    }
                }
                else {
                    Alert.alert("Alert", "You are required to login to start recording.");
                    this.props.navigation.navigate("Auth")
                }
            })

    }
    previewFunc() {
        this.props.preview()
        //this.setState({ height: WINDOW_HEIGHT, width: WINDOW_WIDTH })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.record != false ? (
                    <View style={styles.mainView}>
                        <TouchableOpacity onPress={this.recordFunc.bind(this)} style={styles.startView}>
                            <Image style={styles.imageStyle} source={require('../../images/recordRed.png')} />
                            <Text style={styles.textView}>Start</Text>
                        </TouchableOpacity>

                    </View>
                ) :
                    <View style={[styles.mainView, { flexDirection: "row" }]}>
                        <TouchableOpacity onPress={this.recordFunc.bind(this)} style={styles.recordingView}>
                            <Image style={styles.imageStyle} source={require('../../images/recordRed.png')} />
                            <BlinkView blinking={this.state.isBlinking ? false : true} delay={1000} >
                                <Text style={styles.textView}>  Recording.. </Text>
                            </BlinkView>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.previewFunc.bind(this)} style={styles.recordingView}>
                            <Image style={styles.imageStyle} source={require('../../images/recordGreen.png')} />
                            <Text style={styles.textView}> Preview </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'black'
    },
    mainView: {
        flex: 1
    },
    startView: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    imageStyle: {
        width: 25, height: 25
    },
    recordingView: {
        flex: 0.5, alignItems: "center",
    },
    textView: {
        color: 'white', fontSize: 16
    }

})


export default Recorder;