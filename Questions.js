import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, StatusBar } from 'react-native';
import { Button } from 'native-base';
import { Player } from '@react-native-community/audio-toolkit';
import AsyncStorage from '@react-native-community/async-storage';

import I18n from './locales/i18n.js';

var object = require('./locales/en.json');

var string = "";

const { height } = Dimensions.get('window');

export default class QuestionsScreen extends React.PureComponent {

  //creates audio player as state for whole component
  p: Player | null;

  //an object that contains the settings necessary for the audio player to function properly
  playbackOptions = {
    autoDestroy: false,
    continuesToPlayInBackground: false
  };

  static navigationOptions = () => ({
    title: 'Healthy Host',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'royalblue'
    }
  });

  //function will retrieve the saved language preference of the application and set it into the "string" variable
  retrieveLanguage = async () => {
    try {
      string = await AsyncStorage.getItem('language');
    } catch (error) {
      alert(error);
    }
  }

  //gets the list of questions and puts them into the overall output array
  makeList = () => {

    Questions = []

    var objectSize = Object.keys(object.FAQ).length;

    //grabs single questions and adds them to the array
    for (i = 0; i < objectSize - 1; i++) {
      var listIndex = (i + 1).toString();
      var string1 = listIndex + '. ' + I18n.t('FAQ.' + i);

      Questions.push(<Text key={i} style={{ padding: 5, textAlign: "left", fontSize: 22, color: "black" }}>{string1}</Text>);
    }

    //grabs first multi-part question
    Questions.push(<Text key={10} style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 5, paddingRight: 5, textAlign: "left", fontSize: 22, color: "black" }}>11. {I18n.t('FAQ.' + 10 + '.Multi_Part_Question.' + 0)}</Text>);

    //gets parts of multi-part question and adds them to the array
    for (i = 0; i < 3; i++) {
      var part = String.fromCharCode(i + 65);
      var string1 = part + ": " + I18n.t('FAQ.' + 10 + '.Parts.' + 0 + '.' + part);
      Questions.push(<Text key={i + 11} style={{ padding: 5, textAlign: "left", fontSize: 22, color: "black" }}>{string1}</Text>);
    }

    //grabs second multi-part question
    Questions.push(<Text key={14} style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 5, paddingRight: 5, textAlign: "left", fontSize: 22, color: "black" }}>12. {I18n.t('FAQ.' + 10 + '.Multi_Part_Question.' + 1)}</Text>);

    //gets parts of multi-part question and adds them to the array
    for (i = 0; i < 6; i++) {
      var part = String.fromCharCode(i + 65);
      var string2 = part + ": " + I18n.t('FAQ.' + 10 + '.Parts.' + 1 + '.' + part);
      Questions.push(<Text key={i + 15} style={{ padding: 5, textAlign: "left", fontSize: 22, color: "black" }}>{string2}</Text>);
    }

    return Questions;
  }

  state = {
    screenHeight: height,
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  //This funciton only applies to the "Hmong" language for now
  makeAudioButtons = () => {

    Output = []

    Output.push(<Button key={0} onPress={() => { this.p.play() }} style={{ backgroundColor: '#DCDCDC', alignSelf: "center", width: '25%', justifyContent: "center", margin: 10, borderRadius: 15 }}><Text style={{ color: 'black', fontSize: 20 }}>Play</Text></Button>);
    Output.push(<Button key={1} onPress={() => { this.p.pause() }} style={{ backgroundColor: '#DCDCDC', alignSelf: "center", width: '25%', justifyContent: "center", margin: 10, borderRadius: 15 }}><Text style={{ color: 'black', fontSize: 20 }}>Pause</Text></Button>);
    Output.push(<Button key={2} onPress={() => { this.p.stop() }} style={{ backgroundColor: '#DCDCDC', alignSelf: "center", width: '25%', justifyContent: "center", margin: 10, borderRadius: 15 }}><Text style={{ color: 'black', fontSize: 20 }}>Stop</Text></Button>);

    return Output;
  };
  render() {
    //calls this function to retrieve the language setting
    this.retrieveLanguage();

    //creates variable named "audio" and concatinates "string" with temporary modified version of the disease parameter
    var audio = string + "_" + I18n.t('Text.General_Menu_Choices.2').toLowerCase().replace(/ /g, "_").normalize("NFD").replace(/[\u0300-\u036f]/g, "") + ".aac";

    //sets the state as a new audio player with the provided parameters
    this.p = new Player(audio, this.playbackOptions);

    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollview} scrollEnabled={true} onContentSizeChange={this.onContentSizeChange}>
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1 }}>

          <View style={{ flexDirection: 'row', justifyContent: "center" }}>
            {this.makeAudioButtons()}
          </View>

          {/* Displays FAQ */}
          <Text style={{ textAlign: "center", padding: 10, fontSize: 30, color: "black", fontWeight: "bold" }}>{I18n.t('Text.FAQ')}</Text>
          {/* Displays questions onto view */}
          {this.makeList()}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 10,
  },
});