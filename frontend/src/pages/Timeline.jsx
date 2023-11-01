import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import AddPost from "@/components/AddPost";
import Post from "@/components/Post";


export default function Timeline() {
  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Stack spacing="28px">
            <AddPost/>
            <Post/>
          </Stack>
        </Grid>
        <Grid item xs={4} sx={{ paddingLeft: "27px" }}>

        </Grid>
      </Grid>
    </>
  );
}
