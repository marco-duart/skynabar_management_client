import * as S from "./styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: Props) => {
  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        {title && <S.ModalTitle>{title}</S.ModalTitle>}
        {children}
      </S.ModalContent>
    </S.ModalOverlay>
  );
};
