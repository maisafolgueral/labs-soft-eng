import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Post from '@/components/Post';
import InfoBox from "@/components/InfoBox";


export default function Profile() {
  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Stack spacing="28px">
            {Array.from(Array(10)).map((_, index) => (
              <Post/>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={4} sx={{ paddingLeft: "27px" }}>
          <InfoBox/>
        </Grid>
      </Grid>
    </>
  );
}