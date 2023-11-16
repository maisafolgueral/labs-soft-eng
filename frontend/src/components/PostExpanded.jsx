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
import Skeleton from '@mui/material/Skeleton';
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

function Comment({ ...props }) {
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
    <Stack spacing="10px">
      <AvatarInfo 
        avatarSize={35}
        avatarFontSize={16}
        name={props.userFullname}
        nameFontSize={18}
        href={"/h/profile/"+props.userId}
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
        { props.commentContent } 
      </Typography>
      <Typography 
          fontSize={14}
          color="#717171"
          sx={{
              marginTop: "10px",
              paddingLeft: "45px"
          }}
      >
          { formatPublishDate(props.commentDate) }
      </Typography>
    </Stack>
  );
}

function AddComment({ postId, onPublishComment }) {
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");

  const cookies = new Cookies();
  const userToken = cookies.get("utoken");
  const userId = cookies.get("uid");
  const userName = cookies.get("uname");
  const userSurname = cookies.get("usurname");

  let displayMessage = (type, message) => {
    setAlert(true);
    setAlertType(type);
    setAlertMessage(message);
  }

  let handleSubmit = async (values) => {
    try {
      setLoading(true);

      let res = await fetch(urlApis["social"]+"/posts/"+postId+"/comments", {
          method: "POST",
          mode: "cors",
          headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+userToken
        },
        body: JSON.stringify({
          user_id: userId,
          post_id: postId,
          content: values.content
        }),
      });

      let resJson = await res.json();

      if (res.status === 200) {
          displayMessage("success", "Comentário criado!");

          onPublishComment({
            "user": {
                "id": userId,
                "name": userName,
                "surname": userSurname,
            },
            "comment": {
                "id": resJson.id,
                "content": values.content,
                "date": resJson.created_at,
            },
        });
      } else {
          displayMessage("error", "Ocorreu um erro em nosso servidor");
      }
    } catch (err) {
        displayMessage("error", "Ocorreu um erro ao enviar seus dados");
    } finally {
      setLoading(false);
    }
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
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
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
  );
}

export default function PostExpanded({ showTopics, open, onClose, postId, ...props }) {
  const [comments, setComments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const cookies = new Cookies();
  const userToken = cookies.get("utoken");

  React.useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(urlApis["social"]+"/posts/"+postId+"/comments", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+userToken
          },
        });
        
        let currentComments = await res.json();
        setComments(currentComments);
      } catch(err) {
        setComments([]);
      } finally {
        setLoading(false);
      }  
    }
    getComments()
  }, []);

  let onPublishComment = (comment) => {
    setComments([comment, ...comments]);
  }

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
                right: 0,
                bottom: "140px",
                left: 0,
                padding: "27px",
                boxSizing: "border-box",
                overflowY: "auto"
              }}
            >
              {loading && 
              <>
                <Stack direction="row" spacing="7px">
                  <Skeleton variant="circular" width={35} height={35}/>
                  <Skeleton variant="text" width={150} sx={{ fontSize: '16px' }}/>
                </Stack>
                <Box sx={{ width: "100%" }}>
                  <Skeleton variant="text" sx={{ fontSize: '14px' }}/>
                  <Skeleton variant="text" sx={{ fontSize: '14px' }}/>
                  <Skeleton variant="text" sx={{ fontSize: '14px' }}/>
                </Box>
                <Skeleton variant="text" width={150} sx={{ fontSize: '14px' }}/>
              </>
              }

              {!loading && comments.map((comment, index) => (
                <>
                  {index>0 && <Divider/>}
                  <Comment 
                    userFullname={comment.user.name+" "+comment.user.surname}
                    userId={comment.user.id}
                    commentContent={comment.comment.content}
                    commentDate={comment.comment.date}
                    commentId={comment.comment.id}
                  />
                </>
              ))}
              
              {!loading && comments.length === 0 &&
                <Box
                  sx={{
                    height: "100vh", 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                      variant="h1"
                      fontSize="28px"
                      fontWeight="bold"
                      textAlign="center"
                      color= "#b7b7b7"
                  >
                      Ainda não existem comentários!
                  </Typography>
                </Box>
              }
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
              <AddComment 
                postId={postId} 
                onPublishComment={onPublishComment}
              />
            </Box>            
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}
