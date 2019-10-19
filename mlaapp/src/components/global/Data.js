import React, { Component } from 'react'

import States from './States';
import Districts from './Districts';
import CourtTypes from './CourtTypes'
import AllData from './AllData';

import { store } from '../../redux_mla'

class Data extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            stateId: '',
            districtId: '',
            loading: false,
            userSubmitted: false,
            dataType: props.dataType,
            courtType: props.courtType
        }

        store.subscribe(()=>{
            var latestState=store.getState();
            this.setState({
                stateId:latestState.stateId
            })
        })
    }

    onStateSelected = (stateId) => {
        console.log('Selected state:' + stateId)
        this.setState(
            {
                stateId
            },
            () => {
                store.dispatch({ type: 'SELECT_STATE', stateId });
            }
        );
    }

    onDistrictSelected = (districtId) => {
        this.setState(
            {
                districtId
            },
            () => {
                store.dispatch({ type: 'SELECT_DISTRICT', districtId });
            }
        );
    }

    onCourtTypeSelected = (courtType) => {
        this.setState({
            courtType
        },
            () => {
                store.dispatch({ type: 'SELECT_COURT_TYPE', courtType });
            });
    }

    componentWillReceiveProps(newProps){
        console.log('received new props' + JSON.stringify(newProps))
    }

    render() {
        if (this.state.dataType == 'advocate') {
            if (this.state.courtType == '') {
                return (
                    <CourtTypes navigation={this.props.navigation} onCourtTypeSelected={this.onCourtTypeSelected} />
                );
            }
            else if (this.state.courtType == 'sc') {
                return (
                    <AllData dataType={this.state.dataType} courtType="sc" />
                );
            }
            else if (this.state.courtType == 'hc') {
                if (this.state.stateId == '') {
                    return (
                        <States navigation={this.props.navigation} onStateSelected={this.onStateSelected} courtType="HC" />
                    );
                }
                else {
                    return (
                        <AllData stateId={this.state.stateId}
                            dataType={this.state.dataType} courtType="hc" />
                    );
                }
            }
            else {
                return (
                    <AllData stateId={this.state.stateId}
                        dataType={this.state.dataType} courtType="dc" />
                );
            }
        }
        else {
            console.log('Current stateid:' + this.state.stateId);
            if (this.state.stateId == '') {
                return (
                    <States navigation={this.props.navigation} onStateSelected={this.onStateSelected} />
                );
            }
            else {
                return (
                    <Districts navigation={this.props.navigation} stateId={this.state.stateId} onDistrictSelected={this.onDistrictSelected} dataType={this.state.dataType} />
                );
            }
        }

    }
}

export default Data;