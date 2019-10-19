import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Header, Body, Button, Icon, Left, Right, Title, Text, StyleProvider } from 'native-base';
import { NavigationActions } from 'react-navigation';
import getTheme from '../../Themes/mla/components';
import platform from '../../Themes/mla/variables/platform'

class AppHeader extends Component {

    render() {
        let backAction = NavigationActions.back();
        return (
            <StyleProvider style={getTheme(platform)}>
                <Header>
                    {
                        (this.props.backButton == true) ?
                            (
                                <Left>
                                    <TouchableOpacity style={styles.backView} onPress={() => this.props.navigation.dispatch(backAction)} transparent>
                                        <Icon type="FontAwesome" style={styles.iconView} name='angle-left' /><Text style={styles.backText}>Back</Text>
                                    </TouchableOpacity>
                                </Left>
                            )
                            :
                            (
                                (this.props.homeButton == true) ?
                                    (
                                        <Left>
                                            <TouchableOpacity style={styles.backView} onPress={() => this.props.navigation.navigate('App')} transparent>
                                                <Icon type="FontAwesome" style={styles.iconView} name='angle-left' /><Text style={styles.backText}>Home</Text>
                                            </TouchableOpacity>
                                        </Left>

                                    )
                                    :
                                    (
                                        <Left>
                                            <Button onPress={() => this.props.navigation.openDrawer()} transparent>
                                                <Icon name='menu' />
                                            </Button>
                                        </Left>
                                    )

                            )
                    }

                    <Body>
                        <Title>{this.props.title}</Title>
                    </Body>

                    {
                        (this.props.addButton == true) ?
                            (
                                <Right>
                                    {/* <Button onPress={() => this.props.onRefresh()} transparent>
                                <Icon type="FontAwesome" name="refresh"/>
                            </Button> */}
                                    <Button onPress={() => this.props.onAdd()} transparent>
                                        <Icon type="FontAwesome" name="plus" />
                                    </Button>
                                </Right>
                            )
                            :
                            (

                                (this.props.saveButton == true) ?
                                    (
                                        <Right>
                                            <Button onPress={() => this.props.onSave()} transparent>
                                                <Text>Done</Text>
                                            </Button>
                                        </Right>
                                    )
                                    :
                                    (
                                        <Right />
                                    )

                            )

                    }

                </Header>
            </StyleProvider>
        )
    }
}
const styles = StyleSheet.create({

    backView: {
        justifyContent: "center", alignItems: "center", flexDirection: "row"
    },
    iconView: {
        color: "white"
    },
    backText: {
        color: "white", textAlign: "center", marginLeft: 3
    }
});

export default AppHeader;
