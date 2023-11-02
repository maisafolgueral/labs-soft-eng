import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import AvatarInfo from "@/components/AvatarInfo";
import Reactions from "@/components/Reactions";
import IconWithTitle from "@/components/IconWithTitle";


function Header({ showTopics }) {
  return (
    <Grid container alignItems="center">
      <Grid item xs={6}>
        <AvatarInfo 
          avatarSize={35}
          avatarFontSize={16}
          name="Mark Alain"
          description="Publicado em 03 set 2023"
          href="/h/profile/:id"
        />
      </Grid>
      <Grid item container xs={6} justifyContent="right">
        {!showTopics &&
          <IconWithTitle
            iconName="ChatQuote"
            title="Galáxias"
            color="#777777"
            href="/h/profile/:id"
          />
        }
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
        <Reactions/>
      </Grid>
      <Grid item xs={6}></Grid>
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
        href="/h/profile/:id"
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

export default function PostExpanded({ showTopics, open, onClose }) {
  const [loading, setLoading] = React.useState(false);

  const handleComment= () => {
      setLoading(true);
  };
  
  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={onClose}
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
              onClick={onClose}
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
              <Header showTopics={showTopics ? showTopics : undefined}/>
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
                position: "absolute",
                top: 0,
                bottom: "140px",
                padding: "27px",
                overflowY: "auto"
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
              <Stack 
                spacing="10px" 
                direction="row" 
                alignItems="center" 
                sx={{padding: "27px"}}
              >
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
                <LoadingButton 
                  variant="contained"
                  size="medium"
                  sx={{
                    height: "35px"
                  }}
                  onClick={handleComment}
                  loading={loading}
                  disabled
                >
                  Comentar
                </LoadingButton>
              </Stack>
            </Box>            
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}