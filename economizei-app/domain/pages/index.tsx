import { Categoria } from '../enums/index';
import { ItemApi } from '../api/index';

export interface BaseModalState {
    message: string;
    title: string;
    modalIsOpen: boolean;
}

export interface MetaPage {
    valor: number;
    titulo: string;
    descricao: string;
    percentual: string;
    modalIsOpen: boolean;
}

export interface PlanoEconomiaPage {
    categoria: Categoria;
    valor: string;
    tempo: string;
}

export interface DespesaPage {
    valor: number;
    categoria: Categoria;
    data: string;
    descricao: string;
    anexo: string;
    modalIsOpen: boolean;
};

export interface ReceitaPage {
    valor: number;
    categoria: Categoria;
    data: string;
    descricao: string;
    modalIsOpen: boolean;
};

export interface Item {
    id: number;
    descricao: string;
};

export interface IFile {
    url: string,
    name: string,
};

export interface FormProps {
    list: ItemApi[];
    title: string;
    isOpen: boolean;
};

export type RootStackParamList = {
    'Home': {},
    'Form': {
      list: ItemApi[],
      title: string,
      isOpen: boolean
    };
};