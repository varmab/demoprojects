import React from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet

} from 'react-native'

class About extends React.Component{
    static navigationOptions={
        title:'Details'
    }
    render(){
        return(
            <View style={styles.container}>
                <Text>About</Text>
                <Button title="Go back" onPress={()=>{
                    this.props.navigation.goBack();
                }}/>
            </View>
        )
    }
}

var styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default About;