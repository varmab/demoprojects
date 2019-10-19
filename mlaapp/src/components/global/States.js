import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'react-apollo';
import {
    View,
    ImageBackground,
    Text,
    StyleSheet,
    Dimensions,
    Platform,
    FlatList,
    TouchableHighlight
} from 'react-native'

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
// const SCREEN_HEIGHT = width < height ? height : width;
const isSmallDevice = SCREEN_WIDTH <= 414;
const numColumns = isSmallDevice ? 2 : 3;
// item size
const PRODUCT_ITEM_HEIGHT = 100;
const PRODUCT_ITEM_OFFSET = 15;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;

class State extends Component {
    constructor(props) {
        super(props);
        this.onStateSelected = this.onStateSelected.bind(this);
    }

    onStateSelected() {
        this.props.onStateSelected(this.props.id);
    }

    render() {
        return (
            
            <View style={styles.item}>
                <TouchableHighlight onPress={this.onStateSelected}>
                    <ImageBackground on
                        source={require('../../images/frame1.png')}
                        imageStyle={{ resizeMode: 'stretch' }}
                        style={{ width: 100, height: 100, justifyContent: "center", alignItems: "center" }}
                        >
                        <View>
                            <Text style={{ color: "white" }}>{this.props.name}</Text>
                        </View>
                    </ImageBackground>
                </TouchableHighlight>
            </View>
           
        );
    }
}

class States extends Component {
    static propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool,
            error: PropTypes.object,
            allStates: PropTypes.array
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            states: [],
            loading: false
        };
        this.onStateSelected = this.onStateSelected.bind(this);
    }

    _keyExtractor = item => {
        return item.id;
    };

    _renderItem = data => {
        const item = data.item;
        return (
            <View style={styles.item}>
                <State {...item} onStateSelected={this.onStateSelected} />
            </View>
        );
    };

    _getItemLayout = (data, index) => {
        const productHeight = PRODUCT_ITEM_HEIGHT + PRODUCT_ITEM_MARGIN;
        return {
            length: productHeight,
            offset: productHeight * index,
            index,
        };
    };

    onStateSelected(id) {
        this.props.onStateSelected(id);
    }

    componentWillReceiveProps(newProps) {
        var states = newProps.data.allStates;
        this.setState({
            states,
            loading: true
        });
    }

    render() {

        return (
            <View style={styles.container}>
                <ImageBackground on
                        source={require('../../images/ipcTopBg.png')}
                        imageStyle={{ resizeMode: 'stretch' }}
                        style={styles.countryFrame}
                        >
                        <View style={{marginBottom:width/37.5}}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>INDIA</Text>
                        </View>
                </ImageBackground>
                <FlatList
                    style={styles.listContainer}
                    data={this.state.states}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    getItemLayout={this._getItemLayout}
                    numColumns={2}
                />
            </View>
        );
    }
}

const STATES_QUERY = gql`
	query allStates{
		allStates(orderBy: name_ASC) {
			id
			name
			code
		}
	}
`;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        alignItems:'center'
    },
    listContainer: {
        flex: 1,
        padding: PRODUCT_ITEM_OFFSET,
    },
    countryFrame: {
        marginTop:width/18.75,
        width: width/2.5,
        height: width/3.125,
        justifyContent: "center",
        alignItems: "center"
    },
    item: {
        margin: PRODUCT_ITEM_OFFSET,
        overflow: 'hidden',
        borderRadius: 3,
        width: (SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / numColumns -
            PRODUCT_ITEM_MARGIN,
        height: PRODUCT_ITEM_HEIGHT,
        flexDirection: 'column',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .2)',
                shadowOffset: { height: 0, width: 0 },
                shadowOpacity: 1,
                shadowRadius: 1,
            },
            android: {
                elevation: 1,
            },
        }),
    },
})

export default compose(graphql(STATES_QUERY))(States);
