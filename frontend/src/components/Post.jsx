import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AvatarInfo from "@/components/AvatarInfo";
import PostExpanded from "@/components/PostExpanded";
import Reactions from "@/components/Reactions";
import IconWithTitle from "@/components/IconWithTitle";
import { Icon } from "@/components/Icon";


export default function Post({ showTopics, ...props }) {
    const [open, setOpen] = React.useState(false);

    let formatPublishDate = (date) => {
        const options = {
          day: "numeric",
          month: "short",
          year: "numeric",
        };
        const formatter = new Intl.DateTimeFormat("pt-BR", options);
        const formattedDate = formatter.format(new Date());
        return "Publicado em "+formattedDate;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: "auto",
                    backgroundColor: "#fff",
                    border: "1px solid #c4c4c4",
                    borderRadius: "5px",
                    padding: "20px"
                }}
            >
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
                            marginTop: "15px"
                        }}
                    >
                        { formatPublishDate(props.postDate) }
                    </Typography>
                </Box>
                
                <Grid 
                    container 
                    alignItems="center" 
                    sx={{ paddingTop: "35px" }}
                >
                    <Grid item xs={6}>
                        <Box sx={{marginLeft: "-5px"}}>
                            <Reactions/>
                        </Box>
                    </Grid>
                    <Grid item container xs={6} justifyContent="right">
                        <Stack 
                            spacing="8px" 
                            alignItems="center"
                            direction="row"
                        >
                            <Button 
                                startIcon={<Icon iconName="Chat" color="#777777" size={23}/>}
                                sx={{
                                    fontSize: "15px",
                                    color: "#777777",
                                    marginRight: 0,
                                    paddingRight: 0,
                                    "&:hover": {
                                    background: "none"
                                    }
                                }}
                                onClick={handleClickOpen}
                            >
                                Comentar
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>  

            <PostExpanded 
                showTopics={showTopics ? showTopics : undefined} 
                open={open} 
                onClose={handleClose}
            />
        </>                                               
    );
}