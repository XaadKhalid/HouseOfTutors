import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';

export default function S_TodayClass() {
  return (
    <View style={styles.main_container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.header_txt}>Student</Text>
        </View>
        <View>
          <Text style={styles.header_txt}>Class Time</Text>
        </View>
        <View>
          <Text style={styles.header_txt}>Status</Text>
        </View>
      </View>
      <View style={styles.details_continer}>
        <View>
          <Text style={styles.details_txt}>Aftab</Text>
        </View>
        <View>
          <Text style={styles.details_txt}>08:30-09:30 AM</Text>
        </View>
        <View>
          <Pressable
            style={styles.Rate_btn}
            onPress={() => {
              Alert.alert('Tutor match request will be sent to API');
            }}>
            <Text style={styles.Rate_btn_txt}>Take</Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            style={styles.Rate_btn}
            onPress={() => {
              Alert.alert('Tutor match request will be sent to API');
            }}>
            <Text style={styles.Rate_btn_txt}>ReSchedule</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.details_continer}>
        <View>
          <Text style={styles.details_txt}>Aftab</Text>
        </View>
        <View>
          <Text style={styles.details_txt}>08:30-09:30 AM</Text>
        </View>
        <View>
          <Pressable
            style={styles.Rate_btn}
            onPress={() => {
              Alert.alert('Tutor match request will be sent to API');
            }}>
            <Text style={styles.Rate_btn_txt}>Take</Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            style={styles.Rate_btn}
            onPress={() => {
              Alert.alert('Tutor match request will be sent to API');
            }}>
            <Text style={styles.Rate_btn_txt}>ReSchedule</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.details_continer}>
        <View>
          <Text style={styles.details_txt}>Aftab</Text>
        </View>
        <View>
          <Text style={styles.details_txt}>08:30-09:30 AM</Text>
        </View>
        <View>
          <Pressable
            style={styles.Rate_btn}
            onPress={() => {
              Alert.alert('Tutor match request will be sent to API');
            }}>
            <Text style={styles.Rate_btn_txt}>Take</Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            style={styles.Rate_btn}
            onPress={() => {
              Alert.alert('Tutor match request will be sent to API');
            }}>
            <Text style={styles.Rate_btn_txt}>ReSchedule</Text>
          </Pressable>
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
    backgroundColor: '#FFB22F',
    color: '#000000',
    paddingHorizontal: 18,
    paddingVertical: 3,
    borderRadius: 8,
  },
});
