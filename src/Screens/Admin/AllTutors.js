/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GetAllTutorsData } from '../../Api/ApiForAdmin';
import styles from '../../Assests/Styling';

export default function AllTutors() {
    const [allTutors, setAlltutors] = useState([]);

    useEffect(() => {
        GetAlltutors();
    }, []);

    const GetAlltutors = async () => {
        const response = await GetAllTutorsData();
        if (response !== null) {
            const tutors = response.map(tutor => ({ ...tutor, flag: false }));
            setAlltutors(tutors);
        }
    };

    const toggleFlag = index => {
        const tutors = [...allTutors];
        tutors[index].flag = !tutors[index].flag;
        setAlltutors(tutors);
    };

    const renderTutors = ({ item, index }) => (
        <View style={styles.containerbox}>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>{item.tname}</Text>
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
                        <Text style={styles.itemText}>{item.temail}</Text>
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
                data={allTutors}
                renderItem={renderTutors}
            />
        </View>
    );
}
