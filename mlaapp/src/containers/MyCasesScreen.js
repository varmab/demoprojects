import React from 'react';
import { AsyncStorage, Alert} from 'react-native'
import { Container, Header, Title, Button, Left, Right, Body, Icon } from 'native-base';
import Leads from '../components/mymla/Leads'
import AppHeader from '../components/global/AppHeader'

class MyCasesScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'My Leads'
    };

    constructor() {
        super();

        this.state = {
            refreshing: false
        }
    }

    onAdd = () => {
        this.props.navigation.navigate("AddLead")
    }

    onRefresh = () => {
        this.setState({
            refreshing: true
        })
    }

    getUserId = async () => {
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

    render() {
        return (
            <Container>
                <AppHeader title="My Leads" navigation={this.props.navigation} addButton={true} onAdd={this.onAdd} onRefresh={this.onRefresh} />
                <Leads refreshing={this.state.refreshing} />
            </Container>
        );
    }
}

export default MyCasesScreen;