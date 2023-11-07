import * as React from "react";
import * as yup from "yup";
import base64 from "react-native-base64";
import Cookies from "universal-cookie";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import { socialAPI } from "@/globals";
import { Main } from "@/components/Main";
import PasswordInput from "@/components/PasswordInput";
import isologo from "@/assets/branding/hola-isologo-coloful.svg";
import bannerConversation from "@/assets/images/banner-conversation.png";


const validationSchema = yup.object({
  email: yup
    .string("Preencha o seu e-mail")
    .email("E-mail inválido")
    .required("E-mail é obrigatório"),
  password: yup
    .string("Preencha a sua senha")
    .required("Senha é obrigatório"),
});

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  let displayError = (message) => {
    setAlert(true);
    setAlertMessage(message);
  }

  let handleSubmit = async (values) => {
    setLoading(true);
    try {
      let res = await fetch(socialAPI+"/auth", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${base64.encode(`${values.email}:${values.password}`)}`
        },
      });
      let resJson = await res.json();
      
      if (res.status === 200) {
        const cookies = new Cookies();
        cookies.set(
          "utoken", 
          resJson.token, 
          { 
            path: "/",
            expires: new Date(resJson.exp)
          }
        );
        navigate("/h/timeline");
      } else if (res.status === 401) {
        displayError("E-mail ou senha inválida");
      } else {
        displayError("Ocorreu um erro em nosso servidor");
      }
    } catch (err) {
      displayError("Ocorreu um erro ao enviar seus dados");
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (data) => {
      handleSubmit(data);
    },
  });

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
          onSubmit={formik.handleSubmit}
        >
          <Stack direction="column" spacing={2}>
            {alert &&
            <Alert 
              variant="filled" 
              severity="error"
            >
              { alertMessage }
            </Alert>
            }
            <TextField 
              fullWidth  
              name="email"
              label="E-mail" 
              variant="outlined"
              size="small"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <PasswordInput
              fullWidth  
              name="password"
              label="Senha" 
              variant="outlined"
              size="small"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <LoadingButton 
              fullWidth 
              variant="contained"
              type="submit"
              sx={{
                fontSize: "16px"
              }}
              loading={loading}
              disabled={!formik.dirty}
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