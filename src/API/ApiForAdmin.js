/* eslint-disable prettier/prettier */

import { IP } from './IPAdress_For_API';

const deletGroup = async (groupid) => {
    try {
        const response = await fetch(`http://${IP}/HouseOfTutors/api/Admin/DeleteGroup?groupid=${groupid}`, {
            method: 'POST',
        });
        const data = await response.json();
        console.log('Result from DeleteGroup', data);
        console.log('----------------------------------------------------------------------------');
    } catch (error) {
        console.log(error);
    }
};

const addGroup = async (newgroup) => {
    try {
        const response = await fetch(`http://${IP}/HouseOfTutors/api/Admin/AddGroup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newgroup),
        });
        const data = await response.json();
        console.log('Result from AddGroup', data);
        console.log('----------------------------------------------------------------------------');
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

const getCourseOfGroup = async (groupid) => {
    try {
        const response = await fetch(`http://${IP}/HouseOfTutors/api/Admin/GetGroupList?groupid=${groupid}`);
        const data = await response.json();
        console.log('Result from GetGroupList', data);
        console.log('----------------------------------------------------------------------------');
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const UpdateGroup = async (id, list) => {
    try {
        const response = await fetch(`http://${IP}/HouseOfTutors/api/Admin/UpdateGroup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                groupid: id,
                courses: list,
            }),
        });
        const data = await response.json();
        console.log('Result from UpdateGroup', data);
        console.log('----------------------------------------------------------------------------');
    } catch (error) {
        console.log(error);
    }
};

const deleteCourseOfGroup = async (groupid, course) => {
    try {
        const response = await fetch(`http://${IP}/HouseOfTutors/api/Admin/deleteCourseofGroup?groupid=${groupid}&course=${course}`, {
            method: 'POST',
        });
        const data = await response.json();
        console.log('Result from deleteCourseofGroup', data);
        console.log('----------------------------------------------------------------------------');
    } catch (error) {
        console.log(error);
    }
};

export {
    GetCourseGroupIds,
    GetCoursesList,
    deletGroup,
    addGroup,
    getCourseOfGroup,
    UpdateGroup,
    deleteCourseOfGroup,
};
