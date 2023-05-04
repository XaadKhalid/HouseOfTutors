/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetSemesterFee, updateFee } from '../../Api/ApiForAdmin';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Assests/Styling';

export default function SemesterFee({ navigation }) {
    const [feeList, setFeeList] = useState([]);
    const [editFlag, setEditFlag] = useState(false);
    const [semester, setSemester] = useState(0);
    const [fee, setFee] = useState(0);

    useEffect(() => {
        if (!editFlag) {
            getfeelist();
        }
    }, [editFlag]);

    const getfeelist = async () => {
        const response = await GetSemesterFee();
        if (response !== null) {
            setFeeList(response);
        }
    };

    const renderFeeList = ({ item }) => (
        <View style={styles.containerbox}>
            <View style={styles.itembox}>
                <Text style={styles.itemText}>Semester : {item.SemesterNo}</Text>
                <Text style={styles.itemText}>Fees: {item.Fees}</Text>
                <TouchableOpacity onPress={() => {
                    setEditFlag(true);
                }}>
                    <MaterialIcons name="edit" size={25} style={styles.iconcolor} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.bodyContainer}>
            {editFlag && (
                <View>
                    <View style={styles.inputsParent}>
                        <TextInput
                            style={styles.inputsChild}
                            placeholder="Enter Semester No"
                            keyboardType="numeric"
                            textAlign="center"
                            value={semester !== 0 ? String(semester) : ''}
                            onChangeText={(value) => {
                                setSemester(value);
                            }} />
                        <TextInput
                            placeholder="Enter Fees"
                            value={fee !== 0 ? String(fee) : ''}
                            textAlign="center"
                            keyboardType="numeric"
                            style={styles.inputsChild}
                            onChangeText={(value) => {
                                setFee(value);
                            }} />
                    </View>
                    <View style={styles.inputsParent}>
                        <TouchableOpacity style={styles.SubmitButton} onPress={() => {
                            if (semester === 0 || fee === 0) {
                                Alert.alert('Input Fields are mandatory to update Records');
                            }
                            else {
                                updateFee(semester, fee);
                                Alert.alert('Records Updated Successfully');
                                setEditFlag(false);
                            }
                        }}
                        >
                            <Text style={styles.SubbmitText}>Update Fee Records</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.SubmitButton} onPress={() => {
                            setEditFlag(false);
                        }}
                        >
                            <Text style={styles.SubbmitText}>Cancel Request</Text>
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
