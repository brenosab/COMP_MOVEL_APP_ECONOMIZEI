export interface Exercicio {
    descricao: string;
    idMusculo: number;
};

export interface Atleta {
    nome: string;
    dataNascimento: Date;
    altura: number;
    sexo: string;
    pesoAtual: number;
};

export interface Categoria {
    codigo: number,
    descricao: string,
}