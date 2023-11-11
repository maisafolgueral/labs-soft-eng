import * as React from 'react';
import * as yup from "yup";
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
    const [alertMessage, setAlertMessage] = React.useState("");

    let displayError = (message) => {
      setAlert(true);
      setAlertMessage(message);
    }

    const handleTopicChange = (event) => {
        event.preventDefault();
        setLoading(true);
    }

    const handlePost = (event) => {
        event.preventDefault();
        setLoading(true);
    }

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
            onSubmit={formik.handleSubmit}
        >
            <Box>
                <Stack spacing="12px">
                    {alert &&
                        <Alert 
                            variant="filled" 
                            severity="error"
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
                        onClick={handleTopicChange}
                        value={formik.values.topic}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.topic && Boolean(formik.errors.topic)}
                        helperText={formik.touched.topic && formik.errors.topic}
                    >
                        <MenuItem value={10}>Galáxias</MenuItem>
                        <MenuItem value={20}>Futebol</MenuItem>
                        <MenuItem value={30}>Medicina</MenuItem>
                    </TextField>
                </FormControl>
                }
                <LoadingButton 
                    variant="contained"
                    size="small"
                    sx={{
                        width: "110px",
                        height: "40px",
                        fontSize: "15px"
                    }}
                    onClick={handlePost}
                    loading={loading}
                    disabled={!formik.dirty}
                >
                    Publicar
                </LoadingButton>
            </Stack>
        </Box>                                                
    );
}