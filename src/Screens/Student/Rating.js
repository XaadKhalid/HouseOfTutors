/* eslint-disable prettier/prettier */
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const STAR_COUNT = 5;

const StarRating = ({ rating, onStarPress }) => {
    const renderStar = index => {
        const iconName = index < rating ? 'md-star' : 'md-star-outline';
        const starColor = index < rating ? '#FFB22F' : '#CCCCCC';

        return (
            <TouchableOpacity
                key={index}
                onPress={() => onStarPress(index + 1)}
                activeOpacity={0.7}>
                <Icon name={iconName} size={24} color={starColor} />
            </TouchableOpacity>
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

export default StarRating;
