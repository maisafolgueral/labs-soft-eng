import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AvatarInfo from "@/components/AvatarInfo";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import { ChatQuote, Chat } from "react-bootstrap-icons";
import Reaction from "@/components/Reaction";
import reaction1 from "@/assets/icons/reactions/1.svg";
import reaction2 from "@/assets/icons/reactions/2.svg";
import reaction3 from "@/assets/icons/reactions/3.svg";
import reaction4 from "@/assets/icons/reactions/4.svg";
import reaction5 from "@/assets/icons/reactions/5.svg";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';


function Header() {
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

function Content() {
  return (
    <Box sx={{ width: "100%", marginTop: "30px" }}>
            <Typography 
                component="span"
                fontSize={16}
                fontWeight="bold"
                color="#404040"
            >
                Título da publicação
            </Typography>
            <Typography 
                component="p"
                fontSize={14}
                color="#404040"
                textAlign="justify"
            >
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas quis erat sed massa lacinia accumsan sit amet sit amet quam. Morbi at ante sed turpis blandit molestie. Duis lacus nunc, rhoncus a mattis vel, imperdiet at sem. Ut in lorem ac nisl venenatis malesuada vel non massa. Maecenas nec fringilla eros, tempor ultricies risus. Nullam risus lacus, luctus non viverra ac, suscipit non magna. Ut quis risus varius, rutrum sem sit amet, ullamcorper nibh. Fusce tincidunt rutrum leo, eget posuere diam dictum eget. Mauris sollicitudin sem nec erat dictum, eget consectetur tortor pulvinar. Ut facilisis sagittis ante ac tincidunt. Sed porttitor interdum sodales. Nunc lacinia leo vitae sapien consectetur rutrum at eu risus. Ut mollis arcu non diam accumsan congue. 
            </Typography>
    </Box>
  );
}

function Footer() {
  return (
    <Grid container alignItems="center">
            <Grid item xs={6}>
                <Stack direction="row" spacing="25px">
                    <Reaction icon={reaction1} title="Amei"/>
                    <Reaction icon={reaction2} title="Engraçado"/>
                    <Reaction icon={reaction3} title="Surpreso"/>
                    <Reaction icon={reaction4} title="Triste"/>
                    <Reaction icon={reaction5} title="Raiva"/>
                </Stack>
            </Grid>
            <Grid item xs={6} >
            </Grid>
        </Grid>
  );
}

function Comment() {
  return (
    <Stack spacing="10px">
        <AvatarInfo 
          avatarSize={35}
          avatarFontSize={16}
          name="Mark Alain"
          description="Publicado em 03 set 2023"
        />
        <Typography 
          component="p"
          fontSize={14}
          color="#404040"
          textAlign="justify"
          sx={{
            paddingLeft: "45px"
          }}
        >
          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas quis erat sed massa lacinia accumsan sit amet sit amet quam. 
        </Typography>
    </Stack>
  );
}

export default function PostExpanded() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('lg');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
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
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        sx={{
          zIndex: 3001
        }}
      >
        <Box
          sx={{
            width: "100%",
            position: "relative",
            backgroundColor: "#fff",
            borderBottom: "1px solid #c4c4c4",
            padding: "14px 27px"
          }}
        >
          <Stack direction="row" spacing="10px" alignItems="center">
            <Typography sx={{flex: 1 }} variant="h6" component="div">
              Publicação
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              justifyContent="right"
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </Box>
        <Grid container>
          <Grid item xs={6} 
            sx={{
              padding: "27px"
            }}
          >
            <Stack spacing="40px">
              <Header/>
              <Content/>
              <Footer/>
            </Stack>
          </Grid>
          <Grid 
            item 
            xs={6}
            sx={{
              borderLeft: "1px solid #c4c4c4",
              position: "relative"
            }}
          >
            <Stack 
              className="slim-scrollbar"
              spacing="27px"
              sx={{
                marginBottom: "140px", 
                height:"291px",
                overflowY: "auto",
                padding: "27px",
              }}
            >
                {Array.from(Array(10)).map((_, index) => (
                  <>
                    {index>0 && <Divider/>}
                    <Comment/>
                  </>
                ))}
              
            </Stack>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                left: 0,
                borderTop: "1px solid #c4c4c4",
              }}
            >
              <Stack spacing="10px" direction="row" alignItems="center" sx={{padding: "27px"}}>
                <FormControl fullWidth>
                    <TextField 
                      id="outlined-multiline-flexible" 
                      label="Escreva um comentário..." 
                      multiline
                      rows={3}
                      variant="outlined" 
                      size="small"                  
                    />
                </FormControl>
                <Button 
                    variant="contained"
                    size="medium"
                    sx={{
                      height: "35px"
                    }}
                  >
                    Comentar
                  </Button>
              </Stack>
            </Box>            
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}
