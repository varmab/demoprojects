import React, { Component } from 'react';

import {
    Item,
    Picker,
    Icon
} from 'native-base'

class StateDistrictsSelect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            states: props.states,
            districts: [],
            stateId: '',
            districtId: ''
        }
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps)
        this.setState({
            states: newProps.states
        })
    }

    onStateSelected = (id) => {
        var selectedState = this.state.states.find((state) => {
            return state.id === id
        })
        this.setState({
            districts: selectedState.districts,
            stateId:id
        })
        this.props.onStateSelected(id);
    }

    onDistrictSelected = (id) => {
        
        this.setState({
            districtId:id
        })

        this.props.onDistrictSelected(id);
    }

    render() {
        return (
            <React.Fragment>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down" />}
                        style={{ width: undefined }}
                        textStyle={{color:"white"}}
                        placeholder="State"
                        selectedValue={this.state.stateId}
                        onValueChange={(value) => this.onStateSelected(value)}>
                        <Picker.Item label="Select State" value=""/>
                        {
                            this.state.states.map((state) => (
                                <Picker.Item key={state.id} label={state.name} value={state.id} />
                            ))
                        }
                    </Picker>
                </Item>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down" />}
                        style={{ width: undefined}}
                        textStyle={{color:"white"}}
                        placeholder="District"
                        selectedValue={this.state.districtId}
                        onValueChange={(value) => this.onDistrictSelected(value)}>
                        <Picker.Item label="Select District" value="" />
                        {
                            this.state.districts.map((district) => (
                                <Picker.Item key={district.id} label={district.name} value={district.id} />
                            ))
                        }

                    </Picker>
                </Item>
            </React.Fragment>
        )
    }
}

export default StateDistrictsSelect;