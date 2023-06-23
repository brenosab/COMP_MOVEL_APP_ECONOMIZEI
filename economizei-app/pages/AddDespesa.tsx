import React, { useCallback, useState } from 'react';
import { Button, StyleSheet, TextInput, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import Dropdown from '../components/Dropdown';
import axios from 'axios';
import BaseModal from "../components/Modal";
import { ROUTE } from "../constants/config";
import { Atleta } from '../domain/api/index';
import { DespesaPage, Item } from '../domain/pages/index';
import { Categoria } from '../domain/enums/index';
import '@env';
import DateInput from '../components/DateInput';
import DecimalInput from '../components/DecimalInput';
import FileInput from '../components/FileInput';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

const { width } = Dimensions.get('window');

const baseUrl = 'https://localhost:44368/';
const initForm: DespesaPage = {
  valor: "",
  categoria: Categoria.COMPRAS,
  descricao: "",
  data: "2021-10-09",
  anexo: "",
  modalIsOpen: false,
};

const categorias: Item[] = [
  { id: 1, descricao: Categoria.COMPRAS },
  { id: 2, descricao: Categoria.CONTA_FIXA },
  { id: 3, descricao: Categoria.LAZER }
];

const AddDespesa = () => {
  const [form, setForm] = useState<DespesaPage>(initForm);
  const [currentFile, setCurrentFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);

  const post = useCallback((data: DespesaPage) => {
    axios.post<Atleta>(baseUrl + ROUTE.API.ATLETAS, data)
      .then((res) => {
        console.log(res);
        setForm({ ...form, modalIsOpen: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setForm, form]);

  const setValor = useCallback((props: string) => {
    console.log(props);
    setForm({ ...form, valor: props });
  }, [setForm, form]);
  const setCategoria = useCallback((props: Item) => {
    var _categoria: Categoria = props.descricao as Categoria;
    setForm({ ...form, categoria: _categoria });
  }, [setForm, form]);
  const setData = useCallback((props: Date) => {
    setForm({ ...form, data: props.toString() });
  }, [setForm, form]);
  const setDescricao = useCallback((props: string) => {
    console.log(props);
    setForm({ ...form, descricao: props });
  }, [setForm, form]);
  const setAnexo = useCallback((props: string) => {
    setForm({ ...form, anexo: props });
  }, [setForm, form]);
  const setModalVisible = useCallback((value: boolean) => {
    setForm({ ...form, modalIsOpen: value });
  }, [setForm, form]);

  const onIncrement = () => post(form);

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
    setProgress(0);
  };

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
      <View style={[styles.getStartedContainer, { flex: 10 }]}>
        <DecimalInput
          title='Valor'
          value={form.valor}
          setValue={(value) => setValor(value)}
        />
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Descrição
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setDescricao}
          value={form.descricao}
        />
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Categoria
        </Text>
        <Dropdown
          items={categorias}
          setItem={setCategoria}
        />
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Anexo
        </Text>
        <FileInput />

        {/* <TextInput
          style={styles.input}
          onChangeText={setAnexo}
          value={form.anexo}
        /> */}
        
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Data
        </Text>
        <DateInput
          date={new Date(form.data)}
          setDate={(date) => setData(date)}
        />

      </View>
      <View style={[styles.getStartedContainer, { flex: 1 }]}>
        <Button
          title="Adicionar"
          accessibilityLabel="increment"
          onPress={onIncrement}
          color="blue"
        />
      </View>
      <BaseModal
        message='feito!'
        title=''
        modalIsOpen={form.modalIsOpen}
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
});

export default AddDespesa;