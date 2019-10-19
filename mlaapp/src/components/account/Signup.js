import React, { Component } from 'react'
import PersonalInfo from './PersonalInfo';
import EmploymentInfo from './EmploymentInfo';
import ProfessionalInfo from './ProfessionalInfo'
import PaymentInfo from './PaymentInfo'
import Confirmation from './Confirmation'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { AsyncStorage } from 'react-native'
import {
    Alert
} from 'react-native'

const ALL_STATES = gql`
    query allStates {
        allStates(orderBy:name_ASC) {
            id
            name
            code
            districts(orderBy:name_ASC) {
                id
                name
                code
            }
        }
    }
  `

const ALL_COURTS = gql`
    query allCourts($districtId:ID){
        allCourts(filter:{district: {id: $districtId}}){
            id
            name
        }
    }
   `

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            states: [],
            courts: [],
            phone: props.phone,
            userType: props.userType.toLowerCase(),
            personalInfoSubmitted: false,
            professionalInfoSubmitted: false,
            employmentInfoSubmitted: false,
            paymentInfoSubmitted: false,
        }
    }

    componentDidMount() {
        this.props.client.query({
            query: ALL_STATES
        }).then((result) => {
            console.log(result)
            if (result.data.allStates.length > 0) {
                this.setState({
                    states: result.data.allStates
                })
            }
        })
    }

    getFormattedDate = (date) => {
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return month + day + year;
    }

    generateMlaId = (personalInfo) => {
        var userType = this.state.userType.toUpperCase().slice(0, 2);
        var id = Math.floor(1000 + Math.random() * 9000);
        console.log(personalInfo)
        var state = this.state.states.find((state) => {
            return state.id == personalInfo.stateId;
        })

        console.log(state)

        var district = state.districts.find((district) => {
            return district.id == personalInfo.districtId
        })

        console.log(district)
        console.log(userType)
        var mlaId = userType + this.getFormattedDate(new Date()) + state.code.toUpperCase() + district.code.toUpperCase() + id;

        console.log(mlaId)

        return mlaId;
    }

    onPersonalInfoSubmitted = (personalInfo) => {
        console.log(personalInfo)

        this.props.client.mutate({
            mutation: gql`mutation createUser($phone: String!,$password: String!) {
                                    createUser(authProvider: { email: { email:$phone, password: $password } }) {
                                        id
                                    }
                                }`,
            variables: { phone: this.state.phone, password: personalInfo.password },
        }).then((user) => {
            console.log(user)
            var mlaId = this.generateMlaId(personalInfo)
            //var mlaId = "XXXX"
            console.log(mlaId)
            this.props.client.mutate({
                mutation: gql`
                    mutation createUserProfile(
                        $firstName: String
                        $lastName: String
                        $email: String
                        $phoneNumber: String
                        $userType: String
                        $stateId: ID
                        $districtId: ID
                        $userId:ID,
                        $mlaId:String,
                        $profilePhoto:String
                    ) {
                        createUserProfile(
                            firstName: $firstName
                            email: $email
                            lastName: $lastName
                            phoneNumber: $phoneNumber
                            userType: $userType
                            stateId: $stateId
                            districtId: $districtId
                            userId: $userId
                            mlaId: $mlaId,
                            profilePhoto:$profilePhoto
                        ) {
                            id
                        }
                    }
                `,
                variables: {
                    firstName: personalInfo.firstName,
                    lastName: personalInfo.lastName,
                    email: personalInfo.email,
                    phoneNumber: this.state.phone,
                    userType: this.props.userType,
                    stateId: personalInfo.stateId,
                    districtId: personalInfo.districtId,
                    userId: user.data.createUser.id,
                    mlaId: mlaId,
                    profilePhoto: personalInfo.profilePhoto
                }
            })
                .then(async (userProfile) => {
                    console.log(userProfile)
                    if (userProfile.data.createUserProfile.id) {
                        await AsyncStorage.setItem('userId', user.data.createUser.id);
                        await AsyncStorage.setItem('userProfileId', userProfile.data.createUserProfile.id);

                        this.setState({
                            personalInfoSubmitted: true
                        });
                    }
                })
                .catch((err) => {
                    console.log(JSON.stringify(err));
                });

        }).catch((err) => {
            Alert.alert(
                'Registration failed',
                "The mobile number you have entered is already registered.",
                [
                    { text: 'OK', onPress: () => { } },
                ],
                { cancelable: false }
            )
            console.log(JSON.stringify(err));
        });

    }

    onEmploymentInfoSubmitted = async (employmentInfo) => {

        var profileId = await AsyncStorage.getItem('userProfileId');

        this.props.client.mutate({
            mutation: gql`
                    mutation updateUserProfile(
                        $aadharNumber: String
                        $aadharPhoto: String
                        $bankAccountNumber: String
                        $bankIfscCode: String
                        $id:ID!
                    ) {
                        updateUserProfile(
                            aadharNumber: $aadharNumber
                            aadharPhoto: $aadharPhoto
                            bankAccountNumber: $bankAccountNumber
                            bankIfscCode: $bankIfscCode,
                            id:$id
                        ) {
                            id
                        }
                    }
                `,
            variables: {
                aadharNumber: employmentInfo.aadharNumber,
                aadharPhoto: employmentInfo.aadharPhoto,
                bankAccountNumber: employmentInfo.bankAccountNumber,
                bankIfscCode: employmentInfo.bankIfscCode,
                id: profileId
            }
        }).then(async (userProfile) => {
            console.log(userProfile)
            if (userProfile.data.updateUserProfile.id) {
                this.setState({
                    employmentInfoSubmitted: true
                });
            }
        }).catch((err) => {
            console.log(JSON.stringify(err));
            Alert.alert(
                'Registration failed',
                "Unable to update employment info. Please verify and try again.",
                [
                    { text: 'OK', onPress: () => { } },
                ],
                { cancelable: false }
            )
            console.log(JSON.stringify(err));
        });
    }

    onPaymentInfoSubmitted = () => {
        this.setState({
            paymentInfoSubmitted: true
        })
    }

    onProfessionalInfoSubmitted = () => {
        this.setState({
            professionalInfoSubmitted: true
        })
    }

    render() {
        if (this.state.personalInfoSubmitted == false) {
            return (<PersonalInfo
                onPersonalInfoSubmitted={this.onPersonalInfoSubmitted}
                userType={this.state.userType}
                phone={this.state.phone}
                states={this.state.states}
            />)
        }
        else if (((this.state.userType === "agent") || (this.state.userType === "employee")) && (this.state.employmentInfoSubmitted == false)) {
            return (<EmploymentInfo onEmploymentInfoSubmitted={this.onEmploymentInfoSubmitted} />)
        }
        // else if (((this.state.userType === "client-individual") || (this.state.userType === "client-company")) && (this.state.paymentInfoSubmitted == false)) {
        //     return (<PaymentInfo userType={this.state.userType} onPaymentInfoSubmitted={this.onPaymentInfoSubmitted} />)
        // }
        else if ((this.state.userType === "advocate") && (this.state.professionalInfoSubmitted == false)) {
            return (<ProfessionalInfo onProfessionalInfoSubmitted={this.onProfessionalInfoSubmitted} />)
        }
        else {
            return (<Confirmation type="success" userType={this.state.userType} navigation={this.props.navigation} />)
        }
    }
}

export default withApollo(Signup);
