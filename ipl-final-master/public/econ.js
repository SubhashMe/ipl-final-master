function hmtldata()
{
    const seasonT = Number(document.getElementById("year").value);
   fetch("/eco?year="+ seasonT)  
   .then((resp) => resp.json())
   .then((response)=>{

     visualizeData(response);
     
     function visualizeData(response) 
     {
         const seriesData=[];
         for(let player in response)
         {
           seriesData.push([player,response[player]]);
         }
        seriesData.sort(function(a,b)
        {
           return a[1]-b[1];
         });
         let d=seriesData.slice(0,10);
      
       Highcharts.chart("bowlers economy", {
         chart: {
           type: "column"
         },
         title: {
           text: `<b>Top Economical Bowlers in ${seasonT} season</b>`
         },
         subtitle: {
           text:
             'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
         },
         xAxis: {
           type: "category"
         },
         yAxis: {
           min: 0,
           title: {
             text: "Economy"
           }
         },
         series: [
           {
             name: "Players",
             data: d
           }
         ]
       });
     }
   })
   }
     
