/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { TextInput as TextIp, RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Studentsignup, Tutorsignup } from '../Api/ApiForAuthentication';

export default function Signup() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [semeter, setsemester] = useState('1');
  const [cgpa, setcgpa] = useState('');
  const [gender, setgender] = useState('Male');
  const [contact, setContact] = useState('');
  const [nic, setNic] = useState('');
  const [role, setrole] = useState('Student');

  const userdata = {
    sname: name,
    semail: email,
    spassword: password,
    semester: semeter,
    contact: contact,
    cgpa: cgpa,
    gender: gender,
    fcnic: nic,
  };

  const tutordata = {
    tname: name,
    temail: email,
    tpassword: password,
    semester: semeter,
    contact: contact,
    cgpa: cgpa,
    gender: gender,
  };

  const Register = async (status) => {
    let response = null;
    if (status === 'Student') {
      response = await Studentsignup(userdata);
    }
    else {
      response = await Tutorsignup(tutordata);
    }
    Alert.alert(response);
  };

  return (
    <View style={style.bg}>
      <View style={style.container}>
        <Text style={style.heading}>Registeration Portal</Text>
        <TextIp
          label="Name"
          style={style.txtip}
          mode="outlined"
          value={name}
          onChangeText={value => {
            setname(value);
          }}
          right={<TextIp.Icon icon="account" />}
        />
        <TextIp
          label="Email"
          style={style.txtip}
          mode="outlined"
          value={email}
          onChangeText={value => {
            setemail(value);
          }}
          right={<TextIp.Icon icon="email" />}
        />
        <TextIp
          label="Password"
          style={style.txtip}
          mode="outlined"
          value={password}
          onChangeText={value => {
            setpassword(value);
          }}
          right={<TextIp.Icon icon="eye" />}
        />
        <View style={[style.pker, style.ipdistance]}>
          <Picker
            selectedValue={semeter.toString()}
            onValueChange={value => {
              setsemester(value);
            }}>
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5" value={5} />
            <Picker.Item label="6" value={6} />
            <Picker.Item label="7" value={7} />
            <Picker.Item label="8" value={8} />
          </Picker>
        </View>
        <TextIp
          label="CGPA"
          value={cgpa.toString()}
          mode="outlined"
          right={<TextIp.Icon icon="chart-line" />}
          onChangeText={value => setcgpa(value)}
          keyboardType="decimal-pad"
          style={{ marginBottom: 8 }}
        />
        <View style={style.pker}>
          <RadioButton.Group
            onValueChange={newValue => setgender(newValue)}
            value={gender}>
            <View style={style.gnd}>
              <View>
                <Text>Male</Text>
                <RadioButton value="Male" />
              </View>
              <View>
                <Text>Female</Text>
                <RadioButton value="Female" />
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <TextIp
          label="Contact Number"
          style={style.txtip}
          mode="outlined"
          value={contact.toString()}
          onChangeText={value => {
            setContact(value);
          }}
          right={<TextIp.Icon icon="phone-in-talk-outline" />}
        />
        <TextIp
          label="Father NIC"
          style={style.txtip}
          mode="outlined"
          value={nic.toString()}
          onChangeText={value => {
            setNic(value);
          }}
          right={<TextIp.Icon icon="card-account-details" />}
        />
        <View style={[style.pker, style.ipdistance, style.imgepic]}>
          <Text style={{ marginTop: 5, color: '#404040', marginLeft: 10 }}>
            Choose Image
          </Text>
          <TouchableOpacity>
            <MaterialIcons
              style={{ marginRight: 7 }}
              name="attach-file"
              size={30}
              color="#404040"
            />
          </TouchableOpacity>
        </View>
        <View style={[style.pker, style.mb]} >
          <RadioButton.Group
            onValueChange={newValue => setrole(newValue)}
            value={role}>
            <View style={style.gnd}>
              <View>
                <Text>Student</Text>
                <RadioButton value="Student" />
              </View>
              <View>
                <Text>Tutor</Text>
                <RadioButton value="Tutor" />
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <TouchableOpacity style={style.button} onPress={() => {
          if (name !== '') {
            if (email !== '') {
              if (password !== '') {
                if (cgpa !== '') {
                  if (contact !== '') {
                    if (nic !== '') {
                      console.log('Submit Button is pressed and studnetsingup api is called!');
                      console.log('----------------------------------------------------------------------------');
                      Register(role);
                    }
                    else {
                      Alert.alert('All fields are mandatory');
                    }
                  }
                  else {
                    Alert.alert('All fields are mandatory');
                  }
                }
                else {
                  Alert.alert('All fields are mandatory');
                }
              }
              else {
                Alert.alert('All fields are mandatory');
              }
            }
            else {
              Alert.alert('All fields are mandatory');
            }
          }
          else {
            Alert.alert('All fields are mandatory');
          }
        }}>
          <Text
            style={style.submit}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  bg: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  heading: {
    fontSize: 25,
    margin: 10,
    color: '#5304D4',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pker: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#eeefff',
  },
  imgepic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  ipdistance: {
    marginTop: 8,
  },
  mb: {
    marginTop: 8,
  },
  gnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: '#6618E7',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginVertical: 18,
    elevation: 5,
    width: '50%',
    marginLeft: 90,
  },
  submit: {
    color: '#FFB22F',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
