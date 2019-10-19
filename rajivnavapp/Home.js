import React from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet

} from 'react-native'

class Home extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>Home</Text>
                <Button title="Go to About" onPress={()=>{
                    this.props.navigation.navigate("About");
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

export default Home;