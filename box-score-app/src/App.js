import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import MLB from "./Components/MLB/MLB";
import NBA from "./Components/NBA/NBA";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Update with your GraphQL server URL
  cache: new InMemoryCache(),
});

export default function App() {
  const [activeComponent, setActiveComponent] = useState("mlb");

  const handleToggle = () => {
    setActiveComponent((prevComponent) =>
      prevComponent === "mlb" ? "nba" : "mlb"
    );
  };

  return (
    <ApolloProvider client={client}>
      <div className="app-container">
        <button onClick={handleToggle}>Swap ScoreBoard</button>
        {activeComponent === "mlb" ? <MLB /> : <NBA />}
      </div>
    </ApolloProvider>
  );
}
