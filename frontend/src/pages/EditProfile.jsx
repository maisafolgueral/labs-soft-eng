import * as React from "react";
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import dayjs from 'dayjs';
import "dayjs/locale/pt";
import { Icon } from "@/components/Icon";


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

function Header() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Stack direction="row" spacing="14px" alignItems="center">
                <Icon iconName="PencilFill" color="#777777" size={32}/>
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
    );
}

function ControlTabs({ currentTab, handleChangeTab }) {
    return (
        <Box 
            sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                marginTop: "53px"
            }}
        >
            <Tabs 
                value={currentTab} 
                onChange={handleChangeTab} 
                aria-label="basic tabs example"
            >
                <Tab label="Pessoal" {...a11yProps(0)} />
                <Tab label="Segurança" {...a11yProps(1)} />
            </Tabs>
        </Box>
    );
}

function PersonalTab({ currentTab }) {
    const [loading, setLoading] = React.useState(false);

    const submitHandler = () => {
        setLoading(true);
    };

    return (
        <CustomTabPanel value={currentTab} index={0}>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={submitHandler}
            >
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

                    <LocalizationProvider 
                        dateAdapter={AdapterDayjs} 
                        adapterLocale="pt"
                    >
                        <DatePicker 
                            id="birthday" 
                            label="Aniversário" 
                            variant="outlined" 
                            format="DD/MM/YYYY"
                            slotProps={{ 
                                textField: { size: 'small' } 
                            }}
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

                    <Stack 
                        direction="row"
                        spacing={2}
                        justifyContent="right"
                    >
                        <LoadingButton 
                            variant="contained"
                            size="medium"
                            spacing={2}
                            loading={loading}
                            disabled
                        >
                            Atualizar
                        </LoadingButton>
                    </Stack>
                </Stack>
            </Box>
        </CustomTabPanel>
    );
}

function SecurityTab({ currentTab }) {
    const [loading, setLoading] = React.useState(false);

    const [passwords, setPasswords] = React.useState({
        password1: 'senhaatual',
        password2: 'novasenha',
        password3: 'novasenha',
        password1Visible: false,
        password2Visible: false,
        password3Visible: false,
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
  
    const submitHandler = () => {
        setLoading(true);
    };

    return (
        <CustomTabPanel value={currentTab} index={1}> 
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={submitHandler}
            >
                <Stack spacing="28px">
                    <FormControl variant="outlined" size="small">
                        <InputLabel htmlFor="outlined-adornment-password">Senha atual</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            label="Senha atual"
                            type={passwords.password1Visible ? 'text' : 'password'}
                            value={passwords.password1}
                            onChange={handlePasswordChange('password1')}
                            endAdornment={
                                <InputAdornment position="end" >
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={togglePasswordVisibility('password1Visible')}
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
                        <InputLabel htmlFor="outlined-adornment-password">Nova senha</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            label="Nova senha"
                            type={passwords.password2Visible ? 'text' : 'password'}
                            value={passwords.password2}
                            onChange={handlePasswordChange('password2')}
                            endAdornment={
                                <InputAdornment position="end" >
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={togglePasswordVisibility('password2Visible')}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {passwords.password2Visible ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <FormControl variant="outlined" size="small">
                        <InputLabel htmlFor="outlined-adornment-password">Repita a nova senha</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            label="Repita a nova senha"
                            type={passwords.password3Visible ? 'text' : 'password'}
                            value={passwords.password3}
                            onChange={handlePasswordChange('password3')}
                            endAdornment={
                                <InputAdornment position="end" >
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={togglePasswordVisibility('password3Visible')}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {passwords.password3Visible ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <Stack 
                        direction="row" 
                        spacing={2} 
                        justifyContent="right"
                    >
                        <LoadingButton 
                            variant="contained"
                            size="medium"
                            spacing={2}
                            loading={loading}
                            disabled
                        >
                            Atualizar
                        </LoadingButton>
                    </Stack>
                </Stack>
            </Box>
        </CustomTabPanel>
    );
}

export default function EditProfile() {
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
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
            <Header/>
            <ControlTabs 
                currentTab={currentTab}
                handleChangeTab={handleChangeTab}
            />
            <Grid container alignItems="center">
                <Grid item xs={6}>
                    <PersonalTab currentTab={currentTab}/>
                    <SecurityTab currentTab={currentTab}/>
                </Grid>
            </Grid>
        </Box>
    </>
  );
}