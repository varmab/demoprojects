import React from 'react'

import {
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
    Dimensions,
    Text
} from 'react-native'

const {
    width,
    height
} = Dimensions.get('window');

const MLAButton = (props) => {
    return (
        <TouchableOpacity onPress={()=>props.onSubmit()} style={styles.button}>
            <View style={styles.buttonView}>
                <View style={styles.buttonLeftView}></View>
                <View style={styles.buttonMiddleView}>
                    <Text style={styles.buttonText}>{props.text}</Text>
                </View>
                <View style={styles.buttonRightView}>
                    <Image source={require('../../images/forward.png')} style={styles.forward} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonView: {
        flex: 1, flexDirection: "row"
    },
    buttonLeftView: {
        flex: 0.1, justifyContent: "center"
    },
    buttonMiddleView: {
        flex: 0.8, justifyContent: "center"
    },
    buttonRightView: {
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
    }
})

export default MLAButton;
