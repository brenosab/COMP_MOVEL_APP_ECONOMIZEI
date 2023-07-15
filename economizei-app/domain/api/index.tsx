export interface ItemApi {
    _id: string;
    valor: number;
    categoria: string;
    data: string;
    descricao: string;
};

export interface Categoria {
    codigo: number,
    descricao: string,
}