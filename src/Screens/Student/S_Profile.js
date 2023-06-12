/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, Switch, Image, TouchableOpacity } from 'react-native';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams } from '../../Api/API_Types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


export default function S_Profile({ navigation }) {

  const [studentObj, setStudentObj] = useState({});
  const [isClass, setIsClass] = useState(false);
  const [isFee, setIsFee] = useState(false);
  const [isAttendance, setIsAttendance] = useState(false);
  const handleChange = (setState) => (event) => {
    setState(event);
  };
  const imagebg = require('../../Images/sk.jpg');

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
      <View style={{ flex: 1 }}>
        <View>
          <TouchableOpacity onPress={() => { console.log('Image is pressed'); }}>
            <Image source={imagebg} resizeMode="center" style={{ height: 150, width: 150, borderRadius: 150 / 2 }} />
          </TouchableOpacity>
          <Text style={{ marginTop: -74, marginLeft: 160 }}>{studentObj.sname}</Text>
          <Text style={{ marginTop: -4, marginLeft: 160, marginBottom: 35 }}>{studentObj.semail}</Text>
        </View>
        <View style={styles.containerbox}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontStyle: 'italic' }}>About Me :</Text>
          <Text style={styles.itemText}>Learning new things is an exhilarating journey of growth, curiosity, and exploration, expanding horizons, enriching knowledge, fostering creativity, and embracing the joy of discovery.</Text>
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
