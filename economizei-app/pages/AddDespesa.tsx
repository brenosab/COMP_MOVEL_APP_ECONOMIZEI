import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, TextInput, SafeAreaView, Dimensions } from 'react-native';
import { Text, View } from '../components/Themed';
import Dropdown from '../components/Dropdown';
import BaseModal from "../components/Modal";
import { DespesaPage, Item, BaseModalState } from '../domain/pages/index';
import { Categoria } from '../domain/enums/index';
import '@env';
import DateInput from '../components/DateInput';
import DecimalInput from '../components/DecimalInput';
import FileInput from '../components/FileInput';
import {
  criarServicoDeValidacao,
  esquemaDeValidacao,
} from "./validation";
import http from "../http-common";
import { ROUTE } from "../constants/config";

const initForm: DespesaPage = {
  valor: 0.00,
  categoria: Categoria.COMPRAS,
  descricao: "",
  data: "2021-10-09",
  anexo: "",
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

const AddDespesa = () => {
  const [form, setForm] = useState<DespesaPage>(initForm);
  const [anexo, setAnexo] = useState<File | undefined>();
  const [modal, setModal] = useState<BaseModalState>(initModal);

  const post = (data: DespesaPage) => {
    var response: Promise<any> = http.post("/"+ ROUTE.API.DESPESA, data);
    response.then((res) => {
      console.log(res.data);
      return res.data;
    })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  const salvarDespesa = useCallback((data: DespesaPage) => {
    const objValidacao = criarServicoDeValidacao(data);
    esquemaDeValidacao
      .validate(objValidacao)
      .then((_) => {
        console.log(data);
        var response = post(data);
        console.log(response);
        setModal({ ...modal, message: 'Despesa Adicionada!', modalIsOpen: true });
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

  const setValor = useCallback((props: number) => {
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
  // const setAnexo = useCallback((props: string) => {
  //   setForm({ ...form, anexo: props });
  // }, [setForm, form]);
  const setModalVisible = useCallback((value: boolean) => {
    setModal({ ...initModal, modalIsOpen: value });
  }, [setForm, form]);

  const onIncrement = () => salvarDespesa(form);

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setAnexo(selectedFiles?.[0]);
    setForm({ ...form, anexo: selectedFiles?.[0].name.toString() });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.getStartedContainer, { flex: 6 }]}>
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
        {/* <FileInput
          currentFile={anexo}
          selectFile={selectFile}
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
const dimScreen = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: dimScreen.width,
    height: dimScreen.height,
  },
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
    marginHorizontal: 20,
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

export default AddDespesa;