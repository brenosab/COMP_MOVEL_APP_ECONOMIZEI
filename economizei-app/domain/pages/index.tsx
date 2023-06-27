import { Categoria } from '../enums/index';

export interface BaseModalState {
    message: string;
    title: string;
    modalIsOpen: boolean;
}

export interface MetaPage {
    valor: string;
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
    valor: string;
    categoria: Categoria;
    data: string;
    descricao: string;
    anexo: string;
    modalIsOpen: boolean;
};

export interface ReceitaPage {
    valor: string;
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