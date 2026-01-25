

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PlayerList from './PlayerList';

const TeamSelector = ({ team, onChangeTeam, isHome }) => {
  return (
    <View style={[styles.container, isHome ? styles.homeContainer : styles.awayContainer]}>
      <View style={styles.header}>
        <Text style={styles.label}>{isHome ? 'LOCAL' : 'VISITANTE'}</Text>
        <TouchableOpacity
          style={[styles.changeButton, { backgroundColor: team.primaryColor }]}
          onPress={onChangeTeam}
        >
          <Text style={styles.changeButtonText}>CAMBIAR EQUIPO</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.teamInfo, { backgroundColor: team.primaryColor }]}>
        <Text style={styles.logoText}>{team.logo}</Text>
        <Text style={styles.cityText}>{team.city}</Text>
        <Text style={styles.teamName}>{team.name}</Text>
      </View>

      <View style={styles.playersSection}>
        <Text style={styles.playersTitle}>ROSTER</Text>
        <PlayerList players={team.players} teamColor={team.secondaryColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  homeContainer: {
    borderRightWidth: 2,
    borderRightColor: '#444',
  },
  awayContainer: {
    borderLeftWidth: 2,
    borderLeftColor: '#444',
  },
  header: {
    marginBottom: 15,
  },
  label: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 2,
  },
  changeButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  changeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  teamInfo: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  logoText: {
    fontSize: 60,
    marginBottom: 10,
  },
  cityText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 5,
  },
  teamName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  playersSection: {
    flex: 1,
  },
  playersTitle: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 1,
  },
});

export default TeamSelector;