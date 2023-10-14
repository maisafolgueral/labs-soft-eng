import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function AddPost() {
  return (
    <Box
      sx={{
        width: "60%",
        height: "30%",
        backgroundColor: '#fff',
        border: '1px solid #c4c4c4',
        paddingTop: "30px",
        borderRadius: "5px",
      }}
    >
        <Grid container spacing={2}>
            <Grid 
                item 
                xs={12}
            >
                <TextField
                    id="filled-multiline-flexible"
                    label="Escreva sobre alguma coisa..."
                    multiline
                    variant="filled"
                    sx={{
                        width: "100%",
                        backgroundColor: '#fff',
                    }}
                />

            </Grid>

            <Grid 
                item 
                xs={12} 
            >
                <Stack 
                    direction="row" 
                    spacing={2}
                    paddingLeft="70%"
                    paddingRight="50px"
                    paddingTop="20px"
                >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"
                        >Tópico</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Topico"
                            sx={{
                                color: "#C4C4C4",
                            }}
                        >
                            <MenuItem value={10}>Tópico 1</MenuItem>
                            <MenuItem value={20}>Tópico 2</MenuItem>
                            <MenuItem value={30}>Tópico 3</MenuItem>
                        </Select>
                    </FormControl>

                    <Button 
                        variant="outlined"
                        style={{ 
                            color: "#1976D2",
                            width: "150px"
                        }}
                    >
                    Publicar
                    </Button>
                </Stack>
            </Grid>


        </Grid>


        
    </Box>
                                                        
  );
}