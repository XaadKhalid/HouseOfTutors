/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, Pressable, StyleSheet, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function EnlistedCourses({ navigation }) {
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [tEmail, setTEmail] = useState('');
    const isFocused = useIsFocused();

    useEffect(() => {
        if (tEmail !== '' && isFocused) {
            getEnlistedCourses();
        }
    }, [tEmail, isFocused]);

    useEffect(() => {
        getgmail();
    }, []);

    const getgmail = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('std_email');
            if (jsonValue != null) {
                setTEmail(jsonValue);
                console.log('Getting the email address of student from Asyncstorage => ', jsonValue);
                console.log('----------------------------------------------------------------------------');
            } else {
                console.log('No gmail found in Asyncstorage');
                console.log('----------------------------------------------------------------------------');
            }
        } catch (e) {
            console.log(e);
            console.log('----------------------------------------------------------------------------');
        }
    };

    const getEnlistedCourses = async () => {
        try {
            const response = await fetch(
                `http://192.168.43.231/HouseOfTutors/api/Tutor/GetTutorEnlist?semail=${tEmail}`,
            );
            const data = await response.json();
            console.log('Result from getEnlistedCourses API =>', data);
            console.log('----------------------------------------------------------------------------');
            if (data.length > 0) {
                setSelectedCourse(data);
            } else {
                Alert.alert('No courses Enlisted Press Add to Enlist Course');
                console.log('No courses yet');
                console.log('----------------------------------------------------------------------------');
            }
        } catch (error) {
            console.log(error);
            console.log('----------------------------------------------------------------------------');
        }
    };

    return (
        <View style={styles.main_container}>
            <View>
                <Pressable
                    style={styles.add_Course_btn}
                    onPress={() => {
                        console.log('I m presses');
                        navigation.navigate('EnlistCourses', { selectedCourse });
                    }}>
                    <Ionicons name="add-outline" size={45} color="#ffffff" />
                </Pressable>
            </View>
            <View>
                <Text
                    style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 23 }}>
                    Courses Wishlist
                </Text>
                <View style={styles.FList_BM}>
                    <FlatList
                        data={selectedCourse}
                        renderItem={({ item }) => (
                            <View style={styles.modal}>
                                <Text style={styles.text}>Course ID: {item.cid}</Text>
                                <Text style={styles.text}>Name: {item.cname}</Text>
                                <Text style={styles.text}>Grade: {item.grade}</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main_container: {
        padding: 15,
    },
    add_Course_btn: {
        backgroundColor: '#4C4B49',
        borderRadius: 50 / 2,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        elevation: 10,
    },
    modal: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#4C4B49',
        marginHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    text: {
        color: '#ffffff',
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    crse_bm: {
        marginBottom: 100,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    inputField: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    btn: {
        backgroundColor: '#FFB22F',
        elevation: 10,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 5,
    },
    btn_text: {
        color: '#000000',
        fontWeight: '600',
    },
    FList_BM: {
        marginBottom: 200,
    },
});
