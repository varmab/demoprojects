import React, {Component} from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Alert, AsyncStorage} from 'react-native';
import { createDrawerNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { createAppContainer, DrawerItems, } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen'
import HomeScreen from './containers/HomeScreen';
import AboutScreen from './containers/AboutScreen';
import WebviewScreen from './containers/WebviewScreen';
import MyRecordingsScreen from './containers/MyRecordingsScreen'
import LoginScreen from './containers/LoginScreen';
import RegisterScreen from './containers/RegisterScreen';
import OTPScreen from './containers/OTPScreen';
import SplashScreenNew from './containers/SplashScreenNew';
import SideBar from './components/global/SideBar';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import NewLeadScreen from './containers/NewLeadScreen';
import MyLeadsScreen from './containers/MyLeadsScreen';
import MyCasesScreen from './containers/MyCasesScreen';
import JoinScreen from './containers/JoinScreen'
import SignupScreen from './containers/SignupScreen'
import NewCaseScreen from './containers/NewCaseScreen';
import DataScreen from './containers/DataScreen';
import PayMLAScreen from './containers/PayMLAScreen';


const link = new HttpLink(
	{
		uri: 'https://api.graph.cool/simple/v1/cjaxht0s52dbg01421uxhdzxv'
	},
	{
		headers: {
			Authorization:
				'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MTIwMzYyNTYsImNsaWVudElkIjoiY2o2dTg3eGo4MG11ajAxMTB6Y3Zud3V5ciJ9.e-64yVqF2D5M6BNujT2Ci9c4gocnLE2xibqMAk1IFCc'
		}
	}
);

const cache = new InMemoryCache();

//Create Apollo Client
const client = new ApolloClient({ link, cache });

const AppStack = createDrawerNavigator({
    Home: HomeScreen,
    About:AboutScreen,
    Data:DataScreen,
    MyLeads:MyLeadsScreen,
    MyCases:MyCasesScreen,
    AddLead:NewLeadScreen,
    AddCase:NewCaseScreen,
    MyRecordings:MyRecordingsScreen,
    Webview:WebviewScreen,
    PayMLA:PayMLAScreen
  },
  {
    initialRouteName:'Home',
    contentOptions: {
      activeTintColor :'#000000',
      inactiveTintColor :'#dfb924',
      activeBackgroundColor :'#dfb924',
      inactiveBackgroundColor :'#000000',
      itemStyle:{borderWidth:1,borderColor:"#dfb924"}
    },
    drawerLockMode: 'locked-closed',
    gesturesEnabled: false,
    contentComponent: props => <SideBar {...props} />,
  }
);

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
  Join: JoinScreen,
  Signup: SignupScreen,
  OTP:OTPScreen,
  
},{
    headerMode: 'none',
    initialRouteName:'Login',

  },);

const mainNavigator= createSwitchNavigator(
  {
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
);

const App = createAppContainer(mainNavigator);

class AppApollo extends Component{
	render(){
		return(
			<ApolloProvider client={client}>
				<App/>
			</ApolloProvider>
		)
	}
}

export default AppApollo;
