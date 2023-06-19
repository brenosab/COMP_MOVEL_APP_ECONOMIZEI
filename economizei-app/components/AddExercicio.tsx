import React, { useCallback, useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { Text, View } from './Themed';
import Dropdown from './Dropdown';
import axios from 'axios';
import '@env';
import { ROUTE } from "../constants/config";
import BaseModal from "./Modal";

interface Exercicio {
  descricao: string;
  idMusculo: number;
}
const initForm: Exercicio = {
  descricao: "",
  idMusculo: 0,
};

const AddExercicio = () => {
  const [form, setForm] = useState(initForm);
  const [musculos, setMusculos] = useState([]);
  const [modalIsOpen, setModalVisible] = useState(false);

  const baseUrl = 'https://localhost:44368/';//process.env.BASE_URL;
  type Musculo = {
    id: number;
    descricao: string;
  };
  const post = useCallback((data: Exercicio) => {
    axios.post<Exercicio>(baseUrl + ROUTE.API.EXERCICIOS, data)
      .then((res) => {
        console.log(res);
        setModalVisible(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setForm]);

  const getMusculos = async () => {
    try {
      const { data, status } = await axios.get<Musculo[]>(baseUrl + ROUTE.API.MUSCULOS,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      return { data, status };
    }
    catch (error) {
      let mensagem: string;
      let status: number;
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        mensagem = error.message;
        status = error.status ?? 500;
      } else {
        console.log('unexpected error: ', error);
        mensagem = 'An unexpected error occurred';
        status = 500;
      }
      return { mensagem, status }
    }
  }

  useEffect(() => {
    // call the function
    getMusculos()
      .then(
        value => {
          const data = value.data ?? {} as any;
          setMusculos(data);
        }
      )
      // make sure to catch any error
      .catch(console.error);
  }, [setMusculos]);

  const setIdMusculo = useCallback((props: Musculo) => {
    setForm({ ...form, idMusculo: props.id });
  }, [setForm, form]);
  const setDescricao = useCallback((props: string) => {
    setForm({ ...form, descricao: props });
  }, [setForm, form]);
  const onIncrement = () => post(form);

  return (
    <SafeAreaView>
      <View style={styles.getStartedContainer}>
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
          keyboardType="numeric"
        />
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Músculo
        </Text>
        <Dropdown
          items={musculos}
          setItem={setIdMusculo}
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
        modalIsOpen={modalIsOpen}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '95%',
    height: 40,
    margin: 6,
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

export default AddExercicio;