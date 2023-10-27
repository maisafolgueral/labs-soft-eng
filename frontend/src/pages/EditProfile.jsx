import * as React from "react";
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { 
    PencilFill
} from "react-bootstrap-icons";
import "dayjs/locale/pt";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function EditProfile(props) {
  const [loadingPersonal, setLoadingPersonal] = React.useState(false);
  const [loadingSecurity, setLoadingSecurity] = React.useState(false);

  const handlePersonal= () => {
    setLoadingPersonal(true);
  };

  const handleSecurity= () => {
    setLoadingSecurity(true);
  };

  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);

  const handleClickShowCurrentPassword = () => setShowCurrentPassword((show) => !show);

  const [showNewPassword, setShowNewPassword] = React.useState(false);

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Box
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "#fff",
                border: "1px solid #c4c4c4",
                borderRadius: "5px",
                padding: "26px"
            }}
        >

            <Grid container>
                <Grid item xs={12}>
                    <Stack direction="row" spacing="14px" alignItems="center">
                        <PencilFill color="#777777" size={32}/>
                        <Typography
                            variant="h4"
                            fontSize="28px"
                            color= "#777777"
                        >
                            Editar perfil
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>

            <Box 
                sx={{ 
                    borderBottom: 1, 
                    borderColor: 'divider',
                    marginTop: "53px"
                }}
            >
                <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
                    <Tab label="Pessoal" {...a11yProps(0)} />
                    <Tab label="Segurança" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
                <Grid container alignItems="center">
                    <Grid item xs={6}>
                        <Stack spacing="28px">
                            <TextField 
                                id="name" 
                                label="Nome" 
                                variant="outlined" 
                                defaultValue="Marie"
                                size="small"
                            />

                            <TextField 
                                id="lastname" 
                                label="Sobrenome" 
                                variant="outlined" 
                                defaultValue="Canon"
                                size="small"
                            />

                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt">
                                <DatePicker 
                                    id="birthday" 
                                    label="Aniversário" 
                                    variant="outlined" 
                                    format="DD/MM/YYYY"
                                    slotProps={{ textField: { size: 'small' } }}
                                    defaultValue={dayjs('2022-04-25')}
                                />
                            </LocalizationProvider>

                            <FormControl size="small" disabled defaultValue="F">
                                <InputLabel>Sexo</InputLabel>
                                <Select
                                    value="F"
                                    label="Sexo"
                                >
                                    <MenuItem value="M">Masculino</MenuItem>
                                    <MenuItem value="F">Feminino</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField 
                                id="email" 
                                label="E-mail" 
                                variant="outlined" 
                                defaultValue="marie.canon@gmail.com"
                                size="small"
                            />

                            <Stack direction="row" spacing={2} justifyContent="right">
                                <LoadingButton 
                                    variant="contained"
                                    size="medium"
                                    spacing={2}
                                    onClick={handlePersonal}
                                    loading={loadingPersonal}
                                >
                                    Atualizar
                                </LoadingButton>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <Grid container alignItems="center">
                    <Grid item xs={6}>
                        <Stack spacing="28px">
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Senha atual</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    endAdornment={
                                    <InputAdornment position="end" >
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowCurrentPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Senha atual"
                                    defaultValue="senhaatual" 
                                    size="small"
                                />
                            </FormControl>

                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Nova senha</InputLabel>
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
                                    label="Nova senha"
                                    defaultValue="novasenha" 
                                    size="small"
                                />
                            </FormControl>

                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Repita a nova senha</InputLabel>
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
                                    label="Repita a nova senha"
                                    defaultValue="novasenha" 
                                    size="small"
                                />
                            </FormControl>

                            <Stack direction="row" spacing={2} justifyContent="right">
                                <LoadingButton 
                                    variant="contained"
                                    size="medium"
                                    spacing={2}
                                    onClick={handleSecurity}
                                    loading={loadingSecurity}
                                >
                                    Atualizar
                                </LoadingButton>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </CustomTabPanel>

        </Box>
    </>
  );
}