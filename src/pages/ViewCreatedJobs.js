import { useLazyQuery, useMutation } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { JobCard } from "../components/JobCard";
import { Spinner } from "../components/Spinner";
import { DELETE_JOB_LISTING } from "../mutations";
import { GET_STAFF_JOBS } from "../queries";
import { Error } from "./Error";
import { useEffect, useState } from "react";
import { postButton } from "../styles";

export const ViewCreatedJobs = () => {
  const [executeGetStaffJobs, { loading: staffJobsLoading }] =
    useLazyQuery(GET_STAFF_JOBS);

  // TODO: handle this loading and error
  const [executeDeleteJob, { loading, error }] =
    useMutation(DELETE_JOB_LISTING);

  const [jobsData, setJobsData] = useState([]);

  useEffect(() => {
    const getStaffJobsData = async () => {
      try {
        const { data: staffJobsData, error: staffJobsError } =
          await executeGetStaffJobs();

        if (staffJobsError) {
          throw new Error("Something went wrong.");
        }

        setJobsData(staffJobsData.getStaffJobs);
      } catch (error) {
        console.log(error);
      }
    };
    getStaffJobsData();
  }, [jobsData, executeGetStaffJobs]);

  const onDelete = async (event) => {
    const jobId = event.target.id;
    try {
      const { data: deleteData, error: deleteError } = await executeDeleteJob({
        variables: {
          jobId,
        },
      });

      if (deleteError) {
        throw new Error("Something went wrong!");
      }

      setJobsData(deleteData.deleteJob);
    } catch (error) {
      console.log(error);
    }
  };

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
    loadingButton: { marginTop: 3, marginBottom: 2 },
  };

  return (
    <>
      {staffJobsLoading && (
        <Box sx={{ height: "500px" }}>
          <Spinner />
        </Box>
      )}

      {!staffJobsLoading && !jobsData.length ? (
        <Box sx={{ height: "75vh" }}>
          <Typography
            variant="h4"
            gutterBottom
            component="h1"
            align="center"
            sx={styles.header}
          >
            You have no open job listings
          </Typography>
          <Stack direction={"row"} sx={{ justifyContent: "center" }}>
            <Button
              component="a"
              sx={loading ? styles.loadingButton : { ...postButton, m: 2 }}
              href="/create-job"
              variant="contained"
            >
              List a job
            </Button>
          </Stack>
        </Box>
      ) : null}

      {!staffJobsLoading && jobsData.length ? (
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
          <Stack direction={"row"} sx={{ justifyContent: "center" }}>
            <Button
              component="a"
              sx={loading ? styles.loadingButton : { ...postButton, m: 2 }}
              href="/create-job"
              variant="contained"
            >
              List a job
            </Button>
          </Stack>
          <Box sx={styles.container}>
            {jobsData.map((staffJob) => {
              return (
                <JobCard
                  id={staffJob.id}
                  title={staffJob.title}
                  description={staffJob.description}
                  company={staffJob.company}
                  url={staffJob.url}
                  salary={staffJob.salary}
                  // TODO: FIX THE BELOW
                  closingDate={new Date(parseInt(staffJob.closingDate))}
                  key={staffJob.id}
                  onDelete={onDelete}
                />
              );
            })}
          </Box>
        </>
      ) : null}
    </>
  );
};
