
import React, { Component } from 'react';
import { createAppContainer, DrawerItems, } from 'react-navigation';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  Alert,
  Share,
  Image,
  Dimensions
} from 'react-native';


const WINDOW_WIDTH = Dimensions.get('window').width

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      userId: '',
      userType: ''
    }
  }

  getUserId = async () => {
    return await AsyncStorage.getItem('userId');
  }

  getUserType = async () => {
    return await AsyncStorage.getItem('userType');
  }

  componentWillMount() {
    this.getUserId()
      .then((userId) => {
        this.getUserType()
          .then((userType) => {
            console.log('userType ' + JSON.stringify(userType))
            this.setState({
              userId,
              userType
            })
          })
      })
  }

  render() {

    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'black', justifyContent: "flex-start" }}>
        <View style={{ flex: 1, flexDirection: 'row', height: WINDOW_WIDTH * 0.05, justifyContent: "center" }}>
          <Image style={{ width: 100, height: 100, marginTop: 40 }} source={require('../../images/logo.png')} />
        </View>
        <View style={{ flex: 4, flexDirection: 'row', justifyContent: "flex-start", alignItems: 'flex-start' }}>
          <ScrollView>
            { //Client Menu
              ((this.state.userId != null) && (this.state.userType.includes('client'))) && (
                <React.Fragment>
                  <View style={styles.menuView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyProfile')}>
                      <Text style={styles.menuText}>My Profile</Text>
                    </TouchableOpacity>
                  </View>
                  {/* <View style={styles.menuView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Wallet')}>
                      <Text style={styles.menuText}>Personal Wallet</Text>
                    </TouchableOpacity>
                  </View> */}
                  <View style={styles.menuView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyCases')}>
                      <Text style={styles.menuText}>My Cases</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.menuView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PayMLA')}>
                      <Text style={styles.menuText}>Pay MLA</Text>
                    </TouchableOpacity>
                  </View>

                </React.Fragment>
              )
            }

            { //Advocate menu
              ((this.state.userId != null) && (this.state.userType == 'advocate')) && (
                <React.Fragment>
                  <View style={styles.menuView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyProfile')}>
                      <Text style={styles.menuText}>My Profile</Text>
                    </TouchableOpacity>
                  </View>
                  {/* <View style={styles.menuView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Wallet')}>
                      <Text style={styles.menuText}>Personal Wallet</Text>
                    </TouchableOpacity>
                  </View> */}
                  <View style={styles.menuView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyCases')}>
                      <Text style={styles.menuText}>My Cases</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.menuView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PayMLA')}>
                      <Text style={styles.menuText}>Pay MLA</Text>
                    </TouchableOpacity>
                  </View>
                </React.Fragment>
              )
            }

            { //Agents menu
              ((this.state.userId != null) && (this.state.userType == 'agent')) && (
                <React.Fragment>
                  <View style={styles.menuView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyProfile')}>
                      <Text style={styles.menuText}>My Profile</Text>
                    </TouchableOpacity>
                  </View>
                  {/* <View style={styles.menuView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Wallet')}>
                      <Text style={styles.menuText}>Personal Wallet</Text>
                    </TouchableOpacity>
                  </View> */}
                  <View style={styles.menuView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyClients')}>
                      <Text style={styles.menuText}>My Clients</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.menuView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyLeads')}>
                      <Text style={styles.menuText}>My Leads</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.menuView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('PayMLA')}>
                      <Text style={styles.menuText}>Pay MLA</Text>
                    </TouchableOpacity>
                  </View>
                </React.Fragment>
              )
            }

            { //Auth menu
              (this.state.userId != null) ? (
                <View style={styles.menuView}>
                  <TouchableOpacity onPress={() =>
                    Alert.alert(
                      'Log out',
                      'Do you want to logout?',
                      [
                        { text: 'Cancel', onPress: () => { return null } },
                        {
                          text: 'Confirm', onPress: () => {
                            AsyncStorage.clear();
                            this.props.navigation.navigate('Auth')
                          }
                        },
                      ],
                      { cancelable: false }
                    )
                  }>
                    <Text style={{ marginLeft: 16, fontWeight: 'bold', fontSize:16, color: '#dfb924', marginTop: 16 }}>Log out</Text>
                  </TouchableOpacity>
                </View>
              )
                : (
                  <View style={styles.menuView}>

                    <TouchableOpacity onPress={() => {
                      this.props.navigation.navigate('Auth');
                    }
                    }>
                      <Text style={{ marginLeft: 16, fontWeight: 'bold', color: '#dfb924', marginTop: 16 }}>Login</Text>
                    </TouchableOpacity>
                  </View>
                )
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuView: {
    borderTopWidth: 1,
    borderTopColor: "white",
    marginTop: 20
  },
  menuText: {
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#dfb924',
    marginTop: 16
  }
})

