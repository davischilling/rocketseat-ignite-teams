import { Filter } from "@components/Filter";
import { FormButtonIcon } from "@components/FormButtonIcon";
import { Button } from "@components/Button";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";
import { useState } from "react";
import { FlatList } from "react-native";
import { Container, HeaderList, NumberOfPlayers } from "./styles";

type Props = {};

export const Players = ({}: Props) => {
  const [team, setTeam] = useState("Time A" as string);
  const [players, setPlayers] = useState([
    "Davi",
    "João",
    "Maria",
    "José",
    "Pedro",
    "Ana",
    "Paulo",
    "Lucas",
    "Marcos",
    "Mateus",
    "Luciana",
    "Júlia",
    "Júlio",
  ]);

  return (
    <Container>
      <Header showBackBtn />
      <Highlight title="Nome da turma" subtitle="Adicione os jogadores" />
      <FormButtonIcon icon="add" placeholder="Nome do jogador" />
      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard
            name={item}
            icon="person"
            btnIcon="close"
            onRemove={() => {}}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time." />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 24 },
          players.length === 0 && { flex: 1 },
        ]}
      />
      <Button title="Remover turma" type="SECONDARY" style={{ marginTop: 16 }} />
    </Container>
  );
};
