import React, { Component } from 'react'
import { ListItem, Left, Body, Right, Thumbnail, Text, Icon, Header, Item, Input, Button } from 'native-base';
import { ActivityIndicator, StyleSheet, TouchableOpacity, Platform, Linking, Alert, FlatList, View, RefreshControl, ScrollView, AsyncStorage } from 'react-native'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import call from 'react-native-phone-call';
import ActionSheet from 'react-native-actionsheet'

const ALL_LEADS_QUERY = gql`
    query leads($userId:ID!) {
        allLeads(filter:{
            user:{
                id:$userId
            }
        })
        {
            id
            firstName
            lastName
            mobileNumber
            user {
                id
            }
        }
    }
`

const SEARCH_LEADS_QUERY = gql`
    query leads($searchTerm:String,$userId:ID) {
        allLeads(filter:{
            AND: [{
                firstName_contains: $searchTerm
              }, {
                user:{
                    id: $userId
                }
              }]
        })
        {
            id
            firstName
            lastName
            mobileNumber
            user {
                id
            }
        }
    }
`

const Styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        paddingTop: 0,
    },
});

const { viewStyle } = Styles;

class Cases extends Component {
    constructor() {
        super();
        this.state = {
            searchTerm: '',
            refreshing: false,
            userId: ''
        }
    }

    componentWillReceiveProps(newProps) {
        console.log(JSON.stringify(newProps))
        this.setState({
            refreshing: newProps.refreshing
        })
    }

    getUserId = async () => {
        return await AsyncStorage.getItem("userId");
    }

    componentDidMount() {
        this.getUserId()
            .then((userId) => {
                this.setState({
                    userId
                })
            })
    }

    onSearchChange = (t) => {
        this.setState({
            searchTerm: t
        })
    }

    callLead = (phone) => {
        //handler to make a call
        const args = {
            number: phone,
            prompt: false,
        };

        call(args).catch(console.error);

    }

    _renderItem = ({ item }) => {
        return (
            <ListItem key={item.id} avatar>
                <Left>
                    <Thumbnail source={require('../../images/placeholder-person.png')} />
                </Left>
                <Body>
                    <Text>{item.firstName}</Text>
                    <Text note>{item.lastName}</Text>
                </Body>
                <Right>
                    <TouchableOpacity onPress={() => {
                        this.ActionSheet.show()
                    }}>
                        <Text note><Icon type="FontAwesome" name="user-plus" /></Text>
                    </TouchableOpacity>
                </Right>
            </ListItem>
        )
    }

    _keyExtractor = (contact, index) => contact.id;

    _onRefresh(refetch) {
        console.log("_onRefresh")
        this.setState({
            refreshing: true
        }, () => {
            refetch()
                .then(() => {
                    this.setState({
                        refreshing: false
                    })
                })
        })
    }

    render() {
        return (
            <React.Fragment>
                <Header searchBar rounded style={viewStyle}>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" onChangeText={(text) => this.onSearchChange(text)} />
                        <Icon name="ios-people" />
                    </Item>
                    <Button onPress={this.onSearch} transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <ScrollView>
                    <Query query={(this.state.searchTerm === '') ? ALL_LEADS_QUERY : SEARCH_LEADS_QUERY} variables={{ searchTerm: this.state.searchTerm, userId: this.state.userId }}>
                        {({ data, loading, error, refetch }) => {
                            console.log('rendering data...' + JSON.stringify(this.state.refreshing))
                            return (
                                <View style={styles.container}>
                                    {loading && <ActivityIndicator size="large" />}
                                    {error && <Text>Error...{JSON.stringify(error)}</Text>}
                                    {!loading &&
                                        !error && (
                                            <FlatList
                                                data={data.allLeads}
                                                keyExtractor={this._keyExtractor}
                                                renderItem={this._renderItem}
                                                onRefresh={() => this._onRefresh(refetch)}
                                                refreshing={this.state.refreshing}
                                            />
                                        )}
                                </View>
                            );
                        }}
                    </Query>
                </ScrollView>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'What you want to do?'}
                    options={['Register as client', 'Cancel']}
                    cancelButtonIndex={1}
                    onPress={(index) => { 
                        this.props.navigation.navigate("Payment");
                    }}
                />
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    },
});

export default Cases;