import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';

const Hello = () => (
  <View>
    <Text>Hello!</Text>
  </View>
);

const Goodbye = () => (
  <View>
    <Text>Goodbye!</Text>
  </View>
);

const Tabs = TabNavigator({
  Hello: {
    screen: Hello
  },
  Goodbye: {
    screen: Goodbye
  },
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello iMundo #5!</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
