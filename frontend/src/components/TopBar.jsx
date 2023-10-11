import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import isologo from "@/assets/branding/hola-isologo-coloful.svg";

export default function TopBar() {
  return (
    <Box
      sx={{
        height: "68px",
        top: 0,
        right: 0,
        left: 0,
        position: "fixed",
        backgroundColor: "#fff",
        borderBottom: "1px solid #c4c4c4",
        padding: "14px 27px"
      }}
    >
      <Grid container>
        <Grid item xs={11}>
          <Link href="/h/timeline">
            <img 
              src={isologo}
              style={{
                width: "122.73px",
                height: "34.6px"
              }}
            />
          </Link>
        </Grid>
        <Grid item xs={1}>
          <Stack 
            spacing={{ xs: 1, sm: 1 }} 
            direction="row"
          >
            <Avatar src="/broken-image.jpg" sx={{ width: 32, height: 32 }}/>
            <Typography 
              component="span"
              paddingTop='3px' 
              fontSize={18} 
              color="#404040"
            >
              Marie
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    
    </Box>
  );
}