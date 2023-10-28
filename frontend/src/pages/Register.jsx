import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Main } from "@/components/Styled";
import isologo from "@/assets/branding/hola-isologo-coloful.svg";
import bannerConversation from "@/assets/images/banner-conversation.png";
import "dayjs/locale/pt";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';


export default function Register() {
  const [showNewPassword, setShowNewPassword] = React.useState(false);

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const [loading, setLoading] = React.useState(false);

  const handleRegister= () => {
      setLoading(true);
  };

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
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
          Criar Conta
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
                    slotProps={{ textField: { size: 'small' } }}
                />
            </LocalizationProvider>
            <TextField
              // value={value}
              // onChange={(e) => setValue(e.target.value)}
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
                    type={showNewPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end" >
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Senha"
                />
            </FormControl>

            <FormControl variant="outlined" size="small">
                <InputLabel htmlFor="outlined-adornment-password">Repita a senha</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end" >
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Repita a senha"
                />
            </FormControl>
            <LoadingButton 
              fullWidth 
              variant="contained"
              type="submit"
              sx={{
                fontSize: "16px"
              }}
              onClick={handleRegister}
              loading={loading}
              disabled
            >
              Criar conta
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