import { useMutation, useQuery } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";

import { JobCard } from "../components/JobCard";
import { Spinner } from "../components/Spinner";
import { DELETE_JOB_LISTING } from "../mutations";
import { GET_STAFF_JOBS } from "../queries";
import { useAuth } from "../contexts/AppProvider";
import { Error } from "./Error";

export const ViewCreatedJobs = () => {
  const {
    data: staffJobs,
    loading: staffJobsLoading,
    error: staffJobsError,
  } = useQuery(GET_STAFF_JOBS);

  console.log(
    "staffJobs data:",
    staffJobs,
    "staffJobsLoading:",
    staffJobsLoading,
    "staffJobsError:",
    staffJobsError
  );

  const [executeDeleteJob, { loading, error }] =
    useMutation(DELETE_JOB_LISTING);

  const { user } = useAuth();

  // TODO: onDelete re-render listings
  // onEdit button direct to edit-job path/page or change JobCard into editable text fields??

  if (staffJobsError) {
    return <Error />;
  }

  const onDelete = async (event) => {
    const jobId = event.target.id;
    try {
      const { data } = await executeDeleteJob({
        variables: {
          jobId,
        },
      });
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
  };

  return (
    <>
      {staffJobsLoading && <Spinner />}

      {staffJobs.getStaffJobs.length ? (
        <Typography
          variant="h4"
          gutterBottom
          component="h1"
          align="center"
          sx={styles.header}
        >
          Your Job Listings
        </Typography>
      ) : (
        <>
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
        </>
      )}

      <Box sx={styles.container}>
        {staffJobs &&
          staffJobs.getStaffJobs.map((staffJob) => (
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
  );
};
