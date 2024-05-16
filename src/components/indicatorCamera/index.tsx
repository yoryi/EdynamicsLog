import {Text, StyleSheet, View} from 'react-native';

const IndicatorCamera = ({Value = '1'}) => {
  return (
    <View style={styles.wrapperIndicator}>
      <Text style={styles.textIndicator}>{'X'+Value}</Text>
      <View style={styles.line} />
    </View>
  );
};

export default IndicatorCamera;
const styles = StyleSheet.create({
  wrapperIndicator: {
    position: 'absolute',
    backgroundColor: 'black',
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textIndicator: {
    paddingBottom: 3,
    color: 'white',
  },
  line: {
    width: 2,
    height: '60%',
    backgroundColor: 'white',
  },
});
