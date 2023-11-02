import * as React from "react";
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


function Form() {
  const navigate = useNavigate();
  const [alert, setAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [passwords, setPasswords] = React.useState({
    password1: "",
    password2: "",
    password1Visible: false,
    password2Visible: false,
  });

  const handleBirthday = (value) => {
    const date = new Date(value); 
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    setBirthday(formattedDate);
  };
  
  const handlePasswordChange = (field) => (event) => {
    setPasswords({
      ...passwords,
      [field]: event.target.value,
    });
    // Password verify
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

  let handleSubmit = async (e) => {
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
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
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
          label="Nome" 
          variant="outlined"
          size="small"
          onChange={(e) => setName(e.target.value)}
        />

        <TextField 
          fullWidth  
          label="Sobrenome" 
          variant="outlined"
          size="small"
          onChange={(e) => setSurname(e.target.value)}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt">
            <DatePicker  
                label="Aniversário" 
                variant="outlined" 
                format="DD/MM/YYYY"
                slotProps={{ textField: { size: "small" } }}
                onChange={handleBirthday}
            />
        </LocalizationProvider>

        <TextField
          value={gender}
          fullWidth 
          select 
          label="Sexo" 
          variant="outlined"
          size="small"
          onChange={(e) => setGender(e.target.value)}
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
          label="E-mail" 
          variant="outlined"
          size="small"
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
            <OutlinedInput
                label="Senha"
                type={passwords.password1Visible ? "text" : "password"}
                value={passwords.password1}
                onChange={handlePasswordChange("password1")}
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
                value={passwords.password2}
                onChange={handlePasswordChange("password2")}
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