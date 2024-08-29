import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import AvatarIcon from './src/avatar.svg';

const { width } = Dimensions.get('window');
const iconSize = width * 0.3;

export default function App() {
  return (
    <View style={styles.container}>
      <AvatarIcon
        width={iconSize}
        height={iconSize}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
