import { Categoria } from '../enums/index';

export type RootStackParamList = {
    'home': undefined;
    'perfil': undefined;
    'header': undefined;
};

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

export default interface IFile {
    url: string,
    name: string,
};