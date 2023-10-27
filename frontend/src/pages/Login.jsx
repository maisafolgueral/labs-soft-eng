import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoadingButton from '@mui/lab/LoadingButton';
import { Main } from "@/components/Styled";
import isologo from "@/assets/branding/hola-isologo-coloful.svg";
import bannerConversation from "@/assets/images/banner-conversation.png";


export default function Login() {
  const [loading, setLoading] = React.useState(false);

  const handleLogin = () => {
      setLoading(true);
  };

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    navigate("/h/timeline");
  }

  return (
    <Main>
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
            backgroundColor: "#fff",
            padding: "60px"
          }}
        >
          <img 
            src={isologo}
            style={{
              width: 164.4
            }}
          />
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontSize: "28px",
              paddingTop: "125px",
              paddingBottom: "50px"
            }}
          >
            Acessar conta
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={submitHandler}
          >
            <Stack direction="column" spacing={2}>
              <TextField 
                fullWidth  
                label="E-mail" 
                variant="outlined"
                size="small"
              />
              <TextField 
                fullWidth  
                label="Senha" 
                variant="outlined"
                size="small"
                type="password"
              />
              <LoadingButton 
                fullWidth 
                variant="contained"
                type="submit"
                sx={{
                  fontSize: "16px"
                }}
                onClick={handleLogin}
                loading={loading}
                disabled
              >
                Acessar
              </LoadingButton>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box
            component="img"
            sx={{
              width: "100%",
              height: "100vh",
              objectFit: "cover"
            }}
            src={bannerConversation}
          />
        </Grid>
      </Grid>
    </Main>
  );
}