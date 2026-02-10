
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const WinnerScreen = ({ route, navigation }) => {
  const { homeTeam, awayTeam, homeScore, awayScore } = route.params;

  const isDraw = homeScore === awayScore;
  const homeWins = homeScore > awayScore;
  const winnerTeam = homeWins ? homeTeam : awayTeam;

  const goToSelection = () => {
    navigation.navigate('Selection');
  };

  const playAgain = () => {
    navigation.navigate('Match', {
      homeTeam,
      awayTeam,
      resetKey: Date.now(),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>★ NBA JAM ★</Text>
        <Text style={styles.subtitle}>GAME OVER</Text>
      </View>

      {/* Contenido principal */}
      <View style={styles.mainContent}>
        {isDraw ? (
          <View style={styles.drawContainer}>
            <Text style={styles.drawTitle}>═ DRAW ═</Text>
            
            <View style={styles.drawTeamsContainer}>
              <View style={styles.drawTeamBox}>
                <View style={[styles.drawLogoBox, { backgroundColor: homeTeam.primaryColor }]}>
                  <Text style={styles.drawLogo}>{homeTeam.logo}</Text>
                </View>
                <Text style={styles.drawTeamName}>{homeTeam.name}</Text>
                <View style={[styles.drawScoreBox, { borderColor: homeTeam.primaryColor }]}>
                  <Text style={[styles.drawScore, { color: homeTeam.primaryColor }]}>
                    {homeScore}
                  </Text>
                </View>
              </View>

              <Text style={styles.drawVs}>-</Text>

              <View style={styles.drawTeamBox}>
                <View style={[styles.drawLogoBox, { backgroundColor: awayTeam.primaryColor }]}>
                  <Text style={styles.drawLogo}>{awayTeam.logo}</Text>
                </View>
                <Text style={styles.drawTeamName}>{awayTeam.name}</Text>
                <View style={[styles.drawScoreBox, { borderColor: awayTeam.primaryColor }]}>
                  <Text style={[styles.drawScore, { color: awayTeam.primaryColor }]}>
                    {awayScore}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.drawMessage}>IT'S A TIE!</Text>
          </View>
        ) : (
          <View style={styles.winnerContainer}>
            <Text style={styles.winnerLabel}>★ WINNER ★</Text>
            
            <View style={[styles.winnerLogoBox, { backgroundColor: winnerTeam.primaryColor }]}>
              <Text style={styles.winnerLogo}>{winnerTeam.logo}</Text>
            </View>

            <Text style={styles.winnerCity}>{winnerTeam.city}</Text>
            <Text style={styles.winnerName}>{winnerTeam.name}</Text>

            <View style={[styles.winnerScoreBox, { borderColor: winnerTeam.secondaryColor }]}>
              <Text style={[styles.winnerScore, { color: winnerTeam.secondaryColor }]}>
                {homeWins ? homeScore : awayScore}
              </Text>
            </View>

            <Text style={styles.winnerMessage}>CHAMPION!</Text>

            {/* Marcador final */}
            <View style={styles.finalScoreContainer}>
              <Text style={styles.finalScoreLabel}>FINAL SCORE</Text>
              <View style={styles.finalScoreRow}>
                <Text style={styles.finalScoreTeam}>{homeTeam.name}</Text>
                <Text style={styles.finalScorePoints}>{homeScore}</Text>
              </View>
              <View style={styles.finalScoreRow}>
                <Text style={styles.finalScoreTeam}>{awayTeam.name}</Text>
                <Text style={styles.finalScorePoints}>{awayScore}</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Botones de navegación */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.playAgainButton} onPress={playAgain}>
          <Text style={styles.playAgainText}>▶ PLAY AGAIN ◀</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={goToSelection}>
          <Text style={styles.backButtonText}>◄ NEW TEAMS ►</Text>
        </TouchableOpacity>
      </View>
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
    color: '#ff0000',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'monospace',
    marginTop: 5,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  
  winnerContainer: {
    alignItems: 'center',
  },
  winnerLabel: {
    color: '#ffff00',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginBottom: 20,
  },
  winnerLogoBox: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#00ffff',
    marginBottom: 15,
  },
  winnerLogo: {
    fontSize: 80,
  },
  winnerCity: {
    color: '#00ffff',
    fontSize: 16,
    fontFamily: 'monospace',
    marginBottom: 5,
  },
  winnerName: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginBottom: 20,
  },
  winnerScoreBox: {
    borderWidth: 4,
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#1a1a1a',
    marginBottom: 15,
  },
  winnerScore: {
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  winnerMessage: {
    color: '#ff00ff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginBottom: 20,
  },
  finalScoreContainer: {
    backgroundColor: '#1a1a1a',
    borderWidth: 3,
    borderColor: '#00ff00',
    padding: 15,
    width: '100%',
    marginTop: 10,
  },
  finalScoreLabel: {
    color: '#00ff00',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 10,
  },
  finalScoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  finalScoreTeam: {
    color: '#00ffff',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  finalScorePoints: {
    color: '#ffff00',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },

  drawContainer: {
    alignItems: 'center',
  },
  drawTitle: {
    color: '#ffff00',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginBottom: 30,
  },
  drawTeamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  drawTeamBox: {
    alignItems: 'center',
  },
  drawLogoBox: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#00ffff',
    marginBottom: 10,
  },
  drawLogo: {
    fontSize: 55,
  },
  drawTeamName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginBottom: 10,
  },
  drawScoreBox: {
    borderWidth: 3,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#1a1a1a',
  },
  drawScore: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  drawVs: {
    color: '#00ff00',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginHorizontal: 20,
  },
  drawMessage: {
    color: '#ff00ff',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  buttonsContainer: {
    padding: 15,
    gap: 10,
  },
  playAgainButton: {
    backgroundColor: '#00ff00',
    padding: 15,
    borderWidth: 4,
    borderColor: '#00ffff',
    alignItems: 'center',
  },
  playAgainText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  backButton: {
    backgroundColor: '#ff00ff',
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

export default WinnerScreen;