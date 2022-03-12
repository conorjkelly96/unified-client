import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { JobCard } from "../components/JobCard";
import { JOBS } from "../queries";

export const ViewJobsPage = () => {
  // query all jobs
  // map through data to render JobCards

  const { data, loading, error } = useQuery(JOBS);
  console.log(data);

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <Typography>Open Jobs</Typography>

      {data &&
        data.jobs.map((job) => (
          <JobCard
            title={job.title}
            description={job.description}
            company={job.company}
            url={job.url}
            salary={job.salary}
            date={job.closingDate}
          />
        ))}
    </>
  );
};
