import React from "react";
import { Text, View } from "react-native";
import styles from "../../../Misc/Styles/ChooseCityPlannerStyles";
import ButtonRectangle from "../../../Misc/ButtonRectangle";
import Metrics from "../../../Misc/Styles/Themes/Metrics";


export default class TripListComponent extends React.Component {

    constructor(props) {
       super(props);
       console.log(props);
    }

    navToTripDetailView(tripID) {
        this.props.navigate('TripDetailView', {
            currentTripID: tripID,
            name: this.props.list[tripID].name,
            refreshTripList: this.refreshTripList.bind(this)
        })
    }

    refreshTripList() {
        this.props.setParentState({screen:'list'});
    }

    getRandomImage() {
        let images = [
                require('../../../../assets/images/rectangles/rectangle1.png'),
                require('../../../../assets/images/rectangles/rectangle2.png'),
                require('../../../../assets/images/rectangles/rectangle3.png'),
                require('../../../../assets/images/rectangles/rectangle4.png'),
                require('../../../../assets/images/rectangles/rectangle5.png'),
                require('../../../../assets/images/rectangles/rectangle6.png'),
                require('../../../../assets/images/rectangles/rectangle7.png'),
                require('../../../../assets/images/rectangles/rectangle8.png'),
                require('../../../../assets/images/rectangles/rectangle9.png'),
                require('../../../../assets/images/rectangles/rectangle10.png'),
                require('../../../../assets/images/rectangles/rectangle11.png'),
            ];
        return images[Math.floor(Math.random()*10)];
    }

    generateButtons() {
        if(Object.keys(this.props.list).length !== 0) {
            return Object.keys(this.props.list).reverse().map((tripID) => {
                return (
                    <View style={styles.buttonsContainer} key={this.props.list[tripID]}>
                        <ButtonRectangle
                            onPress={() => this.navToTripDetailView(tripID)}
                            style={styles.componentButton}
                            image={this.getRandomImage()}
                            text = {`Trip to ${this.props.list[tripID].name}`.toUpperCase()}
                        />
                    </View>
                )
            })
        } else {
            return (
                <View style={styles.infoTextContainer}>
                    <View><Text
                        style={[styles.infoText,{fontSize:Metrics.h2}]}>You currently don't have any trips!</Text></View>
                    <View><Text
                        style={[styles.infoText,{fontSize:Metrics.h2}]}>Click on the + button above to create a new Trip.</Text></View>
                </View>
            )
        }
    }

    render() {
        return (
            <View>
                {this.generateButtons()}
            </View>
        )
    }

}