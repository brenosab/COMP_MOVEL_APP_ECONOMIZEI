import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Modal, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import { Text, View } from '../components/Themed';
import { Feather } from '@expo/vector-icons';
import { ItemApi } from '../domain/api/index';

export interface FormModelProps {
    list: ItemApi[];
    title: string;
    isOpen: boolean;
    setVisible: (props: boolean) => void;
};
const formatData = (data: string) => {
    const date = new Date(data);
    return date.toLocaleDateString();
}
const formatNumber = (data: number) => {
    const number = data.toFixed(2);
    return 'R$ ' + number.replace('.',',');
}
const Form = (props: FormModelProps) => {
    const {
        title,
        isOpen,
        setVisible,
        list
    } = props;
    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isOpen}
                onRequestClose={() => {
                    setVisible(!isOpen);
                }}>
                <View style={[styles.row, {flex: 1}]}>
                    <View style={{ flex: 4 }}>
                        <Text style={styles.textTitle}>{title}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setVisible(!isOpen)}>
                            <Text style={styles.textStyle}>Fechar</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={[styles.row, {flex: 10}]}>
                    <View style={styles.menuBox}><>
                        {
                            list.map((value, index) =>
                                <TouchableOpacity
                                    style={styles.menuRow}
                                    onPress={() => { console.log(value) }}
                                    key={index}
                                >
                                    <View style={[styles.column, { flex: 6 }]}>
                                        <Text style={[styles.number]}>{formatNumber(value.valor)}</Text>
                                    </View>
                                    <View style={[styles.column, { flex: 4 }]}>
                                        <Text style={styles.text}>{value.categoria}</Text>
                                    </View>
                                    <View style={[styles.column, { flex: 4 }]}>
                                        <Text style={styles.text}>{value.descricao}</Text>
                                    </View>
                                    <View style={[styles.column, { flex: 4 }]}>
                                        <Text style={styles.text}>{formatData(value.data)}</Text>
                                    </View>
                                    <View style={[styles.column, { flex: 1 }]}>
                                        <Feather name='chevron-right' size={20} color="black" />
                                    </View>
                                </TouchableOpacity>)
                        }</>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
const dimScreen = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FC',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: dimScreen.width,
        height: dimScreen.height,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        padding: 2,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    column: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    text: {
        fontSize: 12,
        color: "black",
    },
    textTitle: {
        fontSize: 20,
        color: "black",
        padding: 10,
    },
    menuBox: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 14,
    },
    menuRow: {
        flexDirection: 'row',
        flex: 1,
        borderWidth: 1,
        borderColor: "thistle",
        borderRadius: 14,
        marginBottom: 5,
    },
    number: {
        borderWidth: 1,
        borderColor: "thistle",
        borderRadius: 14,
        marginLeft: 15,
        padding: 5,
        fontSize: 16,
        color: "black",
        backgroundColor: 'rgb(240, 240, 240)',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    button: {
        borderRadius: 20,
        padding: 5,
        elevation: 1,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Form;