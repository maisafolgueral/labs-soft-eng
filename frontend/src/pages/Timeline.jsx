import Grid from "@mui/material/Grid";
import AddPost from '@/components/AddPost';


export default function Timeline() {
  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <AddPost/>
        </Grid>
        <Grid item xs={4} sx={{ paddingLeft: "27px" }}>

        </Grid>
      </Grid>
    </>
  );
}
