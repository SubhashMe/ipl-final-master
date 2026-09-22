function topRunScorers(deliveries) {
  let playerRuns = {};
  for (let i = 0; i < deliveries.length; i++) {
    let batsman = deliveries[i].batsman;
    let runs = parseInt(deliveries[i].batsman_runs) || 0;
    
    if (playerRuns[batsman]) {
      playerRuns[batsman] += runs;
    } else {
      playerRuns[batsman] = runs;
    }
  }

  // Convert to array and sort
  let sortedPlayers = Object.entries(playerRuns).sort((a, b) => b[1] - a[1]);
  
  // Get top 10
  let top10 = sortedPlayers.slice(0, 10);
  
  let result = {};
  for (let i = 0; i < top10.length; i++) {
    result[top10[i][0]] = top10[i][1];
  }
  
  return result;
}

module.exports = topRunScorers;
