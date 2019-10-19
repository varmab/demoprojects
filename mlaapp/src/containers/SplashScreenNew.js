import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  ImageBackground,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
const { width, height } = Dimensions.get('window');
class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    //const userToken = await AsyncStorage.getItem('userId');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate('App');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./../images/splash.png')} style={styles.imageStyles}>
        <ActivityIndicator style={{alignSelf:"center"}}/>
        <StatusBar barStyle="default"/>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"transparent"
  },
  imageStyles:{
    width: width,height: height
  }
});


export default AuthLoadingScreen;
