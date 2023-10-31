import * as React from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';


export default function AddPost(props) {
    const [topic, setTopic] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleTopicChange = (event) => {
        setTopic(event.target.value);
    };

    const handlePost = () => {
        setLoading(true);
    };

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
        >
            <Box>
                <Stack spacing="12px">
                    <TextField 
                        label="Título" 
                        variant="outlined" 
                        size="small"
                    />
                    <TextField 
                        label="Escreva sobre alguma coisa..." 
                        multiline
                        rows={5}
                        variant="outlined" 
                        size="small"
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
                    <InputLabel sx={{ fontSize: "15px" }}>Tópico</InputLabel>
                    <Select
                        value={topic}
                        label="Tópico"
                        onChange={handleTopicChange}
                        sx={{
                            height: "36px"
                        }}
                    >
                        <MenuItem value={10}>Galáxias</MenuItem>
                        <MenuItem value={20}>Futebol</MenuItem>
                        <MenuItem value={30}>Medicina</MenuItem>
                    </Select>
                </FormControl>
                }
                <LoadingButton 
                    variant="contained"
                    size="small"
                    sx={{
                        width: "110px",
                        height: "36px",
                        fontSize: "15px"
                    }}
                    onClick={handlePost}
                    loading={loading}
                    disabled
                >
                    Publicar
                </LoadingButton>
            </Stack>
        </Box>                                                
    );
}