import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'react-apollo';
import { store } from '../../redux_mla'

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

class District extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataType: props.dataType
		}
	}

	onDistrictSelected = () => {
		this.props.onDistrictSelected(this.props.id);
	}

	render() {
		console.log(this.props.count)
		return (
			<View style={styles.item}>
				<TouchableHighlight onPress={this.onStateSelected}>
					<ImageBackground
						source={require('../../images/frame1.png')}
						imageStyle={{ resizeMode: 'stretch' }}
						style={{ width: 100, height: 100, justifyContent: "center", alignItems: "center" }}
					>
						<View style={{justifyContent:'center',alignItems:'center'}}>
							<Text style={{ color: "white" }}>{this.props.name}</Text>
							{(this.props.count !== null && this.props.count !== 0) && <Text style={{ color: 'white'}}>{this.props.count}</Text>}
						</View>
					</ImageBackground>
				</TouchableHighlight>
			</View >
		);
	}
}

class Districts extends Component {
	static propTypes = {
		data: PropTypes.shape({
			loading: PropTypes.bool,
			error: PropTypes.object,
			allDistricts: PropTypes.array
		})
	};

	constructor(props) {
		super(props);
		this.state = {
			districts: [],
			stateName: '',
			dataType: props.dataType
		};
	}

	onDistrictSelected = (id) => {
		console.log('Districts:onDistrictsSelected-' + id);
		this.props.onDistrictSelected(id);
	}

	componentWillReceiveProps(newProps) {
		console.log('newProps:' + JSON.stringify(newProps));
		if (newProps.data.allDistricts) {
			this.setState({
				districts: newProps.data.allDistricts,
				stateName: newProps.data.allDistricts[0].state.name
			});
		}
	}

	_keyExtractor = item => {
		return item.id;
	};

	_renderItem = data => {
		const item = data.item;
		var count = 0;
		switch (this.state.dataType) {
			case "agent":
				item.count = item.agentsCount;
				break;
			case "advocate":
				item.count = item.advocatesCount;
				break;
			case "client":
				item.count = item.clientsCount;
				break;
			case "lead":
				item.count = item.leadsCount;
				break;
			default:
				item.count = 0;
		}
		console.log(item.count);
		return (
			<View style={styles.item}>
				<District {...item} onDistrictSelected={this.onDistrictSelected} />
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

	
	render() {
		return (
			<View style={styles.container}>
				<ImageBackground
					source={require('../../images/ipcTopBg.png')}
					imageStyle={{ resizeMode: 'stretch' }}
					style={styles.stateFrame}
					>
					<View style={{marginBottom:width/37.5}}>
						<Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.stateName}</Text>
					</View>
                </ImageBackground>
				<FlatList
					style={styles.listContainer}
					data={this.state.districts}
					keyExtractor={this._keyExtractor}
					renderItem={this._renderItem}
					getItemLayout={this._getItemLayout}
					numColumns={2}
				/>
			</View>
		);
	}
}


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
	stateFrame: {
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

const DISTRICTS_QUERY = gql`
	query allDistricts($stateId: ID) {
		allDistricts(filter: { state: { id: $stateId } }, orderBy: name_ASC) {
			id
			name
			code
			state {
				name
			}
			clientsCount,
			advocatesCount,
			agentsCount,
			leadsCount
		}
	}
`;

export default compose(
	graphql(DISTRICTS_QUERY, {
		options: (ownProps) => ({
			variables: {
				stateId: ownProps.stateId
			}
		})
	})
)(Districts);