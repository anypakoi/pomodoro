import React from 'react';
import { StyleSheet, Text, View, Button, TextInput,} from 'react-native';
import Slider from '@react-native-community/slider'
import Countdown from '../components/Countdown';
import Alarm from '../components/Alarm';

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalTime: (props.workTime || 25) * 60,
      pomodoro: true,
      playAlarm: false,
      cycle: 4,
    };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(this.increaseNum, 1000)
    
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  increaseNum = () => {
    if (this.state.totalTime > 0) {
      this.setState(prevState => ({
        totalTime: prevState.totalTime - 1,
        playAlarm: false
      }))
      if (this.state.totalTime === 3) {
        this.setState({playAlarm: true})
      }
    } 
    else {
      this.setState(prevState => ({
        
        totalTime: this.state.pomodoro ? (this.state.cycle % 4 === 0 ? this.props.breakTime * this.props.timeCycle * 60 : this.props.breakTime * 60) : this.props.workTime * 60,
        pomodoro: !prevState.pomodoro,
        cycle: prevState.cycle + 1,
      }))
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Countdown totalTime={this.state.totalTime} />
        <Alarm shouldPlay={this.state.playAlarm} />
      </View>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      start: false,
      workTime: '25',
      breakTime: '5',
      timeCycle: '3',
    }
  }

  onButtonPress = () => {
    this.setState(prevState => ({start: !prevState.start}))
  };

  render() {
    if (this.state.start) {
      return (
        <View style={styles.container}>
          <Button title='stop' onPress={this.onButtonPress} />
          <Counter 
            workTime={parseInt(this.state.workTime)} 
            breakTime={parseInt(this.state.breakTime)}
            timeCycle={parseInt(this.state.timeCycle)} 
          />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text>Tiempo de trabajo (minutos):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={this.state.workTime}
              onChangeText={(text) => this.setState({workTime: text})}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Tiempo de descanso (minutos):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={this.state.breakTime}
              onChangeText={(text) => this.setState({breakTime: text})}
            />
          </View>
          <View style={styles.sliderContainer}>
            <Text>Multiplicador de ciclo: {this.state.timeCycle}x</Text>
            <Text>({parseInt(this.state.timeCycle) * parseInt(this.state.breakTime)} minutos de descanso)</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={5}
              step={1}
              value={parseInt(this.state.timeCycle)}
              onValueChange={(value) => this.setState({timeCycle: value.toString()})}
            />
          </View>
          <Button title='start' onPress={this.onButtonPress} />
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
  inputContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: 100,
    textAlign: 'center',
    marginTop: 5,
    borderRadius: 5,
  },
  sliderContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
}); 