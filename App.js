import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {vibrate} from './utils'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      count: 0,
    }
  }

  increaseNum(){
    this.setState({count: this.state.count + 1 })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.count}</Text>
        <Button title='Increase' onPress={this.increaseNum.bind(this)} />
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
