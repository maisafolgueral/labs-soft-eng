import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { Icon } from "@/components/Icon";


export default function Feedback() {
    const [loading, setLoading] = React.useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);
    }

    return (
        <>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={submitHandler}
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
                                <TextField 
                                    label="Qual o motivo?" 
                                    variant="outlined" 
                                    size="small"
                                />
                                <TextField
                                    label="Faça uma breve descrição do motivo" 
                                    multiline
                                    rows={10}
                                    variant="outlined" 
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