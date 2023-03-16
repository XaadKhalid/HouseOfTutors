/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Pressable, Alert} from 'react-native';

export default function S_Learning() {
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
          <Text style={styles.header_txt}>Rate</Text>
        </View>
      </View>
      <View style={styles.course_continer}>
        <View>
          <Text style={styles.course_txt}>Azhar</Text>
        </View>
        <View>
          <Text style={styles.course_txt}>OOP</Text>
        </View>
        <View>
          <Pressable
            style={styles.Rate_btn}
            onPress={() => {
              Alert.alert('Tutor match request will be sent to API');
            }}>
            <Text style={styles.Rate_btn_txt}>Rate</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.course_continer}>
        <View>
          <Text style={styles.course_txt}>Umer</Text>
        </View>
        <View>
          <Text style={styles.course_txt}>PDC</Text>
        </View>
        <View>
          <Pressable
            style={styles.Rate_btn}
            onPress={() => {
              Alert.alert('Tutor match request will be sent to API');
            }}>
            <Text style={styles.Rate_btn_txt}>Rate</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.course_continer}>
        <View>
          <Text style={styles.course_txt}>Aftab</Text>
        </View>
        <View>
          <Text style={styles.course_txt}>MAP</Text>
        </View>
        <View>
          <Pressable
            style={styles.Rate_btn}
            onPress={() => {
              Alert.alert('Tutor match request will be sent to API');
            }}>
            <Text style={styles.Rate_btn_txt}>Rate</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    padding: 10,
    backgroundColor: '#497174',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EFF5F5',
    padding: 15,
    borderRadius: 10,
  },
  header_txt: {
    color: '#EB6440',
  },
  course_txt: {
    color: '#000000',
  },
  course_continer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EFF5F5',
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
