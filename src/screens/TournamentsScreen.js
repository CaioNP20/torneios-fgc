// Importação de hooks do React e componentes do React Nativ
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';

// Armazenamento assíncrono para manter preferências entre sessões
import AsyncStorage from '@react-native-async-storage/async-storage';

// Para lidar com área segura em diferentes dispositivos (ex: evitar notch)
import { SafeAreaView } from 'react-native-safe-area-context';

// Componente de seleção de valores (dropdown)
import { Picker } from '@react-native-picker/picker';

// Componente colapsável para esconder/mostrar filtros
import { Collapsible } from '@jkrmarmol/react-native-collapsible';

// Estilos externos específicos da tela de torneios
import styles from '../styles/TournamentStyles';

// Token de autenticação da API do Start.gg (armazenado em .env)
import { STARTGG_TOKEN } from '@env';

// Lista de jogos disponíveis com seus respectivos videogameIds utilizados pela API
const games = [
  { label: '2XKO', value: '2XKO', videogameId: 64423 },
  { label: 'Brawlhalla', value: 'Brawlhalla', videogameId: 15 },
  { label: 'Fatal Fury: COTW', value: 'FFCOTW', videogameId: 73221 },
  { label: 'Granblue Fantasy Versus: Rising', value: 'GBVSR', videogameId: 48548 },
  { label: 'Guilty Gear: Strive', value: 'GGST', videogameId: 33945 },
  { label: 'Mortal Kombat 1', value: 'MK1', videogameId: 48599 },
  { label: 'Pocket Bravery', value: 'PB', videogameId: 44108 },
  { label: 'SAMURAI SHODOWN', value: 'SS', videogameId: 3568 },
  { label: 'Street Fighter 6', value: 'SF6', videogameId: 43868 },
  { label: 'Tekken 8', value: 'TEKKEN8', videogameId: 49783 },
  { label: 'The King of Fighters XV', value: 'KOF XV', videogameId: 36963 },
  { label: 'Under Night In-Birth II Sys:Celes', value: 'UNISC', videogameId: 50203 }
];
// Lista de países da América do Sul — usada para filtros regionais em torneios online
const southAmericanCountries = [
  "Argentina", "Bolivia", "Brazil", "Chile", "Colombia",
  "Ecuador", "Guyana", "Paraguay", "Peru", "Suriname",
  "Uruguay", "Venezuela", "French Guiana"
];
// Lista de regiões — pode conter uma lista de países associada (para filtros online)
const regions = [
  { label: 'Mundo Inteiro', value: 'worldwide' },
  { label: 'América do Sul', value: 'south-america', countries: southAmericanCountries },
  // mais regiões no futuro
];

// Lista de países com seus códigos — usada no filtro de torneios offline
const countries = [
  { label: 'Afeganistão', value: 'AF' },
  { label: 'África do Sul', value: 'ZA' },
  { label: 'Albânia', value: 'AL' },
  { label: 'Alemanha', value: 'DE' },
  { label: 'Andorra', value: 'AD' },
  { label: 'Angola', value: 'AO' },
  { label: 'Arábia Saudita', value: 'SA' },
  { label: 'Argentina', value: 'AR' },
  { label: 'Armênia', value: 'AM' },
  { label: 'Austrália', value: 'AU' },
  { label: 'Áustria', value: 'AT' },
  { label: 'Bahamas', value: 'BS' },
  { label: 'Bangladesh', value: 'BD' },
  { label: 'Bélgica', value: 'BE' },
  { label: 'Bolívia', value: 'BO' },
  { label: 'Brasil', value: 'BR' },
  { label: 'Bulgária', value: 'BG' },
  { label: 'Cabo Verde', value: 'CV' },
  { label: 'Canadá', value: 'CA' },
  { label: 'Chile', value: 'CL' },
  { label: 'China', value: 'CN' },
  { label: 'Colômbia', value: 'CO' },
  { label: 'Coreia do Sul', value: 'KR' },
  { label: 'Costa Rica', value: 'CR' },
  { label: 'Croácia', value: 'HR' },
  { label: 'Cuba', value: 'CU' },
  { label: 'Dinamarca', value: 'DK' },
  { label: 'Egito', value: 'EG' },
  { label: 'El Salvador', value: 'SV' },
  { label: 'Emirados Árabes Unidos', value: 'AE' },
  { label: 'Equador', value: 'EC' },
  { label: 'Espanha', value: 'ES' },
  { label: 'Estados Unidos', value: 'US' },
  { label: 'Estônia', value: 'EE' },
  { label: 'Filipinas', value: 'PH' },
  { label: 'Finlândia', value: 'FI' },
  { label: 'França', value: 'FR' },
  { label: 'Grécia', value: 'GR' },
  { label: 'Guatemala', value: 'GT' },
  { label: 'Honduras', value: 'HN' },
  { label: 'Hungria', value: 'HU' },
  { label: 'Índia', value: 'IN' },
  { label: 'Indonésia', value: 'ID' },
  { label: 'Inglaterra', value: 'GB' },
  { label: 'Irlanda', value: 'IE' },
  { label: 'Islândia', value: 'IS' },
  { label: 'Israel', value: 'IL' },
  { label: 'Itália', value: 'IT' },
  { label: 'Japão', value: 'JP' },
  { label: 'Líbano', value: 'LB' },
  { label: 'México', value: 'MX' },
  { label: 'Noruega', value: 'NO' },
  { label: 'Nova Zelândia', value: 'NZ' },
  { label: 'Países Baixos', value: 'NL' },
  { label: 'Panamá', value: 'PA' },
  { label: 'Paraguai', value: 'PY' },
  { label: 'Peru', value: 'PE' },
  { label: 'Polônia', value: 'PL' },
  { label: 'Portugal', value: 'PT' },
  { label: 'Quênia', value: 'KE' },
  { label: 'Reino Unido', value: 'GB' },
  { label: 'República Dominicana', value: 'DO' },
  { label: 'Romênia', value: 'RO' },
  { label: 'Rússia', value: 'RU' },
  { label: 'Singapura', value: 'SG' },
  { label: 'Suécia', value: 'SE' },
  { label: 'Suíça', value: 'CH' },
  { label: 'Tailândia', value: 'TH' },
  { label: 'Turquia', value: 'TR' },
  { label: 'Ucrânia', value: 'UA' },
  { label: 'Uruguai', value: 'UY' },
  { label: 'Venezuela', value: 'VE' },
  { label: 'Vietnã', value: 'VN' },
  // mais países no futuro
];

// Componente principal da tela de torneios
export default function TournamentsScreen() {
  // Estados para filtros
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedTournamentType, setSelectedTournamentType] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Estados para carregamento e dados dos torneios
  const [loading, setLoading] = useState(false);
  const [tournaments, setTournaments] = useState([]);

  // Controla se os filtros estão recolhidos (usado no componente Collapsible)
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);

  // Controla se os filtros da última sessão já carregaram
  const [filtersLoaded, setFiltersLoaded] = useState(false);

  // Carrega os filtros salvos da última sessão
  useEffect(() => {
    (async () => {
      try {
        const savedGame = await AsyncStorage.getItem('selectedGame');
        const savedType = await AsyncStorage.getItem('selectedTournamentType');
        const savedCountry = await AsyncStorage.getItem('selectedCountry');
        const savedRegion = await AsyncStorage.getItem('selectedRegion');

        setSelectedGame(savedGame || 'MK1');
        setSelectedTournamentType(savedType || 'Online/Offline');
        setSelectedCountry(savedCountry || 'BR');
        setSelectedRegion(savedRegion || 'south-america');

        setFiltersLoaded(true); // marca que os filtros foram carregados
      } catch (e) {
        console.error('Erro carregando filtros', e);
        setFiltersLoaded(true); // mesmo em erro, libera renderização
      }
    })();
  }, []);

  // Salva os filtros automaticamente sempre que mudam
  useEffect(() => {
    AsyncStorage.setItem('selectedGame', selectedGame);
  }, [selectedGame]);

  useEffect(() => {
    AsyncStorage.setItem('selectedTournamentType', selectedTournamentType);
  }, [selectedTournamentType]);

  useEffect(() => {
    AsyncStorage.setItem('selectedCountry', selectedCountry);
  }, [selectedCountry]);

  useEffect(() => {
    AsyncStorage.setItem('selectedRegion', selectedRegion);
  }, [selectedRegion]);

  // Abre um link externo com tratamento de erro
  const openLink = (url) => {
    Linking.openURL(url).catch(() => Alert.alert('Erro', 'Não foi possível abrir o link.'));
  };

  // Gera um link do Google Calendar com os dados do torneio
  const addToGoogleCalendar = (tournament) => {
    const start = new Date(tournament.startAt * 1000).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const end = new Date(tournament.startAt * 1000 + 2 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, '');

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      tournament.name
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      `Link do torneio: https://start.gg${tournament.url}`
    )}&location=&sf=true&output=xml`;

    Linking.openURL(url);
  };

  // Busca torneios offline da API Start.gg
  const fetchOfflineTournaments = async () => {
    const game = games.find(g => g.value === selectedGame);
    if (!game) {
      Alert.alert('Erro', 'Jogo não encontrado.');
      return [];
    }
    if (!selectedCountry) {
      Alert.alert('Atenção', 'Selecione um país para torneios offline.');
      return [];
    }
    try {
      const response = await fetch('https://api.start.gg/gql/alpha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: STARTGG_TOKEN,
        },
        body: JSON.stringify({
          query: `
            query TournamentsQuery($videogameId: ID!, $countryCode: String) {
              tournaments(query: {
                perPage: 40
                page: 1
                sortBy: "startAt asc"
                filter: {
                  upcoming: true
                  videogameIds: [$videogameId]
                  countryCode: $countryCode
                }
              }) {
                nodes {
                  id
                  name
                  startAt
                  url
                  addrState
                }
              }
            }
          `,
          variables: {
            videogameId: game.videogameId,
            countryCode: selectedCountry,
          },
        }),
      });

      const json = await response.json();
      if (json.errors) {
        console.error(json.errors);
        Alert.alert('Erro', 'Erro na busca dos torneios');
        return [];
      }
      return json.data.tournaments.nodes || [];
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao buscar torneios.');
      return [];
    }
  };

  // Busca torneios online da API Start.gg, com filtro opcional por região
  const fetchOnlineTournaments = async () => {
    const now = Math.floor(Date.now() / 1000);
    const twoWeeksFromNow = now + 14 * 24 * 60 * 60;

    console.log(now, twoWeeksFromNow);

    const game = games.find(g => g.value === selectedGame);
    if (!game) {
      Alert.alert('Erro', 'Jogo não encontrado.');
      return [];
    }
    if (!selectedRegion) {
      Alert.alert('Atenção', 'Selecione uma região para torneios online.');
      return [];
    }
    try {
      const response = await fetch('https://api.start.gg/gql/alpha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: STARTGG_TOKEN,
        },
        body: JSON.stringify({
          query: `
            query TournamentsQuery($videogameId: ID!, $after: Timestamp, $before: Timestamp) {
              tournaments(query: {
                perPage: 40
                page: 1
                sortBy: "startAt asc"
                filter: {
                  afterDate: $after
                  beforeDate: $before
                  videogameIds: [$videogameId]
                  upcoming: true
                  hasOnlineEvents: true
                }
              }) {
                nodes {
                  id
                  name
                  url
                  startAt
                  owner {
                    location {
                      country
                    }
                  }
                }
              }
            }
          `,
          variables: {
            videogameId: game.videogameId,
            after: now,
            before: twoWeeksFromNow,
          },
        }),
      });

      const json = await response.json();
      if (json.errors) {
        console.error(json.errors);
        Alert.alert('Erro', 'Erro na busca dos torneios');
        return [];
      }

      // Se for "Mundo inteiro", não filtra e retorna todos
      if (selectedRegion === 'worldwide') {
        return json.data.tournaments.nodes || [];
      }

      // Caso contrário, filtra pelos países da região
      const selectedCountries = regions.find(r => r.value === selectedRegion)?.countries || [];

      return (json.data.tournaments.nodes || []).filter(t =>
        t.owner?.location?.country &&
        selectedCountries.includes(t.owner.location.country)
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao buscar torneios.');
      return [];
    }
  };

  // Função principal chamada ao clicar em "Pesquisar"
  const handleSearch = async () => {
    if (!selectedGame) {
      Alert.alert('Atenção', 'Selecione um jogo para buscar torneios.');
      return;
    }
    setLoading(true);
    try {
      if (selectedTournamentType === 'Online') {
        const online = await fetchOnlineTournaments();
        setTournaments(online);
      } else if (selectedTournamentType === 'Offline') {
        const offline = await fetchOfflineTournaments();
        setTournaments(offline);
      } else if (selectedTournamentType === 'Online/Offline') {
        const [offline, online] = await Promise.all([
          fetchOfflineTournaments(),
          fetchOnlineTournaments(),
        ]);
        setTournaments([...offline, ...online]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao buscar torneios');
    } finally {
      setLoading(false);
    }
  };

  // Atualmente apenas retorna o array como está
  const getDisplayedTournaments = () => tournaments;

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {filtersLoaded ? (
            <>
              <Collapsible collapsed={filtersCollapsed} duration={300}>
                {/* Linha 1: Jogo e Tipo */}
                <View style={styles.pickerRow}>
                  <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Jogo</Text>
                    <Picker
                      selectedValue={selectedGame}
                      onValueChange={setSelectedGame}
                      style={styles.picker}
                    >
                      {games.map(game => (
                        <Picker.Item key={game.value} label={game.label} value={game.value} />
                      ))}
                    </Picker>
                  </View>

                  <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Tipo</Text>
                    <Picker
                      selectedValue={selectedTournamentType}
                      onValueChange={setSelectedTournamentType}
                      style={styles.picker}
                    >
                      <Picker.Item label="Online/Offline" value="Online/Offline" />
                      <Picker.Item label="Online" value="Online" />
                      <Picker.Item label="Offline" value="Offline" />
                    </Picker>
                  </View>
                </View>

                {/* Linha 2: País e Região */}
                <View style={styles.pickerRow}>
                  <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>País (Offline)</Text>
                    <Picker
                      selectedValue={selectedCountry}
                      onValueChange={setSelectedCountry}
                      style={styles.picker}
                    >
                      {countries.map(country => (
                        <Picker.Item key={country.value} label={country.label} value={country.value} />
                      ))}
                    </Picker>
                  </View>

                  <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Região (Online)</Text>
                    <Picker
                      selectedValue={selectedRegion}
                      onValueChange={setSelectedRegion}
                      style={styles.picker}
                    >
                      {regions.map((region) => (
                        <Picker.Item key={region.value} label={region.label} value={region.value} />
                      ))}
                    </Picker>
                  </View>
                </View>

                {/* Botão Pesquisar */}
                <TouchableOpacity
                  onPress={() => {
                    handleSearch();
                    setFiltersCollapsed(true); // recolhe os filtros
                  }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Pesquisar</Text>
                </TouchableOpacity>
              </Collapsible>

              {/* Botão para mostrar filtros se estiverem recolhidos */}
              {filtersCollapsed && (
                <TouchableOpacity onPress={() => setFiltersCollapsed(false)}>
                  <Text style={styles.showFilters}>
                    🔍 Mostrar filtros
                  </Text>
                </TouchableOpacity>
              )}

              {/* Indicador de carregamento ou lista de torneios */}
              {loading ? (
                <ActivityIndicator size="large" />
              ) : (
                <FlatList
                  style={styles.torneios}
                  data={getDisplayedTournaments()}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.card}>
                      <Text style={styles.title}>{item.name}</Text>
                      <Text style={styles.subtitle}>
                        Início: {new Date(item.startAt * 1000).toLocaleDateString('pt-BR')} às{' '}
                        {new Date(item.startAt * 1000).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        {item.addrState ? `📍${item.addrState}` : '📶 Online'}
                      </Text>
                      <View style={styles.buttons}>
                        <TouchableOpacity
                          style={styles.customButton}
                          onPress={() => openLink(`https://start.gg${item.url}/register`)}
                        >
                          <Text style={styles.buttonText}>Inscrever-se</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.customButton}
                          onPress={() => addToGoogleCalendar(item)}
                        >
                          <Text style={styles.buttonText}>🗓️ Adicionar ao Google Calendar 🗓️</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  ListEmptyComponent={() => (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>
                      Nenhum torneio encontrado.
                    </Text>
                  )}
                />
              )}
            </>
          ) : (
            <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />
          )}
        </View>
      </SafeAreaView>
    </>
  );
}