import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Main } from "@/components/Styled";
import isologo from "@/assets/branding/hola-isologo-coloful.svg";
import bannerHome from "@/assets/images/banner-home.png";
import footerHome from "@/assets/images/footer-home.png";
import { Stack } from "@mui/material";

export default function Login() {  
  return (
    <Main
      sx={{
        backgroundColor: "#F7F7F7",
      }}
    >

      <Grid 
        container  
        spacing={2}
      >
        <Grid
          container  
          item
          spacing={2}
          xs={9}
        >
          <img 
            src={isologo}
            style={{
              height: 100,
              paddingLeft: "60px",
              paddingTop: "60px"
            }}
          />
        </Grid>

        <Grid
          container  
          item
          spacing={2}
          xs={3}
        >
          <Stack 
              direction="row" 
              spacing={2}
              style={{
                height: 100,
                paddingTop: "60px",
                paddingLeft: "60px"
              }}
            >
              <Link href="/Login">
                <Button 
                  variant="text"
                  style={{
                    color: "#C4C4C4",
                  }}
                >
                  Entrar
                </Button>
              </Link>

              <Link href="/request-access">
                <Button 
                  variant="outlined"
                  style={{ 
                    color: "#1976D2",
                  }}
                  href="/request-access"
                >
                  Solicitar Acesso
                </Button>
              </Link>
            </Stack>
        </Grid>
      </Grid>

      <Grid 
        container  
        sx={{ 
          minHeight: "100%"
        }}
      >
        <Grid 
          item 
          xs={4}
          sx={{ 
            backgroundColor: "#F7F7F7",
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{
              paddingLeft: "60px",
              fontSize: "50px",
              fontWeight: "bold",
              paddingTop: "150px",
              color: "#212121",
              textAlign: "left",
            }}
          >
            Tudo começa <br/> com um <span style={{ color: "#1976D2" }}>olá</span>
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              paddingLeft: "60px",
              fontSize: "20px",
              color: "#212121",
              textAlign: "left",
            }}
          >
            Venha se socializar com pessoas que <br /> gostam dos mesmos assuntos que você
          </Typography>
          <img 
            src={footerHome}
            style={{
              width: 412.1,
              height: 166.39,
              padding: 0,
              margin: 0,
              bottom: 0,
              position: "fixed",
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <Box
            component="img"
            sx={{
              width: "85%",
              height: "85vh",
              paddingBottom: "100px",
              paddingLeft: "180px",
              paddingTop: "50px",
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