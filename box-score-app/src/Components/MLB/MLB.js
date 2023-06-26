import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import "./style.css"; // Import the CSS file

const GET_GAME_DETAILS = gql`
  query GetGameDetails {
    createMLBData {
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

const MLB = () => {
  const { loading, error, data } = useQuery(GET_GAME_DETAILS);
  const [selectedInning, setSelectedInning] = useState(9);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const gameDetails = data?.createMLBData?.games;

  if (!gameDetails) {
    return <p>No game details available</p>;
  }

  const awayPeriodScores = gameDetails.away_period_scores || [];
  const homePeriodScores = gameDetails.home_period_scores || [];

  const awayTeamName = gameDetails.away_team?.full_name || "Away Team";
  const homeTeamName = gameDetails.home_team?.full_name || "Home Team";

  const innings = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const selectedInningIndex = innings.indexOf(selectedInning);

  const totalAwayScore = awayPeriodScores
    .slice(0, selectedInningIndex + 1)
    .reduce((a, b) => a + b, 0);
  const totalHomeScore = homePeriodScores
    .slice(0, selectedInningIndex + 1)
    .reduce((a, b) => a + b, 0);

  const awayScoreColumns = awayPeriodScores.map((score, index) => (
    <div key={index} className={`score-column ${index > selectedInningIndex ? 'disabled' : ''}`}>
      <p>{index > selectedInningIndex ? '-' : score}</p>
    </div>
  ));

  const homeScoreColumns = homePeriodScores.map((score, index) => (
    <div key={index} className={`score-column ${index > selectedInningIndex ? 'disabled' : ''}`}>
      <p>{index > selectedInningIndex ? '-' : score}</p>
    </div>
  ));

  const handleInningSelect = (event) => {
    setSelectedInning(parseInt(event.target.value));
  };

  return (
    <div className="mlb-container">
      <div className="inning-select">
        <label htmlFor="inning-select">Select Inning:</label>
        <select id="inning-select" value={selectedInning} onChange={handleInningSelect}>
          {innings.map((inning) => (
            <option key={inning} value={inning}>
              {inning}
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

export default MLB;
