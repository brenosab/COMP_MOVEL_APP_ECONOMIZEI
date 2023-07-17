import { SafeAreaView, StyleSheet, Dimensions, Pressable, Modal } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Feather } from '@expo/vector-icons';
import http from "../../http-common";
import React, { useState, useCallback, useEffect } from 'react';
import { BaseModalState } from '../../domain/pages/index';
import BaseModal from "../../components/Modal";
import Form from "../../pages/Form";
import { ROUTE } from "../../constants/config";
import { useIsFocused } from "@react-navigation/native";
import { ItemApi } from '../../domain/api/index';
import { FormProps } from '../../domain/pages/index';
import AddDespesa from '../../pages/AddDespesa';
import AddReceita from '../../pages/AddReceita';

const initModal: BaseModalState = {
  message: "Ok!",
  title: "",
  modalIsOpen: false,
};
const initForm: FormProps = {
  list: [],
  title: "",
  isOpen: false,
  type: '',
  isForm: false,
  idItem: '',
  modalDeleteIsOpen: false
};
const formatNumber = (data: number) => {
  const value = data.toFixed(2);
  return value.replace('.', ',');
}

const TabLayout = () => {
  const [modal, setModal] = useState<BaseModalState>(initModal);
  const [sumDespesa, setSumDespesa] = useState<string>('0,00');
  const [sumReceita, setSumReceita] = useState<string>('0,00');
  const isFocused = useIsFocused();
  const [form, setForm] = useState<FormProps>(initForm);

  useEffect(() => {
    getSumDespesa();
    getSumReceita();
  }, [isFocused]);

  const deleteById = useCallback((id: string) => {
    let type = form.type;
    let route = type === 'despesa' ? ROUTE.API.DESPESA : ROUTE.API.RECEITA;
    var response: Promise<any> = http.delete("/" + route + "/" + id);
    response.then(() => {
      setModal({ ...modal, message: type + ' removida!', modalIsOpen: true });
      setForm({...initForm});
    })
      .catch((err) => {
        console.log(err);
        setModal({ ...modal, message: err, modalIsOpen: true });
      });
  }, [setForm, form, setModal]);

  const getItens = useCallback((type: string) => {
    var response: Promise<any> = http.get("/" + type);
    response.then((res) => {
      let list: ItemApi[] = res.data;
      setForm({ ...form, list: list, isOpen: true, title: type.toUpperCase(), type: type });
    })
      .catch((err) => {
        console.log(err);
        setModal({ ...modal, message: err, modalIsOpen: true });
      });
  }, [setForm]);

  const getSumDespesa = useCallback(() => {
    var response: Promise<any> = http.get("/" + ROUTE.API.DESPESA + "/sum");
    response.then((res) => {
      let valor = res.data[0]?.valor == undefined ? 0.00 : res.data[0]?.valor;
      setSumDespesa(formatNumber(valor));
    })
      .catch((err) => {
        console.log(err);
        setModal({ ...modal, message: err, modalIsOpen: true });
      });
  }, [setSumDespesa]);

  const getSumReceita = useCallback(() => {
    var response: Promise<any> = http.get("/" + ROUTE.API.RECEITA + "/sum");
    response.then((res) => {
      let valor = res.data[0]?.valor == undefined ? 0.00 : res.data[0]?.valor;
      setSumReceita(formatNumber(valor));
    })
      .catch((err) => {
        console.log(err);
        setModal({ ...modal, message: err, modalIsOpen: true });
      });
  }, [setSumReceita]);

  const setModalVisible = useCallback((value: boolean) => {
    setModal({ ...initModal, modalIsOpen: value });
  }, []);
  const deleteItem = useCallback((id: string) => {
    setForm({ ...form, modalDeleteIsOpen: true, idItem: id });
  }, [form]);
  const editItem = useCallback((id: string) => {
    setForm({ ...form, isForm: true, idItem: id });
  }, [form]);
  const setVisible = useCallback((value: boolean) => {
    setForm({ ...initForm, isOpen: value });
  }, []);
  const setDeleteModalVisible = useCallback((value: boolean) => {
    setForm({ ...form, modalDeleteIsOpen: value });
  }, [setForm, form]);
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
                <Text style={[styles.text]}>{sumReceita}</Text>
              </View>
            </View>
            <View style={[styles.row, { borderWidth: 1, borderColor: "thistle" }]}>
              <View style={[styles.boxField, { backgroundColor: 'red', margin: 2 }]}>
                <Feather style={styles.menuIcon} name='minus' size={24} color="white" />
              </View>
              <View style={[styles.boxField, { flex: 4 }]}>
                <Text style={[styles.text]}>{sumDespesa}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 10 }}>
          <View style={[styles.dashBoard, { flex: 1 }]}>
            <Text style={[styles.text]}>DashBoards</Text>
          </View>
          <View style={[styles.getStartedContainer, { flex: 1 }]}>
            <Pressable style={[styles.buttonSave, { backgroundColor: 'rgb(60, 179, 113)' }]} onPress={() => getItens('receita')}>
              <Text style={[styles.text, { color: 'white' }]}>{'Receitas'}</Text>
            </Pressable>
          </View>
          <View style={[styles.getStartedContainer, { flex: 1 }]}>
            <Pressable style={[styles.buttonSave, { backgroundColor: 'rgba(255, 99, 71, 0.8)', }]} onPress={() => getItens('despesa')}>
              <Text style={[styles.text, { color: 'white' }]}>{'Despesas'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <BaseModal
        message={modal.message}
        title=''
        modalIsOpen={modal.modalIsOpen}
        setModalVisible={setModalVisible}
      />
      <Form
        title={form.title}
        list={form.list}
        isOpen={form.isOpen}
        setVisible={setVisible}
        deleteItem={deleteItem}
        editItem={editItem}
      />
      {form.isForm && (
        form.type == 'despesa' ? (
          <Modal style={styles.modal}
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
              setVisible(false);
            }}>
            <AddDespesa id={form.idItem} />
          </Modal>
        ) : (
          <Modal style={styles.modal}
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
              setVisible(false);
            }}>
            <AddReceita id={form.idItem} />
          </Modal>
        )
      )}
      <Modal
        animationType="slide"
        visible={form.modalDeleteIsOpen}
        onRequestClose={() => {
          setModalVisible(!form.modalDeleteIsOpen);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{'Deseja excluir a despesa?'}</Text>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Pressable
                  style={[styles.buttonClose, {backgroundColor: "#22252D",}]}
                  onPress={() => deleteById(form.idItem)}>
                  <Text style={styles.textStyle}>Confirmar</Text>
                </Pressable>
              </View>
              <View>
                <Pressable
                  style={[styles.buttonClose, {backgroundColor: '#2196F3',}]}
                  onPress={() => setDeleteModalVisible(!form.modalDeleteIsOpen)}>
                  <Text style={styles.textStyle}>Fechar</Text>
                </Pressable>
              </View>
            </View>
          </View></View>
      </Modal>
    </SafeAreaView>
  );
}

const dimScreen = Dimensions.get("screen");
const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 30,
    padding: 20,
    width: dimScreen.width,
    height: dimScreen.height,
  },
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
    paddingBottom: 5,
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  buttonClose: {
    borderRadius: 10,
    padding: 5,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default TabLayout;