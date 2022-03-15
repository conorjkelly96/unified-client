import { useQuery } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { JobCard } from "../components/JobCard";
import { JOBS } from "../queries";
import { Error } from "./Error";

export const ViewJobsPage = () => {
  const { data, loading, error } = useQuery(JOBS);

  if (error) {
    return <Error />;
  }

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
    <Box>
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
        {data &&
          data.jobs.map((job) => (
            <JobCard
              title={job.title}
              description={job.description}
              company={job.company}
              url={job.url}
              salary={job.salary}
              date={new Date(job.closingDate)}
              key={job.id}
            />
          ))}
      </Box>
    </Box>
  );
};
