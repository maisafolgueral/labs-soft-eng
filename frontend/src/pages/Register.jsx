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
import LoadingButton from "@mui/lab/LoadingButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "dayjs/locale/pt";
import { Main } from "@/components/Main";
import isologo from "@/assets/branding/hola-isologo-coloful.svg";
import bannerConversation from "@/assets/images/banner-conversation.png";


function Form() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [gender, setGender] = React.useState("");
  
  const [passwords, setPasswords] = React.useState({
    password1: "",
    password2: "",
    password1Visible: false,
    password2Visible: false,
  });

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
  
  const submitHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    navigate("/h/timeline");
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={submitHandler}
    >
      <Stack direction="column" spacing={2}>
        <TextField 
          fullWidth  
          label="Nome" 
          variant="outlined"
          size="small"
        />

        <TextField 
          fullWidth  
          label="Sobrenome" 
          variant="outlined"
          size="small"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt">
            <DatePicker 
                id="birthday" 
                label="Aniversário" 
                variant="outlined" 
                format="DD/MM/YYYY"
                slotProps={{ textField: { size: "small" } }}
            />
        </LocalizationProvider>

        <TextField
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          fullWidth 
          select 
          label="Sexo" 
          variant="outlined"
          size="small"
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
        />

        <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
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
                id="outlined-adornment-password"
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
          disabled
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