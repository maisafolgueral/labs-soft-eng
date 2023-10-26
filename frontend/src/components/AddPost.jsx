import * as React from 'react';
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import LoadingButton from '@mui/lab/LoadingButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const CustomTextField = styled(TextField)(({ theme }) => ({
    "& .MuiFormLabel-root": {
        fontSize: "20px",
        color: "#777777"
    },
    "& .MuiInputBase-input, .MuiInputBase-root": {
        backgroundColor: "white"
    },
    "& .css-85zwa9-MuiInputBase-root-MuiFilledInput-root:before": {
        borderBottom: "1px solid #c4c4c4"
    },
    "& .css-85zwa9-MuiInputBase-root-MuiFilledInput-root:hover": {
        backgroundColor: "white"
    },
    "& .css-85zwa9-MuiInputBase-root-MuiFilledInput-root.Mui-focused": {
        backgroundColor: "white"
    },
    "& .MuiFormLabel-root.Mui-focused": {
        color: "#1976d2"
    },
}));

export default function AddPost() {
    const [topic, setTopic] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleChange = (event) => {
        setTopic(event.target.value);
    };

    const handlePublish = () => {
        setLoading(true);
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "#fff",
                border: "1px solid #c4c4c4",
                borderRadius: "5px"
            }}
        >
            <CustomTextField
                label="Escreva sobre alguma coisa..."
                multiline
                variant="filled"
                rows={4}
                inputProps={{
                    style: {
                        height: "107px"
                    }
                }}
                sx={{
                    width: "100%"
                }}
            />
            <Stack 
                direction="row" 
                spacing="12px" 
                justifyContent="right"
                sx={{
                    margin: "12px"
                }}
            >
                <FormControl sx={{ width: "110px" }} size="small">
                    <InputLabel sx={{ fontSize: "15px" }}>Tópico</InputLabel>
                    <Select
                        value={topic}
                        label="Tópico"
                        onChange={handleChange}
                        sx={{
                            height: "36px"
                        }}
                    >
                        <MenuItem value={10}>Galáxias</MenuItem>
                        <MenuItem value={20}>Futebol</MenuItem>
                        <MenuItem value={30}>Medicina</MenuItem>
                    </Select>
                </FormControl>
                <LoadingButton 
                    variant="contained"
                    size="small"
                    sx={{
                        width: "110px",
                        height: "36px",
                        fontSize: "15px"
                    }}
                    onClick={handlePublish}
                    loading={loading}
                >
                    Publicar
                </LoadingButton>
            </Stack>
        </Box>                                                
    );
}