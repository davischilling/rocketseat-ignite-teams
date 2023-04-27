import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  deleteStoragePlayerByGroup,
  getStoragePlayersByGroup,
  PlayerStorage,
  setStoragePlayerByGroup,
} from "@storage/player";
import { RootStackParamList } from "navigation/types";
import { useEffect, useState, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";

import { Button } from "@components/Button";
import { Filter } from "@components/Filter";
import { FormButtonIcon } from "@components/FormButtonIcon";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";
import { AppError } from "@utils/AppError";
import { Container, HeaderList, NumberOfPlayers } from "./styles";
import { deleteStorageGroup } from "@storage/group";
import { Loading } from "@components/Loading";

type Props = {};

export const Players = ({}: Props) => {
  const navigation = useNavigation();
  const {
    params: { group },
  } = useRoute<RouteProp<RootStackParamList, "Players">>();

  const [player, setPlayer] = useState("" as string);
  const [team, setTeam] = useState("Time A" as string);
  const [players, setPlayers] = useState<PlayerStorage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const playerRef = useRef<TextInput>(null);

  const handleAddNewPlayer = async () => {
    try {
      setIsLoading(true);
      if (player.trim().length === 0) {
        setPlayer("");
        throw new AppError("Informe o nome do jogador");
      }
      const newPlayer: PlayerStorage = {
        name: player,
        team,
      };
      await setStoragePlayerByGroup(newPlayer, group);
      playerRef.current?.blur();
      setPlayer("");
      fetchPlayers();
    } catch (e) {
      if (e instanceof AppError) {
        return Alert.alert("Ops!", e.message);
      } else {
        console.log(e);
        return Alert.alert("Ops!", "Ocorreu um erro ao criar um jogador");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePlayer = async (player: PlayerStorage) => {
    try {
      setIsLoading(true);
      await deleteStoragePlayerByGroup(player, group);
      fetchPlayers();
    } catch (e) {
      console.log(e);
      return Alert.alert("Ops!", "Ocorreu um erro ao remover o jogador");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveGroup = (group: string) => {
    Alert.alert("Remover", "Deseja remover o grupo?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => groupRemove(group),
      },
    ]);
  };

  const groupRemove = async (group: string) => {
    try {
      setIsLoading(true);
      await deleteStorageGroup(group);
      navigation.navigate("Groups");
    } catch (e) {
      console.log(e);
      return Alert.alert("Ops!", "Ocorreu um erro ao remover o grupo");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlayers = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const data = await getStoragePlayersByGroup(group);
      const filteredPlayers = data.filter((player) => player.team === team);
      setPlayers(filteredPlayers);
    } catch (e) {
      console.log(e);
      return Alert.alert(
        "Ops!",
        "Ocorreu um erro ao buscar por jogadores desse time"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [team]);

  return (
    <Container>
      <Header showBackBtn />
      <Highlight title={group} subtitle="Adicione os jogadores" />
      <FormButtonIcon
        icon="add"
        placeholder="Nome do jogador"
        value={player}
        onChangeText={setPlayer}
        onIconPress={handleAddNewPlayer}
        inputRef={playerRef}
        onSubmitEditing={handleAddNewPlayer}
      />
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
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              icon="person"
              btnIcon="close"
              onRemove={() => handleRemovePlayer(item)}
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
      )}
      <Button
        title="Remover turma"
        type="SECONDARY"
        style={{ marginTop: 16 }}
        onPress={() => handleRemoveGroup(group)}
      />
    </Container>
  );
};
