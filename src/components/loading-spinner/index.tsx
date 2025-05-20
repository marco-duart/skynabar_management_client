import * as S from "./styles";

interface LoadingSpinnerProps {
  size?: "small" | "medium";
}

export const LoadingSpinner = ({ size = "medium" }: LoadingSpinnerProps) => {
  return (
    <S.Container $size={size}>
      <S.SpinnerIcon $size={size} />
      {size === "medium" && <S.LoadingText>Carregando dados...</S.LoadingText>}
    </S.Container>
  );
};
