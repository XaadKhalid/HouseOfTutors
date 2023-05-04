/* eslint-disable prettier/prettier */
import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams } from '../../Api/API_Types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function T_TodayClass() {

  const [classesList, setClassesList] = useState([]);

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    let gmail = '';
    let asyncresponse = await getgmailFormAsync();
    if (asyncresponse !== null) {
      gmail = asyncresponse;
      const paramsObject = {
        controller: 'Tutor',
        action: 'Get_Today_Classes',
        params: { temail: gmail },
      };
      let response = await GetWithParams(paramsObject);
      if (response !== 'No class are schedule for today' && response !== 'No Record Found in the Enrollment') {
        setClassesList(response);
        console.log('i find the records');
      }
      else {
        setClassesList(null);
        console.log('i m not able to find the records');
      }
    }
  };

  const renderclasses = ({ item, index }) => (
    <View key={index} style={styles.containerbox}>
      <View style={styles.itembox}>
        <Text style={styles.itemText}>Course: </Text>
        <Text style={styles.itemText}>{item.cname}</Text>
      </View>
      <View style={styles.itembox}>
        <Text style={styles.itemText}>Student: </Text>
        <Text style={styles.itemText}>{item.sname}</Text>
      </View>
      <View style={styles.itembox}>
        <Text style={styles.itemText}>Time: </Text>
        <Text style={styles.itemText}>{item.slotindexes}</Text>
      </View>
      <View style={styles.itembox}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Take Class</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ReSchedule Class</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.bodyContainer}>
      {classesList ? (
        <View>
          <FlatList
            data={classesList}
            renderItem={renderclasses} />
        </View>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>
            You are not having any class for Today{'\n'}
            <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
            <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
            <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
          </Text>
        </View>
      )}
    </View>
  );
}
