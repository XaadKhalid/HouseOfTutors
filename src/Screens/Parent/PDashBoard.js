/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetWithParams } from '../../Api/API_Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function PDashBoard({ navigation }) {
    const [childlist, setChildList] = useState([]);
    const [cnic, setCNIC] = useState('');

    useEffect(() => {
        getCnic();
    }, []);

    useEffect(() => {
        if (cnic !== '') {
            getchilds();
        }
    }, [cnic]);

    const getCnic = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('std_email');
            if (jsonValue != null) {
                console.log('CNIC form AsyncStorage is ', jsonValue);
                setCNIC(jsonValue);
            }
            else {
                console.log('No CNIC found in Asyncstorage');
                console.log('----------------------------------------------------------------------------');
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getchilds = async () => {
        const paramsObject = {
            controller: 'Parent',
            action: 'GetAllChilds',
            params: { cnic: cnic },
        };
        let response = await GetWithParams(paramsObject);
        if (response !== null) {
            let temparray = response.map(child => {
                return { ...child, flag: false };
            });
            setChildList(temparray);
        }
    };

    const toggleFlag = index => {
        const childs = [...childlist];
        childs[index].flag = !childs[index].flag;
        setChildList(childs);
    };

    const renderchilds = ({ item, index }) => (
        <View style={style.container}>
            <View style={style.itembox}>
                <Text style={style.itemText}>{item.sname}</Text>
                <TouchableOpacity onPress={() => {
                    toggleFlag(index);
                }}>
                    <FontAwesome
                        name={item.flag ? 'arrow-circle-o-up' : 'arrow-circle-o-down'}
                        size={25}
                        color="#FFF"
                    />
                </TouchableOpacity>
            </View>
            {item.flag && (
                <View style={style.detailsbox}>
                    <View style={style.itembox}>
                        <Text style={style.itemText}>Email :</Text>
                        <Text style={style.itemText}>{item.semail}</Text>
                    </View>
                    <View style={style.itembox}>
                        <Text style={style.itemText}>Semester :</Text>
                        <Text style={style.itemText}>{item.semester}</Text>
                    </View>
                    <View style={style.itembox}>
                        <Text style={style.itemText}>Cgpa :</Text>
                        <Text style={style.itemText}>{item.cgpa}</Text>
                    </View>
                    <View style={style.itembox}>
                        <Text style={style.itemText}>Learning Details :</Text>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('ChildDetails', { email: item.semail });
                        }}>
                            <FontAwesome
                                name="arrow-circle-o-right"
                                size={25}
                                color="#FFF"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );

    return (
        <View>
            <FlatList
                data={childlist}
                renderItem={renderchilds} />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#4C4B49',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 15,
    },
    itembox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemText: {
        textAlign: 'center',
        color: '#fff',
    },
    detailsbox: {
        flexDirection: 'column',
        alignContent: 'flex-start',
    },
});
