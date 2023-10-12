import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function TopBar() {
  return (
    <Box
      sx={{
        width: "60%",
        height: "30%",
        backgroundColor: '#fff',
        border: '1px solid #c4c4c4',
        paddingTop: "30px",
        paddingLeft: "30px",
        borderRadius: "5px",
      }}
    >
        <Grid container spacing={2}>
            <Grid 
                item 
                xs={12}
            >

                <Typography 
                component="span"
                fontSize={18} 
                color="#c4c4c4"
                >
                    Escreva sobre alguma coisa...
                </Typography>

            </Grid>

            <Grid 
                item 
                xs={12} 
            >
                <Stack 
                    direction="row" 
                    spacing={2}
                    paddingLeft="73%"
                    paddingTop="9%"
                >

                    <Button 
                        variant="text"
                        style={{
                            color: "#C4C4C4",
                            outline: "1px solid #C4C4C4"
                        }}
                    >
                        Tópico
                    </Button>

                    <Button 
                        variant="outlined"
                        style={{ 
                            color: "#1976D2",
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