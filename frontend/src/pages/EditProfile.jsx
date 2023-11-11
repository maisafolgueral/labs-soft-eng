import * as React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Alert from "@mui/material/Alert";
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
import PasswordInput from "@/components/PasswordInput";


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
            .required("E-mail é obrigatório")
    });

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

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
    }

    const formik = useFormik({
        initialValues: {
          name: "Marie",
          surname: "Canon",
          birthday: "",
          gender: "F",
          email: "marie.canon@gmail.com",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          handleSubmit(values);
        },
      });

    return (
        <CustomTabPanel value={currentTab} index={0}>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >
                <Stack spacing="28px">
                    {alert &&
                    <Alert 
                        variant="filled" 
                        severity="error"
                    >
                        { alertMessage }
                    </Alert>
                    }
                    <TextField 
                        id="name" 
                        variant="outlined" 
                        size="small"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />

                    <TextField 
                        id="surname" 
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
                                id="birthday"
                                name="birthday"
                                variant="outlined" 
                                format="DD/MM/YYYY"
                                onChange={handleBirthday}
                                defaultValue={dayjs('2022-04-25')}
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
                        id="email" 
                        variant="outlined" 
                        size="small"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
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
                            onClick={handleSubmit}
                            disabled={!formik.dirty}
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
    const validationSchema = yup.object({
        password: yup.string()
        .min(6, "Senha deve conter no mínimo 6 caracteres")
        .max(12, "Senha deve conter no máximo 12 caracteres")
        .required("Senha é obrigatório"),
        newpassword: yup.string()
          .min(6, "Senha deve conter no mínimo 6 caracteres")
          .max(12, "Senha deve conter no máximo 12 caracteres")
          .required("Senha é obrigatório"),
        passwordConfirmation: yup.string()
          .oneOf([yup.ref('newpassword')], 'As senhas devem ser iguais')
          .required("Confirmar a senha é obrigatório"),
    });

    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
   
    let displayError = (message) => {
      setAlert(true);
      setAlertMessage(message);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
    }

    const formik = useFormik({
        initialValues: {
          password: "senhaatual",
          newpassword: "novasenha",
          passwordConfirmation: "novasenha",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          handleSubmit(values);
        },
    });

    return (
        <CustomTabPanel value={currentTab} index={1}>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >
                <Stack spacing="28px">
                    {alert &&
                    <Alert 
                        variant="filled" 
                        severity="error"
                    >
                        { alertMessage }
                    </Alert>
                    }
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
                            name="newpassword"
                            label="Senha" 
                            variant="outlined"
                            size="small"
                            value={formik.values.newpassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
                            helperText={formik.touched.newpassword && formik.errors.newpassword}
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
                            onClick={handleSubmit}
                            disabled={!formik.dirty}
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