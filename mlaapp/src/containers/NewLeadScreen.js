import React from 'react';
import { Container } from 'native-base';
import NewLead from '../components/mymla/NewLead'
import AppHeader from '../components/global/AppHeader'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'react-apollo';
import { AsyncStorage, Alert } from "react-native"

const CREATE_LEAD = gql`
  mutation createLead(
    $firstName:String!,
    $lastName:String!,
    $mobileNumber:String,
    $email:String,
    $address:String,
    $state:String,
    $district:String,
    $caseNumber:String,
    $caseDetails:String,
    $caseType:String,
    $businessName:String,
    $courtDetails:String,
    $businessType:String,
    $remarks:String,
    $followupDate:String,
    $userId:ID!) 
  {
    createLead(
        firstName:$firstName,
        lastName:$lastName,
        mobileNumber:$mobileNumber,
        email:$email,
        address:$address,
        state:$state,
        district:$district,
        caseNumber:$caseNumber,
        caseDetails:$caseDetails,
        caseType:$caseType,
        businessName:$businessName,
        courtDetails:$courtDetails,
        businessType:$businessType,
        remarks:$remarks,
        followupDate:$followupDate,
        userId:$userId
    ) 
    {
      id
    }
  }
  `
class NewLeadScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Add New Lead'
    };

    constructor() {
        super();

        this.state = {
            lead: {},
            isSaved: false
        }
    }

    getUserId=async ()=>{
        return await AsyncStorage.getItem("userId")
    }

    componentWillMount(){
        this.getUserId()
        .then((userId)=>{
            console.log('userId' + userId)
            if (userId === null) {
                Alert.alert("Alert", "You are required to login to add new leads.");
                this.props.navigation.navigate("Auth")
            }
        }) 
    }

    onSave = async () => {
        var userId = await AsyncStorage.getItem("userId")
        if (userId !== '') {
            this.props.createLead({
                variables: {
                    userId,
                    firstName: this.state.lead.firstName,
                    lastName: this.state.lead.lastName,
                    mobileNumber: this.state.lead.mobileNumber,
                    email: this.state.lead.email,
                    address: this.state.lead.address,
                    state: this.state.lead.state,
                    district: this.state.lead.district,
                    caseNumber: this.state.lead.caseNumber,
                    caseDetails: this.state.lead.caseDetails,
                    caseType: this.state.lead.caseType,
                    businessName: this.state.lead.businessName,
                    courtDetails: this.state.lead.courtDetails,
                    businessType: this.state.lead.businessType,
                    remarks: this.state.lead.remarks,
                    followupDate: this.state.lead.followupDate,
                }
            })
                .then((result) => {
                    console.log(result.data.createLead.id)
                    if (result.data.createLead.id) {
                        Alert.alert(
                            'New Lead is saved successful',
                            'Thank you for sending new lead to MLA',
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        this.setState({
                                            lead: {},
                                            isSaved: true
                                        }, () => {
                                            this.props.navigation.navigate("Leads");
                                        })
                                    }
                                },
                            ],
                            { cancelable: false }
                        )
                    }
                })
                .catch((err) => {
                    Alert.alert(
                        'New lead saving failed' + JSON.stringify(err),
                        'Failed to add new lead, Please try again later.',
                        [
                            { text: 'OK', onPress: () => { } },
                        ],
                        { cancelable: false }
                    )
                })
        }
        else {
            Alert.alert("Alert", "You are required to login to add new leads.");
            this.props.navigation.navigate("Auth")
        }
    }

    onLeadChange = (lead) => {
        this.setState({
            lead
        })
    }

    render() {
        return (
            <Container>
                <AppHeader title="New Lead" navigation={this.props.navigation} saveButton={true} onSave={this.onSave} />
                <NewLead onLeadChange={this.onLeadChange} isSaved={this.state.isSaved} />
            </Container>
        );
    }
}

export default compose(
    graphql(CREATE_LEAD, { name: 'createLead' }),
)(NewLeadScreen);