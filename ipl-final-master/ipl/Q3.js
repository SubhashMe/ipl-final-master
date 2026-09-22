function reduce(a, implementer, iValue) 
{
  let acc = iValue;
  for (let i in a)
    acc = implementer(acc, a[i]);
  return acc;
}
function map(ar, map_Function)
 {
  const result = [];
  for (let i in ar) 
  {
    const map = map_Function(ar[i]);
    result.push(map);
  }
  return result;
}
function filter(arr, filter) 
{
  const f_result= [];
  for (let i in arr) 
  {
    const check = filter(arr[i]);
    if (check) 
    {
      f_result.push(arr[i]);
    }
  }
  return f_result;
}
function extraRunPerTeam2016(matches, deliveries) 
{
  let extraRuns = {};
  let matches2016 = filter(matches, match => match["season"] == 2016);
  let matchNo2016 = map(matches2016, match => match["id"]);

  extraRuns = reduce( deliveries, (matchdetail, delivery) => {
      if (matchNo2016.includes(delivery["match_id"])) 
      {
        if (delivery["bowling_team"] in matchdetail) 
        {
          matchdetail[delivery["bowling_team"]] = parseInt(matchdetail[delivery["bowling_team"]]) + parseInt(delivery["extra_runs"]);
        }
         else 
        {
          matchdetail[delivery["bowling_team"]] = delivery["extra_runs"];
        }
      }
      return matchdetail;
    },
    extraRuns
  );

  return extraRuns;
}
module.exports = extraRunPerTeam2016;
