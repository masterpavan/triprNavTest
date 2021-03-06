import React from "react";
import { View, StyleSheet } from "react-native";
import {Button, FormLabel, FormInput} from 'react-native-elements'
import {triprTripController} from "../TripStackNavConfig";
import Metrics from "../../../Misc/Styles/Themes/Metrics";
import DatePicker from 'react-native-datepicker'
import formStyles from "../../../Misc/Styles/FormStyles";
import ValidationComponent from 'react-native-form-validator';

let AddTripStyles = StyleSheet.create({
    formContainer: {backgroundColor:'transparent', flex:1},
    dateFormsContainer: {
        flexDirection: 'row',
        flex: 0,
        height: 80,
        flexWrap: 'wrap',
    }
});

export default class AddTripComponent extends ValidationComponent {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            tripName: "",
            startDate: '',
            endDate: '',
            //tripDates, Icon, Other form inputs
        };

    }

    render() {
        console.log("addTrip state is:", this.state);
        return (
            <View style={AddTripStyles.formContainer}>
                <FormLabel containerStyle={formStyles.labelContainerStyle}
                           labelStyle={formStyles.labelStyle}>NAME YOUR TRIP</FormLabel>
                <FormInput containerStyle={formStyles.inputContainerStyle}
                           inputStyle={formStyles.inputStyle}
                           onChangeText={(text) => this.setState({tripName:text})} />
                <FormLabel containerStyle={formStyles.labelContainerStyle}
                           labelStyle={formStyles.labelStyle}>SELECT YOUR TRIP DATES</FormLabel>

                <View style={AddTripStyles.dateFormsContainer}>
                    <DatePicker
                        style={[formStyles.dateContainer,{marginLeft: 30,marginRight: 15}]}
                        date={this.state.startDate}
                        mode="date"
                        showIcon={false}
                        placeholder="Start Date"
                        format="MM-DD-YYYY"
                        minDate="2017-01-01"
                        maxDate="2019-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{dateInput: formStyles.dateInput}}
                        onDateChange={(date) => {this.setState({startDate: date})}}
                    />
                    <DatePicker
                        style={[formStyles.dateContainer,{marginLeft: 15,marginRight: 30}]}
                        date={this.state.endDate}
                        mode="date"
                        showIcon={false}
                        placeholder="End Date"
                        format="MM-DD-YYYY"
                        minDate="2017-01-01"
                        maxDate="2019-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{dateInput: formStyles.dateInput}}
                        onDateChange={(date) => {this.setState({endDate: date})}}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    flex: 1,
                    flexWrap: 'wrap'
                }}>
                    <Button
                        containerViewStyle={{width: (Metrics.screenWidth/2)-15, marginLeft:10, marginRight:0 }}
                        buttonStyle={{backgroundColor:"#f58d4e",marginLeft:0}} title="Add Trip" onPress={()=>{this.submit().done()}}/>
                    <Button
                        containerViewStyle={{width: (Metrics.screenWidth/2)-15, marginLeft:10, marginRight:0}}
                        buttonStyle={{backgroundColor:"#494949"}}
                        title="Cancel" onPress={()=>{this.props.setParentState({screen: "list"})}}/>
                </View>
            </View>
        )
    }

     async submit() {
        var start = this.state.startDate.split("-");
        //alert(start)
        //alert("Start length is " + start.length)
        var end = this.state.endDate.split("-");
        var alertStr = "";
        var dateValid = true;

        // Call ValidationComponent validate method
        let test = this.validate({
            tripName: {minlength:1, maxlength:10, required: true},
            //startDate: {date: 'MM-DD-YYYY'},
            //endDate: {date: 'MM-DD-YYYY'}
        });
        if (!test) {
            alertStr = alertStr.concat("\nTrip name must be between 2-10 characters.\n")
        }
        if (start.length == 1 || end.length==1) {
            alertStr = alertStr.concat("\nYou must enter a Start and End date.\n")
            dateValid = false;
        }
        else if (start[2] >= end[2]) {
            if (start[0] > end[0]) {
                alertStr = alertStr.concat("\nEnd date must be later than Start date.")
                dateValid = false;
            }
            else if (start[0] == end[0]) {
                if (start[1] > end[1]) {
                    alertStr = alertStr.concat("\nEnd date must be later than Start date.")
                    dateValid = false;
                }
            }
        }
        if( test && dateValid ) {
             let thisTrip = triprTripController.createNewTripObject(this.state.tripName, this.state.startDate, this.state.endDate, {});
        console.log('(INFO) [AddTripComponent.submit] created a trip: ', thisTrip);
        await triprTripController.addTrip(thisTrip);
        console.log('(INFO) [AddTripComponent.submit] setting parent state');
        this.props.setParentState({screen: "list"});
        } else {
            alert(alertStr)
        }
    }

}