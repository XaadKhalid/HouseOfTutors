/* eslint-disable prettier/prettier */
import { IP } from '../IPAdress_For_API';

const deletGroup = async () => {
    try {
        const response = await fetch('');
        const data = response.json();
        if (data !== null) {
            return data;
        }
        else {
            console.log('Error occured in API');
        }
    } catch (error) {
        console.log(error);
        return [];
    }
};

const addGroup = async () => {
    try {

    } catch (error) {
        console.log(error);
    }
};

const GetCourseGroupIds = async () => {
    try {
        const response = await fetch(`http://${IP}/HouseOfTutors/api/Admin/GetCoursesGroupList`);
        const data = await response.json();
        console.log('data from GetCourseGroupIds', data);
        console.log('----------------------------------------------------------------------------');
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const GetCoursesList = async () => {
    try {
        const response = await fetch(`http://${IP}/HouseOfTutors/api/Student/GetCourses`);
        const data = await response.json();
        console.log('Result of length from Getcourses API=> ', data.length);
        console.log('----------------------------------------------------------------------------');
        if (data !== null) {
            return data;
        } else {
            console.log('No Course Found!');
        }
    } catch (error) {
        console.log(error);
        return [];
    }
};

export { addGroup, deletGroup, GetCourseGroupIds, GetCoursesList };
