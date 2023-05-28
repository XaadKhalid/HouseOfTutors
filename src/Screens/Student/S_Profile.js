/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, Switch, Image, TouchableOpacity } from 'react-native';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams } from '../../Api/API_Types';

export default function S_Profile() {

  const [studentObj, setStudentObj] = useState({});
  const [isClass, setIsClass] = useState(false);
  const [isFee, setIsFee] = useState(false);
  const [isAttendance, setIsAttendance] = useState(false);
  const handleChange = (setState) => (event) => {
    setState(event);
  };
  const imagebg = require('../../Images/final_logo.png');

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    let asyncrespnose = await getgmailFormAsync();
    if (asyncrespnose !== null) {
      const paramsObject = {
        controller: 'Student',
        action: 'Student_Profile',
        params: { semail: asyncrespnose },
      };
      let response = await GetWithParams(paramsObject);
      if (response !== 'No record available in Student Table') {
        setStudentObj(response);
      }
    }
  };

  return (
    <View style={styles.bodyContainer}>
      <View>
        <View>
          <TouchableOpacity onPress={() => { console.log('Image is pressed'); }}>
            <Image source={imagebg} resizeMode="center" style={{ height: 150, width: 150 }} />
          </TouchableOpacity>
          <Text style={{ marginTop: -74, marginLeft: 160 }}>{studentObj.sname}</Text>
          <Text style={{ marginTop: -4, marginLeft: 160, marginBottom: 35 }}>{studentObj.semail}</Text>
        </View>
        <View style={styles.containerbox}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontStyle: 'italic' }}>About Me :</Text>
          <Text style={styles.itemText}>Teaching is a dynamic profession that nurtures minds and shapes futures. It involves imparting knowledge, fostering critical thinking, and igniting curiosity.</Text>
        </View>
      </View>
      <View style={styles.containerbox}>
        <Text style={styles.itemText}>Parents Can View?</Text>
        <View style={styles.itembox}>
          <Text style={styles.itemText}>Class Report</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isClass ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={handleChange(setIsClass)}
            value={isClass}
          />
        </View>
        <View style={styles.itembox}>
          <Text style={styles.itemText}>Fee Details</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isFee ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={handleChange(setIsFee)}
            value={isFee}
          />
        </View>
        <View style={styles.itembox}>
          <Text style={styles.itemText}>Attendance</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isAttendance ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={handleChange(setIsAttendance)}
            value={isAttendance}
          />
        </View>
        <TouchableOpacity style={styles.button} onPressIn={() => {
          console.log('Persmission button is pressed');
        }}>
          <Text style={styles.buttonText}>Save Permissions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
