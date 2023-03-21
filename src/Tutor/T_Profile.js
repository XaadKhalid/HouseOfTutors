/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function S_Profile() {
  return (
    <View style={styles.cotainer}>
      <Text>Profile Screen is under processing and will be live soon.</Text>
      <Text>Your patience is highly Appreciated!</Text>
      <View style={styles.smile}>
        <SimpleLineIcons name={'emotsmile'} size={24} color="#000000" />
        <SimpleLineIcons name={'emotsmile'} size={24} color="#000000" />
        <SimpleLineIcons name={'emotsmile'} size={24} color="#000000" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cotainer: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smile: {
    flexDirection: 'row',
  }
});
