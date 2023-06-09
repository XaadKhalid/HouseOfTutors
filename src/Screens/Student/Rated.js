/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const STAR_COUNT = 5;

const StarRated = ({ rating }) => {
    const renderStar = index => {
        const iconName = index < rating ? 'md-star' : 'md-star-outline';
        const starColor = index < rating ? '#FFB22F' : '#CCCCCC';

        return (
            <Icon key={index} name={iconName} size={24} color={starColor} />
        );
    };

    const stars = Array(STAR_COUNT)
        .fill(null)
        .map((_, index) => renderStar(index));

    return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});

export default StarRated;
