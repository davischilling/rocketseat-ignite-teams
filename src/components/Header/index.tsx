import logoImg from "@assets/images/logo/logo.png";
import { BackButton, BackIcon, Container, Logo } from "./styles";

type Props = {
  showBackBtn?: boolean;
};

export const Header = ({ showBackBtn = false }: Props) => (
  <Container>
    {showBackBtn && (
      <BackButton>
        <BackIcon />
      </BackButton>
    )}
    <Logo source={logoImg} />
  </Container>
);
