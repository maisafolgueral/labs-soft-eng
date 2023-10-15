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
        padding: "17px 27px"
      }}
    >
      <Grid container>
        <Grid item xs={11}>
          <Link href="/h/timeline">
            <img 
              src={isologo}
              style={{
                height: "34px"
              }}
            />
          </Link>
        </Grid>
        <Grid item xs={1}>
          <Stack 
            spacing={1} 
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Avatar 
              src="/broken-image.jpg" 
              sx={{ 
                width: 34, 
                height: 34 
              }}
            />
            <Typography 
              component="span"
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