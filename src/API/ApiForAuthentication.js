/* eslint-disable prettier/prettier */
import { IP } from './IPAdress_For_API';

const Userlogin = async (email, paswd) => {
    try {
        const response = await fetch(`http://${IP}/HouseOfTutors/api/Login/Universal_Login?email=${email}&password=${paswd}`);
        const data = await response.json();
        console.log('Result from Login API: ', data);
        console.log('----------------------------------------------------------------------------');
        return data;
    } catch (error) {
        console.log(error);
    }
};

const Studentsignup = async (userdata) => {
    try {
        const response = await fetch(`http://${IP}/HouseOfTutors/api/Student/StudentSignup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userdata),
        });
        const data = await response.json();
        console.log('Response from Student Signup API =>', data);
        console.log('----------------------------------------------------------------------------');
        return data;
    } catch (error) {
        console.log(error);
    }
};

const Tutorsignup = async (userdata) => {
    try {
        const response = await fetch(`http://${IP}/HouseOfTutors/api/Tutor/TutorSignup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userdata),
        });
        const data = await response.json();
        console.log('Response from TutorSignup API =>', data);
        console.log('----------------------------------------------------------------------------');
        return data;
    } catch (error) {
        console.log(error);
    }
};

export { Userlogin, Studentsignup, Tutorsignup };
