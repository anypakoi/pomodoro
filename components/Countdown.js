
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Countdown = (props) => {
  const minutes = Math.floor(props.totalTime / 60);
  const seconds = props.totalTime % 60;
  
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return <Text>{formattedMinutes}:{formattedSeconds}</Text>
};

export default Countdown
