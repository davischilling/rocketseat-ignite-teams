import { TouchableOpacityProps } from "react-native";
import { Container, Title, ICON } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
};

export const GroupCard = ({ title, ...rest }: Props) => (
  <Container {...rest}>
    <ICON />
    <Title>{title}</Title>
  </Container>
);
