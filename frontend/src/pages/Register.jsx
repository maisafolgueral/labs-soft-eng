import * as React from "react";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Alert from '@mui/material/Alert';
import LoadingButton from "@mui/lab/LoadingButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "dayjs/locale/pt";
import { Main } from "@/components/Main";
import { socialAPI } from '@/globals';
import isologo from "@/assets/branding/hola-isologo-coloful.svg";
import bannerConversation from "@/assets/images/banner-conversation.png";

const validationSchema = yup.object({
  name: yup
    .string('Preencha o seu nome')
    .required('Nome é obrigatório'),
  surname: yup
    .string('Preencha o seu sobrenome')
    .required('Sobrenome é obrigatório'),
  birthday: yup
    .string('Preencha o seu aniversário')
    .required('Aniversário é obrigatório'),
  gender: yup
    .string('Selecione o seu sexo')
    .required('Sexo é obrigatório')
    .oneOf(['M', 'F']),
  email: yup
    .string('Preencha o seu email')
    .email('Email invalido')
    .required('Email é obrigatório'),
  password: yup
    .string('Preencha a sua senha')
    .min(6, 'Senha deve conter no mínimo 6 caracteres')
    .max(12, 'Senha deve conter no máximo 12 caracteres')
    .required('Senha é obrigatório'),
});

function Form() {
  //const navigate = useNavigate();
  const [alert, setAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  /*const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [email, setEmail] = React.useState("");*/
  const [passwords, setPasswords] = React.useState({
    password1: "",
    password2: "",
    password1Visible: false,
    password2Visible: false,
  });

  /*const handleBirthday = (value) => {
    const date = new Date(value); 
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    setBirthday(formattedDate);
  };*/
  
  const handlePasswordChange = (field) => (event) => {
    setPasswords({
      ...passwords,
      [field]: event.target.value,
    });
  };

  const togglePasswordVisibility = (field) => () => {
    setPasswords({
      ...passwords,
      [field]: !passwords[field],
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      birthday: '',
      gender: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  /*let handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await fetch(socialAPI+"/users", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          surname: surname,
          birthday: birthday,
          gender: gender,
          email: email,
          password: passwords["password1"],
          is_bot: false,
          is_active: true
        }),
      });

      let resJson = await res.json();
      console.log(resJson)

      if (res.status === 200) {
        navigate("/h/timeline");
      } else if (res.status === 400) {
        setAlert(true);
        setAlertMessage(resJson.name);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };*/

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <Stack direction="column" spacing={2}>

        {/*alert &&
        <Alert 
          variant="filled" 
          severity="error"
        >
          { alertMessage }
        </Alert>*/
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
            slotProps={{
              textField: {
                  size: "small",
                  selected: formik.values.birthday,
                  error: formik.touched.birthday && Boolean(formik.errors.birthday),
                  helperText: formik.touched.birthday && formik.errors.birthday,
                  onBlur: formik.handleBlur,
                  onChange: formik.handleChange
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

        <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
            <OutlinedInput
                label="Senha"
                type={passwords.password1Visible ? "text" : "password"}
                value={passwords.password1 + formik.values.password}
                onChange={(e) => {
                  handlePasswordChange("password1");
                  formik.handleChange(e)}}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                endAdornment={
                <InputAdornment position="end" >
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility("password1Visible")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      >
                      {passwords.password1Visible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
                }
            />
        </FormControl>

        <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password">Repita a senha</InputLabel>
            <OutlinedInput
                label="Repita a senha"
                type={passwords.password2Visible ? "text" : "password"}
                value={passwords.password2 + formik.values.password}
                onChange={(e) => {
                  handlePasswordChange("password2");
                  formik.handleChange(e)}}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                endAdornment={
                <InputAdornment position="end" >
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility("password2Visible")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      >
                      {passwords.password2Visible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
                }
            />
        </FormControl>

        <LoadingButton 
          fullWidth 
          variant="contained"
          type="submit"
          sx={{
            fontSize: "16px"
          }}
          loading={loading}
          //disabled
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