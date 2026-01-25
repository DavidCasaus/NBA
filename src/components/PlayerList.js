

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const PlayerList = ({ players, teamColor }) => {
  const renderPlayer = ({ item }) => (
    <View style={styles.playerItem}>
      <View style={[styles.numberBadge, { backgroundColor: teamColor }]}>
        <Text style={styles.numberText}>{item.number}</Text>
      </View>
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{item.name}</Text>
        <Text style={styles.playerPosition}>{item.position}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={players}
      renderItem={renderPlayer}
      keyExtractor={(item) => item.id.toString()}
      style={styles.list}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    marginVertical: 4,
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#444',
  },
  numberBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  numberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  playerPosition: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
});

export default PlayerList;