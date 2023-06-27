import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, TextInput, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import Dropdown from '../components/Dropdown';
import axios from 'axios';
import BaseModal from "../components/Modal";
import { ROUTE } from "../constants/config";
import { MetaPage, Item, BaseModalState } from '../domain/pages/index';
import { Categoria } from '../domain/enums/index';
import '@env';
import DateInput from '../components/DateInput';
import DecimalInput from '../components/DecimalInput';
import FileInput from '../components/FileInput';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import {
  criarServicoDeValidacaoMeta,
  esquemaDeValidacaoMeta,
} from "./validation";

const { width } = Dimensions.get('window');
const baseUrl = 'https://localhost:44368/';

const initForm: MetaPage = {
  valor: "",
  descricao: "",
  titulo: "",
  percentual: "0%",
  modalIsOpen: false,
};
const initModal: BaseModalState = {
  message: "Adicionado!",
  title: "",
  modalIsOpen: false,
};
const categorias: Item[] = [
  { id: 1, descricao: Categoria.COMPRAS },
  { id: 2, descricao: Categoria.CONTA_FIXA },
  { id: 3, descricao: Categoria.LAZER }
];

const AddMeta = () => {
  const [form, setForm] = useState<MetaPage>(initForm);
  const [anexo, setAnexo] = useState<File | undefined>();
  const [modal, setModal] = useState<BaseModalState>(initModal);

  const salvarMeta = useCallback((data: MetaPage) => {
    const objValidacao = criarServicoDeValidacaoMeta(data);
    esquemaDeValidacaoMeta
      .validate(objValidacao)
      .then((_) => {
        console.log(data);
        setModal({ ...modal, message: 'Meta Adicionada!', modalIsOpen: true });
        setForm(initForm);
      })
      .catch((err) => {
        var msg: string = err.errors[0];
        setModal({ ...modal, message: msg, modalIsOpen: true });
        console.log(msg);
      });

    //**** MOCK API */
    // axios.post<Atleta>(baseUrl + ROUTE.API.DESPESA, data)
    //   .then((res) => {
    //     console.log(res);
    //     setForm({ ...form, modalIsOpen: true });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [setForm, setModal, modal]);

  const setValor = useCallback((props: string) => {
    setForm({ ...form, valor: props });
  }, [setForm, form]);
  const setTitulo = useCallback((props: string) => {
    setForm({ ...form, titulo: props });
  }, [setForm, form]);
  const setDescricao = useCallback((props: string) => {
    setForm({ ...form, descricao: props });
  }, [setForm, form]);
  const setPercentual = useCallback((props: string) => {
    setForm({ ...form, percentual: props });
  }, [setForm, form]);
  const setModalVisible = useCallback((value: boolean) => {
    setModal({ ...initModal, modalIsOpen: value });
  }, [setForm, form]);

  const onIncrement = () => salvarMeta(form);

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
      <View style={[styles.getStartedContainer, { flex: 10 }]}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Título
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setTitulo}
          value={form.titulo}
        />
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Descrição
        </Text>
        <TextInput
          style={[styles.input, { height: '80' }]}
          onChangeText={setDescricao}
          value={form.descricao}
          multiline={true}
          numberOfLines={2}
        />
        <DecimalInput
          title='Valor'
          value={form.valor}
          setValue={(value) => setValor(value)}
        />
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Percentual
        </Text>
        <TextInput
          editable={false}
          style={[styles.input, { backgroundColor: '#E8E8E8' }]}
          value={form.percentual}
        />
      </View>
      <View style={[styles.getStartedContainer, { flex: 1 }]}>
        <Pressable style={styles.buttonSave} onPress={onIncrement}>
          <Text style={styles.text}>{'Adicionar'}</Text>
        </Pressable>
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

const styles = StyleSheet.create({
  input: {
    width: '95%',
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 17,
    textAlign: 'center',
    borderRadius: 10,
    borderColor: '#868686',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
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
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
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
    color: 'white',
  },
});

export default AddMeta;