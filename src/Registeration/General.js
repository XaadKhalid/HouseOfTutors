import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { Appbar, TextInput as TextIp, Card, Button } from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function General() {
  const [contact, setContact] = useState('');
  const [nic, setNic] = useState('');

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('General', jsonValue);
      //console.log(jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e.message);
    }
  };

  const RegistserUser = () => {
    let lev1 = getData(personal);
    let lev2 = getData(Academic);
    let lev3 = getData(General);
    console.log(lev1);
    console.log(lev2);
    console.log(lev3);
  }

  return (
    <View>
      <Appbar style={style.bar}>
        <Appbar.Content title="Registeration Portal" />
      </Appbar>
      <View style={style.card_container}>
        <Card>
          <Card.Title title="Level Three" subtitle="Guardian Information" />
          <Card.Content>
            <TextIp
              label="Contact Number"
              style={style.txtip}
              mode="outlined"
              value={contact}
              onChangeText={(value) => { setContact(value); }}
              right={<TextIp.Icon icon="phone-in-talk-outline" />}
            />
            <TextIp
              label="Father NIC"
              style={style.txtip}
              mode="outlined"
              value={nic}
              onChangeText={(value) => { setNic(value); }}
              right={<TextIp.Icon icon="card-account-details" />}
            />
            <View style={style.pker}>
              <Text style={{ marginTop: 5, color: '#404040', marginLeft: 10 }}>
                Choose Image
              </Text>
              <TouchableOpacity activeOpacity={0.5}>
                <Icon2
                  style={{ marginRight: 7 }}
                  name="attach-file"
                  size={30}
                  color="#404040"
                />
              </TouchableOpacity>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => {
              console.log('result');
              storeData({
                cnt: contact,
                nic: nic,
              });
              RegistserUser();
            }}>Submit Request</Button>
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
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
  pker: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
});
