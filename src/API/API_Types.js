/* eslint-disable prettier/prettier */
const { apiString } = require('./API_String');

const paramsToString = (params) => {
    const keys = Object.keys(params);
    console.log('params keys are ', keys);
    console.log();
    const totalKeys = keys.length;
    let paramstring = '';
    for (let i = 0; i < totalKeys; i++) {
        let key = keys[i];
        if (i === totalKeys - 1) {
            paramstring = paramstring + key.toString() + '=' + params[key];
        }
        else {
            paramstring = paramstring + key.toString() + '=' + params[key] + '&';
        }
    }
    return paramstring;
};

const GetWithParams = async (paramsObject) => {
    console.log('GetWithParams is called With data ', paramsObject);
    console.log();
    let paramstring = paramsToString(paramsObject.params);
    try {
        const response = await fetch(
            `${apiString}/${paramsObject.controller}/${paramsObject.action}?${paramstring}`
        );
        const data = await response.json();
        console.log('Result from ' + paramsObject.action + 'API: ', data);
        console.log();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const GetWithoutParams = async (paramsObject) => {
    console.log('GetWithoutParams is called With data ', paramsObject);
    console.log();
    try {
        const response = await fetch(
            `${apiString}/${paramsObject.controller}/${paramsObject.action}`
        );
        const data = await response.json();
        console.log('Result from ' + paramsObject.action + 'API: ', data);
        console.log();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const PostWithParams = async (paramsObject) => {
    console.log('PostWithParams is called With data ', paramsObject);
    console.log();
    let paramstring = paramsToString(paramsObject.params);
    try {
        const response = await fetch(
            `${apiString}/${paramsObject.controller}/${paramsObject.action}?${paramstring}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paramstring),
        }
        );
        const data = await response.json();
        console.log('Result from ' + paramsObject.action + 'API: ', data);
        console.log();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const PostWithObject = async (paramsObject) => {
    console.log('PostWithObject is called With data ', paramsObject);
    console.log();
    try {
        const response = await fetch(
            `${apiString}/${paramsObject.controller}/${paramsObject.action}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paramsObject.params),
        }
        );
        const data = await response.json();
        console.log('Result from ' + paramsObject.action + 'API: ', data);
        console.log();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export { GetWithParams, GetWithoutParams, PostWithParams, PostWithObject };
