import { Filter } from "@components/Filter";
import { FormButtonIcon } from "@components/FormButtonIcon";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Container } from "./styles";

type Props = {};

export const Players = ({}: Props) => (
  <Container>
    <Header showBackBtn />
    <Highlight title="Nome da turma" subtitle="Adicione os jogadores" />
    <FormButtonIcon icon="add" placeholder="Nome do jogador" />
    <Filter title="Time A" />
  </Container>
);
