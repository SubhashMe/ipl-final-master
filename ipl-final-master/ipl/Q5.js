function storyPlayerDetails(matches,deliveries) 
{ 
  let id=matches.filter(value=>(value.season)==2019).map(value=>value.id);

  let player=(deliveries.filter(value=>(value.match_id)>=Number(id[0]) && (value.match_id)<=Number(id[id.length-1]) && (value.total_runs)>0).map(value=>value.batsman));

  let newArr = [...new Set(player)];

  let totalRun=(deliveries.filter(value=>(value.match_id)>=Number(id[0]) && (value.match_id)<=Number(id[id.length-1]) && (value.total_runs)>0).map(value=>value.total_runs));
 
  let objStore={}; 

  for(let j in newArr)
  {
      let runs=0;   
  
             for(let i in player)
             {
               if(newArr[j]===player[i])
             {
                runs += Number(totalRun[i]);
             }
  }
  objStore[newArr[j]] = runs;
}
  
let PlayerSorting = [];   
for(let i in objStore)
{
PlayerSorting.push([i,objStore[i]]);
}
PlayerSorting.sort(function(x,y)
{
return y[1]-x[1];
});


let playerDetails = PlayerSorting.slice(0,20);
let playersName=[];
for(let i=0;i<20;i++)
{
  playersName.push(playerDetails[i][0]);
}

  let batsmanRuns=(deliveries.filter(value=>(value.match_id)>=Number(id[0]) && (value.match_id)<=Number(id[id.length-1]) && (value.total_runs)>0).map(value=>value.batsman_runs));

  let letsResult={};
  for(let j=0;j<Number(playersName.length);j++)
  {
      let run=0;  
      let boundries=0;
      let Dot_balls=0;
      let singles=0; 
      for(let i=0;i<Number(player.length);i++)
      {
            if(playersName[j]===player[i])
            {
                if(batsmanRuns[i]=="4" || batsmanRuns[i]=="6")
                {
                  boundries++;
                }
                else if(batsmanRuns[i]!="4" && batsmanRuns[i]!="6" && batsmanRuns[i]>"0")
                {
                  Dot_balls++;
                }
                if(batsmanRuns[i]=="1")
                {
                  singles++;
                }
                run += Number(totalRun[i]);

            }
  }
 
 letsResult[playersName[j]]={TotalRun : run,Boundries : boundries, Dot_Balls : Dot_balls,Singles : singles};

}
    return letsResult;
  
  }
  
  module.exports = storyPlayerDetails;

