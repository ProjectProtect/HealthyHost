import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, StatusBar } from 'react-native';
import { Button } from 'native-base';

/* Imports app information from language files */
import I18n from './locales/i18n.js';

const { height } = Dimensions.get('window');

export default class GeneralHealthScreen extends React.PureComponent {

  static navigationOptions = () => ({
    title: 'Healthy Host',
    headerTintColor: 'white',
    headerBackTitle: "Back",
    headerStyle: {
      backgroundColor: 'royalblue'
    }
  });

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  render() {
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollview} scrollEnabled={true} onContentSizeChange={this.onContentSizeChange}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>

          <Button onPress={() => this.props.navigation.navigate("Antibiotics")} style={{ backgroundColor: '#DCDCDC', alignSelf: "center", width: '90%', justifyContent: "center", margin: 10, borderRadius: 15 }}><Text style={{ color: 'black', fontSize: 20 }}>{I18n.t('Text.General_Menu_Choices.0')}</Text></Button>
          <Button onPress={() => this.props.navigation.navigate("Illnesses")} style={{ backgroundColor: '#DCDCDC', alignSelf: "center", width: '90%', justifyContent: "center", margin: 10, borderRadius: 15 }}><Text style={{ color: 'black', fontSize: 20 }}>{I18n.t('Text.General_Menu_Choices.1')}</Text></Button>
          <Button onPress={() => this.props.navigation.navigate("Questions for your Doctor")} style={{ backgroundColor: '#DCDCDC', alignSelf: "center", width: '90%', justifyContent: "center", margin: 10, borderRadius: 15 }}><Text style={{ color: 'black', fontSize: 20 }}>{I18n.t('Text.General_Menu_Choices.2')}</Text></Button>
          <Button onPress={() => this.props.navigation.navigate("Medical Clinics List")} style={{ backgroundColor: '#DCDCDC', alignSelf: "center", width: '90%', justifyContent: "center", margin: 10, borderRadius: 15 }}><Text style={{ color: 'black', fontSize: 20 }}>{I18n.t('Text.General_Menu_Choices.3')}</Text></Button>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    justifyContent: "center",
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    color: '#000000',
    margin: 10,
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
});
