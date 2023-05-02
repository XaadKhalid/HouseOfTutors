/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetWithParams } from '../../Api/API_Types';

export default function ChildDetails({ route }) {
    const [detailslist, setDetailList] = useState([]);
    const { email } = route.params;

    useEffect(() => {
        fetchChild();
    }, []);

    const fetchChild = async () => {
        const paramsObject = {
            controller: 'Parent',
            action: 'GetEnrollementofChild',
            params: { email: email },
        };
        let response = await GetWithParams(paramsObject);
        if (response !== 'No Course Enrollemnet Found against given email') {
            setDetailList(response);
        } else {
            setDetailList(null);
        }
    };

    const renderDetailsList = ({ item }) => (
        <View style={style.container}>
            <View style={style.detailsbox}>
                <View style={style.itembox}>
                    <Text style={style.itemText}>Course Name :</Text>
                    <Text style={style.itemText}>{item.cname}</Text>
                </View>
                <View style={style.itembox}>
                    <Text style={style.itemText}>Tutor Name :</Text>
                    <Text style={style.itemText}>{item.tname}</Text>
                </View>
                <View style={style.itembox}>
                    <Text style={style.itemText}>Course Status :</Text>
                    <Text style={style.itemText}>{item.status}</Text>
                </View>
                <View style={style.itembox}>
                    <Text style={style.itemText}>Class Time :</Text>
                    {item.timeslots.map((slot) => (
                        <Text style={style.itemText}>{slot}</Text>
                    ))}
                </View>
            </View>
        </View>
    );


    return (
        <View>
            {detailslist ? (
                <FlatList data={detailslist} renderItem={renderDetailsList} />
            ) : (
                <View>
                    <Text style={style.noDataText}>Your child is not enrolled in any subject!</Text>
                </View>
            )}

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
    noDataText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
});
