import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native';

interface Props {
    date: Date;
    setDate: (props: Date) => void;
}
const DateInput = (props: Props) => {
    const {
        date,
        setDate,
    } = props;
    const [showDatePicker, setShowDatePicker] = useState(false);
    const onDateSelected = (event: any, value: Date | undefined) => {
        if (value !== undefined) {
            setShowDatePicker(false);
            setDate(value);
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.MainContainer}>
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode={'date'}
                        display={'default'}
                        is24Hour={true}
                        onChange={onDateSelected}
                        style={styles.datePicker}
                    />)}
                <View style={{ margin: 10 }}>
                    <TextInput
                        style={styles.input}
                        value={date.toLocaleDateString()}
                        editable={false}
                        onPressIn={() => setShowDatePicker(true)}
                        keyboardType="numeric"
                    />
                    <Button title="Selecionar Data" color="blue" onPress={() => setShowDatePicker(true)} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    input: {
        height: 40,
        borderWidth: 1,
    },
    text: {
        fontSize: 25,
        color: 'red',
        padding: 3,
        marginBottom: 10,
        textAlign: 'center'
    },
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
    },
});
export default DateInput;