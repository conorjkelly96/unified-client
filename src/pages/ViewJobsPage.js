import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { GET_STUDENT_JOBS } from "../queries";
import { SAVE_JOB } from "../mutations";
import { JobCard } from "../components/JobCard";
import { JOBS } from "../queries";
import { Error } from "./Error";
import { Spinner } from "../components/Spinner";

export const ViewJobsPage = () => {
  const { data, loading, error } = useQuery(JOBS);
  const [executeSaveJob, { loading: saveJobLoading, error: saveJobError }] =
    useMutation(SAVE_JOB);

  const { data: studentJobsData } = useQuery(GET_STUDENT_JOBS);

  const navigate = useNavigate();

  const onAdd = async (event) => {
    const jobId = event.target.id;

    try {
      const { data: addData, error: addError } = await executeSaveJob({
        variables: { jobId },
      });
      if (addError) {
        throw new Error("Something went wrong!");
      }
      if (addData) {
        navigate("/job-board", { replace: true });
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

      {!loading && data?.jobs.length && (
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
            {data?.jobs?.map((job) => {
              const alreadySaved = studentJobsData?.getStudentJobs.some(
                (each) => {
                  return each.id === job.id;
                }
              );

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
      )}
    </Box>
  );
};
