import * as React from 'react';
import InfoBox from "@/components/InfoBox";
import Grid from "@mui/material/Grid";

export default function Topics() {
  return (
    <>
      <Grid container spacing="28px" rowSpacing="28px" columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(20)).map((_, index) => (
      <Grid item xs={2} sm={4} md={4} key={index}>
        <InfoBox/>
      </Grid>
        ))}
      </Grid>
    </>
  );
}