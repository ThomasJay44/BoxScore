const { gql } = require("apollo-server");

module.exports = gql`
  type NBAData {
    games: DataNBA
    _id: ID
  }

  type DataNBA {
    league: String
    away_team: Team
    home_team: Team
    event_information: Event
    away_period_scores: [Float]
    home_period_scores: [Float]
    away_stats: [Player]
    home_stats: [Player]
    officials: [Official]
    away_totals: Totals
    home_totals: Totals
  }

  type MLBData {
    games: DataMLB
    _id: ID
  }

  type DataMLB {
    league: String
    away_team: Team
    home_team: Team
    event_information: Event
    away_period_scores: [Float]
    home_period_scores: [Float]
    away_stats: [Player]
    home_stats: [Player]
    officials: [Official]
    away_batter_totals: Totals
    home_batter_totals: Totals
  }

  type Official {
    first_name: String
    last_name: String
    position: String
  }

  type Totals {
    assists: Float
    blocks: Float
    defensive_rebounds: Float
    field_goal_percentage: Float
    field_goals_attempted: Float
    field_goals_made: Float
    free_throw_percentage: Float
    free_throws_attempted: Float
    free_throws_made: Float
    minutes: Float
    offensive_rebounds: Float
    personal_fouls: Float
    points: Float
    steals: Float
    three_points_field_goals_attempted: Float
    three_points_field_goals_made: Float
    three_points_percentage: Float
    turnovers: Float
  }

  type Event {
    attendance: Float
    duration: String
    season_type: String
    site: String
    start_date_time: String
    status: String
    temperature: Float
  }

  type Team {
    abbreviation: String
    active: Boolean
    city: String
    conference: String
    division: String
    first_name: String
    full_name: String
    last_name: String
    site_name: String
    state: String
    team_id: String
  }

  type Player {
    assists: Float
    blocks: Float
    defensive_rebounds: Float
    display_name: String
    field_goal_percentage: Float
    field_goals_attempted: Float
    field_goals_made: Float
    first_name: String
    free_throw_percentage: Float
    free_throws_attempted: Float
    free_throws_made: Float
    is_starter: Boolean
    last_name: String
    minutes: Float
    offensive_rebounds: Float
    personal_fouls: Float
    points: Float
    position: String
    steals: Float
    team_abbreviation: String
    three_points_field_goals_attempted: Float
    three_points_field_goals_made: Float
    three_points_percentage: Float
    turnovers: Float
  }

  type Query {
    createMLBData: MLBData
    createNBAData: NBAData
  }
`;
