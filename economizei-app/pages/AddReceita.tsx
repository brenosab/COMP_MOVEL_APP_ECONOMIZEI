import React, { useCallback, useState } from 'react';
import { Button, StyleSheet, TextInput, SafeAreaView, Dimensions } from 'react-native';
import { Text, View } from '../components/Themed';
import Dropdown from '../components/Dropdown';
import axios from 'axios';
import BaseModal from "../components/Modal";
import { ROUTE } from "../constants/config";
import { Atleta } from '../domain/api/index';
import { ReceitaPage, Item } from '../domain/pages/index';
import { Categoria } from '../domain/enums/index';
import '@env';
import DateInput from '../components/DateInput';
const { width } = Dimensions.get('window');
const baseUrl = 'https://localhost:44368/';

const initForm: ReceitaPage = {
  valor: "",
  categoria: Categoria.COMPRAS,
  descricao: "",
  data: "2021-10-09",
  modalIsOpen: false,
};
const categorias: Item[] = [
  { id: 1, descricao: Categoria.COMPRAS },
  { id: 2, descricao: Categoria.CONTA_FIXA },
  { id: 3, descricao: Categoria.LAZER }
];

const AddAtleta = () => {
  const [form, setForm] = useState<ReceitaPage>(initForm);
  const post = useCallback((data: ReceitaPage) => {
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
    setForm({ ...form, descricao: props });
  }, [setForm, form]);
  const setModalVisible = useCallback((value: boolean) => {
    setForm({ ...form, modalIsOpen: value });
  }, [setForm, form]);


  const onIncrement = () => post(form);

  return (
    <SafeAreaView>
  <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Valor
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setValor}
          value={form.valor}
          keyboardType="numeric"
          maxLength={10}
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
          Data
        </Text>
        <DateInput
          date={new Date(form.data)}
          setDate={(date) => setData(date)}
        />
      </View>
      <View style={styles.getStartedContainer}>
        <Button
          title="Cadastrar"
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
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
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
});

export default AddAtleta;