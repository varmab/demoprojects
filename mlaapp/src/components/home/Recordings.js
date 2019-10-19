import React, { Component } from 'react'
import {
    StyleSheet
} from 'react-native'

import { Image,ImageBackground, ActivityIndicator, FlatList } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Video from 'react-native-video'

import {timeSince} from '../../utils'

const Recording = ({ recording }) => {
    return (
        <Card style={{backgroundColor: '#DDD'}}>
            <CardItem cardBody>
                <ImageBackground source={require('../../images/placeholder-image.png')} style={{ height: 200, width: null, flex: 1 }}>
                </ImageBackground>
            </CardItem>
        </Card>
    )
}

const APP_APPRECORDINGS_QUERY = gql`
    query allAppRecordings ($userId: ID!) {
        allAppRecordings(filter: {user:{id:$userId}},orderBy: createdAt_DESC){
            id
            url
            createdAt
            user {
                id
            }
        }
    }
`

class Recordings extends Component {
    constructor() {
        super();
        this.state = {
            refreshing: false,
            userId:''
        }
    }

    getUserId=async ()=>{
        var userId = await AsyncStorage.getItem("userId")
        this.setState({
            userId
        })
    }

    componentWillReceiveProps(newProps) {
        console.log(JSON.stringify(newProps))
        this.setState({
            refreshing: newProps.refreshing
        })
    }

    _keyExtractor = (item) => item.id;

    _renderItem = ({ item }) => {
        console.log(JSON.stringify(item))
        return (<Recording recording={item} />)
    }

    render() {
        return (
            <React.Fragment>
                <Query query={APP_APPRECORDINGS_QUERY} variables={{userId:this.state.userId}}>
                    {({ data, loading, error, refetch }) => {
                        if (loading) return <ActivityIndicator size="large" />;
                        if (error) return <Text>Error...{JSON.stringify(error)}</Text>;
                        console.log(JSON.stringify(data.allPhotos))
                        return (
                            <FlatList
                                data={data.allAppRecordings}
                                keyExtractor={this._keyExtractor}
                                renderItem={this._renderItem}
                                onRefresh={() => {
                                    console.log("onRefresh fired")
                                    refetch()
                                    .then(()=>{
                                        this.setState({
                                            refreshing: false
                                        })
                                    });
                                }}
                                refreshing={this.state.refreshing}
                            />
                        )
                    }}
                </Query>
            </React.Fragment>
        )
    }
}

export default Recordings;

