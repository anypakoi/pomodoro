import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Countdown = (props) => {
  const minutes = Math.floor(props.totalTime / 60);
  const seconds = props.totalTime % 60;
  
  // Formato condicional basado en el tiempo total
  let displayTime;
  if (minutes === 0) {
    // Menos de un minuto: mostrar solo segundos (00)
    displayTime = seconds < 10 ? `0${seconds}` : `${seconds}`;
  } else if (minutes < 10) {
    // Entre 1-9 minutos: mostrar como (0:00)
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    displayTime = `${minutes}:${formattedSeconds}`;
  } else {
    // 10 minutos o más: mostrar como (00:00)
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    displayTime = `${formattedMinutes}:${formattedSeconds}`;
  }

  return <Text>{displayTime}</Text>
};

export default Countdown;
