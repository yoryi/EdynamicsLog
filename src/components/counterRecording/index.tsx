import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../constants';
import {CounterRecordingProps} from '../../types';

const CounterRecording: React.FC<CounterRecordingProps> = ({counter}) => {
  const [timeRemaining, setTimeRemaining] = useState<number | any>(10);
  const [blink, setBlink] = useState(true);
  
  useEffect(() => {
    let interval: any;
    if (counter) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime: number) =>
          prevTime === 0 ? clearInterval(interval) : prevTime - 1,
        );
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [counter]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(prevBlink => !prevBlink);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const circleRecording = {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: blink ? 'red' : 'transparent',
  };

  const renderUI = () => {
    return (
      <View style={styles.wrapper}>
        <View style={circleRecording} />
        <Text style={styles.textCounter}>{timeRemaining}</Text>
      </View>
    );
  };
  return renderUI();
};

export default CounterRecording;
const styles = StyleSheet.create({
  wrapper: {
    height: 32,
    width: 80,
    borderRadius: 10,
    backgroundColor: Colors.BLACK_50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textCounter: {
    fontSize: 17,
    paddingLeft: 10,
    textAlign: 'center',
    color: Colors.WHITE,
  },
});
