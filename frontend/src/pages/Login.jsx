import * as React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Main } from "@/components/Main";
import isologo from "@/assets/branding/hola-isologo-coloful.svg";
import bannerConversation from "@/assets/images/banner-conversation.png";


export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    navigate("/h/timeline");
  }

  return (
    <Main>
      <Box
        sx={{ 
          width: "480px",
          backgroundColor: "#fff",
          padding: "60px",
          boxSizing: "border-box"
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
              loading={loading}
              disabled
            >
              Acessar
            </LoadingButton>
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: "480px"
        }}
      >
        <Box
          component="img"
          sx={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
          }}
          src={bannerConversation}
        />
      </Box>
    </Main>
  );
}