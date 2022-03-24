import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { GET_STUDENT_JOBS } from "../queries";
import { SAVE_JOB } from "../mutations";
import { JobCard } from "../components/JobCard";
import { JOBS } from "../queries";
import { Error } from "./Error";
import { Spinner } from "../components/Spinner";
import { Alert } from "@mui/material";
import { alertContainer } from "../styles";

export const ViewJobsPage = () => {
  const [jobData, setJobData] = useState();
  const [myJobs, setMyJobs] = useState();

  const [getAllJobs, { loading, error }] = useLazyQuery(JOBS);

  const [getMyJobs] = useLazyQuery(GET_STUDENT_JOBS);

  useEffect(() => {
    async function fetchData() {
      const { data: allJobs } = await getAllJobs();
      setJobData(allJobs);
      const { data: studentJobsData } = await getMyJobs();
      setMyJobs(studentJobsData);
    }
    fetchData();
  }, [getAllJobs, jobData, myJobs]);

  const [executeSaveJob, { loading: saveJobLoading, error: saveJobError }] =
    useMutation(SAVE_JOB);

  // let navigate = useNavigate();

  const onAdd = async (event) => {
    const jobId = event.target.id;

    try {
      const { data: addData } = await executeSaveJob({
        variables: { jobId },
      });

      if (saveJobError) {
        throw new Error("Something went wrong!");
      }

      if (addData) {
        // navigate("/job-board", { replace: true });
      }
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

  if (error) {
    return <Error />;
  }

  return (
    <Box>
      {loading && (
        <Box sx={{ height: "500px" }}>
          <Spinner />
        </Box>
      )}

      {!loading && jobData?.jobs.length && (
        <>
          <Typography
            variant="h4"
            gutterBottom
            component="h1"
            align="center"
            sx={styles.header}
          >
            Open Jobs
          </Typography>

          <Box sx={styles.container}>
            {jobData?.jobs?.map((job) => {
              const alreadySaved = myJobs?.getStudentJobs.some((each) => {
                return each.id === job.id;
              });

              return (
                <JobCard
                  id={job.id}
                  title={job.title}
                  description={job.description}
                  company={job.company}
                  url={job.url}
                  salary={job.salary}
                  date={new Date(job.closingDate)}
                  key={job.id}
                  onAdd={onAdd}
                  alreadySaved={alreadySaved}
                />
              );
            })}
          </Box>
        </>
      ) : (
        <>
          <Alert icon={false} severity="info" sx={alertContainer}>
            There are currently no job listings.
          </Alert>
        </>
      )}
    </Box>
  );
};
