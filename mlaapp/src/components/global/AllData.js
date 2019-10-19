import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'react-apollo';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
    Dimensions
} from 'react-native';
import { Container } from 'native-base';
import Data from './Data';
import axios from 'axios';
const { width, height } = Dimensions.get('window');

// import PageTitle from './PageTitle';
// import ProfileGrid from '../Global/ProfileGrid'
var advocateNames = [
    {
        id: 1,
        name : "Venkata Prasad"
    },
    {   
        id : 2,
        name : "Kasi"
    },
    {
        id : 3,
        name : "Varma "
    },
    {
        id : 4,
        name : "Anil"
    },
    {
        id: 5,
        name: "Coding Sastra"
    },
    {
        id: 6,
        name: "Stellen soft"
    }
]

class AllData extends Component {
    static propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool,
            error: PropTypes.object,
            allUserProfiles: PropTypes.array,
            stateId: PropTypes.string,
            districtId: PropTypes.string,
            courtType: PropTypes.string
        })
    };

    constructor(props) {
        super(props);

        this.page=1;
        this.state = {
            stateId: props.stateId,
            districtId: props.districtId,
            courtType: props.courtType,
            userProfiles: [],
            advocates: [],
            dataType: props.dataType,
            loading: false,
            error: '',
            pageTitle: '',
            districtName: '',
            advocateList: advocateNames, 
        };
    }

    // componentWillReceiveProps(newProps) {
    //     console.log(newProps.data)
    //     this.setState({
    //         userProfiles: newProps.data.allUserProfiles,
    //         advocates: newProps.data.allAdvocates,
    //         districtName: newProps.data.allDistricts[0].name
    //     }, () => {
    //         var pageTitle = ''
    //         switch (this.state.dataType) {
    //             case "agent":
    //                 pageTitle = "Agents";
    //                 break;
    //             case "advocate":
    //                 pageTitle = "Advocates";
    //                 break;
    //             case "client":
    //                 pageTitle = "Clients";
    //                 break;
    //             case "placementconsultant":
    //                 pageTitle = "Placement Consultants";
    //                 break;
    //             default:
    //                 pageTitle = "Data"
    //         }

    //         this.setState({
    //             pageTitle: `${this.state.districtName}
    //                         ${pageTitle}`
    //         })
    //     })
    // }

    componentWillMount() {
        this.fetchAdvocate(this.page)
    }

    fetchAdvocate(page){
        const url = "";
        this.setState({ loading: true })
        axios.get(url)
            .then(res => {
                let listData = this.state.advocateList;
                let data = listData.concat(res.advocateList.advocates)
                this.setState({ loading: false, advocateList: data })
            })
            .catch(error => {
                this.setState({ loading: false, error: 'something just went wrong' })
            });
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => {
       console.log('name',item);
        return(
        <View style={{margin:10}}>
            <Text style={styles.advocateName}>{item.name}</Text>
        </View>
       )
    }

    handleLoadMore = () => {
        if (!this.state.loading) {
            this.page = this.page + 1;
            this.fetchAdvocate(this.page);
        }
    }

    renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
         if (!this.state.loading) 
         return  (
             <TouchableOpacity>
                <Text>Load More</Text> 
            </TouchableOpacity>
         );
         return (
           <ActivityIndicator
             style={{ color: '#000' }}
           />
         );
       };
     
    

    render() {
        if (this.state.loading && this.page === 1) {
            return <View style={{
                width: '100%',
                height: '100%'
            }}><ActivityIndicator style={{ color: '#000'}} /></View>
        }
        return (
            <View style={styles.container}>
                {/* <Text>{this.state.courtType}</Text> */}
                {/* <PageTitle title={this.state.pageTitle} />
                <ProfileGrid profiles={this.state.userProfiles}/> */}
                <ImageBackground
                    source={require('../../images/ipcTopBg.png')}
                    style={styles.paymentFrame}
                    >
                    <View style={{ marginBottom: width / 25 }}>
                        <Text style={styles.advocatesText}>Advocates</Text>
                    </View>
                </ImageBackground>
                
                <FlatList
                    data={this.state.advocateList}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    onEndReached={this.handleLoadMore.bind(this)}    
                />
                
            </View>
        )
    }
}

const DATA_QUERY = gql`
    query allData($districtId: ID, $dataType: String, $courtType: String){
        allAdvocates(filter: { courtType:$courtType,district:  {id :$districtId} }){
            id
            enrollmentNumber
            name
            courtType
            state {
                id
                name
            }
            district {
                id
                name
            }
        }

        allDistricts(filter:{id :$districtId}){
            id
            name
        }

        allUserProfiles(filter:{userType: $dataType, district:  {id :$districtId}}){
            id
            userType
            firstName
            lastName
            mlaId
            state {
                id
                name
            }
            district {
                id
                name
            }
        }
    }
`

export default AllData;

// export default 
//     compose(
//         graphql(DATA_QUERY, {
//             options: (ownProps) => {
//                 console.log(ownProps)
//                 return {
//                     variables: {
//                         dataType: ownProps.match.params.type,
//                         courtType: ownProps.courtType,
//                         stateId: ownProps.stateId,
//                         districtId: ownProps.districtId,
//                     }
//                 }
//             }
//         })(AllData)
// );

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        backgroundColor: 'black'
    },
    paymentFrame: {
        marginTop:width/37.5,
        width: width/2.2,
        height: width/3,
        justifyContent: "center",
        alignItems: "center"
    },
    advocatesText: {
        color: '#EDC629', fontWeight: 'bold', fontSize: 16
    },
    advocateName: {
        color: 'white', fontSize: 20
    }
})
