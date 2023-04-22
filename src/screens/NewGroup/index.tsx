import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Container, Content, Icon } from "./styles";

type Props = {};

export const NewGroup = ({}: Props) => (
  <Container>
    <Header showBackBtn />
    <Content>
      <Icon />
      <Highlight
        title="Nova turma"
        subtitle="Cire a turma para adicionar as pessoas"
      />
      <Input placeholder="Nome da turma" />
      <Button title="Criar" style={{ marginTop: 20 }} />
    </Content>
  </Container>
);
