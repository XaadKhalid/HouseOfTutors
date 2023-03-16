/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function S_Courses() {
  return (
    <View style={styles.main_container}>
      <View>
        <Pressable
          style={styles.add_Course_btn}
          onPress={() => {
            Alert.alert('Couses will be fetch from API and will display here!');
          }}>
          <Icon name="add-outline" size={45} color="#ffffff" />
        </Pressable>
      </View>
      <View style={styles.course_container}>
        <View style={{flex: 1}}>
          <Text>CS-5347</Text>
          <Text>PF</Text>
        </View>
        <View style={{flex: 1}}>
          <Pressable style={styles.Tutor_btn} onPress={() => {Alert.alert('Tutor match request will be sent to API');}}>
            <Text style={styles.Tutor_btn_txt}>Find Tutor</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.course_container}>
        <View style={{flex: 1}}>
          <Text>CS-8765</Text>
          <Text>DSA</Text>
        </View>
        <View style={{flex: 1}}>
          <Pressable style={styles.Tutor_btn} onPress={() => {Alert.alert('Tutor match request will be sent to API');}}>
            <Text style={styles.Tutor_btn_txt}>Find Tutor</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.course_container}>
        <View style={{flex: 1}}>
          <Text>CS-8764</Text>
          <Text>OOP</Text>
        </View>
        <View style={{flex: 1}}>
          <Pressable style={styles.Tutor_btn} onPress={() => {Alert.alert('Tutor match request will be sent to API');}}>
            <Text style={styles.Tutor_btn_txt}>Find Tutor</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.course_container}>
        <View style={{flex: 1}}>
          <Text>CS-8764</Text>
          <Text>OOP</Text>
        </View>
        <View style={{flex: 1}}>
          <Pressable style={styles.Tutor_btn} onPress={() => {Alert.alert('Tutor match request will be sent to API');}}>
            <Text style={styles.Tutor_btn_txt}>Find Tutor</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.course_container}>
        <View style={{flex: 1}}>
          <Text>CS-8764</Text>
          <Text>OOP</Text>
        </View>
        <View style={{flex: 1}}>
          <Pressable style={styles.Tutor_btn} onPress={() => {Alert.alert('Tutor match request will be sent to API');}}>
            <Text style={styles.Tutor_btn_txt}>Find Tutor</Text>
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
  course_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#EFF5F5',
  },
  add_Course_btn: {
    backgroundColor: '#EB6440',
    borderRadius: 50 / 2,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    elevation: 10,
  },
  Tutor_btn: {
    marginLeft: 'auto',
    elevation: 10,
  },
  Tutor_btn_txt: {
    backgroundColor: '#EB6440',
    color: '#ffffff',
    padding: 9,
    borderRadius: 8,
  },
});
