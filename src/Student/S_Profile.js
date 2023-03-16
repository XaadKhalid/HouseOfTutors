/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const Slots = {
  Mon1: false,
  Mon2: false,
  Mon3: false,
  Mon4: false,
  Mon5: false,
  Mon6: false,
  Mon7: false,
  Mon8: false,
  Tue1: false,
  Tue2: false,
  Tue3: false,
  Tue4: false,
  Tue5: false,
  Tue6: false,
  Tue7: false,
  Tue8: false,
  Wed1: false,
  Wed2: false,
  Wed3: false,
  Wed4: false,
  Wed5: false,
  Wed6: false,
  Wed7: false,
  Wed8: false,
  Thu1: false,
  Thu2: false,
  Thu3: false,
  Thu4: false,
  Thu5: false,
  Thu6: false,
  Thu7: false,
  Thu8: false,
  Fri1: false,
  Fri2: false,
  Fri3: false,
  Fri4: false,
  Fri5: false,
  Fri6: false,
  Fri7: false,
  Fri8: false,
  Sat1: false,
  Sat2: false,
  Sat3: false,
  Sat4: false,
  Sat5: false,
  Sat6: false,
  Sat7: false,
  Sat8: false,
  Sun1: false,
  Sun2: false,
  Sun3: false,
  Sun4: false,
  Sun5: false,
  Sun6: false,
  Sun7: false,
  Sun8: false,
};

export default function S_Profile() {
  const [checkedItem, setCheckedItem] = useState(Slots);
  return (
    <View>
      <View style={[styles.row, styles.row2]}>
        <View style={styles.time_header}>
          <Text>Time Slots</Text>
        </View>
        <View style={styles.days_header}>
          <Text>Mon</Text>
        </View>
        <View style={styles.days_header}>
          <Text>Tue</Text>
        </View>
        <View style={styles.days_header}>
          <Text>Wed</Text>
        </View>
        <View style={styles.days_header}>
          <Text>Thu</Text>
        </View>
        <View style={styles.days_header}>
          <Text>Fri</Text>
        </View>
        <View style={styles.days_header}>
          <Text>Sat</Text>
        </View>
        <View style={styles.days_header}>
          <Text>Sun</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={{marginTop: 3}}>
          <Text>08:30-09:30 AM</Text>
        </View>
        <View style={styles.chek_header}>
        <CheckBox
         value = {checkedItem.Mon1}
         onValueChange={(value)=> setCheckedItem({...checkedItem, Mon1: value})}
        />
        </View>
        <View style={styles.chek_header}>
        <CheckBox
         value = {checkedItem.Tue1}
         onValueChange={(value)=> setCheckedItem({...checkedItem, Tue1: value})}
        />
        </View>
        <View style={styles.chek_header}>
        <CheckBox
         value = {checkedItem.Wed1}
         onValueChange={(value)=> setCheckedItem({...checkedItem, Wed1: value})}
        />
        </View>
        <View style={styles.chek_header}>
        <CheckBox
         value = {checkedItem.Thu1}
         onValueChange={(value)=> setCheckedItem({...checkedItem, Thu1: value})}
        />
        </View>
        <View style={styles.chek_header}>
        <CheckBox
         value = {checkedItem.Fri1}
         onValueChange={(value)=> setCheckedItem({...checkedItem, Fri1: value})}
        />
        </View>
        <View style={styles.chek_header}>
        <CheckBox
         value = {checkedItem.Sat1}
         onValueChange={(value)=> setCheckedItem({...checkedItem, Sat1: value})}
        />
        </View>
        <View style={styles.chek_header}>
        <CheckBox
         value = {checkedItem.Sun1}
         onValueChange={(value)=> setCheckedItem({...checkedItem, Sun1: value})}
        />
        </View>
      </View>
      <View>
        <Pressable
          onPress={()=> {
            console.log('Updated array', checkedItem);
            let arrr = Object.values(checkedItem);
            console.log(arrr);
            let strt = '';
            for (let i = 0; i < arrr.length; i++) {
              if (arrr[i] === true){
                strt = strt + '1';
              }
              else {
                strt = strt + '0';
              }
            }
            console.log(strt);
          }}>
          <Text style={styles.button}>Update Schedule</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  row2: {
    marginVertical: 8,
  },
  time_header: {
    flex: 2.3,
  },
  header_txt: {
    color: '#000000',
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
