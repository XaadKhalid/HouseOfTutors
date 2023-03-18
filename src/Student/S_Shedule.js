/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function S_Shedule() {
  const Slots = {
    Mon1: false,
    Mon2: false,
    Mon3: false,
    Mon4: false,
    Mon5: false,
    Mon6: false,
    Mon7: false,
    Mon8: false,
    Mon9: false,
    Mon10: false,
    Mon11: false,
    Mon12: false,
    Mon13: false,
    Mon14: false,
    Mon15: false,
    Mon16: false,
    Tue1: false,
    Tue2: false,
    Tue3: false,
    Tue4: false,
    Tue5: false,
    Tue6: false,
    Tue7: false,
    Tue8: false,
    Tue9: false,
    Tue10: false,
    Tue11: false,
    Tue12: false,
    Tue13: false,
    Tue14: false,
    Tue15: false,
    Tue16: false,
    Wed1: false,
    Wed2: false,
    Wed3: false,
    Wed4: false,
    Wed5: false,
    Wed6: false,
    Wed7: false,
    Wed8: false,
    Wed9: false,
    Wed10: false,
    Wed11: false,
    Wed12: false,
    Wed13: false,
    Wed14: false,
    Wed15: false,
    Wed16: false,
    Thu1: false,
    Thu2: false,
    Thu3: false,
    Thu4: false,
    Thu5: false,
    Thu6: false,
    Thu7: false,
    Thu8: false,
    Thu9: false,
    Thu10: false,
    Thu11: false,
    Thu12: false,
    Thu13: false,
    Thu14: false,
    Thu15: false,
    Thu16: false,
    Fri1: false,
    Fri2: false,
    Fri3: false,
    Fri4: false,
    Fri5: false,
    Fri6: false,
    Fri7: false,
    Fri8: false,
    Fri9: false,
    Fri10: false,
    Fri11: false,
    Fri12: false,
    Fri13: false,
    Fri14: false,
    Fri15: false,
    Fri16: false,
    Sat1: false,
    Sat2: false,
    Sat3: false,
    Sat4: false,
    Sat5: false,
    Sat6: false,
    Sat7: false,
    Sat8: false,
    Sat9: false,
    Sat10: false,
    Sat11: false,
    Sat12: false,
    Sat13: false,
    Sat14: false,
    Sat15: false,
    Sat16: false,
    Sun1: false,
    Sun2: false,
    Sun3: false,
    Sun4: false,
    Sun5: false,
    Sun6: false,
    Sun7: false,
    Sun8: false,
    Sun9: false,
    Sun10: false,
    Sun11: false,
    Sun12: false,
    Sun13: false,
    Sun14: false,
    Sun15: false,
    Sun16: false,
  };
  const [selectedslot, setselectedslot] = useState(Slots);
  const [stdemail, setStdEmail] = useState('');
  const [schedulearray, setSchedulearray] = useState([]);

  useEffect(() => {
    getgmail();
    get_Schedule(stdemail);
  }, []);

  const getgmail = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('std_email');
      if (jsonValue != null) {
        setStdEmail(jsonValue);
      }
      else {
        console.log('No gmail found in Asyncstorage');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const set_pre_check = () => {
    let kyesofslot = Object.keys(Slots);
    console.log('keys of the main slot', kyesofslot.length);
    console.log('1 and 0 to be match', schedulearray.length);
    for (let i = 0; i < schedulearray.length; i++) {
      let v = kyesofslot[i];
      if (schedulearray[i] === '1') {
        Slots[v] = true;
      }
    }
    setselectedslot(Slots);
    console.log('slots to be marked yes', Slots);
  };

  const get_Schedule = async (email) => {
    console.log('result to be fethed for ', email);
    try {
      const response = await fetch(
        `http://192.168.43.231/HouseOfTutors/api/Student/StudentSchedule?email=${email}`,
      );
      const data = await response.json();
      console.log('Result from getschedule API: ', data);
      if (data !== null) {
        const scheduleData = data.split(''); // create an array of characters from the string
        setSchedulearray(scheduleData);
        console.log('converted api string to array', scheduleData);
        set_pre_check();
      } else {
        Alert.alert('No Schedule Found!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Set_schedule = async (details, email) => {
    console.log('set schedule is called => ', details);
    console.log('email is  => ', email);
    try {
      const response = await fetch(`http://192.168.43.231/HouseOfTutors/api/student/StudentSchedule?details=${details}&email=${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      console.log(data);
      Alert.alert(data);
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ backgroundColor: '#ffffff' }}>
      <View style={[styles.row, styles.row2]}>
        <View style={styles.time_header}>
          <Text style={styles.header_txt}>Time Slots</Text>
        </View>
        <View style={styles.days_header}>
          <Text style={styles.header_txt}>Mon</Text>
        </View>
        <View style={styles.days_header}>
          <Text style={styles.header_txt}>Tue</Text>
        </View>
        <View style={styles.days_header}>
          <Text style={styles.header_txt}>Wed</Text>
        </View>
        <View style={styles.days_header}>
          <Text style={styles.header_txt}>Thu</Text>
        </View>
        <View style={styles.days_header}>
          <Text style={styles.header_txt}>Fri</Text>
        </View>
        <View style={styles.days_header}>
          <Text style={styles.header_txt}>Sat</Text>
        </View>
        <View style={styles.days_header}>
          <Text style={styles.header_txt}>Sun</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ marginTop: 3 }}>
          <Text style={styles.header_txt}>08:30-09:30 AM</Text>
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Mon1}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Mon1: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Tue1}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Tue1: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Wed1}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Wed1: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Thu1}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Thu1: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Fri1}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Fri1: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sat1}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sat1: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sun1}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sun1: value })
            }
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ marginTop: 2 }}>
          <Text style={styles.header_txt}>09:30-10:30 AM</Text>
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Mon2}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Mon2: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Tue2}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Tue2: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Wed2}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Wed2: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Thu2}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Thu2: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Fri2}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Fri2: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sat2}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sat2: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sun2}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sun2: value })
            }
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ marginTop: 2 }}>
          <Text style={styles.header_txt}>10:30-11:30 AM</Text>
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Mon3}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Mon3: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Tue3}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Tue3: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Wed3}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Wed3: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Thu3}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Thu3: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Fri3}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Fri3: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sat2}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sat2: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sun2}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sun2: value })
            }
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ marginTop: 2 }}>
          <Text style={styles.header_txt}>11:30-12:30 PM</Text>
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Mon4}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Mon4: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Tue4}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Tue4: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Wed4}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Wed4: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Thu4}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Thu4: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Fri4}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Fri4: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sat4}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sat4: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sun4}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sun4: value })
            }
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ marginTop: 2 }}>
          <Text style={styles.header_txt}>12:30-01:30 PM</Text>
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Mon5}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Mon5: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Tue5}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Tue5: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Wed5}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Wed5: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Thu5}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Thu5: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Fri5}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Fri5: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sat5}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sat5: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sun5}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sun5: value })
            }
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ marginTop: 2 }}>
          <Text style={styles.header_txt}>01:30-02:30 PM</Text>
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Mon6}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Mon6: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Tue6}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Tue6: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Wed6}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Wed6: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Thu6}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Thu6: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Fri6}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Fri6: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sat6}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sat6: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sun6}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sun6: value })
            }
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ marginTop: 2 }}>
          <Text style={styles.header_txt}>02:30-03:30 PM</Text>
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Mon7}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Mon7: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Tue7}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Tue7: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Wed7}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Wed7: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Thu7}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Thu7: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Fri7}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Fri7: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sat7}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sat7: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sun7}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sun7: value })
            }
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ marginTop: 2 }}>
          <Text style={styles.header_txt}>03:30-04:30 PM</Text>
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Mon8}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Mon8: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Tue8}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Tue8: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Wed8}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Wed8: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Thu8}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Thu8: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Fri8}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Fri8: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sat8}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sat8: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sun8}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sun8: value })
            }
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ marginTop: 2 }}>
          <Text style={styles.header_txt}>04:30-05:30 PM</Text>
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Mon9}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Mon9: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Tue9}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Tue9: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Wed9}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Wed9: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Thu9}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Thu9: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Fri9}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Fri9: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sat9}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sat9: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sun9}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sun9: value })
            }
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ marginTop: 2 }}>
          <Text style={styles.header_txt}>05:30-06:30 PM</Text>
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Mon10}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Mon10: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Tue10}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Tue10: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Wed10}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Wed10: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Thu10}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Thu10: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Fri10}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Fri10: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sat10}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sat10: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sun10}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sun10: value })
            }
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ marginTop: 2 }}>
          <Text style={styles.header_txt}>06:30-07:30 PM</Text>
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Mon11}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Mon11: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Tue11}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Tue11: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Wed11}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Wed11: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Thu11}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Thu11: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Fri11}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Fri11: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sat11}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sat11: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sun11}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sun11: value })
            }
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ marginTop: 2 }}>
          <Text style={styles.header_txt}>07:30-08:30 PM</Text>
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Mon12}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Mon12: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Tue12}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Tue12: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Wed12}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Wed12: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Thu12}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Thu12: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Fri12}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Fri12: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sat12}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sat12: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sun12}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sun12: value })
            }
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ marginTop: 2 }}>
          <Text style={styles.header_txt}>08:30-09:30 PM</Text>
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Mon13}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Mon13: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Tue13}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Tue13: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Wed13}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Wed13: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Thu13}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Thu13: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Fri13}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Fri13: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sat13}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sat13: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sun13}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sun13: value })
            }
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ marginTop: 2 }}>
          <Text style={styles.header_txt}>09:30-10:30 PM</Text>
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Mon14}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Mon14: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Tue14}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Tue14: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Wed14}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Wed14: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Thu14}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Thu14: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Fri14}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Fri14: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sat14}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sat14: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sun14}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sun14: value })
            }
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ marginTop: 2 }}>
          <Text style={styles.header_txt}>10:30-11:30 PM</Text>
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Mon15}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Mon15: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Tue15}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Tue15: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Wed15}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Wed15: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Thu15}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Thu15: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Fri15}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Fri15: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sat15}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sat15: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sun15}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sun15: value })
            }
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ marginTop: 2 }}>
          <Text style={styles.header_txt}>11:30-12:30 AM</Text>
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Mon16}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Mon16: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Tue16}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Tue16: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Wed16}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Wed16: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Thu16}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Thu16: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Fri16}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Fri16: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sat16}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sat16: value })
            }
          />
        </View>
        <View style={styles.chek_header}>
          <CheckBox
            value={selectedslot.Sun16}
            onValueChange={value =>
              setselectedslot({ ...selectedslot, Sun16: value })
            }
          />
        </View>
      </View>
      <View>
        <Pressable
          onPress={() => {
            let arr = Object.values(selectedslot);
            let str1 = '';
            for (let i = 0; i < arr.length; i++) {
              if (arr[i] === true) {
                str1 = str1 + '1';
              } else {
                str1 = str1 + '0';
              }
            }
            Set_schedule(str1, stdemail);
            //get_Schedule(stdemail);
          }}>
          <Text style={styles.button}>Update Scedule</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: 5,
  },
  row2: {
    marginVertical: 8,
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  time_header: {
    flex: 2.4,
  },
  header_txt: {
    color: '#000000',
    fontSize: 15,
  },
  days_header: {
    flex: 1,
  },
  chek_header: {
    flex: 1,
    marginTop: -6,
  },
  button: {
    backgroundColor: '#5304D4',
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderRadius: 12,
    textAlign: 'center',
    width: '50%',
    color: '#FFFFFF',
    elevation: 5,
    marginLeft: 110,
    marginTop: 16,
  },
});
