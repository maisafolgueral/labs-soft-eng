import * as React from 'react';
import * as yup from "yup";
import Cookies from "universal-cookie";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import { urlApis } from "@/globals";


const validationSchema = yup.object({
    title: yup.string()
      .required("Título é obrigatório")
      .min(10, "Título deve conter no mínimo 10 caracteres")
      .max(100, "Título deve conter no máximo 100 caracteres"),
    content: yup.string()
      .required("Conteúdo é obrigatório")
      .min(30, "Título deve conter no mínimo 30 caracteres")
      .max(300, "Título deve conter no máximo 300 caracteres"),
    topic: yup.string()
        .required("Obrigatório"),
  });

export default function AddPost(props) {
    const [topic, setTopic] = React.useState('');
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

            let res = await fetch(urlApis["social"]+"/posts", {
                    method: "POST",
                    mode: "cors",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+cookies.get("utoken")
                },
                body: JSON.stringify({
                    user_id: cookies.get("uid"),
                    topic_id: values.topic,
                    title: values.title,
                    content: values.content
                }),
            });

            if (res.status === 200) {
                displayMessage("success", "Post criado!");
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
          title: "",
          content: "",
          topic: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          handleSubmit(values);
        },
    });

    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "#fff",
                border: "1px solid #c4c4c4",
                borderRadius: "5px",
                padding: "20px"
            }}
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
        >
            <Box>
                <Stack spacing="12px">
                    {alert &&
                        <Alert 
                            variant="filled" 
                            severity={alertType}
                        >
                            { alertMessage }
                        </Alert>
                    }
                    <TextField 
                        name="title"
                        label="Título" 
                        variant="outlined" 
                        size="small"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                    />
                    <TextField 
                        name="content"
                        label="Escreva sobre alguma coisa..." 
                        multiline
                        rows={5}
                        variant="outlined" 
                        size="small"
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.content && Boolean(formik.errors.content)}
                        helperText={formik.touched.content && formik.errors.content}
                    />
                </Stack>
            </Box>
            <Stack 
                direction="row" 
                spacing="12px" 
                justifyContent="right"
                sx={{
                    marginTop: "12px"
                }}
            >
                {!props.showTopics &&
                <FormControl sx={{ width: "110px" }} size="small">
                    <TextField
                        select 
                        name="topic"
                        label="Tópico"
                        variant="outlined"
                        size="small"
                        value={formik.values.topic}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.topic && Boolean(formik.errors.topic)}
                        helperText={formik.touched.topic && formik.errors.topic}
                    >
                        <MenuItem value={1}>Galáxias</MenuItem>
                        <MenuItem value={2}>Futebol</MenuItem>
                        <MenuItem value={3}>Medicina</MenuItem>
                    </TextField>
                </FormControl>
                }
                <LoadingButton 
                    type="submit"
                    variant="contained"
                    size="small"
                    sx={{
                        width: "110px",
                        height: "40px",
                        fontSize: "15px"
                    }}
                    loading={loading}
                    disabled={!formik.dirty}
                >
                    Publicar
                </LoadingButton>
            </Stack>
        </Box>                                                
    );
}