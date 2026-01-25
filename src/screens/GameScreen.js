

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const GameScreen = ({ route, navigation }) => {
  const { homeTeam, awayTeam } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>★ NBA JAM ★</Text>
        <Text style={styles.subtitle}>GAME ON!</Text>
      </View>

      {/* Contenido principal */}
      <View style={styles.mainContent}>
        {/* Enfrentamiento */}
        <View style={styles.matchup}>
          <View style={[styles.teamBox, { borderColor: homeTeam.primaryColor }]}>
            <View style={[styles.teamLogoBox, { backgroundColor: homeTeam.primaryColor }]}>
              <Text style={styles.teamLogo}>{homeTeam.logo}</Text>
            </View>
            <Text style={styles.teamNameLarge}>{homeTeam.name}</Text>
            <View style={[styles.labelBox, { backgroundColor: homeTeam.secondaryColor }]}>
              <Text style={styles.labelText}>LOCAL</Text>
            </View>
          </View>

          <View style={styles.vsSection}>
            <Text style={styles.vsText}>VS</Text>
          </View>

          <View style={[styles.teamBox, { borderColor: awayTeam.primaryColor }]}>
            <View style={[styles.teamLogoBox, { backgroundColor: awayTeam.primaryColor }]}>
              <Text style={styles.teamLogo}>{awayTeam.logo}</Text>
            </View>
            <Text style={styles.teamNameLarge}>{awayTeam.name}</Text>
            <View style={[styles.labelBox, { backgroundColor: awayTeam.secondaryColor }]}>
              <Text style={styles.labelText}>VISIT</Text>
            </View>
          </View>
        </View>

        {/* Rosters */}
        <View style={styles.rostersContainer}>
          <View style={styles.rosterColumn}>
            <View style={[styles.rosterHeader, { backgroundColor: homeTeam.primaryColor }]}>
              <Text style={styles.rosterHeaderText}>ROSTER</Text>
            </View>
            {homeTeam.players.map((player) => (
              <View key={player.id} style={styles.playerCard}>
                <View style={[styles.playerNumBox, { backgroundColor: homeTeam.secondaryColor }]}>
                  <Text style={styles.playerNum}>{player.number}</Text>
                </View>
                <Text style={styles.playerNameText}>{player.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.rosterColumn}>
            <View style={[styles.rosterHeader, { backgroundColor: awayTeam.primaryColor }]}>
              <Text style={styles.rosterHeaderText}>ROSTER</Text>
            </View>
            {awayTeam.players.map((player) => (
              <View key={player.id} style={styles.playerCard}>
                <View style={[styles.playerNumBox, { backgroundColor: awayTeam.secondaryColor }]}>
                  <Text style={styles.playerNum}>{player.number}</Text>
                </View>
                <Text style={styles.playerNameText}>{player.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Botón para volver */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>◄ BACK ►</Text>
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
    padding: 15,
    justifyContent: 'center',
  },
  matchup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  teamBox: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderWidth: 3,
    padding: 15,
    alignItems: 'center',
  },
  teamLogoBox: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#00ffff',
    marginBottom: 10,
  },
  teamLogo: {
    fontSize: 40,
  },
  teamNameLarge: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 10,
  },
  labelBox: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderColor: '#000',
  },
  labelText: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  vsSection: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsText: {
    color: '#ff00ff',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  rostersContainer: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
  },
  rosterColumn: {
    flex: 1,
  },
  rosterHeader: {
    padding: 8,
    borderWidth: 2,
    borderColor: '#00ff00',
    marginBottom: 8,
  },
  rosterHeaderText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  playerCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#00ff00',
    padding: 6,
    marginBottom: 6,
    alignItems: 'center',
  },
  playerNumBox: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 6,
  },
  playerNum: {
    color: '#000',
    fontSize: 11,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  playerNameText: {
    color: '#00ffff',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    flex: 1,
  },
  backButton: {
    backgroundColor: '#ff00ff',
    margin: 15,
    padding: 15,
    borderWidth: 4,
    borderColor: '#ffff00',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffff00',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});

export default GameScreen;