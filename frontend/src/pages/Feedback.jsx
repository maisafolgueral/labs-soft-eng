import * as React from "react"
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { 
  ExclamationTriangle
} from "react-bootstrap-icons";

export default function Feedback() {
  return (
    <>
      <Box
            sx={{
                width: "100%",
                height: "595px",
                backgroundColor: "#fff",
                border: "1px solid #c4c4c4",
                borderRadius: "5px",
                padding: "26px"
            }}
        >

            <Grid container alignItems="center" marginBottom="50px">
                <Grid item xs={12}>
                    <Stack direction="row" spacing="5px">
                        <ExclamationTriangle color="#777777" size={32}/>
                        <Typography
                            variant="h4"
                            sx={{
                                color: "#777777"
                            }}
                        >
                            Enviar feedback
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>

                <Grid container alignItems="center">
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <Stack spacing="28px">
                                <TextField 
                                    id="password" 
                                    label="Qual o motivo?" 
                                    variant="outlined" 
                                    size="small"
                                />

                                <TextField 
                                    id="outlined-multiline-flexible" 
                                    label="Faça uma breve descrição do motivo" 
                                    multiline
                                    rows={13}
                                    variant="outlined" 
                                    size="small"
                                />

                                <Stack direction="row" spacing={2} justifyContent="right">
                                    <Button 
                                        variant="contained"
                                        size="medium"
                                        spacing={2}
                                    >
                                        Enviar
                                    </Button>
                                </Stack>
                            </Stack>
                        </FormControl>
                    </Grid>
                </Grid>

        </Box>
    </>
  );
}