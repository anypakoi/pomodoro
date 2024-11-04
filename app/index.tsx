import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Countdown from '../components/Countdown';


class Counter extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      count: 25,
      totalTime: 25 * 60,
      pomodoro: true,
    };
  }

  

  componentDidMount(){
      this.interval = setInterval(this.increaseNum, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  increaseNum = () => {
      if (this.state.count > 0) {
        this.setState(prevState => ({totalTime: prevState.totalTime - 1 }))
        } 
      else if (this.state.pomodoro) { 
        this.setState(prevState => ({count: 5, pomodoro: !prevState.pomodoro}))
        }
      else {
        this.setState(prevState => ({count: 10, pomodoro: !prevState.pomodoro}))
      }
    
  };

  render() {
    return (
      <View style={styles.container}>
        <Countdown totalTime={this.state.totalTime} />
      </View>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      start: false
    }
  }

  onButtonPress = () => {
    this.setState(prevState => ({start: !prevState.start,}))
  };

  
  render () {
    if (this.state.start){
      return(
        <View style={styles.container}>
        <Button title='increase' onPress={this.onButtonPress} />
        <Counter />
        </View>
    )
    } else {
      return(
      <View style={styles.container}>
      <Button title='increase' onPress={this.onButtonPress} />
      </View>
      )
    }
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
