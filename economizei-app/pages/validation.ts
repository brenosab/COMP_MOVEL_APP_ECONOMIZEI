import { object, Schema, string } from "yup";
import { DespesaPage, ReceitaPage, MetaPage } from '../domain/pages/index';

interface DespesaValidationSchema {
  valor: string;
  categoria: string;
  descricao: string;
  data: string;
  anexo: string;
}
interface ReceitaValidationSchema {
  valor: string;
  categoria: string;
  descricao: string;
  data: string;
}
interface MetaValidationSchema {
  valor: string;
  titulo: string;
  descricao: string;
  percentual: string;
}

export const esquemaDeValidacao: Schema<DespesaValidationSchema> = object({
  data: string()
    .required("Campo 'data' é obrigatório")
    .matches(
      new RegExp("$|[0-9]{4}-[0-9]{2}-[0-9]{2}"),
      "Campo 'Data' tem valor inválido"
    ),
  descricao: string()
    .required("Campo 'descricao' é obrigatório")
    .max(250, "Quantidade de caracteres excedida no campo 'descricao'"),
  valor: string()
    .required("Campo 'valor' é obrigatório")
    .matches(
      new RegExp("[0-9]", "g"),
      "Campo 'valor' deve ser um número"
    ),
  categoria: string()
    .required("Campo 'categoria' é obrigatório")
    .max(250, "Quantidade de caracteres excedida no campo 'categoria'"),
  anexo: string()
    .required("Campo 'anexo' é obrigatório")
    .max(250, "Quantidade de caracteres excedida no campo 'anexo'"),
});

export const criarServicoDeValidacao = (
  despesa: DespesaPage
): DespesaValidationSchema => {
  return {
    valor: despesa.valor,
    descricao: despesa.descricao,
    categoria: despesa.categoria,
    data: despesa.data,
    anexo: despesa.anexo,
  };
};

export const esquemaDeValidacaoReceita: Schema<ReceitaValidationSchema> = object({
  data: string()
    .required("Campo 'data' é obrigatório")
    .matches(
      new RegExp("$|[0-9]{4}-[0-9]{2}-[0-9]{2}"),
      "Campo 'Data' tem valor inválido"
    ),
  descricao: string()
    .required("Campo 'descricao' é obrigatório")
    .max(250, "Quantidade de caracteres excedida no campo 'descricao'"),
  valor: string()
    .required("Campo 'valor' é obrigatório")
    .matches(
      new RegExp("[0-9]", "g"),
      "Campo 'valor' deve ser um número"
    ),
  categoria: string()
    .required("Campo 'categoria' é obrigatório")
    .max(250, "Quantidade de caracteres excedida no campo 'categoria'"),
});
export const criarServicoDeValidacaoReceita = (
  despesa: ReceitaPage
): ReceitaValidationSchema => {
  return {
    valor: despesa.valor,
    descricao: despesa.descricao,
    categoria: despesa.categoria,
    data: despesa.data,
  };
};

export const esquemaDeValidacaoMeta: Schema<MetaValidationSchema> = object({
  titulo: string()
    .required("Campo 'titulo' é obrigatório")
    .matches(
      new RegExp("$|[0-9]{4}-[0-9]{2}-[0-9]{2}"),
      "Campo 'Título' tem valor inválido"
    ),
  descricao: string()
    .required("Campo 'Descrição' é obrigatório")
    .max(250, "Quantidade de caracteres excedida no campo 'descricao'"),
  valor: string()
    .required("Campo 'Valor' é obrigatório")
    .matches(
      new RegExp("[0-9]", "g"),
      "Campo 'valor' deve ser um número"
    ),
    percentual: string()
    .required("Campo 'Percentual' é obrigatório")
    .max(10, "Quantidade de caracteres excedida no campo 'percentual'"),
});
export const criarServicoDeValidacaoMeta = (
  meta: MetaPage
): MetaValidationSchema => {
  return {
    valor: meta.valor,
    descricao: meta.descricao,
    titulo: meta.titulo,
    percentual: meta.percentual,
  };
};