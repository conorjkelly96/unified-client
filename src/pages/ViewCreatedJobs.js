import { useQuery } from "@apollo/client";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { JobCard } from "../components/JobCard";
import { Spinner } from "../components/Spinner";
import { GET_STAFF_JOBS } from "../queries";

export const ViewCreatedJobs = () => {
  const { data, loading, error } = useQuery(GET_STAFF_JOBS);

  const navigate = useNavigate();

  // render JobCards with delete button & edit button
  // onDelete delete the job and re-render list
  // onEdit button direct to edit-job path/page
  // error handling
  if (error) {
    //   TODO: navigate to 404 page if error
    // navigate("/*", { replace: true });
  }

  const styles = {
    header: {
      paddingTop: 2,
      paddingBottom: 2,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      maxWidth: 750,
      margin: "auto",
    },
  };

  console.log(data);
  return (
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
      {loading && <Spinner />}
      <Box sx={styles.container}>
        {data &&
          data.getStaffJobs.map((staffJob) => (
            <JobCard
              title={staffJob.title}
              description={staffJob.description}
              company={staffJob.company}
              url={staffJob.url}
              salary={staffJob.salary}
              date={new Date(staffJob.closingDate)}
              key={staffJob.id}
            />
          ))}
      </Box>
    </>
  );
};
