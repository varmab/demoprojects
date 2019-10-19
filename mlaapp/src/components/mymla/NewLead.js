import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withApollo } from 'react-apollo';

import {
    TouchableOpacity,
    ActivityIndicator,
    Platform,
    View,
    Dimensions,
    StyleSheet,
    Alert,
    Image
} from 'react-native'

import {
    Content,
    Form,
    Item,
    Input,
    Button,
    Text,
    Picker,
    Textarea,
    Icon
} from 'native-base'

import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer';
import StateDistrictsSelect from '../global/StateDistrictsSelect';

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

const ALL_STATES = gql`
query allStates {
    allStates(orderBy:name_ASC) {
      id
      name
      districts(orderBy:name_ASC) {
        id
        name
      }
      caseTypes {
          id
          type
      }
    }
  }
  `
const ALL_COURTS = gql`
  query allCourts($districtId:ID)
   {
    allCourts(filter:{district: {id: $districtId}}){
        id
        name
      }
   }
   `

class NewLead extends Component {
    constructor(props) {
        super(props);

        var hcTypes = ["AC/CF", "ACP", "APPEAL", "ARB", "ARB/CF", "A.R.B.O.P.", "ARC", "AS", "ATA", "A.T.C.", "CA", "CASE", "CC", "CC.APT", "CC.LG", "CFR", "CMA", "COMCA", "COP", "CP", "CRIME NO", "CRLA", "CRLA.MU", "CRL.MP", "CRLMP.BAIL", "CRLRP", "CRLRP.MU", "DISPUTE", "DOP", "DRUGS AND COSMOTICS SC", "DVC", "EA", "EAS", "EASR", "EAT.APPEAL", "EC", "EC.APPEALS", "EIC", "ELECOP", "E.M.C", "EP", "ESI", "F1", "F2", "FCMC", "FCOP", "FCOS", "FILE", "GR", "GWOP", "HMOP", "IA", "ID", "IP", "ITA", "JCC", "LAOP", "LGOP", "LPC", "LRA", "LRAC", "MA", "MC", "MEMO", "MPID", "MVOP", "OA", "OP", "OPSR", "ORDER", "OS", "PC", "PLC", "POCSO SC", "PRC", "PROCEEDING NO", "RA", "RC", "RCA", "RCC", "RDO", "REVISION PETITION", "SC", "SCC", "SC.IE", "SC.MU", "SC.NDPS", "SC.SPL", "S.O.P", "SR", "STC", "TA", "T.R.CRLMP", "T.R.O.P.", "WA", "WC", "WCMP", "WP", "WPMP", "WP(TR)", "WTA"];
        var scTypes = ["A.R.B.O.P. ( ARBITIRATION OP)", "AS ( APPEAL SUIT )", "ATA (ANDHRA  TENANCY APPEAL )", "ATC (ANDHRA TENANCY CASE )", "CA ( COPY APPLICATION )", "CC ( CALENDAR  CASE )", "CC. APT ( CALENDAR CASE AP TRANSCO)", "CC.LG(CALENDAR CASE LAND GRABBING)", "CMA ( CIVIL MISCELLEANOUS APPEAL)", "CN (CRIME NUMBER)", "CRLA ( CRIMINAL APPEAL)", "CRLA.MU ( CRIMINAL APPEAL METROPOLITAN UNIT )", "CRL.MP ( CRIMINAL MP )", "CRLRP ( CRIMINAL REVISION PETITION )", "CRLRP.MU ( CRIMINAL REVISION PETITION METROPOLITAN )", "DVC ( DOMESTIC VOILENCE CASE )", "EAS ( ESTATE ABOLITION ACT )", "EAT.APPEAL ( APPEAL UNDER EAT ACT )", "EC.APPEALS ( EC ACT APPEALS )", "ELECOP ( ECETION OP )", "E.M.C.( ELECTRICITY MATER CASE )", "EP ( EXECUTION PETITION )", "E.S.I. ( EMPLYOEES STATE INSURANCE )", "F.C.O.P. ( FAMILY COURT OP)", "F.C.O.S. ( FAMILY COURT OS ) ", "G.W.O.P. ( GUARDIAN  AND WARDS OP )", "H.M.O.P. ( HINDU MARRIAGE OP )", "ID ( INDUSTRIAL DISPUTE )", "IP ( INSOLVENCY PETITION )", "JCC ( JUVENILE CALENDAR CASE )", "L.A.O.P. ( LAND ACQUISITION OP )", "L.G.O.P. ( LAND GRABBING PETITION )", "LPC ( LONG PENDING CASE )", "LRA ( LAND REFORMS APPEAL )", "LRAC ( LAND REFORMS APPEAL CASE )", "MC ( MAINTENANCE CASE ) ", "MPID ( MISC PETITION IN ID )", "MVOP ( MOTOR ACCIDENT OP )", "OP ( ORIGINAL PETITION )", "OS ( ORIGINAL SUIT )", "PLC ( PRE LITIGATION CASE )", "PRC ( PRIMARY REGISTERED CASE )", "RC ( REF. CHARGESHEET )", "RCA ( RENT APPEAL )", "RCC ( RENT CONTROL CASE )", "SC ( SESSION CASE )", "SCC ( SMALL CAUSE CASE ) ", "SC.IE ( SESSION CASE UNDER IN IE ACT)", "SC.MU(SESSION CASE METROPOLITAN UNIT)", "SC.NDPS ( SESSION CASE NDPS)", "SC.SPL ( SESSIONS CASE SC\\ST )", "S.O.P.( SUCCESSION OP ) ", "STC ( SUMMARY  TRAIL CASE ) ", "TROP ( TRANSFER OP )"]

        this.state = {
            hcTypes,
            scTypes,
            lead: {
                firstName: '',
                lastName: '',
                mobileNumber: '',
                alternativeNumber: '',
                email: '',
                address: '',
                stateId: '',
                districtId: '',
                courtId: '',
                caseNumber: '',
                caseDetails: '',
                courtType: '',
                caseType: '',
                businessName: '',
                courtDetails: '',
                businessType: '',
                remarks: '',
                followupDate: '',
                documents: []
            },
            states: [],
            courts: [],
            courtEstablishments:[],
            courtComplexes:[],
            imageSource: '',
            imageLoading: false,
            caseTypes:[]
        }
    }

    onChange = (fieldName, fieldValue) => {
        var lead = Object.assign({}, this.state.lead);
        lead[fieldName] = fieldValue;
        this.setState({
            lead
        }, () => {
            //this.props.onLeadChange(this.state.lead);
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

                                        var lead = Object.assign({}, this.state.lead);
                                        lead.documents.push(uploadedImage);
                                        this.setState({
                                            lead
                                        }, () => {
                                            //this.props.onLeadChange(this.state.lead);
                                        })

                                        this.setState({
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
                                    var lead = Object.assign({}, this.state.lead);
                                    lead.documents.push(uploadedImage);
                                    this.setState({
                                        lead
                                    }, () => {
                                        //this.props.onLeadChange(this.state.lead);
                                    })

                                    if (uploadedImage) {
                                        this.setState({
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
        var lead = Object.assign({}, this.state.lead);
        lead.stateId = id;
        this.setState({
            lead
        })

        var selectedState=this.state.states.filter((state)=>{
            return state.id==id;
        })

        if(selectedState){
            console.log(selectedState);
            this.setState({
                caseTypes:selectedState.caseTypes
            })
        }
    }

    onDistrictSelected = (id) => {

        var lead = Object.assign({}, this.state.lead);
        lead.districtId = id;
        this.setState({
            lead
        }, () => {
            this.props.client.query({
                query: ALL_COURTS,
                variables: { districtId: id }
            }).then((result) => {
                if (result.data.allCourts.length > 0) {

                    this.setState({
                        courts: result.data.allCourts
                    })
                }
            })
        })


    }

    componentDidMount() {
        // this.props.client.query({
        //     query: ALL_STATES
        // }).then((result) => {
        //     console.log(result)
        //     if (result.data.allStates.length > 0) {
        //         this.setState({
        //             states: result.data.allStates
        //         })
        //     }
        // })
    }

    componentWillReceiveProps(newProps){
        console.log(newProps)
        this.setState({
            states: newProps.allStates.allStates
        })
    }

    render() {
        return (
            <Content style={{
                backgroundColor: "black"
            }}>
                <Form>
                    <Item>
                        <StateDistrictsSelect states={this.state.states} onStateSelected={this.onStateSelected} onDistrictSelected={this.onDistrictSelected} />
                    </Item>
                    <Item>
                        <Input style={{ color: 'white' }} placeholder="Name" onChangeText={(text) => this.onChange('firstName', text)} />
                    </Item>
                    <Item>
                        <Input style={{ color: 'white' }} placeholder="Surname" onChangeText={(text) => this.onChange('lastName', text)} />
                    </Item>
                    <Item>
                        <Input style={{ color: 'white' }} placeholder="Email (optional)" onChangeText={(text) => this.onChange('email', text)} />
                    </Item>
                    <Item>
                        <Input style={{ color: 'white' }} placeholder="Mobile Number" onChangeText={(text) => this.onChange('mobileNumber', text)} />
                    </Item>
                    <Item>
                        <Textarea rowSpan={5} colSpan={300} bordered placeholder="Enter address, city, state and postal code" onChangeText={(text) => this.onChange('address', text)} />
                    </Item>

                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Court"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.lead.courtType}
                            onValueChange={(value) => this.onChange('courtType', value)}>
                            <Picker.Item label="Select Court Type" value="" />
                            <Picker.Item label="Supreme Court" value="sc" />
                            <Picker.Item label="High Court" value="hc" />
                            <Picker.Item label="District Court Complex" value="dcc" />
                            <Picker.Item label="District Court Establishment" value="dce" />
                            <Picker.Item label="Tribunal" value="tc" />
                        </Picker>
                    </Item>
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Select Court"
                            textStyle={{ color: "white" }}
                            selectedValue={this.state.lead.courtId}
                            onValueChange={(value) => this.onChange('courtId', value)}>
                            <Picker.Item label="Select Court" value="" />
                            {
                                (this.state.lead.courtType == "dcc") && this.state.courtComplexes.map((court) => {
                                    return <Picker.Item key={court.id} label={court.courtComplexTitle} value={court.id} />
                                })
                            }
                            {
                                (this.state.lead.courtType == "dce") && this.state.courtEstablishments.map((court) => {
                                    return <Picker.Item key={court.id} label={court.courtEstablishmentTitle} value={court.id} />
                                })
                            }
                        </Picker>
                    </Item>
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down" />}
                            style={{ width: undefined }}
                            placeholder="Case Type"
                            textStyle={{ color: "#bfc6ea" }}
                            >
                            <Picker.Item label="Case Type" value="" />
                            
                        </Picker>
                    </Item>
                    <Item>
                        <Input style={{ color: 'white' }} placeholder="Case Number/Year" onChangeText={(text) => this.onChange('caseNumber', text)} />
                    </Item>
                    <Item>
                        <Input style={{ color: 'white' }} placeholder="Company Name (optional)" onChangeText={(text) => this.onChange('businessName', text)} />
                    </Item>
                    <Item>
                        <Input style={{ color: 'white' }} placeholder="Company Type (optional)" onChangeText={(text) => this.onChange('businessType', text)} />
                    </Item>
                    <Item>
                        <Textarea style={{ color: 'white' }} rowSpan={5} colSpan={300} bordered placeholder="Enter notes to include more information." onChangeText={(text) => this.onChange('remarks', text)} />
                    </Item>
                    <Item>
                        <Input style={{ color: 'white' }} placeholder="Followup Date" onChangeText={(text) => this.onChange('followupDate', text)} />
                    </Item>
                    <View style={styles.topView}>
                        <TouchableOpacity onPress={this.pickImage}>
                            <Image source={require('../../images/placeholder-image.png')} style={styles.imageStyles} />
                            <View style={styles.iconView}>
                                <Icon name="camera" size={20} style={{ color: 'grey' }} />
                            </View>
                        </TouchableOpacity>
                        {
                            this.state.lead.documents.map((doc) => {
                                return <Image key={doc} source={{ uri: doc }} style={styles.imageStyles} />
                            })
                        }
                    </View>
                </Form>
            </Content>
        )
    }
}

const styles = StyleSheet.create({
    topView: {
        height: 250,
        width: width,
        justifyContent: "center",
        alignItems: 'center',
    },
    imageStyles: {
        height: 200,
        width: 320,
        justifyContent: "center"
    },
    iconView: {
        width: 25,
        height: 25,
        position: 'absolute',
        marginLeft: 160,
        marginTop: 160,
        justifyContent: 'flex-start'
    }
})


export default withApollo(compose(
    graphql(ALL_STATES,{name:'allStates'})
)(NewLead));

