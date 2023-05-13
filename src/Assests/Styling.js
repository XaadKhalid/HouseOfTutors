/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 10,
    },
    containerbox: {
        //backgroundColor: 'rgba(40,38,52,0.8)',
        backgroundColor: '#4C4B49',
        padding: 15,
        borderRadius: 5,
        marginVertical: 5,
        elevation: 3,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderColor: 'gold',
    },
    itembox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemText: {
        textAlign: 'center',
        color: '#fff',
        fontStyle: 'italic',
    },
    detailsbox: {
        flexDirection: 'column',
        alignContent: 'flex-start',
    },
    iconcolor: {
        color: '#ffffff',
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 70,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    primaryColor: {
        backgroundColor: '#282634',
    },
    secondaryColor: {
        color: '#FFB22F',
    },
    backGroundColor: {
        backgroundColor: '#FFFFFF',
    },
    theme: {
        backgroundColor: '#282634',
        color: '#FFB22F',
    },
    addtoListbox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addtoListtxt: {
        marginTop: 15,
        marginLeft: 5,
    },
    SubmitButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'green',
        padding: 12,
        borderRadius: 4,
    },
    SubbmitText: {
        textAlign: 'center',
        color: 'white',
    },
    searchbar: {
        padding: 5,
        borderWidth: 1.5,
        borderColor: 'green',
        marginTop: 7,
    },
    addRounded: {
        backgroundColor: '#4C4B49',
        borderRadius: 50 / 2,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        elevation: 10,
    },
    EditingButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '20%',
    },
    inputsParent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    inputsChild: {
        borderWidth: 1,
        borderColor: 'black',
        width: '48%',
    },
    button: {
        backgroundColor: '#FFB22F',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 5,
    },
    buttonText: {
        color: '#000000',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    disabledButton: {
        backgroundColor: 'lightgrey',
        opacity: 0.8,
    },
    dayOfWeekWrapper: {
        backgroundColor: '#4C4B49',
        paddingVertical: 15,
        borderRadius: 5,
        elevation: 3,
        borderBottomWidth: 3,
        borderColor: 'gold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginVertical: 12,
        // borderBottomWidth: 3,
        // borderTopWidth: 3,
        // borderColor: 'gold',
    },
    checkboxitem: {
        flexDirection: 'row',
    },
    checkboxtext: {
        color: '#ffffff',
        marginTop: 4,
    },
    checkboxlable: {
        marginTop: 5,
        marginHorizontal: 85,
        color: '#fff',
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#000',
        paddingHorizontal: 30,
        flexDirection: 'row',
        borderRadius: 4,
        justifyContent: 'center',
        marginVertical: 3,
        width: '70%',
    },
    inputlabel: {
        color: '#000',
        marginTop: 12,
        fontWeight: 900,
    },
    profilecontainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default styles;
