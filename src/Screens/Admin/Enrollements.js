/* eslint-disable prettier/prettier */
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GetWithoutParams } from '../../Api/API_Types';
import styles from '../../Assests/Styling';

export default function Enrollements() {
    const [enrollements, setRnrollements] = useState([]);

    useEffect(() => {
        getEnrollements();
    }, []);

    const getEnrollements = async () => {
        const paramsObject = {
            controller: 'Admin',
            action: 'GetAllEnrollements',
        };
        let response = await GetWithoutParams(paramsObject);
        if (response !== null) {
            setRnrollements(response);
        }
        else {
            setRnrollements(null);
        }
    };

    const toggleFlag = index => {
        const temparray = [...enrollements];
        temparray[index].flag = !temparray[index].flag;
        setRnrollements(temparray);
    };

    const renderEnrollements = ({ item, index }) => (
        <View key={index} style={styles.containerbox}>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Enrollement Record: {index + 1}</Text>
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
                        <Text style={styles.itemText}>Course :</Text>
                        <Text style={styles.itemText}>{item.cname}</Text>
                    </View>
                    <View style={styles.itembox}>
                        <Text style={styles.itemText}>Tutor :</Text>
                        <Text style={styles.itemText}>{item.tname}</Text>
                    </View>
                    <View style={styles.itembox}>
                        <Text style={styles.itemText}>Student :</Text>
                        <Text style={styles.itemText}>{item.sname}</Text>
                    </View>
                    <View style={styles.itembox}>
                        <Text style={styles.itemText}>Status :</Text>
                        <Text style={styles.itemText}>{item.status}</Text>
                    </View>
                    <View style={styles.itembox}>
                        <Text style={styles.itemText}>Class Time :</Text>
                        {item.timeslots.map((slot) => (
                            <Text key={slot} style={styles.itemText}>{slot}</Text>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.bodyContainer}>
            <FlatList
                data={enrollements}
                renderItem={renderEnrollements} />
        </View>
    );
}
