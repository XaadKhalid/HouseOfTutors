/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../../Assests/Styling';
import { GetWithoutParams } from '../../Api/API_Types';

export default function AllStudents() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        GetAlltutors();
    }, []);

    const GetAlltutors = async () => {
        const paramsObject = {
            controller: 'Admin',
            action: 'GetAllStudents',
        };
        let response = await GetWithoutParams(paramsObject);
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
        <View style={styles.containerbox}>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>{item.sname}</Text>
                <TouchableOpacity onPress={() => {
                    toggleFlag(index);
                }}>
                    <FontAwesome
                        name={item.flag ? 'arrow-circle-o-up' : 'arrow-circle-o-down'}
                        size={25}
                        style={styles.iconcolor}
                    />
                </TouchableOpacity>
            </View>
            {item.flag && (
                <View style={styles.detailsbox}>
                    <View style={styles.itembox}>
                        <Text style={styles.itemText}>Email :</Text>
                        <Text style={styles.itemText}>{item.semail}</Text>
                    </View>
                    <View style={styles.itembox}>
                        <Text style={styles.itemText}>Semester :</Text>
                        <Text style={styles.itemText}>{item.semester}</Text>
                    </View>
                    <View style={styles.itembox}>
                        <Text style={styles.itemText}>Cgpa :</Text>
                        <Text style={styles.itemText}>{item.cgpa}</Text>
                    </View>
                    <View style={styles.itembox}>
                        <Text style={styles.itemText}>Contact :</Text>
                        <Text style={styles.itemText}>{item.contact}</Text>
                    </View>
                    <View style={styles.itembox}>
                        <Text style={styles.itemText}>Gender :</Text>
                        <Text style={styles.itemText}>{item.gender}</Text>
                    </View>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.bodyContainer}>
            <FlatList
                data={students}
                renderItem={renderStudents}
            />
        </View>
    );
}
