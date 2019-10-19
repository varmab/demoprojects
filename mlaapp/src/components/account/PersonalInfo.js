import React, { Component } from 'react'

import {
    StyleSheet, Dimensions, Platform, ActivityIndicator, Alert,
    Image, Button, TextInput, Text, View, TouchableOpacity
} from 'react-native';

import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import * as Yup from 'yup'

import {
    Content,
    Form,
    Item,
    Input,
    Icon,
    Footer,
    Picker
} from 'native-base'

import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer';

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
import StateDistrictsSelect from '../global/StateDistrictsSelect';
import MLAButton from '../global/MLAButton';

class PersonalInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            states: props.states,
            phone: props.phone,
            userType: props.userType,
            image: '',
            imageLoading: false,
            stateId: '',
            districtId: '',
            imageSource: null,
            placementAgencies:[]
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

    onStateSelected = (id) => {
        this.setState({
            stateId: id
        })
    }

    onDistrictSelected = (id) => {
        this.setState({
            districtId: id 
        }, () => {
			console.log("districtId" + this.state.districtId)
			this.props.client.query({
				query: gql`query allUserProfiles($userType:String,$districtId:ID)
				{
					allUserProfiles(filter:{userType:$userType,district:{id:$districtId}}){
						id
						businessName,
						firstName,
						lastName
					}
				}   `,
				variables: { userType: "placementconsultant", districtId: this.state.districtId }
			})
				.then((results) => {
                    this.setState({
						placementAgencies: results.data.allUserProfiles
					})
				})
				.catch((err) => {
					console.log(err)
				})
		});
    }

    render() {
        console.log("image" + this.state.image)
        
        const validationSchema = Yup.object().shape({
            email: Yup.string()
              .email('E-mail is not valid!')
              .required('E-mail is required!'),
            password: Yup.string()
              .min(6, 'Password has to be longer than 6 characters!')  
              .required('Password is required!'),
            firstName: Yup.string()
              .required('Name is required!'),
            lastName: Yup.string()
              .required('Surname is required!')
          })
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
                                <Image source={require('../../images/placeholder-person.png')} style={styles.imageStyles} />
                                <View style={styles.iconView}>
                                    <Icon name="camera" size={20} style={{ color: 'grey' }} />
                                </View>
                            </TouchableOpacity>
                    }
                </View>
                <Formik
                    initialValues={{ firstName: '', lastName: '', password: '', mobileNumber: this.state.phone, image:this.state.image, email: '', stateId: this.state.stateId, districtId: this.state.districtId, placementAgencyId:'' }}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        values.stateId = this.state.stateId
                        values.districtId = this.state.districtId
                        values.profilePhoto = this.state.image
                        
                        if(values.stateId==''){
                            Alert.alert(
                                'Registration failed',
                                "State is required.",
                                [
                                  { text: 'OK', onPress: () => { return false; } },
                                ],
                                { cancelable: false }
                              )
                        }

                        else if(values.districtId==''){
                            Alert.alert(
                                'Registration failed',
                                "District is required.",
                                [
                                  { text: 'OK', onPress: () => { return false; } },
                                ],
                                { cancelable: false }
                              )
                        }

                        else if(values.profilePhoto==''){
                            Alert.alert(
                                'Registration failed',
                                "Profile picture is required.",
                                [
                                  { text: 'OK', onPress: () => { return false; } },
                                ],
                                { cancelable: false }
                              )
                        }
                        else {
                            this.props.onPersonalInfoSubmitted(values)
                        }
                        
                    }}
                >
                    {props => (
                        <React.Fragment>
                            <Content style={{
                                backgroundColor: "black"
                            }}>
                                <Form>
                                    {
                                        (this.state.userType == 'client-company') ?
                                            (
                                                <React.Fragment>
                                                    <Item>
                                                        <Input style={{ color: 'white' }} error={'#d50000'} autoCorrect={false} placeholder="Company Name" onChangeText={props.handleChange('firstName')} onBlur={props.handleBlur('firstName')} value={props.values.firstName} />
                                                    </Item>
                                                    <Item picker>
                                                        <Picker
                                                            mode="dropdown"
                                                            iosIcon={<Icon name="ios-arrow-down" />}
                                                            style={{ width: undefined }}
                                                            placeholder="Company Type"
                                                            placeholderStyle={{ color: "#bfc6ea" }}
                                                            placeholderIconColor="#007aff"
                                                            onValueChange={props.handleChange('companyType')}>
                                                            <Picker.Item label="Select Company" value="" />
                                                            <Picker.Item label="Proprietory Firm" value="PF" />
                                                            <Picker.Item label="Partnership" value="PP" />
                                                            <Picker.Item label="LLP" value="LLP" />
                                                            <Picker.Item label="Private Limited" value="PL" />
                                                        </Picker>
                                                    </Item>
                                                </React.Fragment>
                                            ) :
                                            (<Text></Text>)
                                    }
                                    
                                    <Item>
                                        <Input style={{ color: 'white' }} autoCorrect={false} placeholder="Name" onChangeText={props.handleChange('firstName')} onBlur={props.handleBlur('firstName')} value={props.values.firstName} />
                                    </Item>
                                    <Item>
                                        <Input style={{ color: 'white' }} autoCorrect={false} placeholder="Surname" onChangeText={props.handleChange('lastName')} onBlur={props.handleBlur('lastName')} value={props.values.lastName} />
                                    </Item>
                                    <Item>
                                        <Input style={{ color: 'white' }} placeholder="Password" onChangeText={props.handleChange('password')} onBlur={props.handleBlur('password')} value={props.values.password} />
                                    </Item>
                                    <Item>
                                        <Input style={{ color: 'white' }} placeholder="Mobile Number" onChangeText={props.handleChange('mobileNumber')} onBlur={props.handleBlur('mobileNumber')} value={props.values.mobileNumber} disabled />
                                    </Item>
                                    <Item>
                                        <Input style={{ color: 'white' }} placeholder="Email" onChangeText={props.handleChange('email')} onBlur={props.handleBlur('email')} value={props.values.email} />
                                    </Item>
                                    <Item>
                                        <StateDistrictsSelect states={this.state.states} onStateSelected={this.onStateSelected} onDistrictSelected={this.onDistrictSelected} />
                                    </Item>
                                    {
                                        (this.state.userType == 'agent') ?
                                            (
                                                <React.Fragment>
                                                    <Item picker>
                                                        <Picker
                                                            mode="dropdown"
                                                            iosIcon={<Icon name="ios-arrow-down" />}
                                                            style={{ width: undefined }}
                                                            placeholder="Placement Agency"
                                                            textStyle={{ color: "#bfc6ea" }}
                                                            placeholderIconColor="#007aff"
                                                            selectedValue={props.values.placementAgencyId}
                                                            onValueChange={props.handleChange('placementAgencyId')}>
                                                            <Picker.Item label="Select Placement Agency" value="" />
                                                            {
                                                                this.state.placementAgencies.map((agency)=>{
                                                                    return  <Picker.Item key={agency.id} label={agency.businessName} value={agency.id} />
                                                                })
                                                            }
                                                        </Picker>
                                                    </Item>
                                                </React.Fragment>
                                            ) :
                                            (<Text></Text>)
                                    }
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
    forgetText: {
        color: "#dfb924", alignSelf: "center", fontSize: 12
    },
    mlaText: {
        color: 'lightgoldenrodyellow', marginTop: 15, alignSelf: "center"
    }
})

export default withApollo(PersonalInfo);