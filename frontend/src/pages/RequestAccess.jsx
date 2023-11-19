import * as React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { urlApis } from "@/globals";
import { Main } from "@/components/Main";
import isologo from "@/assets/branding/hola-isologo-coloful.svg";
import bannerConversation from "@/assets/images/banner-conversation.png";


const validationSchema = yup.object({
  email: yup.string()
    .email("E-mail inválido")
    .required("E-mail é obrigatório"),
  token: yup.string()
});

export default function RequestAccess() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  
  let displayMessage = (type, message) => {
    setAlert(true);
    setAlertType(type);
    setAlertMessage(message);
  }

  let sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  let handleSubmit = async (values) => {
    setLoading(true);
    try {
      let res = await fetch(urlApis["admission"]+"/admissions", {
          method: "POST",
          mode: "cors",
          headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: values.email,
            token: values.token,
            status: 0
        }),
      });

      let result = await res.json();

      if (res.status === 200) {
        let message = "Solicitação";
        if(result.status === 1) {
          message += " aceita, aguarde...";
        } else {
          message += " enviada, entraremos em contato com você em breve!";
        }

        displayMessage("success", message);

        if(result.status === 1) {
          await sleep(1000);
          navigate("/register?code="+result.code);
        }
      } else if (res.status === 406) {
        displayMessage("error", "Desculpe, sua solicitação não foi aceita!");
      } else if (res.status === 409) {
        displayMessage("error", "Este e-mail já foi utilizado para solicitar acesso");
      } else {
        displayMessage("error", "Ocorreu um erro em nosso servidor");
      }
    } catch (err) {
        displayMessage("error", "Ocorreu um erro ao enviar seus dados");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
      initialValues: {
        email: "",
        token: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
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
          Solicitar Acesso
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
              severity={alertType}
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
            <TextField 
              fullWidth  
              name="token"
              label="Código de acesso" 
              variant="outlined"
              size="small"
              value={formik.values.token}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.token && Boolean(formik.errors.token)}
              helperText={formik.touched.token && formik.errors.token}
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
              Enviar
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