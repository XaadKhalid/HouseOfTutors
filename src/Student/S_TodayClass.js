import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function S_TodayClass() {
  return (
    <View style={styles.main_container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.header_txt}>Tutor</Text>
        </View>
        <View>
          <Text style={styles.header_txt}>Course</Text>
        </View>
        <View>
          <Text style={styles.header_txt}>Class Time</Text>
        </View>
      </View>
      <View style={styles.details_continer}>
        <View>
          <Text style={styles.details_txt}>Aftab</Text>
        </View>
        <View>
          <Text style={styles.details_txt}>OOP</Text>
        </View>
        <View>
          <Text style={styles.details_txt}>08:30-09:30 AM</Text>
        </View>
      </View>
      <View style={styles.details_continer}>
        <View>
          <Text style={styles.details_txt}>Umer</Text>
        </View>
        <View>
          <Text style={styles.details_txt}>DSA</Text>
        </View>
        <View>
          <Text style={styles.details_txt}>11:30-12:30 PM</Text>
        </View>
      </View>
      <View style={styles.details_continer}>
        <View>
          <Text style={styles.details_txt}>Amir</Text>
        </View>
        <View>
          <Text style={styles.details_txt}>DAM</Text>
        </View>
        <View>
          <Text style={styles.details_txt}>03:30-04:30 PM</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    padding: 10,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(102,24,231,0.9)',
    padding: 22,
    borderRadius: 10,
  },
  header_txt: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  details_txt: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  details_continer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(102,24,231,0.8)',
    padding: 18,
    borderRadius: 10,
    marginTop: 15,
  },
  Rate_btn: {
    marginLeft: 'auto',
    elevation: 10,
  },
  Rate_btn_txt: {
    backgroundColor: '#EB6440',
    color: '#ffffff',
    paddingHorizontal: 18,
    paddingVertical: 3,
    borderRadius: 8,
  },
});
