
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const WinnerScreen = ({ route, navigation }) => {
  const { homeTeam, awayTeam, homeScore, awayScore, playerStats } = route.params;

  const isDraw = homeScore === awayScore;
  const homeWins = homeScore > awayScore;
  const winnerTeam = homeWins ? homeTeam : awayTeam;

  const getTop5Scorers = () => {
    const allPlayers = [...homeTeam.players, ...awayTeam.players];
    
    const playersWithStats = allPlayers.map(player => ({
      ...player,
      points: playerStats[player.id] || 0,
      teamName: homeTeam.players.find(p => p.id === player.id) 
        ? homeTeam.name 
        : awayTeam.name,
      teamColor: homeTeam.players.find(p => p.id === player.id)
        ? homeTeam.secondaryColor
        : awayTeam.secondaryColor,
    }));
    
    const scorers = playersWithStats.filter(player => player.points > 0);
    
    const sorted = scorers.sort((a, b) => b.points - a.points);
    
    return sorted.slice(0, 5);
  };

  const top5 = getTop5Scorers();

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
      <View style={styles.header}>
        <Text style={styles.title}>★ NBA JAM ★</Text>
        <Text style={styles.subtitle}>FIN</Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        
        {isDraw ? (
          <View style={styles.drawContainer}>
            <Text style={styles.drawTitle}>═ EMPATE ═</Text>
            
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

            <Text style={styles.drawMessage}>¡ES UN EMPATE!</Text>
          </View>
        ) : (
          <View style={styles.winnerContainer}>
            <Text style={styles.winnerLabel}>★ GANADOR ★</Text>
            
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

            <Text style={styles.winnerMessage}>¡GANADOR!</Text>

            <View style={styles.finalScoreContainer}>
              <Text style={styles.finalScoreLabel}>RESULTADO FINAL</Text>
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

        {top5.length > 0 && (
          <View style={styles.top5Container}>
            <Text style={styles.top5Title}>★ TOP 5 JUGADORES ★</Text>
            <Text style={styles.top5Subtitle}>MEJORES JUGADORES DEL PARTIDO</Text>
            
            {top5.map((player, index) => (
              <View key={player.id} style={styles.top5PlayerCard}>
                <View style={[
                  styles.rankBadge,
                  index === 0 && styles.goldBadge,
                  index === 1 && styles.silverBadge,
                  index === 2 && styles.bronzeBadge,
                ]}>
                  <Text style={styles.rankText}>#{index + 1}</Text>
                </View>

                <View style={[styles.top5NumBox, { backgroundColor: player.teamColor }]}>
                  <Text style={styles.top5Num}>{player.number}</Text>
                </View>

                <View style={styles.top5PlayerInfo}>
                  <Text style={styles.top5PlayerName}>{player.name}</Text>
                  <Text style={styles.top5TeamName}>{player.teamName}</Text>
                </View>

                <View style={styles.top5PointsBox}>
                  <Text style={styles.top5Points}>{player.points}</Text>
                  <Text style={styles.top5PointsLabel}>PTS</Text>
                </View>

                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { 
                        width: `${Math.min((player.points / (top5[0]?.points || 1)) * 100, 100)}%`,
                        backgroundColor: player.teamColor 
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        )}

        {top5.length === 0 && (
          <View style={styles.noStatsContainer}>
            <Text style={styles.noStatsText}>NO SE REGISTRARON PUNTAJES</Text>
            <Text style={styles.noStatsSubtext}>¡Empieza a jugar para ver las estadísticas!</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.playAgainButton} onPress={playAgain}>
          <Text style={styles.playAgainText}>▶ JUGAR OTRA VEZ ◀</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={goToSelection}>
          <Text style={styles.backButtonText}>◄ NUEVOS EQUIPOS ►</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { paddingVertical: 20, backgroundColor: '#000', borderBottomWidth: 4, borderBottomColor: '#00ff00' },
  title: { color: '#ff00ff', fontSize: 32, fontWeight: 'bold', textAlign: 'center', fontFamily: 'monospace' },
  subtitle: { color: '#ff0000', fontSize: 14, textAlign: 'center', fontFamily: 'monospace', marginTop: 5 },
  scrollContent: { flex: 1 },
  
  winnerContainer: { alignItems: 'center', padding: 20 },
  winnerLabel: { color: '#ffff00', fontSize: 24, fontWeight: 'bold', fontFamily: 'monospace', marginBottom: 20 },
  winnerLogoBox: { width: 100, height: 100, justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#00ffff', marginBottom: 15 },
  winnerLogo: { fontSize: 70 },
  winnerCity: { color: '#00ffff', fontSize: 14, fontFamily: 'monospace', marginBottom: 5 },
  winnerName: { color: '#ffffff', fontSize: 24, fontWeight: 'bold', fontFamily: 'monospace', marginBottom: 15 },
  winnerScoreBox: { borderWidth: 4, paddingHorizontal: 25, paddingVertical: 8, backgroundColor: '#1a1a1a', marginBottom: 10 },
  winnerScore: { fontSize: 42, fontWeight: 'bold', fontFamily: 'monospace' },
  winnerMessage: { color: '#ff00ff', fontSize: 18, fontWeight: 'bold', fontFamily: 'monospace', marginBottom: 15 },
  finalScoreContainer: { backgroundColor: '#1a1a1a', borderWidth: 3, borderColor: '#00ff00', padding: 15, width: '100%', marginTop: 10 },
  finalScoreLabel: { color: '#00ff00', fontSize: 12, fontWeight: 'bold', fontFamily: 'monospace', textAlign: 'center', marginBottom: 10 },
  finalScoreRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3 },
  finalScoreTeam: { color: '#00ffff', fontSize: 12, fontFamily: 'monospace' },
  finalScorePoints: { color: '#ffff00', fontSize: 12, fontWeight: 'bold', fontFamily: 'monospace' },

  drawContainer: { alignItems: 'center', padding: 20 },
  drawTitle: { color: '#ffff00', fontSize: 28, fontWeight: 'bold', fontFamily: 'monospace', marginBottom: 20 },
  drawTeamsContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  drawTeamBox: { alignItems: 'center' },
  drawLogoBox: { width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#00ffff', marginBottom: 10 },
  drawLogo: { fontSize: 50 },
  drawTeamName: { color: '#ffffff', fontSize: 13, fontWeight: 'bold', fontFamily: 'monospace', marginBottom: 8 },
  drawScoreBox: { borderWidth: 3, paddingHorizontal: 15, paddingVertical: 5, backgroundColor: '#1a1a1a' },
  drawScore: { fontSize: 28, fontWeight: 'bold', fontFamily: 'monospace' },
  drawVs: { color: '#00ff00', fontSize: 28, fontWeight: 'bold', fontFamily: 'monospace', marginHorizontal: 15 },
  drawMessage: { color: '#ff00ff', fontSize: 20, fontWeight: 'bold', fontFamily: 'monospace' },

  top5Container: { backgroundColor: '#1a1a1a', margin: 15, padding: 15, borderWidth: 3, borderColor: '#ff00ff' },
  top5Title: { color: '#ffff00', fontSize: 20, fontWeight: 'bold', fontFamily: 'monospace', textAlign: 'center', marginBottom: 5 },
  top5Subtitle: { color: '#00ffff', fontSize: 10, fontFamily: 'monospace', textAlign: 'center', marginBottom: 15 },
  top5PlayerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0a0a0a', borderWidth: 2, borderColor: '#00ff00', padding: 10, marginBottom: 8 },
  rankBadge: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#666', justifyContent: 'center', alignItems: 'center', marginRight: 8, borderWidth: 2, borderColor: '#888' },
  goldBadge: { backgroundColor: '#FFD700', borderColor: '#FFA500' },
  silverBadge: { backgroundColor: '#C0C0C0', borderColor: '#A8A8A8' },
  bronzeBadge: { backgroundColor: '#CD7F32', borderColor: '#B87333' },
  rankText: { color: '#000', fontSize: 12, fontWeight: 'bold', fontFamily: 'monospace' },
  top5NumBox: { width: 26, height: 26, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#000', marginRight: 8 },
  top5Num: { color: '#000', fontSize: 11, fontWeight: 'bold', fontFamily: 'monospace' },
  top5PlayerInfo: { flex: 1 },
  top5PlayerName: { color: '#00ffff', fontSize: 11, fontWeight: 'bold', fontFamily: 'monospace' },
  top5TeamName: { color: '#00ff00', fontSize: 9, fontFamily: 'monospace', marginTop: 2 },
  top5PointsBox: { alignItems: 'center', marginRight: 8 },
  top5Points: { color: '#ffff00', fontSize: 18, fontWeight: 'bold', fontFamily: 'monospace' },
  top5PointsLabel: { color: '#ffff00', fontSize: 8, fontFamily: 'monospace' },
  progressBarContainer: { width: 50, height: 8, backgroundColor: '#333', borderWidth: 1, borderColor: '#00ff00' },
  progressBar: { height: '100%' },

  noStatsContainer: { alignItems: 'center', padding: 40 },
  noStatsText: { color: '#ff00ff', fontSize: 18, fontWeight: 'bold', fontFamily: 'monospace' },
  noStatsSubtext: { color: '#00ffff', fontSize: 12, fontFamily: 'monospace', marginTop: 10 },

  buttonsContainer: { padding: 15, gap: 10 },
  playAgainButton: { backgroundColor: '#00ff00', padding: 15, borderWidth: 4, borderColor: '#00ffff', alignItems: 'center' },
  playAgainText: { color: '#000', fontSize: 16, fontWeight: 'bold', fontFamily: 'monospace' },
  backButton: { backgroundColor: '#ff00ff', padding: 15, borderWidth: 4, borderColor: '#ffff00', alignItems: 'center' },
  backButtonText: { color: '#ffff00', fontSize: 16, fontWeight: 'bold', fontFamily: 'monospace' },
});

export default WinnerScreen;