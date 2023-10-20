import * as React from "react";
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { 
    PencilFill
} from "react-bootstrap-icons";

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
                borderRadius: "5px",
                padding: "26px"
            }}
        >

            <Grid container>
                <Grid item xs={12}>
                    <Stack direction="row" spacing="14px" alignItems="center">
                        <PencilFill color="#777777" size={32}/>
                        <Typography
                            variant="h4"
                            fontSize="28px"
                            color= "#777777"
                        >
                            Editar perfil
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>

            <Box 
                sx={{ 
                    borderBottom: 1, 
                    borderColor: 'divider',
                    marginTop: "53px"
                }}
            >
                <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
                    <Tab label="Pessoal" {...a11yProps(0)} />
                    <Tab label="Segurança" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
                <Grid container alignItems="center">
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <Stack spacing="28px">
                                <TextField 
                                    id="name" 
                                    label="Nome" 
                                    variant="outlined" 
                                    defaultValue="Marie"
                                    size="small"
                                />

                                <TextField 
                                    id="lastname" 
                                    label="Sobrenome" 
                                    variant="outlined" 
                                    defaultValue="Canon"
                                    size="small"
                                />

                                <TextField 
                                    id="birthday" 
                                    label="Aniversário" 
                                    variant="outlined" 
                                    defaultValue="06/04/1992"
                                    size="small"
                                />

                                <TextField 
                                    id="email" 
                                    label="E-mail" 
                                    variant="outlined" 
                                    defaultValue="marie.canon@gmail.com"
                                    size="small"
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
                            </Stack>
                        </FormControl>
                    </Grid>
                </Grid>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <Grid container alignItems="center">
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <Stack spacing="28px">
                                <TextField 
                                    id="password" 
                                    label="Senha Atual" 
                                    variant="outlined" 
                                    defaultValue="******"
                                    size="small"
                                />

                                <TextField 
                                    id="newpassword" 
                                    label="Nova senha" 
                                    variant="outlined" 
                                    defaultValue="******"
                                    size="small"
                                />

                                <TextField 
                                    id="newpassword" 
                                    label="Repita a Nova Senha" 
                                    variant="outlined" 
                                    defaultValue="******"
                                    size="small"
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
                            </Stack>
                        </FormControl>
                    </Grid>
                </Grid>
            </CustomTabPanel>

        </Box>
    </>
  );
}