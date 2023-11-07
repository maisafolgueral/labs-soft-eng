import * as React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/pt";
import { socialAPI } from "@/globals";
import { Main } from "@/components/Main";
import PasswordInput from "@/components/PasswordInput";
import isologo from "@/assets/branding/hola-isologo-coloful.svg";
import bannerConversation from "@/assets/images/banner-conversation.png";

const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const currentDate = new Date();
  
  const yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();
  const monthsDiff = currentDate.getMonth() - birthDate.getMonth();
  const daysDiff = currentDate.getDate() - birthDate.getDate();
  
  // Adjust the age if the birthdate for the current year hasn't occurred yet
  if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
    return yearsDiff - 1;
  } else {
    return yearsDiff;
  }
}

const validationSchema = yup.object({
  name: yup.string()
    .required("Nome é obrigatório"),
  surname: yup.string()
    .required("Sobrenome é obrigatório"),
  birthday: yup.string()
    .required("Aniversário é obrigatório")
    .test(
      "age-range",
      "Idade não permitida",
      (value) => {
        let age = calculateAge(value);
        return age >= 14 && age <= 30;
      }
    ),
  gender: yup.string()
    .oneOf(["M", "F"])
    .required("Sexo é obrigatório"),
  email: yup.string()
    .email("E-mail inválido")
    .required("E-mail é obrigatório"),
  password: yup.string()
    .min(6, "Senha deve conter no mínimo 6 caracteres")
    .max(12, "Senha deve conter no máximo 12 caracteres")
    .required("Senha é obrigatório"),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
    .required("Confirmar a senha é obrigatório"),
});

function Form() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  const handleBirthday = (value) => {
    let outputDate = null;
    
    if(value) {
      const date = new Date(value); 
      let yyyy = date.getFullYear();
      let mm = String(date.getMonth() + 1).padStart(2, "0");
      let dd = String(date.getDate()).padStart(2, "0");
      outputDate = `${yyyy}-${mm}-${dd}`;
    }
    
    formik.setFieldValue('birthday', outputDate);
  };

  let displayError = (message) => {
    setAlert(true);
    setAlertMessage(message);
  }

  let handleSubmit = async (values) => {
    setLoading(true);
    try {
      let res = await fetch(socialAPI+"/users", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          surname: values.surname,
          birthday: values.birthday,
          gender: values.gender,
          email: values.email,
          password: values.password,
          is_bot: false,
          is_active: true
        }),
      });
      
      if (res.status === 200) {
        navigate("/login");
      } else if (res.status === 409) {
        displayError("Este e-mail já está em uso");
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
      name: "",
      surname: "",
      birthday: "",
      gender: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
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
          name="name"
          label="Nome" 
          variant="outlined"
          size="small"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField 
          fullWidth  
          name="surname"
          label="Sobrenome" 
          variant="outlined"
          size="small"
          value={formik.values.surname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.surname && Boolean(formik.errors.surname)}
          helperText={formik.touched.surname && formik.errors.surname}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt">
          <DatePicker  
            name="birthday"
            label="Aniversário" 
            variant="outlined" 
            format="DD/MM/YYYY"
            onChange={handleBirthday}
            slotProps={{
              textField: {
                  size: "small",
                  selected: formik.values.birthday,
                  error: formik.touched.birthday && Boolean(formik.errors.birthday),
                  helperText: formik.touched.birthday && formik.errors.birthday,
                  onBlur: formik.handleBlur,
              }
            }}
          />
        </LocalizationProvider>

        <TextField
          fullWidth 
          select 
          name="gender"
          label="Sexo" 
          variant="outlined"
          size="small"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.gender && Boolean(formik.errors.gender)}
          helperText={formik.touched.gender && formik.errors.gender}
        >
          <MenuItem key={1} value="M">
            Masculino
          </MenuItem>
          <MenuItem key={2} value="F">
            Feminino
          </MenuItem>
        </TextField>

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
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <PasswordInput
          fullWidth  
          name="passwordConfirmation"
          label="Confirmar senha" 
          variant="outlined"
          size="small"
          type="password"
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
          helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
        />

        <LoadingButton 
          fullWidth 
          variant="contained"
          type="submit"
          sx={{
            fontSize: "16px"
          }}
          loading={loading}
          //disabled={!formik.dirty}
        >
          Criar conta
        </LoadingButton>
      </Stack>
    </Box>
  );
}

export default function Register() {
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
          Criar Conta
        </Typography>
        <Form/>
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