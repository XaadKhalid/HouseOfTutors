/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GetWithParams } from '../../Api/API_Types';
import { storegmailToAsync } from '../../AsyncStorage/GlobalData';

function Login({ navigation }) {
  const [userEmail, setUseremail] = useState('');
  const [userPswd, setUserpswd] = useState('');

  const Verifylogin = async () => {
    const paramsObject = {
      controller: 'Login',
      action: 'Universal_Login',
      params: { email: userEmail, password: userPswd },
    };
    let response = await GetWithParams(paramsObject);
    const roleToScreen = {
      Student: 'S_Bottom_Navigator',
      Tutor: 'T_Bottom_Navigator',
      Admin: 'AdminStack',
      Parent: 'ParentStack',
    };
    if (response !== 'User Not Found' && response !== 'Wrong CNIC Entered') {
      storegmailToAsync(userEmail);
      const screenName = roleToScreen[response.Role];
      navigation.navigate(screenName);
    }
    else {
      Alert.alert('Wrong username or Password!');
    }
  };

  const imagebg = require('../../Images/final_logo.png');

  return (
    <View style={Styles.container1}>
      <Image source={imagebg} resizeMode="center" style={Styles.img} />
      <Text style={Styles.heading}>HOUSE OF TUTORS</Text>
      <View style={Styles.container2}>
        <View style={Styles.input_box}>
          <MaterialCommunityIcons name="email" size={30} color="#FFB22F" style={Styles.ip_icon} />
          <TextInput
            style={Styles.ip_txt}
            placeholder="ali@gmail.com"
            onChangeText={value => {
              setUseremail(value);
            }}
          />
        </View>
        <View style={Styles.input_box}>
          <MaterialIcons name="lock" size={30} color="#FFB22F" style={Styles.ip_icon} />
          <TextInput
            style={Styles.ip_txt}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={value => {
              setUserpswd(value);
            }}
          />
        </View>
        <Pressable
          style={Styles.button}
          onPress={() => {
            console.log('Login is pressed');
            console.log();
            Verifylogin();
          }}>
          <Text style={Styles.lgntxt}>Login</Text>
        </Pressable>
        <Text style={Styles.font}>Don't have an account ?</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text style={Styles.signup}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
}
export default Login;

const Styles = StyleSheet.create({
  container1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(255,255,255, 0.8)',
    paddingTop: 80,
    flex: 1,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingVertical: 55,
    elevation: 10,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
  },
  heading: {
    fontSize: 25,
    margin: 10,
    color: '#FFB22F',
    fontWeight: 'bold',
  },
  input_box: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#282634',
    borderWidth: 1,
    marginTop: 15,
    elevation: 3,
  },
  ip_txt: {
    borderColor: '#282634',
    borderLeftWidth: 1,
    width: '60%',
    textAlign: 'center',
    color: '#000000',
  },
  ip_icon: {
    marginTop: 9,
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: '#282634',
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginVertical: 18,
    elevation: 3,
  },
  lgntxt: {
    color: '#FFB22F',
    fontSize: 20,
    fontWeight: 'bold',
  },
  font: {
    fontSize: 20,
  },
  signup: {
    color: '#FFB22F',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
