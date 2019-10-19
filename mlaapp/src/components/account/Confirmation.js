import React from 'react'
import { Button, TextInput, Dimensions, Text, View, StyleSheet, Modal } from 'react-native';
import { Content } from 'native-base';
import MLAButton from '../global/MLAButton';
import { Formik } from 'formik';
const { width, height } = Dimensions.get('window');

class Confirmation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            caseModalVisible: false,
            leadModalVisible: false,
            userType: props.userType
        }
    }

    setLeadModalVisible = (visible) => {
        this.setState({ leadModalVisible: visible });
    }

    setCaseModalVisible = (visible) => {
        this.setState({ caseModalVisible: visible });
    }

    render() {
        return (
            <Content style={styles.container}>
                <View style={styles.container}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.caseModalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.modalView}>
                                <Text style={{ color: '#dfb924' }}>Choose type of case</Text>
                                <MLAButton text="Fresh Case" onSubmit={() => {
                                    this.setCaseModalVisible(false);
                                    this.props.navigation.navigate("AddCase", { fresh: true, userType: this.state.userType });
                                }} />
                                <MLAButton text="Existing(Old) Case" onSubmit={() => {
                                    this.setCaseModalVisible(false);
                                    this.props.navigation.navigate("AddCase", { fresh: false, userType: this.state.userType });
                                }} />
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.leadModalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.modalView}>
                                <Text style={{ color: '#dfb924' }}>Choose type of lead</Text>
                                <MLAButton text="Fresh Case" onSubmit={() => {
                                    this.setLeadModalVisible(false);
                                    this.props.navigation.navigate("AddLead", { fresh: true, userType: this.state.userType });
                                }} />
                                <MLAButton text="Existing(Old) Case" onSubmit={() => {
                                    this.setLeadModalVisible(false);
                                    this.props.navigation.navigate("AddLead", { fresh: false, userType: this.state.userType });
                                }} />
                            </View>
                        </View>
                    </Modal>
                    <Text style={styles.mlaTitle}>Thank You</Text>
                    {
                        ((this.props.userType == "client-individual") || (this.props.userType == "client-company")) &&
                        <React.Fragment>
                            <Text style={styles.mlaText}>
                                Welcome to MLA. Thank you for joining MLA as client.
                                Click below to record fresh or existing case information.
                                MLA Team will be in touch with you as soon as we receive
                                your case information.
                            </Text>
                            <MLAButton text="Add Court Case" onSubmit={() => this.setModalVisible(true)} />
                        </React.Fragment>

                    }
                    {
                        (this.props.userType == "advocate") &&
                        <Text style={styles.mlaText}>
                            Welcome to MLA. Thank you for joining MLA as advocate.
                            MLA will strive to bring cases/leads to get more business for you.
                            We look forward to work with you soon. Feel free to contact us for further information at info@mla.us.com.
                        </Text>
                    }
                    {
                        (this.props.userType == "agent") &&
                        <React.Fragment>
                            <Text style={styles.mlaText}>
                                Welcome to MLA. Thank you for joining MLA as agent.
                                Earn as you bring more leads to MLA. Please start sending leads
                                by clicking + on Leads. Call MLA Call Center to assist you any time for any help you need.
                                Your success is our success.
                            </Text>
                            <MLAButton text="Add New Lead" onSubmit={() => this.setModalVisible(true)} />
                        </React.Fragment>
                    }
                    {
                        (this.props.userType == "placementconsultant") &&
                        <Text style={styles.mlaText}>
                            Welcome to MLA. Thank you for joining MLA as placement agency.
                        </Text>
                    }
                    {
                        (this.props.userType == "employee") &&
                        <Text style={styles.mlaText}>
                            Welcome to MLA. Thank you for joining MLA as employee.
                        </Text>
                    }
                    <MLAButton text="Home" onSubmit={() => {
                        this.props.navigation.navigate("App");
                    }} />
                </View>
            </Content>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    imageStyles: {
        width: width, height: height - 25
    },
    logoStyles: {
        width: 200, height: 170, marginTop: 40, alignSelf: "center"
    },
    formStyles: {
        marginLeft: 20, marginRight: 20, marginTop: 20
    },
    labelColor: {
        color: "#dfb924"
    },
    iconStyles: {
        color: 'lightgrey'
    },
    buttonView: {
        flex: 1, flexDirection: "row"
    },
    loginLeftView: {
        flex: 0.1, justifyContent: "center"
    },
    loginMiddleView: {
        flex: 0.8, justifyContent: "center"
    },
    loginRight: {
        flex: 0.1, justifyContent: "center", alignItems: "flex-end"
    },
    forward: {
        width: 17 / 2, height: 37 / 2, marginRight: 15
    },
    button: {
        height: 44, backgroundColor: "#dfb924", width: width / 1.5, alignSelf: "center", marginTop: 20, borderRadius: 25
    },
    buttonText: {
        color: "black", textAlign: "center"
    },
    forgetText: {
        color: "#dfb924", alignSelf: "center", fontSize: 12
    },
    mlaText: {
        color: 'lightgoldenrodyellow', marginTop: 15, alignSelf: "center"
    },
    mlaTitle: {
        color: 'lightgoldenrodyellow', marginTop: 15, alignSelf: "center", fontSize: 24
    },
    modalView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black",
        height: '50%',
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#dfb924'
    }
});


export default Confirmation;