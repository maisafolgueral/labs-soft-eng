import * as React from "react";
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import AvatarInfo from '@/components/AvatarInfo';
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function EditProfile(props) {
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

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

            <Box 
                sx={{ 
                    borderBottom: 1, 
                    borderColor: 'divider',
                }}
            >
                <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
                    <Tab label="Pessoal" {...a11yProps(0)} />
                    <Tab label="Segurança" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
                <Grid container alignItems="center" margin="30px">
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField 
                                id="name" 
                                label="Nome" 
                                variant="outlined" 
                                sx={{
                                    paddingBottom: "70px",
                                    height: "47.5px"
                                }}
                                defaultValue="Marie"
                            />

                            <TextField 
                                id="lastname" 
                                label="Sobrenome" 
                                variant="outlined" 
                                sx={{
                                    paddingBottom: "70px",
                                    height: "47.5px"
                                }}
                                defaultValue="Canon"
                            />

                            <TextField 
                                id="birthday" 
                                label="Aniversário" 
                                variant="outlined" 
                                sx={{
                                    paddingBottom: "70px",
                                    height: "47.5px"
                                }}
                                defaultValue="06/04/1992"
                            />

                            <TextField 
                                id="email" 
                                label="E-mail" 
                                variant="outlined" 
                                sx={{
                                    paddingBottom: "70px",
                                    height: "47.5px"
                                }}
                                defaultValue="marie.canon@gmail.com"
                            />

                            <Stack direction="row" spacing={2} justifyContent="right">
                                <Button 
                                    variant="contained"
                                    size="medium"
                                    spacing={2}
                                >
                                    Atualizar
                                </Button>
                            </Stack>

                        </FormControl>
                    </Grid>
                </Grid>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <Grid container alignItems="center" margin="30px">
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField 
                                id="password" 
                                label="Senha Atual" 
                                variant="outlined" 
                                sx={{
                                    paddingBottom: "70px",
                                    height: "47.5px"
                                }}
                                defaultValue="******"
                            />

                            <TextField 
                                id="newpassword" 
                                label="Nova senha" 
                                variant="outlined" 
                                sx={{
                                    paddingBottom: "70px",
                                    height: "47.5px"
                                }}
                                defaultValue="******"
                            />

                            <TextField 
                                id="newpassword" 
                                label="Repita a Nova Senha" 
                                variant="outlined" 
                                sx={{
                                    paddingBottom: "70px",
                                    height: "47.5px"
                                }}
                                defaultValue="******"
                            />  

                            <Stack direction="row" spacing={2} justifyContent="right">
                                <Button 
                                    variant="contained"
                                    size="medium"
                                    spacing={2}
                                >
                                    Atualizar
                                </Button>
                            </Stack>

                        </FormControl>
                    </Grid>
                </Grid>
            </CustomTabPanel>

        </Box>
    </>
  );
}