/* eslint-disable prettier/prettier */
import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Appbar, TextInput as TextIp, Card, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Personal({navigation}) {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('personal', jsonValue);
      //console.log('Data recieved in AynscStorage', jsonValue);
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
          <Card.Title title="Level One" subtitle="Personal Information" />
          <Card.Content>
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
          </Card.Content>
          <Card.Actions>
            <Button
              onPress={() => {
                storeData({
                  username: name,
                  email: email,
                  password: password,
                });
                navigation.navigate('Academic');
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
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
});
