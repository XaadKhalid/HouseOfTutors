/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';

const getgmailFormAsync = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('std_email');
        if (jsonValue != null) {
            console.log('Getting the email of user from Asyncstorage => ', jsonValue);
            console.log('----------------------------------------------------------------------------');
            return jsonValue;
        } else {
            console.log('No gmail found in Asyncstorage', jsonValue);
            console.log('----------------------------------------------------------------------------');
        }
    } catch (e) {
        console.log(e);
    }
};

const storegmailToAsync = async value => {
    try {
        await AsyncStorage.setItem('std_email', value);
        console.log('email saved to AsyncStorage');
    } catch (e) {
        console.log(e);
    }
};

export { getgmailFormAsync, storegmailToAsync };
