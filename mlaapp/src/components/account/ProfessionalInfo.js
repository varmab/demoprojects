import React, { Component } from 'react'

import {
    StyleSheet, Dimensions,
    Image, Button, TextInput, View
} from 'react-native';

import {
    Content,
    Form,
    Item,
    Input,
    Picker,
    Icon,
    Textarea,
    Footer
} from 'native-base'

import Fees from '../global/Fees'
import MLAButton from '../global/MLAButton';

import { Formik } from 'formik';

class ProfessionalInfo extends Component {
    constructor() {
        super();

        this.state = {
            states: [],
            feesCategories: [],
            feesAmounts: [],
            consultationFeeCategories: [],
            consultationFeeAmounts: []
        }
    }

    onFeesCategorySelected = (feesCategory) => {

    }

    onFeesAmountSelected = (feesAmount) => {

    }

    onConsultationFeesAmountSelected = (feesAmount) => {

    }

    onConsultationFeesCategorySelected = (feesCategory) => {

    }

    render() {
        return (
            <Formik
                initialValues={{ areaOfPractice: '', lastName: '', password: '', mobileNumber: '' }}
                onSubmit={values => {
                    console.log(values)
                    this.props.onProfessionalInfoSubmitted(values)
                }}
            >
                {props => (
                    <React.Fragment>
                        <Content style={{
                            backgroundColor: "black"
                        }}>
                            <Form>
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="ios-arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Court"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        onValueChange={props.handleChange('areaOfPractice')}>
                                        <Picker.Item label="Select Area of Practice" value="" />
                                        <Picker.Item label="Supreme Court" value="sc" />
                                        <Picker.Item label="High Court" value="hc" />
                                        <Picker.Item label="District Court" value="dc" />
                                        <Picker.Item label="Criminal" value="cc" />
                                    </Picker>
                                </Item>
                                <Item>
                                    <Textarea rowSpan={5} colSpan={300} bordered placeholder="Enter brief bio here" onChangeText={props.handleChange('bio')} />
                                </Item>
                                <Item>
                                    <Fees
                                        feesCategores={this.state.feesCategories}
                                        feesAmounts={this.state.feesAmounts}
                                        onFeesCategorySelected={this.onFeesCategorySelected}
                                        onFeesAmountSelected={this.onFeesAmountSelected}
                                    />
                                </Item>
                                <Item>
                                    <Input placeholder="Experience" onChangeText={props.handleChange('experience')} />
                                </Item>
                                <Item>
                                    <Input placeholder="Working Hours" onChangeText={props.handleChange('workingHours')} />
                                </Item>
                                <Item>
                                    <Input placeholder="Languages Speak" onChangeText={props.handleChange('email')} />
                                </Item>
                                <Item>
                                    <Fees
                                        feesCategores={this.state.consultationFeeCategories}
                                        feesAmounts={this.state.consultationFeeAmounts}
                                        onFeesCategorySelected={this.onConsultationFeesCategorySelected}
                                        onFeesAmountSelected={this.onConsultationFeesAmountSelected}
                                    />
                                </Item>
                            </Form>
                        </Content>
                        <Footer style={{ backgroundColor: 'black' }}>
                            <MLAButton text="Next" onSubmit={props.handleSubmit} />
                        </Footer>
                    </React.Fragment>
                )}
            </Formik>
        )
    }
}

const styles = StyleSheet.create({
    logoStyles: {
        width: 200, height: 170, alignSelf: "center"
    },
})

export default ProfessionalInfo;