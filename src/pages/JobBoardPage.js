import { useLazyQuery, useMutation } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { JobCard } from "../components/JobCard";
import { Spinner } from "../components/Spinner";
import { DELETE_JOB_LISTING, SAVE_JOB } from "../mutations";
import { GET_STAFF_JOBS } from "../queries";
import { Error } from "./Error";
import { useEffect, useState } from "react";

export const JobBoardPage = () => {
  return <h1>JobBoardPage</h1>;
};
