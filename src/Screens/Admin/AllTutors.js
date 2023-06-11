/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../../Assests/Styling';
import { GetWithParams, GetWithoutParams, PostWithParams } from '../../Api/API_Types';
import StarRated from '../Student/Rated';

export default function AllTutors() {
    const [allTutors, setAlltutors] = useState([]);

    useEffect(() => {
        GetAlltutors();
    }, []);

    const GetAlltutors = async () => {
        const paramsObject = {
            controller: 'Admin',
            action: 'GetAllTutors',
        };
        let response = await GetWithoutParams(paramsObject);
        if (response !== null) {
            const tutors = response.map((tutor, index) => {
                if (tutor.rating === 'N/A') {
                    tutor = {
                        ...tutor,
                        flag: true,
                        isRated: false,
                        isBlock: false,
                        isActive: false,
                    };
                    return tutor;
                }
                else {
                    tutor = {
                        ...tutor,
                        flag: true,
                        isRated: true,
                        isBlock: true,
                        isActive: false,
                    };
                    return tutor;
                }
            });
            setAlltutors(tutors);
        }
    };

    const BlockTutor = async (temail) => {
        const paramsObject = {
            controller: 'Admin',
            action: 'Block_Tutor',
            params: { temail: temail },
        };
        let response = await PostWithParams(paramsObject);
        if (response !== 'Tutor Blocked successfully') {
            ToastAndroid.show(response, ToastAndroid.SHORT);
        } else {
            ToastAndroid.show(response, ToastAndroid.SHORT);
        }

    };

    const ActiveTutor = async (temail) => {
        const paramsObject = {
            controller: 'Admin',
            action: 'Active_Tutor',
            params: { temail: temail },
        };
        let response = await PostWithParams(paramsObject);
        if (response !== 'No Record Found in BlcokedTtuors Table') {
            ToastAndroid.show(response, ToastAndroid.SHORT);
        } else {
            ToastAndroid.show(response, ToastAndroid.SHORT);
        }
    };

    const toggleFlag = index => {
        const tutors = [...allTutors];
        tutors[index].flag = !tutors[index].flag;
        setAlltutors(tutors);
    };

    const toggleBlock = index => {
        const tutors = [...allTutors];
        tutors[index].isBlock = !tutors[index].isBlock;
        tutors[index].isActive = !tutors[index].isActive;
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
                    {/* <View style={styles.itembox}>
                        <Text style={styles.itemText}>Contact :</Text>
                        <Text style={styles.itemText}>{item.contact}</Text>
                    </View>
                    <View style={styles.itembox}>
                        <Text style={styles.itemText}>Gender :</Text>
                        <Text style={styles.itemText}>{item.gender}</Text>
                    </View> */}
                    <View style={styles.itembox}>
                        <Text style={styles.itemText}>Rating :</Text>
                        {item.isRated ? (
                            <StarRated rating={item.rating} />
                        ) : (
                            <Text style={styles.itemText}>{item.rating}</Text>
                        )}
                        {/* <StarRated rating={item.rating} /> */}
                        {/* <Text style={styles.itemText}>{item.rating}</Text> */}
                    </View>
                    <View style={styles.itembox}>
                        <TouchableOpacity style={item.isActive ? styles.button : styles.disablebutton} disabled={!item.isActive} onPress={() => {
                            ActiveTutor(item.temail);
                            toggleBlock(index);
                        }}>
                            <Text style={styles.buttonText}>Active Tutor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={item.isBlock ? styles.button : styles.disablebutton} disabled={!item.isBlock} onPress={() => {
                            BlockTutor(item.temail);
                            toggleBlock(index);
                        }}>
                            <Text style={styles.buttonText}>Block Tutor</Text>
                        </TouchableOpacity>
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
