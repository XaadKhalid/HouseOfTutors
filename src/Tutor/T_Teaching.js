/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';

export default function S_Learning() {
  return (
    <View style={styles.main_container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.header_txt}>Student</Text>
        </View>
        <View>
          <Text style={styles.header_txt}>Course</Text>
        </View>
        <View>
          <Text style={styles.header_txt}>Status</Text>
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
            <Text style={styles.Rate_btn_txt}>InProgress</Text>
          </Pressable>
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
            <Text style={styles.Rate_btn_txt}>Completed</Text>
          </Pressable>
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
            <Text style={styles.Rate_btn_txt}>Completed</Text>
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
  course_txt: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  course_continer: {
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
