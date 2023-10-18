import * as React from "react";
import Box from "@mui/material/Box";
import AvatarInfo from '@/components/AvatarInfo';
import Grid from "@mui/material/Grid";
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";


export default function EditProfile() {
  return (
    <>
      <Box
            sx={{
                width: "100%",
                height: "595px",
                backgroundColor: "#fff",
                border: "1px solid #c4c4c4",
                borderRadius: "5px"
            }}
        >

            <Grid container alignItems="center" margin="30px">
                <Grid item xs={12}>
                    <AvatarInfo 
                        avatarSize={40}
                        title="Marie Canon"
                        subtitle="@mariecanon"
                    />
                </Grid>
            </Grid>

            <Divider 
                sx={{ 
                    margin: "27px",
                    marginTop: "50px"
                }}
            />

            <Grid container alignItems="center" margin="30px">
                <Grid item xs={6}>
                <FormControl fullWidth>
                        <TextField 
                            id="name" 
                            label="Nome" 
                            variant="outlined" 
                            sx={{
                                paddingBottom: "20px",
                            }}
                        />

                        <TextField 
                            id="lastname" 
                            label="Sobrenome" 
                            variant="outlined" 
                            sx={{
                                paddingBottom: "20px"
                            }}
                        />

                        <TextField 
                            id="birthday" 
                            label="Aniversário" 
                            variant="outlined" 
                            sx={{
                                paddingBottom: "20px",
                            }}
                        />

                        <TextField 
                            id="email" 
                            label="E-mail" 
                            variant="outlined" 
                            sx={{
                                paddingBottom: "20px"
                            }}
                        />

                        <Button 
                            variant="contained"
                            size="small"
                        >
                            Atualizar
                        </Button>
                        
                    </FormControl>
                </Grid>
            </Grid>

        </Box>
    </>
  );
}