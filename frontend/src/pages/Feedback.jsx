import * as React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from "@mui/material/Alert";
import { Icon } from "@/components/Icon";

const validationSchema = yup.object({
    subject: yup.string()
      .required("Título é obrigatório"),
    description: yup.string()
      .required("Descrição é obrigatório"),
  });
  

export default function Feedback() {
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
                                    severity="error"
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