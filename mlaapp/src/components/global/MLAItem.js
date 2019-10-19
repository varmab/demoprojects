import React from 'react'

import {
    TouchableOpacity,
    View,
    ImageBackground,
    StyleSheet,
    Text
} from 'react-native'

const MLAItem = (props) => {
    return (
        <TouchableOpacity onPress={() => props.onPress()} style={styles.item}>
            <ImageBackground
                source={{ uri: '../../images/frame1.png' }}
                imageStyle={{ resizeMode: 'stretch' }}
                style={styles.imageView}
            >
                <View style={styles.itemView}>
                    <Text style={styles.itemText}>{props.name}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemView: {
        flex: 1, flexDirection: "row", justifyContent: "center"
    },
    item: {
        width: 50,height: 44, backgroundColor: "black",  alignSelf: "center"
    },
    itemText: {
        color: "white", textAlign: "center"
    },
    imageView:{
        justifyContent: "center", alignItems: "center"
    }
})

export default MLAButton;
