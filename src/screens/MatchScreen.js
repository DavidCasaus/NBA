
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { calcularNuevoMarcador } from '../logic/rules';

const MatchScreen = ({ route, navigation }) => {
  const { homeTeam, awayTeam, resetKey } = route.params;
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [playerStats, setPlayerStats] = useState({});

  useEffect(() => {
    setHomeScore(0);
    setAwayScore(0);
    setPlayerStats({});
  }, [resetKey]);

  const addHomePoints = (points, playerId) => {
    setHomeScore(prev => calcularNuevoMarcador(prev, points));
    setPlayerStats(prev => ({
      ...prev,
      [playerId]: (prev[playerId] || 0) + points
    }));
  };

  const addAwayPoints = (points, playerId) => {
    setAwayScore(prev => calcularNuevoMarcador(prev, points));
    setPlayerStats(prev => ({
      ...prev,
      [playerId]: (prev[playerId] || 0) + points
    }));
  };

  const endGame = () => {
    navigation.navigate('Winner', {
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      playerStats,
    });
  };

  const renderPlayer = (player, isHome) => {
    const playerPoints = playerStats[player.id] || 0;
    
    return (
      <View key={player.id} style={styles.playerCard}>
        <View style={[
          styles.playerNumBox,
          { backgroundColor: isHome ? homeTeam.secondaryColor : awayTeam.secondaryColor }
        ]}>
          <Text style={styles.playerNum}>{player.number}</Text>
        </View>

        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{player.name}</Text>
          <Text style={styles.playerPos}>{player.position}</Text>
          <Text style={styles.playerPoints}>PTS: {playerPoints}</Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.pointButton, styles.twoPointButton]}
            onPress={() => isHome ? addHomePoints(2, player.id) : addAwayPoints(2, player.id)}
          >
            <Text style={styles.pointButtonText}>+2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.pointButton, styles.threePointButton]}
            onPress={() => isHome ? addHomePoints(3, player.id) : addAwayPoints(3, player.id)}
          >
            <Text style={styles.pointButtonText}>+3</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>★ NBA JAM ★</Text>
        <Text style={styles.subtitle}>PARTIDO EN VIVO</Text>
      </View>

      <View style={styles.scoreboard}>
        <View style={styles.teamScoreSection}>
          <Text style={styles.teamLogo}>{homeTeam.logo}</Text>
          <Text style={styles.teamNameScore}>{homeTeam.name}</Text>
          <View style={[styles.scoreBox, { borderColor: homeTeam.primaryColor }]}>
            <Text style={[styles.scoreText, { color: homeTeam.primaryColor }]}>
              {homeScore}
            </Text>
          </View>
        </View>

        <View style={styles.vsDivider}>
          <Text style={styles.vsText}>-</Text>
        </View>

        <View style={styles.teamScoreSection}>
          <Text style={styles.teamLogo}>{awayTeam.logo}</Text>
          <Text style={styles.teamNameScore}>{awayTeam.name}</Text>
          <View style={[styles.scoreBox, { borderColor: awayTeam.primaryColor }]}>
            <Text style={[styles.scoreText, { color: awayTeam.primaryColor }]}>
              {awayScore}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.rostersContainer}>
          <View style={styles.rosterColumn}>
            <View style={[styles.rosterHeader, { backgroundColor: homeTeam.primaryColor }]}>
              <Text style={styles.rosterHeaderText}>{homeTeam.name}</Text>
              <Text style={styles.rosterSubtext}>LOCAL</Text>
            </View>
            {homeTeam.players.map((player) => renderPlayer(player, true))}
          </View>

          <View style={styles.rosterColumn}>
            <View style={[styles.rosterHeader, { backgroundColor: awayTeam.primaryColor }]}>
              <Text style={styles.rosterHeaderText}>{awayTeam.name}</Text>
              <Text style={styles.rosterSubtext}>VISITANTE</Text>
            </View>
            {awayTeam.players.map((player) => renderPlayer(player, false))}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.endGameButton} onPress={endGame}>
        <Text style={styles.endGameText}>■ FIN DEL PARTIDO ■</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { paddingVertical: 15, backgroundColor: '#000', borderBottomWidth: 4, borderBottomColor: '#00ff00' },
  title: { color: '#ff00ff', fontSize: 28, fontWeight: 'bold', textAlign: 'center', fontFamily: 'monospace' },
  subtitle: { color: '#00ffff', fontSize: 12, textAlign: 'center', fontFamily: 'monospace', marginTop: 5 },
  scoreboard: { flexDirection: 'row', backgroundColor: '#1a1a1a', borderBottomWidth: 4, borderBottomColor: '#00ff00', paddingVertical: 15, paddingHorizontal: 10 },
  teamScoreSection: { flex: 1, alignItems: 'center' },
  teamLogo: { fontSize: 35, marginBottom: 5 },
  teamNameScore: { color: '#ffffff', fontSize: 12, fontWeight: 'bold', fontFamily: 'monospace', marginBottom: 8 },
  scoreBox: { borderWidth: 3, paddingHorizontal: 20, paddingVertical: 8, backgroundColor: '#0a0a0a' },
  scoreText: { fontSize: 36, fontWeight: 'bold', fontFamily: 'monospace' },
  vsDivider: { width: 40, justifyContent: 'center', alignItems: 'center' },
  vsText: { color: '#00ff00', fontSize: 28, fontWeight: 'bold', fontFamily: 'monospace' },
  scrollContent: { flex: 1 },
  rostersContainer: { flexDirection: 'row', padding: 10, gap: 10 },
  rosterColumn: { flex: 1 },
  rosterHeader: { padding: 10, borderWidth: 3, borderColor: '#00ff00', marginBottom: 10, alignItems: 'center' },
  rosterHeaderText: { color: '#ffffff', fontSize: 12, fontWeight: 'bold', fontFamily: 'monospace' },
  rosterSubtext: { color: '#ffff00', fontSize: 9, fontFamily: 'monospace', marginTop: 2 },
  playerCard: { flexDirection: 'row', backgroundColor: '#1a1a1a', borderWidth: 2, borderColor: '#00ff00', padding: 8, marginBottom: 8, alignItems: 'center' },
  playerNumBox: { width: 28, height: 28, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#000', marginRight: 8 },
  playerNum: { color: '#000', fontSize: 11, fontWeight: 'bold', fontFamily: 'monospace' },
  playerInfo: { flex: 1 },
  playerName: { color: '#00ffff', fontSize: 10, fontWeight: 'bold', fontFamily: 'monospace' },
  playerPos: { color: '#00ff00', fontSize: 8, fontFamily: 'monospace', marginTop: 2 },
  playerPoints: { color: '#ffff00', fontSize: 9, fontWeight: 'bold', fontFamily: 'monospace', marginTop: 2 },
  buttonGroup: { flexDirection: 'row', gap: 4 },
  pointButton: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center', borderWidth: 2 },
  twoPointButton: { backgroundColor: '#00ff00', borderColor: '#00ffff' },
  threePointButton: { backgroundColor: '#ff00ff', borderColor: '#ffff00' },
  pointButtonText: { color: '#000', fontSize: 10, fontWeight: 'bold', fontFamily: 'monospace' },
  endGameButton: { backgroundColor: '#ff0000', margin: 10, padding: 15, borderWidth: 4, borderColor: '#ffff00', alignItems: 'center' },
  endGameText: { color: '#ffff00', fontSize: 16, fontWeight: 'bold', fontFamily: 'monospace' },
});

export default MatchScreen;