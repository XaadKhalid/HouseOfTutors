/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../../Assests/Styling';
import { getgmailFormAsync } from '../../AsyncStorage/GlobalData';
import { GetWithParams, PostWithObject, PostWithParams } from '../../Api/API_Types';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';

export default function T_TodayClass() {
  const [classesList, setClassesList] = useState([]);
  const [availableslots, setAvailableslots] = useState([]);
  const [checkedslots, setCheckedslots] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, settoDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showDate1, setShowDate1] = useState(false);
  const [saveFDate, setSaveFDate] = useState(false);
  const [savetDate, setSaveTDate] = useState(false);
  const [requestflag, setRequestflag] = useState(false);
  const [pcikerflag, setPcikerflag] = useState(false);
  const [multiflag, setmMltiflag] = useState(false);
  const [requestedObject, setRequestedObject] = useState({});
  const time = [
    '08-AM', '09-AM', '10-AM', '11-AM', '12-PM', '01-PM', '02-PM', '03-PM',
    '04-PM', '05-PM', '06-PM', '07-PM', '08-PM', '09-PM', '10-PM', '11-PM',
  ];
  const [selectTime, setSelectTime] = useState(time[0]);
  const minDate = new Date();
  const maxDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  maxDate.setDate(maxDate.getDate() + 7);

  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    if (requestflag) {
      sendRequest();
      //setReScheduleflag(false);
    }
  }, [requestflag]);

  const getClasses = async () => {
    let asyncresponse = await getgmailFormAsync();
    if (asyncresponse !== null) {
      const paramsObject = {
        controller: 'Tutor',
        action: 'Get_Today_Classes',
        params: { temail: asyncresponse },
      };
      let response = await GetWithParams(paramsObject);
      if (response !== 'No class are schedule for today' && response !== 'No Record Found in the Enrollment') {
        let updatedresponse = response.map(item => {
          if (item.istaken === 2) {
            return {
              ...item,
              takenflag: false,
              resflag: true,
              btnflag: false,
              rescbtnflag: false,
              reScheduleflag: false,
              availablityflag: false,
              slotsflag: false,
            };
          } else if (item.istaken === 1) {
            return {
              ...item,
              takenflag: true,
              resflag: false,
              btnflag: false,
              rescbtnflag: false,
              reScheduleflag: false,
              availablityflag: false,
              slotsflag: false,
            };
          } else {
            return {
              ...item,
              takenflag: false,
              resflag: false,
              btnflag: true,
              rescbtnflag: false,
              reScheduleflag: false,
              availablityflag: false,
              slotsflag: false,
            };
          }
        });
        setClassesList(updatedresponse);
      } else {
        setClassesList(null);
      }
    }
  };

  const getAvailableSlots = async (semail, temail, index) => {
    const paramsObject = {
      controller: 'Tutor',
      action: 'Tutor_Rescheduledata',
      params: { temail: temail, semail: semail },
    };
    let response = await GetWithParams(paramsObject);
    if (response !== 'No schedule id found for tutor' && response !== 'No matching slot available') {
      setAvailableslots(response);
      setClassesList((prev) =>
        prev.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              availablityflag: true,
              slotsflag: true,
              rescbtnflag: true,
              btnflag: false,
            };
          }
          else {
            if (item.resflag || item.takenflag) {
              return {
                ...item,
                availablityflag: false,
                slotsflag: false,
                rescbtnflag: false,
                btnflag: false,
              };
            } else {
              return {
                ...item,
                availablityflag: false,
                slotsflag: false,
                rescbtnflag: false,
                btnflag: true,
              };
            }
          }
        })
      );
    }
    else {
      setAvailableslots(null);
      setClassesList((prev) =>
        prev.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              reScheduleflag: true,
              rescbtnflag: true,
              btnflag: false,
            };
          } else {
            if (item.istaken === 1 || item.istaken === 2) {
              return {
                ...item,
                rescbtnflag: false,
                btnflag: false,
              };
            } else {
              return {
                ...item,
                reScheduleflag: false,
                rescbtnflag: false,
                btnflag: true,
              };
            }
          }
        })
      );
    }
  };

  const sendRequest = async () => {
    console.log('resultant objct is ', requestedObject);
    const paramsObject = {
      controller: 'Tutor',
      action: 'Send_Reschedule_Request',
      params: requestedObject,
    };
    let response = await PostWithObject(paramsObject);
    if (response !== 'No schedule id found for tutor' && response !== 'No matching slot available') {
      console.log('Request send successfully');
      console.log();
    }
  };

  const takeclass = async (semail, temail, cid, slot) => {
    const paramsObject = {
      controller: 'Tutor',
      action: 'Take_Class',
      params: {
        sname: semail,
        tname: temail,
        cname: cid,
        slot: slot,
      },
    };
    let response = await PostWithParams(paramsObject);
    if (response !== null) {
      console.log('Class Data has been saved to ClassReport Table');
      console.log();
    }
  };

  const toggleFlag = (index, selectedFlag) => {
    setClassesList((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          if (selectedFlag === 'TakeClass') {
            console.log(selectedFlag, 'Button is Pressed');
            console.log();
            return { ...item, takenflag: true, btnflag: false };
          }
          else {
            console.log(selectedFlag, 'Button is Pressed');
            console.log();
            return { ...item, resflag: true, btnflag: false };
          }
        }
        return item;
      })
    );
  };

  // const toggleReschedule = (index) => {
  //   setClassesList((prev) => {
  //     return prev.map((item, i) => {
  //       if (i === index) {
  //         return {
  //           ...item,
  //           rescbtnflag: !item.rescbtnflag,
  //           btnflag: !item.btnflag,
  //         };
  //       } else {
  //         return item;
  //       }
  //     });
  //   });
  // };

  const checkboxVerification = (flagsofslot) => {
    flagsofslot[1] = !flagsofslot[1];
    if (flagsofslot[1]) {
      console.log('checked');
      setCheckedslots(previous => {
        let arr = [...previous];
        arr = [...checkedslots, flagsofslot[0]];
        return arr;
      });
    } else {
      console.log('un-checked');
      setCheckedslots(previous => {
        let arr = [...previous];
        arr = checkedslots.filter((checkedSlot) => checkedSlot !== flagsofslot[0]);
        return arr;
      });
    }
  };

  const hideAll = (index) => {
    setClassesList((prev) =>
      prev.map((item1, i) => {
        if (i === index) {
          return {
            ...item1,
            slotsflag: false,
            availablityflag: false,
            reScheduleflag: false,
            rescbtnflag: false,
            btnflag: false,
            resflag: true,
          };
        }
        return item1;
      })
    );
    setRequestflag(true);
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
        <Text style={styles.itemText}>This class is ReSchedule</Text>
      )}
      {item.reScheduleflag && (
        <View>
          <View style={styles.itembox}>
            <TouchableOpacity onPress={() => { setShowDate1(!showDate1); }}>
              <MaterialIcons name="date-range" size={30} color="#FFB22F" style={styles.ip_icon} />
            </TouchableOpacity>
            <View>
              <Text style={styles.itemText}>{selectedDate}</Text>
            </View>
            <View>
              <Text style={styles.itemText}>{selectTime}</Text>
            </View>
            <TouchableOpacity onPress={() => { setPcikerflag(!pcikerflag); }}>
              <MaterialIcons name="update" size={30} color="#FFB22F" style={styles.ip_icon} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.itemText}>No slots available for ReScheduling{'\n'}Choose date and time for manual Request</Text>
          </View>
        </View>

      )}
      {item.availablityflag && (
        <View>
          <Text style={styles.itemText}>Available slots for ReScheduleing</Text>
        </View>
      )}
      {item.slotsflag && (
        <View style={styles.checkboxContainer}>
          {availableslots.map((slot, sIndex) => {
            let flagsofslot = [slot, false];
            if (checkedslots.includes(slot)) {
              flagsofslot = [slot, true];
            }
            console.log('flagofslot is ', flagsofslot);
            return (
              <View key={sIndex} style={styles.checkboxitem}>
                <CheckBox
                  tintColors={{ true: 'gold', false: 'white' }}
                  value={flagsofslot[1]}
                  onValueChange={() => {
                    checkboxVerification(flagsofslot);
                  }}
                />
                <Text style={styles.checkboxtext}>{slot}</Text>
              </View>
            );
          })}
        </View>
      )}
      {item.btnflag && (
        <View style={styles.itembox}>
          <TouchableOpacity style={styles.button} onPressIn={() => {
            let selectedFlag = 'TakeClass';
            toggleFlag(index, selectedFlag);
            takeclass(item.sname, item.tname, item.cname, item.slotindexes[0]);
          }}>
            <Text style={styles.buttonText}>Take Class</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            getAvailableSlots(item.sname, item.tname, index);
            //toggleReschedule(index);
          }}>
            <Text style={styles.buttonText}>ReSchedule Class</Text>
          </TouchableOpacity>
        </View>
      )}
      {item.rescbtnflag && (
        <View style={styles.itembox}>
          <TouchableOpacity style={styles.button} onPressIn={() => {
            if (checkedslots.length > 0) {
              hideAll(index);
              setRequestedObject({
                ...requestedObject,
                sname: item.sname,
                tname: item.tname,
                cname: item.cname,
                requestedslots: checkedslots,
                slot: item.slotindexes[0],
              });
            }
            else if (selectedDate !== '' && selectTime !== '') {
              setRequestedObject({
                ...requestedObject,
                sname: item.sname,
                tname: item.tname,
                cname: item.cname,
                date: selectedDate,
                time: selectTime,
                slot: item.slotindexes[0],
              });
              hideAll(index);
            }
            else {
              Alert.alert('Please confirm slot for rescheduling');
            }
          }}>
            <Text style={styles.buttonText}>Confirm ReSchedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            //toggleReschedule(index);
            // setslotsflag(false);
            // setReScheduleflag(false);
            // setAvailablityflag(false);
            setClassesList((prev) =>
              prev.map((item1, i) => {
                if (i === index) {
                  return {
                    ...item1,
                    slotsflag: false,
                    availablityflag: false,
                    reScheduleflag: false,
                    btnflag: true,
                    rescbtnflag: false,
                  };
                }
                return item1;
              })
            );
          }}>
            <Text style={styles.buttonText}>Discard ReSchedule</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const handleDateSelect = (event, selDate) => {
    const customDate = new Date(selDate);
    setShowDate1(false);
    if (!isNaN(customDate)) {
      const day = customDate.getDate().toString().padStart(2, '0');
      const month = (customDate.getMonth() + 1).toString().padStart(2, '0');
      const year = customDate.getFullYear().toString();
      const formattedDate = `${day}/${month}/${year}`;
      if (saveFDate) {
        setFromDate(formattedDate);
        console.log('i m here for fromdate');
        setSaveFDate(false);
      } else if (savetDate) {
        settoDate(formattedDate);
        console.log('i m here for todate');
        setSaveTDate(false);
      } else {
        setSelectedDate(formattedDate);
      } console.log(formattedDate);
    } else {
      console.log('Invalid date object');
    }
  };

  return (
    <View style={styles.bodyContainer}>
      {classesList ? (
        <View>
          {pcikerflag && (
            <View>
              <Picker
                selectedValue={selectTime}
                onValueChange={itemValue => {
                  setSelectTime(itemValue);
                  setPcikerflag(false);
                }}
              >
                {time.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))}
              </Picker>
            </View>
          )}
          {showDate1 && (
            <View>
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                minimumDate={minDate}
                maximumDate={maxDate}
                onChange={handleDateSelect}
              />
            </View>
          )}
          <View>
            <FlatList
              data={classesList}
              renderItem={renderclasses} />
          </View>
          <View style={styles.containerbox}>
            {multiflag && (
              <View style={styles.itembox}>
                <TouchableOpacity onPress={() => {
                  setShowDate1(!showDate1);
                  setSaveFDate(true);
                }}>
                  <MaterialIcons name="date-range" size={30} color="#FFB22F" style={styles.ip_icon} />
                </TouchableOpacity>
                <View>
                  <Text style={styles.itemText}>From: {fromDate}</Text>
                </View>
                <View>
                  <Text style={styles.itemText}>To: {toDate}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                  setShowDate1(!showDate1);
                  setSaveTDate(true);
                }}>
                  <MaterialIcons name="date-range" size={30} color="#FFB22F" style={styles.ip_icon} />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.itembox}>
              <View>
                <TouchableOpacity style={styles.button} onPressIn={() => {
                  console.log('I m pressed');
                }}>
                  <Text style={styles.buttonText}>PreSchedule</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.button} onPressIn={() => {
                  setmMltiflag(!multiflag);
                }}>
                  <Text style={styles.buttonText}>Multiple ReSchedule</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
