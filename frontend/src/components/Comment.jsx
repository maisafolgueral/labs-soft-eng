import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Chat } from "react-bootstrap-icons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PostHeader() {
  return (
    <Grid container alignItems="center">
      <Grid item xs={6}>
        <AvatarInfo 
          avatarSize={35}
          avatarFontSize={16}
          name="Mark Alain"
          description="Publicado em 03 set 2023"
        />
      </Grid>
      <Grid item container xs={6} justifyContent="right">
        <Stack spacing="8px" direction="row">
          <ChatQuote color="#777777" size={23}/>
          <Typography 
              component="span"
              fontSize={18}
              color="#777777"
          >
              Galáxias
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button 
            startIcon={<Chat color="#777777" size={23}/>}
            sx={{
                fontSize: "15px",
                color: "#777777"
            }}
            onClick={handleClickOpen}
        >
            Comentar
        </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          zIndex: 3001
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "68px",
            position: "relative",
            backgroundColor: "#fff",
            borderBottom: "1px solid #c4c4c4",
            padding: "17px 27px"
          }}
        >
          <Stack direction="row" spacing="10px" alignItems="center">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Publicação
            </Typography>
          </Stack>
        </Box>
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={7}>
            
          </Grid>
          <Grid 
            item 
            xs={5}
            sx={{
              borderLeft: "1px solid #c4c4c4"
            }}
          >
            
          </Grid>
        </Grid>
        
      </Dialog>
    </div>
  );
}
