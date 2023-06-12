/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams } from '../../Api/API_Types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function T_Fee() {

  const [coursesList, setcoursesList] = useState([]);
  const [totalFee, setTotalFee] = useState(0);

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
        action: 'Get_Courses_Fee',
        params: { temail: gmail },
      };
      let response = await GetWithParams(paramsObject);
      if (response !== 'No Courses found in enrollement Table' && response !== 'You have not taken any class yet') {
        let total = 0;
        response.forEach(element => {
          total += element.fee;
        });
        setTotalFee(total);
        setcoursesList(response);
      }
      else {
        setcoursesList(null);
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
        <Text style={styles.itemText}>NoOfLectures: </Text>
        <Text style={styles.itemText}>{item.noOflec}</Text>
      </View>
      <View style={styles.itembox}>
        <Text style={styles.itemText}>Fees: </Text>
        <Text style={styles.itemText}>{item.fee}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.bodyContainer}>
      {coursesList ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={coursesList}
            renderItem={renderclasses} />
          <View style={styles.containerbox}>
            <View style={styles.itembox}>
              <Text style={styles.itemText}>Total Fee</Text>
              <Text style={styles.itemText}>{totalFee}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>
            There is no student who had to pay you fee{'\n'}
            <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
            <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
            <SimpleLineIcons name={'emotsmile'} size={50} color="#000000" />
          </Text>
        </View>
      )}
    </View>
  );
}
