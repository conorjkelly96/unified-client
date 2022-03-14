import Typography from "@mui/material/Typography";

export const ViewCreatedJobs = () => {
  // query jobs by staff id
  // render JobCards with delete button & edit button
  // onDelete delete the job and re-render list
  // onEdit button direct to edit-job path/page
  // error handling

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        component="h1"
        align="center"
        sx={{ paddingTop: 2, paddingBottom: 2 }}
      >
        Your Job Listings
      </Typography>
    </>
  );
};
