import * as React from "react";
import * as yup from "yup";
import Cookies from "universal-cookie";
import Skeleton from '@mui/material/Skeleton';
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
import { urlApis } from "@/globals";
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
    const [loadingUser, setLoadingUser] = React.useState(true);
    const [alert, setAlert] = React.useState(false);
    const [alertType, setAlertType] = React.useState("");
    const [alertMessage, setAlertMessage] = React.useState("");

    const formik = useFormik({
        initialValues: {
          name: "",
          surname: "",
          birthday: "",
          gender: "",
          email: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          handleSubmit(values);
        },
      });

    React.useEffect(() => {
        let getUser = async () => {
          setLoadingUser(true);
          try {
            const cookies = new Cookies();
            const user_id = cookies.get("uid");
            
            const res = await fetch(urlApis["social"]+"/users/"+user_id, {
              method: "GET",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+cookies.get("utoken")
              },
            });
            
            const resJson = await res.json();
            if(res.status === 200) {
                formik.values.name = resJson.name;
                formik.values.surname = resJson.surname;
                formik.values.birthday = resJson.birthday;
                formik.values.gender = resJson.gender;
                formik.values.email = resJson.email;
            }
          } catch(err) {
    
          }
          finally {
            setLoadingUser(false);
          }
        }
        getUser()
    }, []);
    
  
    let displayMessage = (type, message) => {
      setAlert(true);
      setAlertType(type);
      setAlertMessage(message);
    }
  
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
  
    let handleSubmit = async (values) => {

        const cookies = new Cookies();
        const user_id = cookies.get("uid");
        setLoading(true);
        try {
          let res = await fetch(urlApis["social"]+"/users/"+user_id, {
            method: "PUT",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer "+cookies.get("utoken")
            },
            body: JSON.stringify({
              name: values.name,
              surname: values.surname,
              birthday: values.birthday,
              gender: values.gender,
              email: values.email,
            }),
          });

            if (res.status === 200) {
                displayMessage("success", "Dados atualizados!");
            } else {
                displayMessage("error", "Ocorreu um erro em nosso servidor");
            }
        } catch (err) {
            displayMessage("error", "Ocorreu um erro ao enviar seus dados");
        }
        setLoading(false);
      };

    

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
                        severity={alertType}
                    >
                        { alertMessage }
                    </Alert>
                    }

                    {loadingUser ? 
                    <Skeleton variant="rounded" width="100%" height={40}/>
                    :
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
                    }

                    {loadingUser ? 
                    <Skeleton variant="rounded" width="100%" height={40}/>
                    :
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
                    }

                    {loadingUser ? 
                    <Skeleton variant="rounded" width="100%" height={40}/>
                    :
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt">
                            <DatePicker  
                                id="birthday"
                                name="birthday"
                                variant="outlined" 
                                format="DD/MM/YYYY"
                                onChange={handleBirthday}
                                value={formik.values.birthday ? dayjs(formik.values.birthday) : null}
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
                    }

                    {loadingUser ? 
                    <Skeleton variant="rounded" width="100%" height={40}/>
                    :
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
                    }

                    {loadingUser ? 
                    <Skeleton variant="rounded" width="100%" height={40}/>
                    :
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
                    }

                    <Stack 
                        direction="row"
                        spacing={2}
                        justifyContent="right"
                    >
                        <LoadingButton 
                            type="submit"
                            variant="contained"
                            size="medium"
                            spacing={2}
                            loading={loading}
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
        newPassword: yup.string()
          .min(6, "Senha deve conter no mínimo 6 caracteres")
          .max(12, "Senha deve conter no máximo 12 caracteres")
          .required("Senha é obrigatório"),
        passwordConfirmation: yup.string()
          .oneOf([yup.ref('newPassword')], 'As senhas devem ser iguais')
          .required("Confirmar a senha é obrigatório"),
    });

    const [loading, setLoading] = React.useState(false);
    const [alert, setAlert] = React.useState(false);
    const [alertType, setAlertType] = React.useState("");
    const [alertMessage, setAlertMessage] = React.useState("");
   
    let displayMessage = (type, message) => {
        setAlert(true);
        setAlertType(type);
        setAlertMessage(message);
    }

    let handleSubmit = async (values) => {
        setLoading(true);
        try {
            const cookies = new Cookies();
            const user_id = cookies.get("uid");
            
            const res = await fetch(urlApis["social"]+"/users/"+user_id, {
                    method: "PUT",
                    mode: "cors",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+cookies.get("utoken")
                },
                body: JSON.stringify({
                    password: values.password,
                    newPassword: values.newPassword,
                }),
            });

            if (res.status === 200) {
                displayMessage("success", "Senha atualizada!");
            } else {
                displayMessage("error", "Ocorreu um erro em nosso servidor");
            }
        } catch (err) {
            displayMessage("error", "Ocorreu um erro ao enviar seus dados");
        }
        setLoading(false);
    };

    const formik = useFormik({
        initialValues: {
          password: "",
          newPassword: "",
          passwordConfirmation: "",
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
                        severity={alertType}
                    >
                        { alertMessage }
                    </Alert>
                    }

                        <PasswordInput
                            fullWidth  
                            name="password"
                            label="Senha atual" 
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
                            name="newPassword"
                            label="Nova senha" 
                            variant="outlined"
                            size="small"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                            helperText={formik.touched.newPassword && formik.errors.newPassword}
                        />

                        <PasswordInput
                            fullWidth  
                            name="passwordConfirmation"
                            label="Confirmar nova senha" 
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
                            type="submit"
                            variant="contained"
                            size="medium"
                            spacing={2}
                            loading={loading}
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