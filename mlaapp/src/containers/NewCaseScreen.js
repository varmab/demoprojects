import React from 'react';
import { Container } from 'native-base';
import NewCase from '../components/mymla/NewCase'
import AppHeader from '../components/global/AppHeader'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'react-apollo';
import { AsyncStorage, Alert } from "react-native"

const CREATE_CASE = gql`
  mutation createCase(
    $state:String,
    $district:String,
    $caseNumber:String,
    $caseDetails:String,
    $caseType:String,
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
        remarks:$remarks,
        followupDate:$followupDate,
        userId:$userId
    ) 
    {
      id
    }
  }
  `
class NewCaseScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Add New Case'
    };

    constructor() {
        super();

        this.state={
            courtCase:{},
            isSaved:false
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

    onSave = async (caseInfo) => {
        var userId = await AsyncStorage.getItem("userId")
        if (userId !== '') {
            this.props.createLead({
                variables: {
                    userId,
                    state: caseInfo.state,
                    district: caseInfo.district,
                    caseNumber: caseInfo.caseNumber,
                    caseType: caseInfo.caseType,
                    remarks: caseInfo.remarks,
                    followupDate: caseInfo.followupDate,
                }
            })
                .then((result) => {
                    console.log(result.data.createLead.id)
                    if (result.data.createLead.id) {
                        Alert.alert(
                            'New Case is saved successfully',
                            'Thank you for sending case to MLA',
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        this.setState({
                                            courtCase: {},
                                            isSaved: true
                                        }, () => {
                                            this.props.navigation.navigate("Cases");
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
                        'New case saving failed' + JSON.stringify(err),
                        'Failed to add new case, Please try again later.',
                        [
                            { text: 'OK', onPress: () => { } },
                        ],
                        { cancelable: false }
                    )
                })
        }
        else {
            Alert.alert("Alert", "You are required to login to add a case.");
            this.props.navigation.navigate("Auth")
        }
    }

    onCourtCaseChange = (courtCase) => {
        this.setState({
            courtCase
        })
    }

    render() {
        return (
            <Container>
                <AppHeader title="New Case" navigation={this.props.navigation} saveButton={true} onSave={this.onSave} />
                <NewCase onCourtCaseChange={this.onCourtCaseChange} fresh={false} isSaved={this.state.isSaved}/>
            </Container>
        );
    }
}

export default compose(
    graphql(CREATE_CASE, { name: 'createCase' }),
)(NewCaseScreen);