
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { teams } from '../data/teams';

const SelectionScreen = ({ navigation }) => {
  const [homeTeamIndex, setHomeTeamIndex] = useState(0);
  const [awayTeamIndex, setAwayTeamIndex] = useState(1);

  const handleHomeTeamChange = () => {
    setHomeTeamIndex((prevIndex) => (prevIndex + 1) % teams.length);
  };

  const handleAwayTeamChange = () => {
    setAwayTeamIndex((prevIndex) => (prevIndex + 1) % teams.length);
  };

  const handleStartGame = () => {
    navigation.navigate('Match', {
      homeTeam: teams[homeTeamIndex],
      awayTeam: teams[awayTeamIndex],
      resetKey: Date.now(),
    });
  };

  const renderTeamSelector = (team, onChangeTeam, isHome) => (
    <View style={styles.teamContainer}>
      <View style={styles.teamHeader}>
        <Text style={styles.label}>{isHome ? 'LOCAL' : 'VISIT'}</Text>
      </View>

      <View style={[styles.teamCard, { borderColor: team.primaryColor }]}>
        <View style={[styles.logoContainer, { backgroundColor: team.primaryColor }]}>
          <Text style={styles.logoText}>{team.logo}</Text>
        </View>
        
        <Text style={styles.teamName}>{team.name}</Text>

        <View style={styles.playersList}>
          {team.players.map((player) => (
            <View key={player.id} style={styles.playerRow}>
              <View style={[styles.playerNumber, { backgroundColor: team.secondaryColor }]}>
                <Text style={styles.playerNumberText}>{player.number}</Text>
              </View>
              <Text style={styles.playerName}>{player.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.changeButton, { backgroundColor: team.primaryColor }]}
        onPress={onChangeTeam}
      >
        <Text style={styles.changeButtonText}>CAMBIA</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>★ NBA JAM ★</Text>
        <Text style={styles.subtitle}>SELECCIONA TU EQUIPO</Text>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.teamsRow}>
          {renderTeamSelector(teams[homeTeamIndex], handleHomeTeamChange, true)}
          
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
          </View>

          {renderTeamSelector(teams[awayTeamIndex], handleAwayTeamChange, false)}
        </View>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
        <Text style={styles.startButtonText}>► EMPEZAR JUEGO ◄</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    paddingVertical: 20,
    backgroundColor: '#000',
    borderBottomWidth: 4,
    borderBottomColor: '#00ff00',
  },
  title: {
    color: '#ff00ff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  subtitle: {
    color: '#00ffff',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'monospace',
    marginTop: 5,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  teamsRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  teamContainer: {
    flex: 1,
  },
  teamHeader: {
    backgroundColor: '#1a1a1a',
    padding: 8,
    borderWidth: 2,
    borderColor: '#00ff00',
    marginBottom: 8,
  },
  label: {
    color: '#00ff00',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  teamCard: {
    backgroundColor: '#1a1a1a',
    borderWidth: 3,
    padding: 10,
  },
  logoContainer: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#00ffff',
    marginBottom: 8,
  },
  logoText: {
    fontSize: 40,
  },
  teamName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  playersList: {
    gap: 4,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    padding: 6,
    borderWidth: 2,
    borderColor: '#00ff00',
  },
  playerNumber: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
  playerNumberText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  playerName: {
    color: '#00ffff',
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    flex: 1,
  },
  changeButton: {
    padding: 10,
    marginTop: 8,
    borderWidth: 3,
    borderColor: '#ffff00',
    alignItems: 'center',
  },
  changeButtonText: {
    color: '#ffff00',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  vsContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  vsText: {
    color: '#ff00ff',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  startButton: {
    backgroundColor: '#ff00ff',
    margin: 10,
    padding: 15,
    borderWidth: 4,
    borderColor: '#ffff00',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#ffff00',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});

export default SelectionScreen;