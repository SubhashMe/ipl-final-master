Highcharts.setOptions({
  chart: {
    backgroundColor: 'transparent',
    style: {
      fontFamily: 'Inter, sans-serif'
    }
  },
  title: {
    style: {
      color: '#1e293b',
      fontFamily: 'Outfit, sans-serif',
      fontWeight: 'bold',
      fontSize: '1.25rem'
    }
  },
  subtitle: {
    style: {
      color: '#64748b'
    }
  },
  xAxis: {
    labels: {
      style: {
        color: '#64748b',
        fontWeight: '500'
      }
    },
    lineColor: '#e2e8f0',
    tickColor: '#e2e8f0'
  },
  yAxis: {
    gridLineColor: '#f1f5f9',
    labels: {
      style: {
        color: '#64748b',
        fontWeight: '500'
      }
    },
    title: {
      style: {
        color: '#64748b'
      }
    }
  },
  legend: {
    itemStyle: {
      color: '#1e293b',
      fontWeight: '500'
    },
    itemHoverStyle: {
      color: '#4318ff'
    }
  },
  tooltip: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    style: {
      color: '#1e293b'
    },
    borderColor: '#e2e8f0',
    borderRadius: 8,
    shadow: true
  },
  exporting: {
    enabled: true,
    chartOptions: {
      chart: {
        backgroundColor: '#ffffff'
      }
    }
  },
  colors: ['#4318ff', '#00b5d8', '#facc15', '#f43f5e', '#10b981', '#8b5cf6', '#f97316']
});

function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(data => {
      matchesPerSeason = data[0]["matchesPerSeason"];
      matchesWonByTeam = data[1]["matchesWonByTeam"];
      extraRuns = data[2]["extraRuns"];
      economicalBowler = data[3]["economicalBowler"];
      StoryDetails = data[4]["StoryDetails"];
      topScorers = data[5]["topScorers"];
  
      visualizeData(matchesPerSeason);
      visualizeData1(matchesWonByTeam);
      visualizeData2(extraRuns);
      visualizeData3(economicalBowler);
      visualizeData4(StoryDetails);
      visualizeTopScorers(topScorers);
    });
}

function visualizeData(data) {
  Highcharts.chart("totalMatchesYearwise", {
    chart: {
      type: "spline"
    },
    title: {
      text: "1. Total number of matches played each year"
    },
    subtitle: {
      text: "Source: ipl"
    },
    xAxis: {
      categories: Object.keys(data),
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: '#666666',
          lineWidth: 1
        }
      }
    },
    series: [
      {
        name: "Total matches per year",
        data: Object.values(data)
      }
    ]
  });
}
function visualizeData1(data) {
  let teamobj = {};
  let count = 0;
  for (let eachyear in data) {
    count++;
    for (let eachteam in data[eachyear]) {
      if (eachteam in teamobj) {
        teamobj[eachteam].push(data[eachyear][eachteam]);
      } else {
        teamobj[eachteam] = [];
        for (let i = 1; i < count; i++) {
          teamobj[eachteam].push(0);
        }
        teamobj[eachteam].push(data[eachyear][eachteam]);
      }
    }
  }

  let arr = [];
  for (let each in teamobj) {
    let x = {};
    x["name"] = each;
    x["data"] = teamobj[each];
    arr.push(x);
  }
  Highcharts.chart("matchesWonPerTeamPerYear", {
    chart: {
      type: "column"
    },
    title: {
      text: "2. Number of matches won by each team over all the years of IPL"
    },
    subtitle: {
      text: "Source: ipl"
    },
    xAxis: 
    {
      categories: ['2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019'],
    },
    yAxis: 
    {
      min: 0,
      title: 
      {
        text: "Matches Won"
      },
      stackLabels: 
      {
        enabled: true,
        style: 
        {
          fontWeight: "bold",
          color:(Highcharts.defaultOptions.title.style && Highcharts.defaultOptions.title.style.color) || "gray"
        }
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
  },
    plotOptions: {
      column: {
        pointPadding: 0.2,
            borderWidth: 0,
      }
    },
    series: arr
  });
}
function visualizeData2(data) {
  let pieData = [];
  for (let team in data) {
    pieData.push({ name: team, y: data[team] });
  }

  Highcharts.chart("extraRunPerTeam2016", {
    chart: {
      type: "pie"
    },
    title: {
      text: "3. Extra runs conceded by each team in 2016"
    },
    subtitle: {
      text: "Source: ipl"
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true,
        innerSize: '50%'
      }
    },
    series: [
      {
        name: "Extra runs",
        colorByPoint: true,
        data: pieData
      }
    ]
  });
}

function visualizeData3(data) {
  Highcharts.chart("tenEconomicalBowler2015", {
    chart: {
      type: "bar"
    },
    title: {
      text: "4. Top Economical Bowlers in 2015 season"
    },
    subtitle: {
      text: "Source: ipl"
    },
    xAxis: {
      categories: Object.keys(data),
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy"
      }
    },
    plotOptions: {
      bar: {
        pointPadding: 0.2,
        borderWidth: 0,
        borderRadius: 4
      }
    },
    series: [
      {
        name: "Economy",
        data: Object.values(data)
      }
    ]
  });
}
function visualizeData4(data) {
  const dataSet = data;
  let categoryList = [];
  let seriesList = [{
    name: 'TotalRun',
    data: []
  },{
    name: 'Boundries',
    data: []
  },{
    name: 'Dot Balls',
    data: []
  },{
    name: 'Singles',
    data: []
  }];
  console.log(dataSet);
  for (let i in dataSet) {
    categoryList.push(i);
    seriesList[0].data.push(dataSet[i].TotalRun);
    seriesList[1].data.push(dataSet[i].Boundries);
    seriesList[2].data.push(dataSet[i].Dot_Balls);
    seriesList[3].data.push(dataSet[i].Singles);
  }

  console.log(categoryList);
  console.log(seriesList);

  Highcharts.chart('container', {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'List of Players Performance in IPL 2019'
    },
    xAxis: {
      categories: categoryList
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Players Performance in Detail'
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: seriesList
  });
}

function visualizeTopScorers(data) {
  Highcharts.chart("topRunScorers", {
    chart: {
      type: "column"
    },
    title: {
      text: "6. Top 10 Run Scorers (All Time)"
    },
    subtitle: {
      text: "Source: IPL Deliveries"
    },
    xAxis: {
      categories: Object.keys(data),
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: "Total Runs"
      }
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        borderRadius: 4
      }
    },
    series: [
      {
        name: "Runs",
        data: Object.values(data),
        color: '#facc15' // Gold/Orange color for Orange cap
      }
    ]
  });
}

fetchAndVisualizeData();
