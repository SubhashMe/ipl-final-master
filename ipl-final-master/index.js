const fs = require("fs");
const csv = require("csvtojson");
const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";


function main()
{
csv()
  .fromFile(MATCHES_FILE_PATH)
  .then(matches => {
    csv()
      .fromFile(DELIVERIES_FILE_PATH)
      .then(deliveries => {
        totalMatchesYearwise = require("./ipl/Q1"); // function call with source file
        let matchesPerSeason = totalMatchesYearwise(matches); //creation of JSON file

        matchesWonPerTeamPerYear = require("./ipl/Q2");// function call with source file
        let matchesWonByTeam = matchesWonPerTeamPerYear(matches);//creation of JSON file

        extraRunPerTeam2016 = require("./ipl/Q3");// function call with source file
        let extraRuns = extraRunPerTeam2016(matches, deliveries) ;//creation of JSON file

        tenEconomicalBowler2015 = require("./ipl/Q4");// function call with source file
        let economicalBowler = tenEconomicalBowler2015(matches,deliveries) //creation of JSON file

        storyPlayerDetails = require("./ipl/Q5"); // function call with source file
         let StoryDetails = storyPlayerDetails(matches,deliveries);//creation of JSON file
        
         topeconomicalbowlers = require("./ipl/economy");
         let economicalBowlers = topeconomicalbowlers(deliveries,matches);

        let Result = []; 
        let EconomyBowlers = [] ;
        Result.push({matchesPerSeason: matchesPerSeason});
        Result.push({matchesWonByTeam: matchesWonByTeam});
        Result.push({extraRuns: extraRuns});
        Result.push({economicalBowler:economicalBowler});
        Result.push({StoryDetails: StoryDetails});
        EconomyBowlers.push({economicalBowlers:economicalBowlers});

        Result = JSON.stringify(Result);
        fs.writeFileSync("./public/data.json",Result, fallback);

        EconomyBowlers = JSON.stringify(EconomyBowlers);
        fs.writeFileSync("eco.json",EconomyBowlers, fallback);
        function fallback(err) {
          console.log("Error");
        }
      });
  });
}
  main();
