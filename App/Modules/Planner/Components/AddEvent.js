import React, {Componenent} from 'react';
import {Image, View} from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements'
import {eventController} from "../PlannerStackNavConfig";
import DatePicker from 'react-native-datepicker';
import formStyles from "../../../Misc/Styles/FormStyles";
import styles from "../PlannerStyleSheet";
import Metrics from "../../../Misc/Styles/Themes/Metrics";

export default class AddEvent extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: `Planner`,
        tabBarIcon: <Image source={require('../../../../assets/images/calendar_icon.png')}
                           style={{
                               height: 30,
                               width: 30,
                               resizeMode: 'contain'
                           }} />,
        tabBarLabel: "Planner",
        headerTitle: `Planner`.toUpperCase(),
        headerStyle: {
        },
        headerTitleStyle: {
            color:'#494949',
            alignSelf:'center',
            fontFamily: 'LeagueSpartan',
            fontSize:Metrics.h2,
            fontWeight:'200'
        },
        headerRight:(<View/>)
    });

	constructor(props) {
		super(props);
		this.state = {
			name: "",
			start: "00:00",
			end: "00:00",
			address: ""
		};
	}


	render() {
		return (
            <View style={styles.formBackgroundView}>
                <FormLabel containerStyle={formStyles.labelContainerStyle}
                           labelStyle={formStyles.labelStyle}>
                    EVENT NAME:
                </FormLabel>
                <FormInput containerStyle={formStyles.inputContainerStyle}
                           inputStyle={formStyles.inputStyle}
                           onChangeText={(text) => this.setState({name:text})}
                />
                <FormLabel containerStyle={formStyles.labelContainerStyle}
                           labelStyle={formStyles.labelStyle}>ADDRESS:</FormLabel>
                <FormInput containerStyle={formStyles.inputContainerStyle}
                           inputStyle={formStyles.inputStyle}
                           onChangeText={(text) => this.setState({address: text})} />
                <FormLabel containerStyle={formStyles.labelContainerStyle}
                           labelStyle={formStyles.labelStyle}>EVENT TIMES:</FormLabel>
                <View style={styles.timeChooser}>
                        <DatePicker
                            style={styles.dateContainerLeft}
                            date={this.state.start}
                            mode="time"
                            showIcon={false}
                            placeholder="Start Time"
                            is24Hour={true}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{dateInput: formStyles.dateInput}}
                            onDateChange={(date) => {this.setState({start: date})}}
                        />
                        <DatePicker
                            style={styles.dateContainerRight}
                            date={this.state.end}
                            mode="time"
                            showIcon={false}
                            placeholder="End Time"
                            is24Hour={true}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{dateInput: formStyles.dateInput}}
                            onDateChange={(date) => {this.setState({end: date})}}
                        />
                </View>
                <View style={styles.addOrCancelButtonView}>
                    <Button
                        containerViewStyle={styles.addOrCancelButtonContainer}
                        buttonStyle={styles.addButtonStyle} title="Add Event" onPress={()=>{this.submit()}}/>
                    <Button
                        containerViewStyle={styles.addOrCancelButtonContainer}
                        buttonStyle={styles.cancelButtonStyle}
                        title="Cancel" onPress={()=>{this.props.navigation.goBack()}}/>
                </View>
            </View>
		);
	}

	async submit() {
	    console.log(this.state.start);
	    console.log(this.state.end);
        await eventController.addEvent(this.props.navigation.state.params.currentTripID,
            this.props.navigation.state.params.cityName,
            this.props.navigation.state.params.day,
            this.state.name,
            this.state.start,
            this.state.end,
            this.state.address);
        this.props.navigation.state.params.refresh();
        this.props.navigation.goBack();
	}
}
