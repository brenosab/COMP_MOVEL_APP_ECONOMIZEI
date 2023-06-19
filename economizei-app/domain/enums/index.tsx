export interface BaseModalProps {
    message: string;
    modalIsOpen: boolean;
    onClose: () => void;
}
export interface ModalState {
    message: string;
    modalIsOpen: boolean;
    closeAndBack: boolean;
}

export enum Categoria {
    COMPRAS = "Compras",
    CONTA_FIXA = "Conta Fixa",
    LAZER = "Lazer",
};