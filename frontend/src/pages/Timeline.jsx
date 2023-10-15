import Grid from "@mui/material/Grid";
import AddPost from '@/components/AddPost';

export default function Timeline() {
  return (
    <>
      <Grid container>
        <Grid item xs={7}>
          <AddPost/>
        </Grid>
        <Grid item xs={5}>

        </Grid>
      </Grid>
    </>
  );
}