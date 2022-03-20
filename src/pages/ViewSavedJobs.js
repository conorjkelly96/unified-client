import { useQuery, useMutation } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { JobCard } from "../components/JobCard";
import { Spinner } from "../components/Spinner";

import { GET_STUDENT_JOBS } from "../queries";
import { Error } from "./Error";
import { useEffect, useState } from "react";

export const ViewSavedJobs = () => {
  const {
    data: studentJobsData,
    error: studentJobsError,
    loading: studentJobsLoading,
  } = useQuery(GET_STUDENT_JOBS);

  console.log(studentJobsData);
  // const [jobsData, setJobsData] = useState([]);

  // setJobsData(studentJobsData.getStudentJobs);

  const styles = {
    header: {
      paddingTop: 3,
      paddingBottom: 2,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      maxWidth: 750,
      margin: "auto",
    },
  };

  return (
    <>
      {studentJobsLoading && (
        <Box sx={{ height: "500px" }}>
          <Spinner />
        </Box>
      )}

      {!studentJobsLoading && !studentJobsData?.getStudentJobs.length ? (
        <Box sx={{ height: "75vh" }}>
          <Typography
            variant="h4"
            gutterBottom
            component="h1"
            align="center"
            sx={styles.header}
          >
            You have no saved jobs
          </Typography>
          <Stack direction={"row"} sx={{ justifyContent: "center" }}>
            <Button component="a" href="/jobs" variant="contained">
              List a job
            </Button>
          </Stack>
        </Box>
      ) : null}

      {!studentJobsLoading && studentJobsData?.getStudentJobs.length ? (
        <>
          <Typography
            variant="h4"
            gutterBottom
            component="h1"
            align="center"
            sx={styles.header}
          >
            Your Job Listings
          </Typography>
          <Box sx={styles.container}>
            {studentJobsData.getStudentJobs.map((studentJob) => (
              <JobCard
                id={studentJob.id}
                title={studentJob.title}
                description={studentJob.description}
                company={studentJob.company}
                url={studentJob.url}
                salary={studentJob.salary}
                date={new Date(studentJob.closingDate)}
                key={studentJob.id}
                // onSave={onAdd}
              />
            ))}
          </Box>
        </>
      ) : null}
    </>
  );
};
