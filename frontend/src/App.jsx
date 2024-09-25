import React from "react";
import ResultCard from "./components/CardList";
import Header from "./components/layout/header/header";
import SideBar from "./components/layout/SideBar";
import { Grid } from "@mui/material";
import "./App.css";

const App = () => {
  return (
    <div style={{ width: "100%" }}>
      <Header />
      <Grid
        container
        style={{
          height: "100%",
        }}
      >
        <Grid item xs={12} sm={3} md={2}>
          <SideBar />
        </Grid>
        <Grid item xs={12} sm={9} md={10}>
          <ResultCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
