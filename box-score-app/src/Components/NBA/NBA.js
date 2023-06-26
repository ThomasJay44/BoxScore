import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_GAME_DETAILS = gql`
  query GetGameDetails {
    createNBAData {
      games {
        away_team {
          full_name
        }
        home_team {
          full_name
        }
        away_period_scores
        home_period_scores
      }
    }
  }
`;

const NBA = () => {
  const { loading, error, data } = useQuery(GET_GAME_DETAILS);
  const [selectedQuarter, setSelectedQuarter] = useState(4);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const gameDetails = data?.createNBAData?.games || {};

  if (!gameDetails) {
    return <p>No game details available</p>;
  }

  const awayPeriodScores = gameDetails.away_period_scores || [];
  const homePeriodScores = gameDetails.home_period_scores || [];

  const awayTeamName = gameDetails.away_team?.full_name || "Away Team";
  const homeTeamName = gameDetails.home_team?.full_name || "Home Team";

  const quarters = [1, 2, 3, 4];
  const selectedQuarterIndex = quarters.indexOf(selectedQuarter);

  const totalAwayScore = awayPeriodScores
    .slice(0, selectedQuarterIndex + 1)
    .reduce((a, b) => a + b, 0);

  const totalHomeScore = homePeriodScores
    .slice(0, selectedQuarterIndex + 1)
    .reduce((a, b) => a + b, 0);

  const awayScoreColumns = awayPeriodScores.map((score, index) => (
    <div key={index} className={`score-column ${index > selectedQuarterIndex ? 'disabled' : ''}`}>
      <p>{index > selectedQuarterIndex ? '-' : score}</p>
    </div>
  ));

  const homeScoreColumns = homePeriodScores.map((score, index) => (
    <div key={index} className={`score-column ${index > selectedQuarterIndex ? 'disabled' : ''}`}>
      <p>{index > selectedQuarterIndex ? '-' : score}</p>
    </div>
  ));

  const handleQuarterSelect = (event) => {
    setSelectedQuarter(parseInt(event.target.value));
  };

  return (
    <div className="nba-container">
      <div className="quarter-select">
        <label htmlFor="quarter-select">Select Quarter:</label>
        <select id="quarter-select" value={selectedQuarter} onChange={handleQuarterSelect}>
          {quarters.map((quarter) => (
            <option key={quarter} value={quarter}>
              {quarter}
            </option>
          ))}
        </select>
      </div>
      <div className="team-row">
        <div className="team-name">{awayTeamName}</div>
        <div className="score-row">
          {awayScoreColumns}
          <div className="total-score">{totalAwayScore}</div>
        </div>
      </div>
      <div className="team-row">
        <div className="team-name">{homeTeamName}</div>
        <div className="score-row">
          {homeScoreColumns}
          <div className="total-score">{totalHomeScore}</div>
        </div>
      </div>
    </div>
  );
};

export default NBA;
