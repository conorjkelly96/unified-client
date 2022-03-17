import { useLazyQuery, useMutation } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { JobCard } from "../components/JobCard";
import { Spinner } from "../components/Spinner";
import { DELETE_JOB_LISTING } from "../mutations";
import { GET_STAFF_JOBS } from "../queries";
<<<<<<< HEAD
import { SAVE_JOB } from "../mutations";
import { useAuth } from "../contexts/AppProvider";
=======

>>>>>>> 4faeb1b (ForumPostCard)
import { Error } from "./Error";
import { useEffect, useState } from "react";

export const ViewCreatedJobs = () => {
  const [executeGetStaffJobs, { loading: staffJobsLoading }] =
    useLazyQuery(GET_STAFF_JOBS);

  const [executeDeleteJob, { loading, error }] =
    useMutation(DELETE_JOB_LISTING);

  const [executeSaveJob, { loading, error }] = useMutation(SAVE_JOB);

  const [jobsData, setJobsData] = useState([]);

  useEffect(() => {
    const getStaffJobsData = async () => {
      try {
        const { data: staffJobsData, error: staffJobsError } =
          await executeGetStaffJobs();

        if (staffJobsError) {
          throw new Error("Something went wrong.");
        }

        console.log("staffJobsData:", jobsData);

        setJobsData(staffJobsData.getStaffJobs);
      } catch (error) {
        console.log(error);
      }
    };
    getStaffJobsData();
  }, [jobsData, executeGetStaffJobs]);

  // TODO: onEdit button direct to edit-job page or change JobCard into editable form??

  // if (staffJobsError) {
  //   return <Error />;
  // }

  const onDelete = async (event) => {
    const jobId = event.target.id;
    try {
      const { data: deleteData, error: deleteError } = await executeDeleteJob({
        variables: {
          jobId,
        },
      });
      if (deleteError) {
        throw new Error("something went wrong!");
      }

      setJobsData(deleteData.deleteJob);
    } catch (error) {
      console.log(error);
    }
  };

  const onAdd = (event) => {
    const jobId = event.target.id;
    console.log(jobId);
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
            <Button component="a" href="/create-job" variant="contained">
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
          <Box sx={styles.container}>
            {jobsData.map((staffJob) => (
              <JobCard
                id={staffJob.id}
                title={staffJob.title}
                description={staffJob.description}
                company={staffJob.company}
                url={staffJob.url}
                salary={staffJob.salary}
                date={new Date(staffJob.closingDate)}
                key={staffJob.id}
                onDelete={onDelete}
              />
            ))}
          </Box>
        </>
      ) : null}
    </>
  );
};
