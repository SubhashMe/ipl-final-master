function reduce(a, implementer, iValue) 
{
  let acc = iValue;
  for (let i in a)
    acc = implementer(acc, a[i]);
  return acc;
}
function matchesWonPerTeamPerYear(matches) 
{
  let result = {};
  result = reduce(matches,(matchDetail, match) => {
      let season = match["season"];
      let winner = match["winner"];
      if (winner === "") 
      {
        return matchDetail;
      }
      if (season in matchDetail) 
      {
        if (winner in matchDetail[season]) 
        {
          matchDetail[season][winner]++;
        } 
        else 
        {
          matchDetail[season][winner] = 1;
        }
      } 
      else 
      {
        matchDetail[season] = {};
        matchDetail[season][winner] = 1;
      }
      return matchDetail;
    },
    result
  );
  return result;
}
module.exports = matchesWonPerTeamPerYear;
