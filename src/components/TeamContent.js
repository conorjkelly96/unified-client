import React from "react";
import TeamCard from "../components/TeamCards";
import { Grid } from "@material-ui/core";
import teamList from "./constants";

const Content = () => {
  const getTeamCard = (teamObj) => {
    return (
      <Grid item xs={12} sm={4}>
        <TeamCard {...teamObj} />
      </Grid>
    );
  };

  return (
    <Grid container spacing={2}>
      {teamList.map((teamObj) => getTeamCard(teamObj))}
    </Grid>
  );
};
export default Content;
