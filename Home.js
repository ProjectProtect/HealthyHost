import React from 'react';
import { Platform, StyleSheet, View, Text, Image, ScrollView, Dimensions, StatusBar, Linking } from 'react-native';
import { Button } from 'native-base';
import PushController from './pushController.js'
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';
import SafariView from 'react-native-safari-view';
import Icon from 'react-native-vector-icons/Entypo';

/* Imports app information from language files */
import I18n from './locales/i18n.js';

/* Stores default keys from english language file to control menu selections and other components */
var object = require('./locales/en.json');

/* Grabs frame height and stores it as a constant */
const { height } = Dimensions.get('window');

export default class HomeScreen extends React.PureComponent {

  static navigationOptions = {
    /* turns off default header for the screen */
    header: null,
  };

  /* saves the state of whatever variables is needed for current app session */
  state = {
    screenHeight: height,
    currentLanguage: "en",
    language_settings: false,
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  editNotification = async () => {

    var time = "";

    try {
      time = await AsyncStorage.getItem('notificationTime');

      const toggleBrushTeeth = await AsyncStorage.getItem('toggleBrushTeeth');

      if (toggleBrushTeeth == null) { }
      else {
        var n = toggleBrushTeeth.localeCompare("true");

        if (n == 0) {

          var d = new Date(time);
          d.setSeconds(0);

          PushNotification.cancelAllLocalNotifications();

          PushNotification.localNotificationSchedule({
            title: I18n.t('Notification.Notification_Title'),
            message: I18n.t('Notification.Notification_Message'),
            playSound: false,
            repeatType: 'day',
            date: d
          });
        }
      }
    } catch (e) {
      alert(e);
    }
  }

  showLanguageSettings = (state) => {

    Output = []

    if (state) {
      Output.push(
        <ScrollView key={0} contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: 'center', }} style={{ flex: 1, ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.9)' }} scrollEnabled={true} onContentSizeChange={this.onContentSizeChange}>

          <Text style={styles.choose_language}>{I18n.t('Text.Select_Language')}:</Text>

          {/* Add a copy of one of these lines with the corresponding language code and name to add a language. 
          
          Example:
          <Button onPress={() => this.saveLanguage("LANGUAGE_CODE_HERE")} style={styles.language_button}><Text style={styles.language_text}>LANGUAGE_NAME_HERE</Text></Button>
          
          */}
          <Button onPress={() => this.saveLanguage("en")} style={styles.language_button}><Text style={styles.language_text}>English</Text></Button>
          <Button onPress={() => this.saveLanguage("spa")} style={styles.language_button}><Text style={styles.language_text}>Español</Text></Button>
          <Button onPress={() => this.saveLanguage("hmn")} style={styles.language_button}><Text style={styles.language_text}>Hmong</Text></Button>

          <View style={{ position: 'absolute', right: 30, top: 30, borderRadius: 100, backgroundColor: 'white' }}>
            <Icon
              name="check"
              size={40}
              color={'#007aff'}
              onPress={() => this.setState({ language_settings: false })}
            />
          </View>

        </ScrollView>
      );
    }

    return Output;

  }

  makeList = () => {
    Output = []

    var objectSize = Object.keys(object.Text.Main_Menu_Choices).length;

    for (var i = 0; i < objectSize; i++) {
      let idx = i;

      if (object.Text.Main_Menu_Choices[idx] == "News & Events") {
        Output.push(<Button key={idx} onPress={() => {
          if (Platform.OS === 'ios') {
            SafariView.show({
              url: 'https://www.facebook.com/HealthyHouseMerced/posts/'
            });
          } else {
            Linking.openURL('https://www.facebook.com/HealthyHouseMerced/posts/');
          }
        }} style={{ backgroundColor: '#DCDCDC', alignSelf: "center", width: '90%', justifyContent: "center", margin: 10, borderRadius: 15 }}><Text style={{ color: 'black', fontSize: 20 }}>{I18n.t('Text.Main_Menu_Choices.' + idx)}</Text></Button>);
      }
      else {
        Output.push(<Button key={idx} onPress={() => this.props.navigation.navigate(object.Text.Main_Menu_Choices[idx])} style={{ backgroundColor: '#DCDCDC', alignSelf: "center", width: '90%', justifyContent: "center", margin: 10, borderRadius: 15 }}><Text style={{ color: 'black', fontSize: 20 }}>{I18n.t('Text.Main_Menu_Choices.' + idx)}</Text></Button>);
      }
    }

    return Output;
  }

  /* Saves the user's language preference */
  saveLanguage = async (language) => {
    try {
      await AsyncStorage.setItem('language', language);
      this.setState({ currentLanguage: language });

      this.editNotification();

    } catch (e) {
      alert(e);
    }
  }

  /* Loads the user's language preference (first load is English) */
  displayLanguage = async () => {
    try {
      let language = await AsyncStorage.getItem('language');
      if (language == null) {
        this.setState({ currentLanguage: "en" });
        await AsyncStorage.setItem('language', "en");
      }
      else {
        this.setState({ currentLanguage: language });
      }
    } catch (error) {
      alert(error);
    }
  }

  /* Main render function to display contents of current screen */
  render() {
    this.displayLanguage();
    I18n.locale = this.state.currentLanguage;
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollview} scrollEnabled={true} onContentSizeChange={this.onContentSizeChange}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.container}>

          <Icon
            name="language"
            size={40}
            color={'#007aff'}
            onPress={() => this.setState({ language_settings: true })}
            style={{
              position: 'absolute',
              left: 22,
              top: 30,
            }}
          />
          <Text style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 13, position: 'absolute', left: 20, top: 75 }}>{I18n.t('Text.Languages')}</Text>

          <Icon
            name="bell"
            size={40}
            color={'#007aff'}
            onPress={() => this.props.navigation.navigate("Notifications")}
            style={{
              position: 'absolute',
              right: 15,
              top: 30,
            }}
          />
          <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 13, position: 'absolute', right: 15, top: 75 }}>{I18n.t('Notification.Notifications')}</Text>

          {/* Healthy House Logo */}
          <Image style={{ width: '50%', resizeMode: 'contain' }} source={require('./assets/ic_launcher.png')} />

          {/* Intro title */}
          <Text style={styles.welcome}>{I18n.t('Text.Intro')}</Text>

          {/* Displays the choices for the main menu */}
          {this.makeList()}

        </View>

        {/* If globe button is pressed, then the language choices will pop up. */}
        {this.showLanguageSettings(this.state.language_settings)}

      </ScrollView>
    );
  }
}

//default styling for home screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    color: '#000000',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  scrollview: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  language_text: {
    color: 'black',
    fontSize: 20,
  },
  language_button: {
    backgroundColor: '#DCDCDC',
    alignSelf: "center",
    width: '50%',
    justifyContent: "center",
    margin: 10,
    borderRadius: 15,
  },
  choose_language: {
    fontSize: 25,
    textAlign: 'center',
    color: '#FFFFFF',
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 10,
  }
});
