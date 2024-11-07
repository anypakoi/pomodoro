import React, { useEffect } from 'react';
import { Audio } from 'expo-av';

const Alarm = ({ shouldPlay }) => {
  const [sound, setSound] = React.useState();

  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/alarm-clock.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error('Error al reproducir el sonido:', error);
    }
  }

  useEffect(() => {
    if (shouldPlay) {
      playSound();
    }
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [shouldPlay]);

  return null;
};

export default Alarm;
