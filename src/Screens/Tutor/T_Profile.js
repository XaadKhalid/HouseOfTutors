/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams } from '../../Api/API_Types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function T_Profile({ navigation }) {

  const [studentObj, setStudentObj] = useState({});
  const imagebg = require('../../Images/sk.jpg');

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    let asyncrespnose = await getgmailFormAsync();
    if (asyncrespnose !== null) {
      const paramsObject = {
        controller: 'Tutor',
        action: 'Tutor_Profile',
        params: { temail: asyncrespnose },
      };
      let response = await GetWithParams(paramsObject);
      if (response !== 'No record available in Student Table') {
        setStudentObj(response);
      }
    }
  };

  return (
    <View style={styles.bodyContainer}>
      <View style={{ flex: 1 }}>
        <View>
          <TouchableOpacity onPress={() => { console.log('Image is pressed'); }}>
            <Image source={imagebg} resizeMode="center" style={{ height: 150, width: 150, borderRadius: 150 / 2 }} />
          </TouchableOpacity>
          <Text style={{ marginTop: -74, marginLeft: 160 }}>{studentObj.tname}</Text>
          <Text style={{ marginTop: -4, marginLeft: 160, marginBottom: 35 }}>{studentObj.temail}</Text>
        </View>
        <View style={styles.containerbox}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontStyle: 'italic' }}>About Me :</Text>
          <Text style={styles.itemText}>Teaching is a dynamic profession that nurtures minds and shapes futures. It involves imparting knowledge, fostering critical thinking, and igniting curiosity.</Text>
        </View>
        <View style={styles.containerbox}>
          <Text style={styles.itemText}>Portfolio</Text>
          <View style={styles.itembox}>
            <Text style={styles.itemText}>Profile Rating</Text>
            <Text style={styles.itemText}>*****</Text>
          </View>
          <View style={styles.itembox}>
            <Text style={styles.itemText}>Total Earning</Text>
            <Text style={styles.itemText}>*****</Text>
          </View>
          <View style={styles.itembox}>
            <Text style={styles.itemText}>No of Students</Text>
            <Text style={styles.itemText}>*****</Text>
          </View>
          <View style={styles.itembox}>
            <Text style={styles.itemText}>No of Courses Taught</Text>
            <Text style={styles.itemText}>*****</Text>
          </View>
          <View style={styles.itembox}>
            <Text style={styles.itemText}>No of Lectures Delivered</Text>
            <Text style={styles.itemText}>*****</Text>
          </View>
        </View>
      </View>
      <View style={styles.containerbox}>
        <View style={styles.itembox}>
          <Text style={[styles.itemText, { marginTop: 10 }]}>LogOut</Text>
          <TouchableOpacity
            style={styles.button2}
            onPressIn={() => {
              navigation.navigate('Login');
            }}>
            <SimpleLineIcons name={'logout'} size={20} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
