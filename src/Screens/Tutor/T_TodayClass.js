/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams, PostWithObject } from '../../Api/API_Types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function T_TodayClass() {
  const [classesList, setClassesList] = useState([]);

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = async () => {
    let asyncresponse = await getgmailFormAsync();
    if (asyncresponse !== null) {
      //const date = new Date(2023, 5, 8);
      const date = new Date();
      const isoDateString = date.toISOString().split('T')[0]; // Extract the date part
      const paramsObject = {
        controller: 'Tutor',
        action: 'Get_Today_Classes',
        params: {
          temail: asyncresponse,
          //classdate: new Date().toDateString(),
          classdate: isoDateString,
        },
      };
      let response = await GetWithParams(paramsObject);
      if (response !== 'No class are schedule for today' && response !== 'No Record Found in the Enrollment') {
        const [year, month, day] = isoDateString.split('-');
        const itemDate = `${parseInt(month, 10)}/${parseInt(day, 10)}/${year}`;
        let updatedresponse = response.map(item => {
          if (item.scheduleType === 2) {
            if (item.date === itemDate) {
              return {
                ...item,
                isClassTaken: false,
                isClassReschedule: true,
                AlreadyResscheduled: false,
                isClassPreschedule: false,
                AlreadyPrescheduled: false,
                btnflag: false,
              };
            }
            else {
              return {
                ...item,
                isClassTaken: item.istaken === 1 ? true : false,
                isClassReschedule: false,
                AlreadyResscheduled: true,
                AlreadyPrescheduled: false,
                isClassPreschedule: false,
                btnflag: item.istaken === 1 ? false : true,
              };
            }
          } else if (item.scheduleType === 3) {
            if (item.date === itemDate) {
              return {
                ...item,
                isClassTaken: false,
                isClassReschedule: false,
                AlreadyPrescheduled: false,
                AlreadyResscheduled: false,
                isClassPreschedule: true,
                btnflag: false,
              };
            }
            else {
              return {
                ...item,
                isClassTaken: item.istaken === 1 ? true : false,
                isClassReschedule: false,
                AlreadyPrescheduled: true,
                AlreadyResscheduled: false,
                isClassPreschedule: false,
                btnflag: item.istaken === 1 ? false : true,
              };
            }
          } else {
            return {
              ...item,
              isClassTaken: item.istaken === 1 ? true : false,
              isClassReschedule: false,
              AlreadyResscheduled: false,
              isClassPreschedule: false,
              AlreadyPrescheduled: false,
              btnflag: item.istaken === 1 ? false : true,
            };
          }
        });
        setClassesList(updatedresponse);
      } else {
        setClassesList(null);
      }
    }
  };

  const takeclass = async (item) => {
    const paramsObject = {
      controller: 'Tutor',
      action: 'Take_Class',
      // params: {
      //   sname: semail,
      //   tname: temail,
      //   cname: cid,
      //   slot: slot,
      // },
      params: item,
    };
    let response = await PostWithObject(paramsObject);
    if (response !== null) {
      console.log('reposne', response);
      console.log();
    }
  };

  const handleTakeCalss = (index) => {
    setClassesList((prev) => {
      const updatedList = prev.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            isClassTaken: true,
            btnflag: false,
          };
        }
        return item;
      });
      return updatedList;
    });
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
      {item.isClassTaken && (
        <Text style={styles.itemText}>Class is Already Taken</Text>
      )}
      {item.isClassReschedule && (
        <Text style={styles.itemText}>This Class is ReScheduled</Text>
      )}
      {item.isClassPreschedule && (
        <Text style={styles.itemText}>This Class is PreScheduled</Text>
      )}
      {item.AlreadyPrescheduled && (
        <Text style={styles.itemText}>{'\n'}This Class is PreScheduled of {item.date}{'\n'}</Text>
      )}
      {item.AlreadyResscheduled && (
        <Text style={styles.itemText}>{'\n'}This Class is a ReScheduled class of {item.date}{'\n'}</Text>
      )}
      {item.btnflag && (
        <TouchableOpacity style={styles.button} onPressIn={() => {
          //takeclass(item.sname, item.tname, item.cname, item.slotindexes[0]);
          takeclass(item);
          handleTakeCalss(index);
        }}>
          <Text style={styles.buttonText}>Take Class</Text>
        </TouchableOpacity>
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
