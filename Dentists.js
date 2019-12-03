import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';

var object = require('./locales/en.json');

import I18n from './locales/i18n.js';

function Item({ id, title, onSelect }) {
    return (
        <TouchableOpacity onPress={() => onSelect(id)} style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}

export default class DentistsScreen extends React.Component {

    static navigationOptions = () => ({
        title: 'Healthy Host',
        headerTintColor: 'white',
        headerBackTitle: "Back",
        headerStyle: {
            backgroundColor: 'royalblue'
        }
    });

    makeList = () => {

        var DATA = [];

        Output = []

        var objectSize = Object.keys(object.Oral_Health.Dentist_Locations).length;

        for (var i = 0; i < objectSize; i++) {
            var string = I18n.t('Oral_Health.Dentist_Locations.' + i + '.Name');

            var num = i + 1;
            var n = num.toString();

            DATA.push({ id: n, title: string });
        }

        Output.push(<FlatList key={0} data={DATA} renderItem={({ item }) => (<Item id={item.id} title={item.title} onSelect={() => this.props.navigation.navigate('Dentist Locations', { index: parseInt(item.id), })} />)} />);

        return Output;
    }

    render() {
        return (
            <View>
                {this.makeList()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#DCDCDC',
        marginVertical: 8,
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 15
    },
    title: {
        color: '#000000',
        fontSize: 20
    },
});