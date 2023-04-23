import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { MaterialIcons } from "@expo/vector-icons";
import { Container } from "./styles";

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  placeholder: string;
};

export const FormButtonIcon = ({ icon, placeholder }: Props) => (
  <Container>
    <Input placeholder={placeholder} autoCorrect={false} />
    <ButtonIcon icon={icon} />
  </Container>
);
