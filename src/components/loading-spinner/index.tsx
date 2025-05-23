import * as S from "./styles";

interface Props {
  size?: "small" | "medium";
}

export const LoadingSpinner = ({ size = "medium" }: Props) => {
  return (
    <S.Container $size={size}>
      <S.SpinnerIcon $size={size} />
      {size === "medium" && <S.LoadingText>Carregando dados...</S.LoadingText>}
    </S.Container>
  );
};
