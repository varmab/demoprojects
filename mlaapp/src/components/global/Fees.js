import React, { Component } from 'react';

import {
    Item,
    Picker,
    Icon
} from 'native-base'

class Fees extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feesCategories: props.feesCategories,
            feesAmounts: props.feesAmounts,
            feesAmount:0,
            feesCategory:''
        }
    }

    onFeesCategorySelected = (feesCategory) => {
        this.props.onFeesCategorySelected(feesCategory);
    }

    onFeesAmountSelected = (feesAmount) => {
        this.props.onFeesAmountSelected(feesAmount);
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
                        placeholder="Category"
                        selectedValue={this.state.feesCategory}
                        onValueChange={(value) => this.onFeesCategorySelected(value)}>
                        <Picker.Item label="Select Category" value=""/>
                        <Picker.Item label="Hourly" value="hourly"/>
                        <Picker.Item label="Daily" value="daily"/>
                    </Picker>
                </Item>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down" />}
                        style={{ width: undefined}}
                        textStyle={{color:"white"}}
                        placeholder="Amount"
                        selectedValue={this.state.feesAmount}
                        onValueChange={(value) => this.onFeesAmountSelected(value)}>
                        <Picker.Item label="Select Amount" value="" />
                        <Picker.Item label="Rs 2000" value="2000" />
                        <Picker.Item label="Rs 5000" value="5000" />
                    </Picker>
                </Item>
            </React.Fragment>
        )
    }
}

export default Fees;