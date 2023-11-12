import * as React from "react";
import * as yup from "yup";
import Cookies from "universal-cookie";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from "@mui/material/Alert";
import { urlApis } from "@/globals";
import { Icon } from "@/components/Icon";


const validationSchema = yup.object({
    subject: yup.string()
        .min(10, "Título deve conter no mínimo 10 caracteres")
        .max(100, "Título deve conter no máximo 100 caracteres")
        .required("Título é obrigatório"),
    description: yup.string()
        .min(50, "Descrição deve conter no mínimo 50 caracteres")
        .max(500, "Descrição deve conter no máximo 500 caracteres")
        .required("Descrição é obrigatório"),
});

export default function Feedback() {
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

            let res = await fetch(urlApis["social"]+"/feedbacks", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+cookies.get("utoken")
                },
                body: JSON.stringify({
                    user_id: cookies.get("uid"),
                    subject: values.subject,
                    description: values.description
                }),
            });

            if (res.status === 200) {
                displayMessage("success", "Obrigado pelo feedback!");
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
          subject: "",
          description: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          handleSubmit(values);
        },
    });

    return (
        <>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
                sx={{
                    width: "100%",
                    height: "auto",
                    backgroundColor: "#fff",
                    border: "1px solid #c4c4c4",
                    borderRadius: "5px",
                    padding: "26px"
                }}
            >
                <Stack 
                    direction="row" 
                    spacing="14px" 
                    alignItems="center"
                >
                    <Icon 
                        iconName="ExclamationTriangle" 
                        color="#777777" 
                        size={32}
                    />
                    <Typography
                        variant="h4"
                        fontSize="28px"
                        color= "#777777"
                    >
                        Enviar feedback
                    </Typography>
                </Stack>

                <Grid container marginTop="60px">
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <Stack spacing="21px">
                                {alert &&
                                    <Alert 
                                    variant="filled" 
                                    severity={alertType}
                                    >
                                        { alertMessage }
                                    </Alert>
                                }
                                <TextField 
                                    name="subject"
                                    label="Título" 
                                    variant="outlined" 
                                    size="small"
                                    value={formik.values.subject}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.subject && Boolean(formik.errors.subject)}
                                    helperText={formik.touched.subject && formik.errors.subject}
                                />
                                <TextField
                                    name="description"
                                    label="Descrição" 
                                    multiline
                                    rows={10}
                                    variant="outlined" 
                                    size="small"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
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
                                        Enviar
                                    </LoadingButton>
                                </Stack>
                            </Stack>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}