import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import Header from '../header/index';
import { Feather } from '@expo/vector-icons';
import http from "../../http-common";
import { AxiosResponse } from 'axios';
import React, { useState, useCallback } from 'react';
import { BaseModalState } from '../../domain/pages/index';
import BaseModal from "../../components/Modal";

const initModal: BaseModalState = {
  message: "Ok!",
  title: "",
  modalIsOpen: false,
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [modal, setModal] = useState<BaseModalState>(initModal);

  const getInfo = useCallback(() => {
    var response: Promise<any> = http.get("/");
    response.then((res) => {
      console.log(res.data);
      setModal({ ...modal, message: res.data.title, modalIsOpen: true });
    })
      .catch((err) => {
        console.log(err);
      });
  }, [modal]);
  
  const setModalVisible = useCallback((value: boolean) => {
    setModal({ ...initModal, modalIsOpen: value });
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.main}>
        <View style={{ flex: 3 }}>
          <View style={[styles.container]}>
            <View style={[styles.row, { borderWidth: 1, borderColor: "thistle" }]}>
              <View style={[styles.boxField, { backgroundColor: 'green', margin: 2 }]}>
                <Feather style={styles.menuIcon} name='plus' size={24} color="white" />
              </View>
              <View style={[styles.boxField, { flex: 4 }]}>
                <Text style={[styles.text]}>R$ 100,00</Text>
              </View>
            </View>
            <View style={[styles.row, { borderWidth: 1, borderColor: "thistle" }]}>
              <View style={[styles.boxField, { backgroundColor: 'red', margin: 2 }]}>
                <Feather style={styles.menuIcon} name='minus' size={24} color="white" />
              </View>
              <View style={[styles.boxField, { flex: 4 }]}>
                <Text style={[styles.text]}>R$ 20,00</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 10 }}>
          <View style={styles.dashBoard}>
            <Text style={[styles.text]}>DashBoards</Text>
          </View>
        </View>
        <View style={[styles.getStartedContainer, { flex: 2 }]}>
          <Pressable style={styles.buttonSave} onPress={getInfo}>
            <Text style={[styles.text, { color: 'white' }]}>{'Adicionar'}</Text>
          </Pressable>
        </View>
      </View>
      <BaseModal
        message={modal.message}
        title=''
        modalIsOpen={modal.modalIsOpen}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
}

const dimScreen= Dimensions.get("screen");
const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    flex: 1,
    width: dimScreen.width,
    height: dimScreen.height,
  },
  dashBoard: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "thistle",
    height: 200,
  },
  container: {
    paddingTop: 10,
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    color: 'white'
  },
  menuIcon: {
    borderRadius: 10,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxField: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#E4D2FC',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: '#E4D2FC',
  },
  column: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    backgroundColor: '#E4D2FC',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#22252D",
    borderRadius: 10,
    margin: 6,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSave: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
});  