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
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({ navigation }) {
  const [userEmail, setUseremail] = useState('');
  const [userPswd, setUserpswd] = useState('');

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('std_email', value);
    } catch (e) {
      console.log(e);
      console.log('----------------------------------------------------------------------------');
    }
  };

  const Verifylogin = async () => {
    try {
      const response = await fetch(
        `http://192.168.43.231/HouseOfTutors/api/Login/LoginUser?email=${userEmail}&password=${userPswd}`,
      );
      const data = await response.json();
      console.log('Result from Login API: ', data);
      console.log('----------------------------------------------------------------------------');
      if (data !== 'User Not Found') {
        storeData(userEmail);
        if (data.Role === 'Student') {
          navigation.navigate('S_Bottom_Navigator');
        } else if (data.Role === 'Tutor') {
          navigation.navigate('T_Bottom_Navigator');
        }
      } else {
        Alert.alert('Wrong username or Password!');
      }
    } catch (error) {
      console.log(error);
      console.log('----------------------------------------------------------------------------');
    }
    //navigation.navigate('S_Bottom_Navigator');
  };

  const imagebg = require('../Images/12.png');

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
          onPress={() => {
            console.log('Login is pressed');
            console.log('----------------------------------------------------------------------------');
            storeData(userEmail);
            Verifylogin();
          }}>
          <Text style={Styles.button}>Login</Text>
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
    marginTop: 80,
  },
  container2: {
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
  },
  heading: {
    fontSize: 25,
    margin: 10,
    color: '#5304D4',
    fontWeight: 'bold',
  },
  input_box: {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginTop: 15,
    elevation: 10,
  },
  ip_txt: {
    borderColor: '#5304D4',
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
    backgroundColor: '#6618E7',
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 12,
    marginVertical: 18,
    color: '#FFFFFF',
    elevation: 5,
  },
  font: {
    fontSize: 20,
  },
  signup: {
    color: '#6618E7',
    fontSize: 30,
  },
});

//primary color: 6618E7
//secondary color: 5304D4
//foreground: FFB22F
