import React, { Component } from 'react'

import {
    StyleSheet, Dimensions, Platform, ActivityIndicator, Alert,
    Image, Button, TextInput, Text, View, TouchableOpacity
} from 'react-native';

import {
    Content,
    Form,
    Item,
    Input,
    Icon,
    Textarea,
    Footer
} from 'native-base'

import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer';

import MLAButton from '../global/MLAButton';
var RNS3 = require('react-native-aws3').RNS3;

import moment from 'moment';

const S3Settings = {
    keyPrefix: "photos/",
    bucket: "mlarecordings",
    region: "us-east-1",
    accessKey: "AKIAIOXLM37KV7ZVDYOA",
    secretKey: "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",
    successActionStatus: 201
}

const {
    width,
    height
} = Dimensions.get('window');

import { Formik } from 'formik';

class EmploymentInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: null,
            imageLoading: false,
            imageSource: null
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            states: newProps.states
        })
    }

    uploadImage = (imageUri) => {
        return new Promise((resolve, reject) => {
            var key = moment().format('DDMMYYYYhhmmss')
            var file = {
                uri: imageUri.uri,
                name: key + '.jpeg',
                type: 'image/jpeg'
            }
            console.log('Uploading started')
            RNS3.put(file, S3Settings)
                .then(response => {
                    console.log('Uploading completed')
                    if (response.status !== 201) {
                        console.log('Uploading completed but status 201')
                        console.log("reject", response)
                        reject("Failed to upload image");
                    }
                    var uploadedPic = "https://mlarecordings.s3.amazonaws.com/photos/" + key + '.jpeg'
                    console.log(uploadedPic);
                    resolve(uploadedPic)
                })
                .catch((err) => {
                    console.log('Uploading failed with error')
                    reject("Failed to upload image" + JSON.stringify(err));
                })
        })
    }

    pickImage = () => {
        const options = {
            title: 'Select Photo',
            takePhotoButtonTitle: 'Take Photo',
            chooseFromLibraryButtonTitle: 'Choose from Library',
            quality: 0.5,
            storageOptions: {
                skipBackup: true
            },
            allowsEditing: true
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePickerManager Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                var source;
                if (Platform.OS === 'android') {
                    source = {
                        uri: response.uri,
                        isStatic: true
                    };
                } else {
                    source = {
                        uri: response.uri.replace('file://', ''),
                        isStatic: true
                    };
                }
                console.log("imagepic", source)
                this.setState({
                    imageSource: source,
                    imageLoading: true,
                }, () => {
                    ImageResizer.createResizedImage(this.state.imageSource.uri, 400, 400, 'JPEG', 80)
                        .then((resizedImageUri) => {
                            console.log("resizedImageUri", resizedImageUri)
                            this.uploadImage(resizedImageUri)
                                .then((uploadedImage) => {
                                    console.log("uploadedImage", uploadedImage)
                                    if (uploadedImage) {
                                        this.setState({
                                            image: uploadedImage,
                                            imageLoading: false
                                        })
                                    }
                                }).catch((err) => {
                                    this.setState({
                                        imageLoading: false
                                    });
                                    Alert.alert('Unable to upload to aws3',
                                        'Check the console for full the error message' + JSON.stringify(err));
                                })
                        }).catch((err) => {
                            console.log(err);
                            this.uploadImage(source)
                                .then((uploadedImage) => {
                                    if (uploadedImage) {
                                        this.setState({
                                            image: uploadedImage,
                                            imageLoading: false
                                        })
                                    }
                                }).catch((err) => {
                                    this.setState({
                                        imageLoading: false
                                    });
                                    Alert.alert('Unable to upload to aws3',
                                        'Check the console for full the error message');
                                })

                            // return Alert.alert('Unable to resize the photo',
                            //     'Check the console for full the error message');

                        });
                })

            }
        })
    }

    render() {
        console.log("image" + this.state.image)
        return (
            <React.Fragment>
                <View style={styles.topView}>
                    {this.state.image ?
                        (<TouchableOpacity onPress={this.pickImage}>
                            <Image source={{ uri: this.state.image }} style={styles.imageStyles} />
                        </TouchableOpacity>
                        ) : this.state.imageLoading ? (
                            <View style={styles.imageStyles}>
                                <ActivityIndicator />
                            </View>
                        ) : <TouchableOpacity onPress={this.pickImage}>
                                <Image source={require('../../images/placeholder-image.png')} style={styles.imageStyles} />
                                <View style={styles.iconView}>
                                    <Icon name="camera" size={20} style={{ color: 'grey' }} />
                                </View>
                            </TouchableOpacity>
                    }
                </View>
                <Formik
                    initialValues={{ aadharNumber: '', homeAddress: '', bankAccountNumber: '', bankIfscCode: '',aadharPhoto:null }}
                    onSubmit={values => {
                        values.aadharPhoto = this.state.image
                        console.log(values)
                        this.props.onEmploymentInfoSubmitted(values)
                    }}
                >
                    {props => (
                        <React.Fragment>
                            <Content style={{
                                backgroundColor: "black"
                            }}>

                                <Form>
                                    <Item>
                                        <Input style={{ color: 'white' }} placeholder="Aadhar Number" onChangeText={props.handleChange('aadharNumber')} onBlur={props.handleBlur('aadharNumber')} value={props.values.aadharNumber} />
                                    </Item>
                                    <Item>
                                        <Textarea style={{ color: 'white' }} rowSpan={5} colSpan={300} bordered placeholder="Enter address, city, state and postal code" onChangeText={props.handleChange('homeAddress')} onBlur={props.handleBlur('homeAddress')} value={props.values.homeAddress} />
                                    </Item>
                                    <Item>
                                        <Input style={{ color: 'white' }} placeholder="Bank A/C Number" onChangeText={props.handleChange('bankAccountNumber')} onBlur={props.handleBlur('bankAccountNumber')} value={props.values.bankAccountNumber} />
                                    </Item>
                                    <Item>
                                        <Input style={{ color: 'white' }} placeholder="Bank IFSC Code" onChangeText={props.handleChange('bankIfscCode')} onBlur={props.handleBlur('bankIfscCode')} value={props.values.bankIfscCode} />
                                    </Item>
                                </Form>
                            </Content>
                            <Footer style={{ backgroundColor: 'black' }}>
                                <MLAButton text="Next" onSubmit={props.handleSubmit} />
                            </Footer>
                        </React.Fragment>
                    )}
                </Formik>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    topView: {
        height: 200,
        width: width,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'black'
    },
    imageStyles: {
        height: 200,
        width: 320,
        justifyContent: "center"
    },
    logoStyles: {
        width: 100, height: 85, alignSelf: "center"
    },
    iconView: {
        width: 10,
        height: 10,
        position: 'absolute',
        marginLeft: 160,
        marginTop: 160,
        justifyContent: 'flex-start'
    },
})

export default EmploymentInfo;