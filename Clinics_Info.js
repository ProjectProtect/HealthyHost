import React from 'react';
import { Platform, StyleSheet, View, Text, Image, Linking, ScrollView, Dimensions, ActivityIndicator, StatusBar } from 'react-native';

import I18n from './locales/i18n.js';

import { images } from './clinic_images.js';

//gets height of phone screen
const { height } = Dimensions.get('window');

export default class ClinicsInfoScreen extends React.Component {

  static navigationOptions = () => ({
    title: 'Healthy Host',
    headerTintColor: 'white',
    headerBackTitle: "Back",
    headerStyle: {
      backgroundColor: 'royalblue'
    }
  });

  //grabs info of screen height and places it as a state
  state = {
    screenHeight: height,
  };

  //grabs addresses clicked on and takes user to the map app of the platform
  handleAddresses = (address) => {
    //gets input and trims whitespace and replaces it with +'s
    var newAddress = address.split(' ').join('+');

    //check to see which platform is being used for the app and uses appropriate url for searching with appropriate map app
    if (Platform.OS === 'ios') {
      Linking.openURL('http://maps.apple.com/maps?q=' + newAddress);
    } else {
      Linking.openURL('http://maps.google.com/maps?q=' + newAddress);
    }
  };

  //grabs phone number clicked on and takes user to phone app of the platform
  handlePhones = (phone) => {
    //gets input and removes special characters
    var newPhone = phone.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');

    //opens phone number like HTML5 phone link
    Linking.openURL('tel:' + newPhone);
  };

  makePage = (index) => {
    var Hours = []

    Output = []

    let idx = index - 1;

    var temp = []
    for (var j = 0; j < 7; j++) {
      temp.push(<Text key={j} style={{ textAlign: "left", fontSize: 15, color: "black" }}>{I18n.t('Text.Days.' + j)}: {I18n.t('Clinics.' + idx + '.Hours.' + j)}</Text>);
    }
    Hours.push(temp);

    let imgSource = images[index].uri;

    Output.push(<View key={0} style={{ flex: 1 }}>
      <Image style={{ width: 300, height: 200, resizeMode: 'contain' }} source={imgSource} />
      <Text style={{ textAlign: "left", fontSize: 30, color: "black", fontWeight: "bold" }}>{index}. {I18n.t('Clinics.' + idx + '.Name')}</Text>
      <Text onPress={() => { this.handleAddresses(I18n.t('Clinics.' + idx + '.Address')) }} style={{ textAlign: "left", fontSize: 15, color: "red" }}>{I18n.t('Clinics.' + idx + '.Address')}</Text>
      <Text onPress={() => { this.handlePhones(I18n.t('Clinics.' + idx + '.Phone')) }} style={{ textAlign: "left", fontSize: 15, color: "blue" }}>{I18n.t('Clinics.' + idx + '.Phone')}</Text>
      <Text style={{ textAlign: "left", fontSize: 22, color: "black", fontWeight: "bold" }}>{I18n.t('Text.Hours')}:</Text>{Hours[0]}
    </View>);

    return Output;
  };

  //changes window of screen to size of content if and only if the content size is bigger than
  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  render() {

    const { navigation } = this.props;

    const index = navigation.getParam('index');

    return (
      //calls the scrollview to keep content from going off screen and not being able to scroll down
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollview} scrollEnabled={true} onContentSizeChange={this.onContentSizeChange}>
        <StatusBar barStyle="light-content" />
        <View style={styles.content}>
          {this.makePage(index)}
        </View>
      </ScrollView>

    );
  }
}

//styles the outer scroll view to see the rest of the content that goes off screen
const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
  },
  content: {
    padding: 10,
  },
});