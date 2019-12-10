import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Dimensions, StatusBar } from 'react-native';
import { Button } from 'native-base';
import { Player } from '@react-native-community/audio-toolkit';
import AsyncStorage from '@react-native-community/async-storage';

import I18n from './locales/i18n.js';

var string = "";

const { height } = Dimensions.get('window');

export default class TitleVIScreen extends React.PureComponent {

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
    headerBackTitle: "Back",
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

  //will destroy the player once the user leaves the screen
  componentWillUnmount() {
    this.p.destroy();
  }

  state = {
    screenHeight: height,
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  makeAudioButtons = () => {
    Output = []

    Output.push(<Button key={0} onPress={() => this.p.play()} style={{ backgroundColor: '#DCDCDC', alignSelf: "center", width: '25%', justifyContent: "center", margin: 10, borderRadius: 15 }}><Text style={{ color: 'black', fontSize: 20 }}>Play</Text></Button>);
    Output.push(<Button key={1} onPress={() => this.p.pause()} style={{ backgroundColor: '#DCDCDC', alignSelf: "center", width: '25%', justifyContent: "center", margin: 10, borderRadius: 15 }}><Text style={{ color: 'black', fontSize: 20 }}>Pause</Text></Button>);
    Output.push(<Button key={2} onPress={() => this.p.stop()} style={{ backgroundColor: '#DCDCDC', alignSelf: "center", width: '25%', justifyContent: "center", margin: 10, borderRadius: 15 }}><Text style={{ color: 'black', fontSize: 20 }}>Stop</Text></Button>);

    return Output;
  };

  render() {

    this.retrieveLanguage();

    //creates variable named "audio" and concatinates "string" with temporary modified version of the disease parameter
    var audio = string + "_titlevi.aac";

    //sets the state as a new audio player with the provided parameters
    this.p = new Player(audio, this.playbackOptions);

    const scrollEnabled = this.state.screenHeight > height;

    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollview} scrollEnabled={scrollEnabled} onContentSizeChange={this.onContentSizeChange}>
        <StatusBar barStyle="light-content" />
        <View style={styles.content}>

          <View style={{ flexDirection: 'row', justifyContent: "center" }}>
            {this.makeAudioButtons()}
          </View>

          {/* Imports the entire title VI paragraph in current language */}
          <Text style={{ color: '#000000', fontSize: 20, padding: 10 }}>{I18n.t('Title_VI')}</Text>

          {/* Healthy House Logo */}
          <Image style={{ width: '80%', resizeMode: 'contain', }} source={require('./assets/HHL.png')} />

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
    flex: 1,
    alignItems: "center",
  },
});