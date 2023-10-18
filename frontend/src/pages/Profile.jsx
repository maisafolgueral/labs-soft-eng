import Grid from "@mui/material/Grid";
import InfoBox from "@/components/InfoBox";


export default function Profile() {
  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          
        </Grid>
        <Grid item xs={4} sx={{ paddingLeft: "27px" }}>
          <InfoBox/>
        </Grid>
      </Grid>
    </>
  );
}