import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { 
    ChatQuote,
    People
  } from "react-bootstrap-icons";


export default function InfoBox() {
  return (
    <Box
        sx={{
            width: "302px",
            marginLeft: "5%",
            backgroundColor: "#fff",
            border: "1px solid #c4c4c4",
            borderRadius: "5px"
        }}
    >
        <Card>
            <CardContent>
                <Grid container>
                    <Grid item xs={7}>
                        <Stack 
                            spacing={1} 
                            direction="row"
                            alignItems="left"
                            justifyContent="flex-end"
                        >
                            <Avatar 
                                src="/broken-image.jpg" 
                                sx={{ 
                                    width: 40.6, 
                                    height: 40.6
                                }}
                            />
                            <Typography 
                                component= "span"
                                fontSize= {18}
                                color= "#404040"
                                height= "10.7px"
                                marginBottom="0" 
                            >
                                Marie Canon
                                <Typography 
                                    sx={{ 
                                        height: "8.8px",
                                        paddingTop: "0"
                                    }} 
                                    color="text.secondary"
                                >
                                    @mariecanon
                                </Typography>
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={5}>
                        <CardActions>
                            <Button 
                                variant="outlined"
                                size="small"
                                style={{
                                  marginLeft: "40%",
                                  color: "#1976D2",
                                }}
                            >
                                Editar
                            </Button>
                        </CardActions>
                    </Grid>
                </Grid>
                <Typography 
                    variant="body2" 
                    paddingTop="15%"
                    color= "#c4c4c4"
                >
                    <hr/>
                </Typography>
                <Typography 
                    color= "#404040"
                    paddingTop="5%"
                    fontSze={30}
                    paddingBottom="2%"
                >
                    Seguindo
                </Typography>

                <Stack spacing="12px" direction="row" paddingBottom="2%">
                    <People color="#777777" size={30}/>
                    <Typography 
                        component="span"
                        fontSize={20}
                        color="#777777"
                    >
                        20 pessoas
                    </Typography>
                </Stack>

                <Stack spacing="12px" direction="row">
                    <ChatQuote color="#777777" size={30}/>
                    <Typography 
                        component="span"
                        fontSize={20}
                        color="#777777"
                    >
                        5 tópicos
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    </Box>
  );
}