import * as S from "./styles";

type Props = {
  title: string;
  value: string;
  icon?: React.ReactNode;
  description?: string;
};

export const DataCard = ({ title, value, icon, description }: Props) => {
  return (
    <S.CardContainer>
      <S.CardHeader>
        <S.CardTitle>{title}</S.CardTitle>
        {icon}
      </S.CardHeader>
      <S.CardValue>{value}</S.CardValue>
      {description && <S.CardDescription>{description}</S.CardDescription>}
    </S.CardContainer>
  );
};
