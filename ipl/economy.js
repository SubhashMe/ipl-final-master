function topeconomicalbowlers(deliveries,matches) {
    let res={};
    for(let k=2008;k<=2019;k++){
      let id=matches.filter(a=>(a.season)==Number(k)).map(a=>a.id);
      
      let bowler_name;
      bowler_name=(deliveries.filter(a=>(a.match_id)>=Number(id[0]) && (a.match_id)<=Number(id[id.length-1]))
      .map(a=>a.bowler));
       
      let wide_runs;
      wide_runs=(deliveries.filter(a=>(a.match_id)>=Number(id[0]) && (a.match_id)<=Number(id[id.length-1]))
      .map(a=>a.wide_runs));
  
       
      let noball_runs;
      noball_runs=(deliveries.filter(a=>(a.match_id)>=Number(id[0]) && (a.match_id)<=Number(id[id.length-1]))
      .map(a=>a.noball_runs));
  
      let total_runs;
      total_runs=(deliveries.filter(a=>(a.match_id)>=Number(id[0]) && (a.match_id)<=Number(id[id.length-1]))
      .map(a=>a.total_runs));
      var uniqueArray = [...new Set(bowler_name)]
    
     
    let r={};
      for(let j=0;j<uniqueArray.length;j++){
         
          let run=0;
          let ball=0;
      for(let i=0;i<bowler_name.length;i++){
                if(uniqueArray[j]===bowler_name[i]){
                    if(noball_runs[i]=="0" && wide_runs[i]=="0"){
                      ball++;
                    }
                    run=run+Number(total_runs[i]);
  
                }
      }
      let economy=Number((6*(run/ball)).toFixed(2));
      r[uniqueArray[j]]=economy;
    }
      
  
  res[k]=r;
  
     }
    
      return res;
    }
      module.exports = topeconomicalbowlers;