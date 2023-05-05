/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams } from '../../Api/API_Types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

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
        let updatedresponse = response.map(item => ({ ...item, takenflag: false, resflag: false, btnflag: true }));
        setClassesList(updatedresponse);
      }
      else {
        setClassesList(null);
      }
    }
  };

  const toggleFlag = (index, selectedFlag) => {
    setClassesList((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          if (selectedFlag === 'Take') {
            console.log('i m ', selectedFlag);
            return { ...item, takenflag: true, btnflag: false };
          }
          else {
            console.log('i m ', selectedFlag);
            return { ...item, resflag: true, btnflag: false };
          }
        }
        return item;
      })
    );
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
      {item.takenflag && (
        <Text style={styles.itemText}>Class is Already Taken</Text>
      )}
      {item.resflag && (
        <Text style={styles.itemText}>Sorry your Class is ReSchedule</Text>
      )}
      {item.btnflag && (
        <View style={styles.itembox}>
          <TouchableOpacity style={styles.button} onPressIn={() => {
            let selectedFlag = 'Take';
            toggleFlag(index, selectedFlag);
          }}>
            <Text style={styles.buttonText}>Take Class</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            let selectedFlag = 'ReTake';
            toggleFlag(index, selectedFlag);
          }}>
            <Text style={styles.buttonText}>ReSchedule Class</Text>
          </TouchableOpacity>
        </View>
      )}
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
