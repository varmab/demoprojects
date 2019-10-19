import React, { Component } from 'react'
import {
  View,
  WebView
} from 'react-native'

export default class Webview extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          startInLoadingState={true}
          source={{ uri: 'https://mla.us.com' }}
          style={{ marginTop: 20 }}
        />
      </View>
    )
  }
}
