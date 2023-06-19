import { Categoria } from '../enums/index';

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
}