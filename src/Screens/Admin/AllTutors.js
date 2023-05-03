/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GetAllTutorsData } from '../../Api/ApiForAdmin';

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
        <View style={style.container}>
            <View style={style.itembox}>
                <Text style={style.itemText}>{item.tname}</Text>
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
                        <Text style={style.itemText}>{item.temail}</Text>
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
                data={allTutors}
                renderItem={renderTutors}
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
