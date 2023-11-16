import * as React from "react";
import * as yup from "yup";
import Cookies from "universal-cookie";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import AvatarInfo from "@/components/AvatarInfo";
import Reactions from "@/components/Reactions";
import IconWithTitle from "@/components/IconWithTitle";
import { urlApis } from "@/globals";


const validationSchema = yup.object({
  content: yup.string()
    .required("O conteúdo é obrigatório")
    .min(1, "O conteúdo deve conter no mínimo 1 caractere")
    .max(300, "O conteúdo deve conter no máximo 300 caracteres"),
});


function Header({ showTopics, ...props }) {
  return (
    <Grid container alignItems="center">
      <Grid item xs={6}>
        <AvatarInfo 
          avatarSize={35}
          avatarFontSize={16}
          name={props.userFullname}
          nameFontSize={18}
          href={"/h/profile/"+props.userId}
        />
      </Grid>
      <Grid item container xs={6} justifyContent="right">
        {!showTopics && 
        <IconWithTitle
          iconName="ChatQuote"
          title={props.topicSubject}
          color="#777777"
          href={"/h/topics/"+props.topicId}
        />
        }
      </Grid>
    </Grid>
  );
}

function Content({ ...props }) {
  let formatPublishDate = (date) => {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("pt-BR", options);
    const formattedDate = formatter.format(new Date(date));
    return "Publicado em "+formattedDate;
  }

  return (
    <Box sx={{ width: "100%", marginTop: "30px" }}>
      <Typography 
          component="span"
          fontSize={16}
          fontWeight="bold"
          color="#404040"
      >
          { props.postTitle }
      </Typography>
      <Typography 
          component="p"
          fontSize={14}
          color="#404040"
          textAlign="justify"
      >
          { props.postContent }
      </Typography>
      <Typography 
          fontSize={14}
          color="#717171"
          sx={{
              marginTop: "10px"
          }}
      >
          { formatPublishDate(props.postDate) }
      </Typography>
    </Box>
  );
}

function Footer({ postId }) {
  return (
    <Grid container alignItems="center">
      <Grid item xs={6}>
        <Reactions postId={postId}/>
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
      <Typography 
          fontSize={14}
          color="#717171"
          sx={{
              marginTop: "10px",
              paddingLeft: "45px"
          }}
      >
          Publicado em 03 set 2023
      </Typography>
    </Stack>
  );
}

export default function PostExpanded({ showTopics, open, onClose, postId, ...props }) {
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");

  let displayMessage = (type, message) => {
    setAlert(true);
    setAlertType(type);
    setAlertMessage(message);
  }

  let handleSubmit = async (values) => {
    setLoading(true);
    try {
        const cookies = new Cookies();

        let res = await fetch(urlApis["social"]+"/posts", {
                method: "POST",
                mode: "cors",
                headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+cookies.get("utoken")
            },
            body: JSON.stringify({
                user_id: cookies.get("uid"),
                post_id: values.topic,
                content: values.content
            }),
        });

        if (res.status === 200) {
            displayMessage("success", "Comentário criado!");
        } else {
            displayMessage("error", "Ocorreu um erro em nosso servidor");
        }
    } catch (err) {
        displayMessage("error", "Ocorreu um erro ao enviar seus dados");
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  
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
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
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
              <Header 
                showTopics={showTopics ? showTopics : undefined}
                {...props}
              />
              <Content {...props}/>
              <Footer postId={postId}/>
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
                {alert &&
                  <Alert 
                      variant="filled" 
                      severity={alertType}
                  >
                      { alertMessage }
                  </Alert>
                  }
                <FormControl fullWidth>
                  <TextField 
                    name="content"
                    id="outlined-multiline-flexible" 
                    label="Escreva um comentário..." 
                    multiline
                    rows={3}
                    variant="outlined" 
                    size="small"       
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.content && Boolean(formik.errors.content)}
                    helperText={formik.touched.content && formik.errors.content}           
                  />
                </FormControl>
                <LoadingButton 
                  type="submit"
                  variant="contained"
                  size="medium"
                  sx={{
                    height: "35px"
                  }}
                  loading={loading}
                  disabled={!formik.dirty}
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
