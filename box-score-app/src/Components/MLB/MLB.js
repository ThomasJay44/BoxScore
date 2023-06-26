import React, { useEffect, useState } from "react";

import "./style.css";

export default function MLB() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json"
      );
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
      console.log(jsonData); // Log the data in the console
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.log("Error fetching MLB data:", error); // Log the error in the console
    }
  };

  if (loading) {
    return <div>Loading MLB data...</div>;
  }

  if (error) {
    return <div>Error fetching MLB data: {error}</div>;
  }

  // Extract relevant information from the data
  const { away_team, home_team, away_period_scores, home_period_scores, away_batter_totals, home_batter_totals, event_information } = data;

  // Render the box score
  return (
    <div>

      <h1>MLBDATA</h1>
      <h2>{event_information.site.city} , {event_information.site.state}</h2>
      <div className="box-score">
        <div className="team">
          <h2>{away_team.team_id}</h2>
          <ul>
            {away_period_scores.map((score, index) => (
              <li key={index}>{score}</li>
            ))}
            <p>{away_batter_totals.runs}</p>
          </ul>
        </div>
        <div className="team">
          <h2>{home_team.team_id}</h2>
          <ul>
            {home_period_scores.map((score, index) => (
              <li key={index}>{score}</li>
            ))}
            <p>{home_batter_totals.runs}</p>
          </ul>
        </div>
      </div>
    </div>
  );
}
