/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GetAllStudents } from '../../Api/ApiForAdmin';

export default function AllStudents() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        GetAlltutors();
    }, []);

    const GetAlltutors = async () => {
        const response = await GetAllStudents();
        if (response !== null) {
            const tutors = response.map(tutor => ({ ...tutor, flag: false }));
            setStudents(tutors);
        }
    };

    const toggleFlag = index => {
        const temparray = [...students];
        temparray[index].flag = !temparray[index].flag;
        setStudents(temparray);
    };

    const renderStudents = ({ item, index }) => (
        <View style={style.container}>
            <View style={style.itembox}>
                <Text style={style.itemText}>{item.sname}</Text>
                <TouchableOpacity onPress={() => {
                    toggleFlag(index);
                }}>
                    <FontAwesome
                        name={item.flag ? 'arrow-circle-o-up' : 'arrow-circle-o-down'}
                        size={30}
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
                        <Text style={style.itemText}>Contact :</Text>
                        <Text style={style.itemText}>{item.contact}</Text>
                    </View>
                    <View style={style.itembox}>
                        <Text style={style.itemText}>Gender :</Text>
                        <Text style={style.itemText}>{item.gender}</Text>
                    </View>
                </View>
            )}
        </View>
    );

    return (
        <View>
            <FlatList
                data={students}
                renderItem={renderStudents}
            />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#4C4B49',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 20,
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

