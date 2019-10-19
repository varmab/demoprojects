'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  BackHandler,
  CameraRoll,
  View
} from 'react-native';
import moment from 'moment';
import { RNCamera } from 'react-native-camera';
const WINDOW_HEIGHT = Dimensions.get('window').height
var RNS3 = require("react-native-aws3").RNS3;
const S3Settings = {
  keyPrefix: "videos/",
  bucket: "mlarecordings",
  region: "us-east-1",
  accessKey: "AKIAIOXLM37KV7ZVDYOA",
  secretKey: "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",
  successActionStatus: 201
}

import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'react-apollo';
import { AsyncStorage, Alert } from "react-native"

const CREATE_APPRECORDING=gql`
  mutation createAppRecording(
    $url:String!,
    $userId:ID!) 
  {
    createAppRecording(
      url:$url,
      userId:$userId
    ) 
    {
      id
    }
  }
`

class CameraView extends Component {

  static propTypes = {
    createAppRecording: PropTypes.func
  };

  constructor(props){
    super(props);
    this.state={
      cameraReady:false,
      status: "Preparing...",
      path:''
    }
  }

  saveAppRecording = async (uploadedVideo) => {
    var userId=await AsyncStorage.getItem("userId")
    this.props.createAppRecording({
        variables:{
          userId,
          url:uploadedVideo,
         }
      })
    .then((result)=>{
        console.log(result.data.createAppRecording.id)
        if(result.data.createAppRecording.id){
          Alert.alert(
            'New Video Successful',
            'Congrats, Video is uploaded to our secure servers',
            [
              {text: 'OK', onPress: () => {
                this.props.navigation.navigate("MyRecordings");
              }},
            ],
            { cancelable: false }
          )
        }
    })
    .catch((err)=>{
      Alert.alert(
        'Video upload failed' + JSON.stringify(err),
        'Failed to upload video, Please try again later.',
        [
          {text: 'OK', onPress: () => {}},
        ],
        { cancelable: false }
      )
    })
  }

  async recordfunv(){
    console.log("djkladfjkljkladfjkldfkl")
    let options = {
          quality: RNCamera.Constants.VideoQuality["1080p"],
          audio: true,
    };
     const { uri, codec = "mp4" } = await this.camera.recordAsync(options);
     const type = `video/${codec}`;
      const data = new FormData();
      data.append("video", {
        name: "mobile-video-upload",
        type,
        uri
      });
      console.log("videouri",uri)
      if(uri){
        var tag=uri;
        console.log("PATH",uri)
        this.props.onLoading(true);
        this.uploadVideo(uri)
        .then((uploadedVideo) => {
          console.log("upload video",uploadedVideo)
          if(uploadedVideo){
            this.saveAppRecording(uploadedVideo)
            .then(()=>{
              this.props.onLoading(false);
            })
          }
        }).catch((err)=>{
          this.props.onLoading(false);
          console.log("Catch",err)
        })
        //  CameraRoll.saveToCameraRoll(uri).then(r => {
        //    console.log("uriuriuriuriuriuri",r)
        //  })
        //  .catch((err) => {
        //    console.log("errerrerrerr",err)
        //  });
    }
  }
  onback(){
    this.props.onback();
  }
  componentWillReceiveProps(nextPRops){
    if(nextPRops.record){
      console.log("hihihihihihihihi")
       this.camera.stopRecording();
       this.props.onStop();

    }
  }
  onCameraReady(){
    console.log('onCameraReady')
    this.setState({
      cameraReady : true,
      status: "Recording...",
    })
    this.recordfunv()
  }
    componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.onback();
    return true;
  }

  stop(){
     this.camera.stopRecording();
  }

  Record(){
    this.setState({
      cameraReady : true,
      status: "Recording...",
    })
    this.recordfunv()
  }

  uploadVideo = (videoUri) => {
    console.log("videoUri", videoUri)
    return new Promise((resolve, reject) => {
        var key = moment().format('DDMMYYYYhhmmss')

        var file = {
            uri: videoUri,
            name: key + '.mp4',
            type: 'video/mp4'
        }
        console.log("file",file)
        RNS3.put(file, S3Settings)
            .then(response => {
                if (response.status !== 201) {
                    console.log("reject", response)

                    reject("Failed to upload image");
                }
                console.log("response",response)
                var uploadedVideo = response.body.postResponse.location
                resolve(uploadedVideo)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

  render() {
    return (
      <View style={styles.container}>
      {this.props.height === WINDOW_HEIGHT ?
               <View style={{flexDirection:"row",alignItems:"center"}}>
          <TouchableOpacity
                onPress={this.onback.bind(this)}
                style = {styles.capture}
            >
                <Text style={{fontSize: 14}}> back </Text>
            </TouchableOpacity>
            <Text style={{color:"white"}}>{this.state.status}</Text>
            </View> 
          : <View/>}
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            onCameraReady={this.onCameraReady.bind(this)}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  preview: {
    flex: 1
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});

export default compose(
  graphql(CREATE_APPRECORDING, { name: 'createAppRecording' }),
)(CameraView);