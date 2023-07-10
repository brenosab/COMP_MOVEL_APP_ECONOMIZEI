import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import CurrencyInput from 'react-native-currency-input';
import { formatNumber } from 'react-native-currency-input';

interface Props {
    title: string;
    value: number;
    setValue: (props: number) => void;
}
const DecimalInput = (props: Props) => {
    const {
        title,
        value,
        setValue,
    } = props;
    const [number, setNumber] = useState(2310.458);

    //const [value, setValue] = React.useState(2310.458); // can also be null

    const convertStringToFloat = (value: string) => {
        const decimals = parseInt(value.slice(-2));
        const integer = value.slice(0, value.length - 2) === '' ? '0' : parseInt(value.slice(0, value.length - 2));
        return parseFloat(integer + '.' + decimals);
    }

    const onValueSelected = (text: number) => {
        //console.log(value);
        setValue(text);
        // const lastCharacter = parseInt(text.slice(-1));
        // console.log(text);
        // if(Number.isInteger(lastCharacter)){
        //     let _number = number + '' + lastCharacter;
        //     setNumber(_number);
        //     let floatValue = convertStringToFloat(_number);
        //     setValue(floatValue.toString());
        // }
        // else{
        //     setValue(text);
        //     setNumber(text);
        // }
    };
    const formattedValue = formatNumber(value, {
        separator: ',',
        precision: 2,
        delimiter: '.',
        ignoreNegative: true,
    });

    return (
        <>
            <Text
                style={styles.getStartedText}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)">
                {title}
            </Text>
            <CurrencyInput
                value={value}
                onChangeValue={setValue}
                unit="$"
                delimiter=","
                separator="."
                precision={2}
                onChangeText={(formattedValue) => {
                    console.log(formattedValue); // $2,310.46
                }}
                style={styles.input}
            />
            {/* <Text
                style={styles.getStartedText}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)">
                {title}
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={onValueSelected}
                value={value}
                maxLength={10}
                keyboardType={'decimal-pad'}
            /> */}
        </>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        lineHeight: 24,
    },
    input: {
        height: 40,
        margin: 10,
        padding: 10,
        width: '95%',
        borderWidth: 1,
        fontSize: 17,
        textAlign: 'center',
        borderRadius: 10,
        borderColor: '#868686',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3
    },
    text: {
        fontSize: 25,
        color: 'red',
        padding: 3,
        marginBottom: 10,
        textAlign: 'center'
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
    },
});
export default DecimalInput;