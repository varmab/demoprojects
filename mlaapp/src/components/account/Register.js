import React, { Component } from 'react'
import {
    StyleSheet, Dimensions,
    Image,
} from 'react-native';
import {
    Content,
    Form,
    Item,
    Input
} from 'native-base'

class Register extends Component {
    constructor(props) {
        super(props);

        console.log(props)

        this.state = {
            contact: {
                firstName: '',
                lastName: '',
                mobileNumber: '',
                state: '',
                district: '',
                email: '',
                password: ''
            }
        }
    }

    onChange = (fieldName, fieldValue) => {
        var contact = Object.assign({}, this.state.contact);
        contact[fieldName] = fieldValue;

        this.setState({
            contact
        }, () => {
            this.props.onRegisterChange(this.state.contact);
        })

    }

    render() {
        return (
            <Content style={{
                backgroundColor: "black"
            }}>
                <Image style={styles.logoStyles} source={require('../../images/logo.png')} />
                <Form>
                    <Item>
                        <Input style={{ color: 'white' }} placeholder="Name" onChangeText={(text) => this.onChange('firstName', text)} value={this.state.contact.firstName} />
                    </Item>
                    <Item>
                        <Input style={{ color: 'white' }} placeholder="Surname" onChangeText={(text) => this.onChange('lastName', text)} value={this.state.contact.lastName} />
                    </Item>
                    <Item>
                        <Input style={{ color: 'white' }} placeholder="Password" onChangeText={(text) => this.onChange('password', text)} value={this.state.contact.password} />
                    </Item>
                    <Item>
                        <Input style={{ color: 'white' }} placeholder="Mobile Number" onChangeText={(text) => this.onChange('mobileNumber', text)} value={this.props.phone} disabled />
                    </Item>
                </Form>
            </Content>
        )
    }
}
const styles = StyleSheet.create({
    logoStyles: {
        width: 200, height: 170, alignSelf: "center"
    },
})

export default Register;

