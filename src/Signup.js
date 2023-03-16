import React, {useState} from 'react';
// import {View, Text, StyleSheet, Pressable} from 'react-native';
// import {RadioButton} from 'react-native-paper';
// import {Appbar} from 'react-native-paper';
// import {TextInput as TextIp} from 'react-native-paper';
import Reg_Screen_Controll from './Registeration/Reg_Screen_Controll';

function Signup({navigation}) {
  //const [gender, setGender] = useState('Male');
  return (
    <Reg_Screen_Controll />
    // <View>
    //   <View style={{width: '100%'}}>
    //     <Appbar.Header style={{backgroundColor: '#5304D4'}}>
    //       <Text
    //         style={{
    //           fontSize: 30,
    //           fontWeight: '350',
    //           color: '#FFB22F',
    //           textAlign: 'center',
    //         }}>
    //         Registeration Form
    //       </Text>
    //     </Appbar.Header>
    //   </View>
    //   <View>
    //     <TextIp label="Name" style={{margin: 15}} mode="outlined" />
    //     <TextIp label="Email" style={{margin: 15}} mode="outlined" />
    //     <TextIp label="Password" style={{margin: 15}} mode="outlined" />
    //   </View>
    //</View>
    // {/* <View style={Styles.Container}>
    //   <TextInput
    //     style={Styles.InputFileds}
    //     placeholderTextColor="#000000"
    //     placeholder="CNIC"
    //   />
    //   <TextInput
    //     style={Styles.InputFileds}
    //     placeholderTextColor="#000000"
    //     placeholder="Name"
    //   />
    //   <TextInput
    //     style={Styles.InputFileds}
    //     placeholderTextColor="#000000"
    //     placeholder="Email"
    //   />
    //   <TextInput
    //     style={Styles.InputFileds}
    //     placeholderTextColor="#000000"
    //     placeholder="Passowrd"
    //   />
    //   <TextInput
    //     style={Styles.InputFileds}
    //     placeholderTextColor="#000000"
    //     placeholder="Contact"
    //   />
    //   <TextInput
    //     style={Styles.InputFileds}
    //     placeholderTextColor="#000000"
    //     placeholder="Cgpa"
    //   />
    //   <TextInput
    //     style={Styles.InputFileds}
    //     placeholderTextColor="#000000"
    //     placeholder="Semester"
    //   />
    //   <View
    //     style={[
    //       Styles.radiohead,
    //       Styles.radiobtn,
    //       {justifyContent: 'space-evenly'},
    //     ]}>
    //     <View style={Styles.radiohead}>
    //       <RadioButton value="Male" onPress={() => {}} />
    //       <Text style={Styles.radiotxt}>Male</Text>
    //     </View>
    //     <View style={Styles.radiohead}>
    //       <RadioButton value="FeMale" onPress={() => {}} />
    //       <Text style={Styles.radiotxt}>FeMale</Text>
    //     </View>
    //   </View>
    //   <TextInput
    //     style={Styles.InputFileds}
    //     placeholderTextColor="#000000"
    //     placeholder="Image"
    //   />
    //   <Pressable
    //     onPress={() => {
    //       console.log('Registered');
    //     }}>
    //     <Text style={Styles.button}>Signup</Text>
    //   </Pressable>
    // </View> */}
  );
}

export default Signup;

// const Styles = StyleSheet.create({
//   Container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//   },
//   InputFileds: {
//     borderRadius: 12,
//     borderColor: '#5F6F94',
//     width: '80%',
//     marginBottom: 18,
//     backgroundColor: '#EFF5F5',
//     textAlign: 'center',
//     color: '#000000',
//   },
//   radiohead: {
//     flexDirection: 'row',
//   },
//   radiobtn: {
//     borderRadius: 12,
//     borderColor: '#5F6F94',
//     width: '80%',
//     paddingVertical: 5,
//     marginBottom: 18,
//     backgroundColor: '#EFF5F5',
//     textAlign: 'center',
//     color: '#000000',
//   },
//   button: {
//     backgroundColor: '#EB6440',
//     paddingVertical: 15,
//     paddingHorizontal: 90,
//     borderRadius: 12,
//     marginVertical: 25,
//     color: '#FFFFFF',
//     fontSize: 17,
//     elevation: 5,
//   },
//   radiotxt: {
//     color: '#000000',
//     marginTop: 7,
//   },
// });
