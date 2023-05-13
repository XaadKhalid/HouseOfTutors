/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams } from '../../Api/API_Types';

export default function T_Profile() {

  const [studentObj, setStudentObj] = useState({});
  const imagebg = require('../../Images/final_logo.png');

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
    <View style={styles.profilecontainer}>
      <View>
        <Image source={imagebg} resizeMode="center" style={{ height: 200, width: 200, marginBottom: 5 }} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputlabel}>Name :</Text>
        <TextInput placeholder={studentObj.tname} placeholderTextColor={'#000'} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputlabel}>Email :</Text>
        <TextInput placeholder={studentObj.temail} placeholderTextColor={'#000'} editable={false} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputlabel}>Password :</Text>
        <TextInput placeholder={studentObj.tpassword} placeholderTextColor={'#000'} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputlabel}>Cgpa :</Text>
        <TextInput placeholder="3.3" placeholderTextColor={'#000'} editable={false} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputlabel}>semester :</Text>
        <TextInput placeholder="6" placeholderTextColor={'#000'} editable={false} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputlabel}>Contact :</Text>
        <TextInput placeholder={studentObj.contact} placeholderTextColor={'#000'} />
      </View>
    </View>
  );
}

