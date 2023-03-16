/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {View, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import {
  TextInput as TextIp,
  Appbar,
  Card,
  Button,
  RadioButton,
} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Academic({navigation}) {
  const [semeter, setsemester] = useState(1);
  const [cgpa, setcgpa] = useState(0);
  const [gender, setgender] = useState('Male');

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('Academic', jsonValue);
      //console.log(jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Appbar style={style.bar}>
        <Appbar.Content title="Registeration Portal" />
      </Appbar>
      <View style={style.card_container}>
        <Card>
          <Card.Title title="Level Two" subtitle="Academic Information" />
          <Card.Content>
            {/* <Text style={{fontSize: 18}}>Semester</Text> */}
            <View style={style.pker}>
              <Picker selectedValue={semeter} onValueChange={(value)=>{setsemester(value);}}>
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
              value={cgpa}
              mode="outlined"
              right={<TextIp.Icon icon="chart-line" />}
              onChangeText={value => setcgpa(value)}
              keyboardType="decimal-pad"
              style={{marginBottom: 8}}
            />
            <View style={style.pker}>
              <View style={style.gnd}>
                <View>
                  <Icon
                    style={{marginRight: 12}}
                    name="gender-male"
                    size={30}
                    color="#000000"
                  />
                </View>
                <View>
                  <Icon
                    style={{marginRight: 15}}
                    name="gender-female"
                    size={30}
                    color="#000000"
                  />
                </View>
              </View>
              <RadioButton.Group
                onValueChange={newValue => setgender(newValue)}
                value={gender}>
                <View style={style.gnd}>
                  <View>
                    <Text>Male</Text>
                    <RadioButton value="Male"/>
                  </View>
                  <View>
                    <Text>Female</Text>
                    <RadioButton value="Female"/>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button
              onPress={() => {
                storeData(
                  {
                    cgp: cgpa,
                    semester: semeter,
                    gendr: gender,
                  }
                );
                navigation.navigate('General');
              }}>
              Next Step
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  bar: {
    backgroundColor: '#3D85C6',
  },
  card_container: {
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  pker: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  gnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});
