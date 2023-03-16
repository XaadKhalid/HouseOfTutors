/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({navigation}) {
  const [userEmail, setUseremail] = useState('');
  const [userPswd, setUserpswd] = useState('');

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('stdem', value);
      console.log('Gmail recieved in AynscStorage', value);
    } catch (e) {
      console.log(e);
    }
  };

  const Verifylogin = async () => {
    try {
      const response = await fetch(`http://192.168.43.90/HouseOfTutorsAPI_2/api/student/StudentLogin?e=${userEmail}&p=${userPswd}`);
      const data = await response.json();
      //const str = data.toString();
      console.log(data);
      if (data !== 'No User Found!') {
        storeData(userEmail);
        navigation.navigate('Std_Screens');
      } else {
        Alert.alert('Wrong username or Password!');
      }
    } catch (error) {
      console.log(error);
    }
    //navigation.navigate('Std_Screens');
  };

  const imagebg = require('./Images/12.png');

  return (
    <View style={Styles.container}>
      <Image source={imagebg} resizeMode="center" style={Styles.img} />
      <View style={Styles.input_box}>
        <Icon name="email" size={30} color="#FFB22F" style={Styles.ip_icon} />
        <TextInput
          style={Styles.ip_txt}
          placeholder="ali@gmail.com"
          onChangeText={value => {
            setUseremail(value);
          }}
        />
      </View>
      <View style={Styles.input_box}>
        <Icon2 name="lock" size={30} color="#FFB22F" style={Styles.ip_icon} />
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
          Verifylogin();
        }}>
        <Text style={Styles.button}>Login</Text>
      </Pressable>
      <Text style={Styles.font}>Don't have an account ?</Text>
      <Pressable
        onPress={() => {
          navigation.navigate('Personal');
        }}>
        <Text style={Styles.signup}>Register</Text>
      </Pressable>
    </View>
  );
}
export default Login;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  img: {
    width: 200,
    height: 200,
  },
  input_box: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#5304D4',
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
    paddingHorizontal: 5,
  },
  button: {
    backgroundColor: '#5304D4',
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 12,
    marginVertical: 18,
    color: '#FFFFFF',
    elevation: 5,
  },
  font: {
    fontStyle: 'italic',
  },
  signup: {
    color: '#6618E7',
    fontSize: 20,
  },
});
