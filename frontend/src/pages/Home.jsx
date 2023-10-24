import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Main } from "@/components/Styled";
import { Stack } from "@mui/material";
import isologo from "@/assets/branding/hola-isologo-coloful.svg";
import bannerHome from "@/assets/images/banner-home.png";


export default function Home() {  
  return (
    <Main
      sx={{
        backgroundColor: "#F7F7F7",
        padding: "60px 94px"
      }}
    >

      <Grid container>
        <Grid item container alignItems="center" xs={6}>
          <img 
            src={isologo}
            style={{
              height: 34
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Stack 
            spacing="30px"
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button 
              variant="text"
              size="large"
              href="/Login"
              style={{
                color: "#C4C4C4",
                fontSize: "16px"
              }}
            >
              Entrar
            </Button>
            <Button 
              variant="contained"
              size="large"
              href="/request-access"
              style={{
                fontSize: "16px"
              }}
            >
              Solicitar Acesso
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Grid container sx={{ height: "100%" }} alignItems="center">
        <Grid item xs={6}>
          <Stack
            spacing="20px"
          >
            <Typography
              component="h1"
              sx={{
                fontSize: "57px",
                lineHeight: "1.1",
                fontWeight: "900",
                color: "#212121"
              }}
            >
              Tudo começa <br/> com um <span style={{ color: "#1976D2" }}>olá</span>
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: "18px",
                color: "#000",
                lineHeight: "1.2"
              }}
            >
              Venha se socializar com pessoas que <br /> gostam dos mesmos assuntos que você
            </Typography>
          </Stack>
        </Grid>
        <Grid container item xs={6} justifyContent="flex-end">
          <Box
            component="img"
            sx={{
              width: "100%",
              objectFit: "contain",
              backgroundColor: "#F7F7F7",
            }}
            src={bannerHome}
          />
        </Grid>
      </Grid>

    </Main>
  );
}