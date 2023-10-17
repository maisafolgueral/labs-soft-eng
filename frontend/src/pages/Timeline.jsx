import Grid from "@mui/material/Grid";
import AddPost from '@/components/AddPost';
import InfoBox from "@/components/InfoBox";
import Form from "@/components/Form";

export default function Timeline() {
  return (
    <>
      <Grid container>
        <Grid item xs={7}>
          <AddPost/>
        </Grid>
        <Grid item xs={5} sx={{ paddingLeft: "27px" }}>
          <InfoBox/>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Form/>
        </Grid>
      </Grid>
    </>
  );
}