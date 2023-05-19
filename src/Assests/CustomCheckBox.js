/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from '../../Assests/Styling';

const CustomCheckBox = () => {
    const [isChecked, setChecked] = useState(true);
    const value = 3;

    let checkboxStyle = null;
    let checkboxInnerStyle = null;

    if (value === 1) {
        checkboxStyle = styles.checked1;
        checkboxInnerStyle = styles.checkboxInner1;
    } else if (value === 2) {
        checkboxStyle = styles.checked2;
        checkboxInnerStyle = styles.checkboxInner2;
    } else if (value === 3) {
        checkboxStyle = styles.checked3;
        checkboxInnerStyle = styles.checkboxInner3;
    }

    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    setChecked(!isChecked);
                }}
                style={[styles.checkbox, isChecked && checkboxStyle]}>
                {isChecked && <View style={checkboxInnerStyle} />}
            </TouchableOpacity>
        </View>
    );
};

export default CustomCheckBox;
