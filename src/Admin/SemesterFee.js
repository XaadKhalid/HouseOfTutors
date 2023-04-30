/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetSemesterFee, updateFee } from '../Api/ApiForAdmin';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function SemesterFee({ navigation }) {
    const [feeList, setFeeList] = useState([]);
    const [editFlag, setEditFlag] = useState(false);
    const [semester, setSemester] = useState(0);
    const [fee, setFee] = useState(0);

    useEffect(() => {
        getfeelist();
    }, []);

    const getfeelist = async () => {
        const response = await GetSemesterFee();
        if (response !== null) {
            setFeeList(response);
        }
    };

    const renderFeeList = ({ item }) => (
        <View style={style.itembox}>
            <Text style={style.itemText}>Semester : {item.SemesterNo}</Text>
            <Text style={style.itemText}>Fees: {item.Fees}</Text>
            <TouchableOpacity onPress={() => {
                setEditFlag(true);
            }}>
                <MaterialIcons name="edit" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View>
            {editFlag && (
                <View>
                    <View style={style.inputsParent}>
                        <TextInput
                            style={style.inputsChild}
                            placeholder="Enter Semester No"
                            keyboardType="number"
                            textAlign="center"
                            value={semester}
                            onChangeText={(value) => {
                                setSemester(value);
                            }} />
                        <TextInput
                            placeholder="Enter Fees"
                            value={fee}
                            textAlign="center"
                            keyboardType="number"
                            style={style.inputsChild}
                            onChangeText={(value) => {
                                setFee(value);
                            }} />
                    </View>
                    <View style={style.inputsParent}>
                        <TouchableOpacity style={style.SubmitButton} onPress={() => {
                            if (semester === 0 || fee === 0) {
                                Alert.alert('Input Fields are mandatory to update Records');
                            }
                            else {
                                updateFee(semester, fee);
                                Alert.alert('Records Updated Successfully');
                                getfeelist();
                            }
                        }}
                        >
                            <Text style={style.SubbmitText}>Update Fee Records</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.SubmitButton} onPress={() => {
                            setEditFlag(false);
                        }}
                        >
                            <Text style={style.SubbmitText}>Cancel Request</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            <FlatList
                data={feeList}
                renderItem={renderFeeList}
            />
        </View>
    );
}

const style = StyleSheet.create({
    itembox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#4C4B49',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
        marginHorizontal: 20,
    },
    itemText: {
        textAlign: 'center',
        color: '#fff',
    },
    inputsParent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 5,
    },
    inputsChild: {
        borderWidth: 1,
        borderColor: 'black',
        width: '50%',
    },
    SubmitButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'green',
        padding: 12,
        borderRadius: 4,
        width: '49%',
    },
    SubbmitText: {
        textAlign: 'center',
        color: 'white',
    },
});
