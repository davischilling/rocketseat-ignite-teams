import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Container, Content, Icon } from "./styles";

type Props = {};

export const NewGroup = ({}: Props) => {
  const [group, setGroup] = useState('');
  const navigation = useNavigation();
  const handleNew = () => {
    navigation.navigate("Players", { group });
  }
  return (
    <Container>
      <Header showBackBtn />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="Cire a turma para adicionar as pessoas"
        />
        <Input placeholder="Nome da turma" onChangeText={setGroup} />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
}
