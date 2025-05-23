import * as S from './styles';
import { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
}

export const EmptyState = ({ icon, title, description }: Props) => {
  return (
    <S.Container>
      <S.IconContainer>{icon}</S.IconContainer>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Container>
  );
};