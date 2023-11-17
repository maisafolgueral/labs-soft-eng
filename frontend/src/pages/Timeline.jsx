import * as React from "react";
import Cookies from "universal-cookie";
import Skeleton from '@mui/material/Skeleton';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { urlApis } from "@/globals";
import AddPost from "@/components/AddPost";
import Post from "@/components/Post";


export default function Timeline() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true); 

  const cookies = new Cookies();
  const userToken = cookies.get("utoken");
  const userId = cookies.get("uid");

  React.useEffect(() => {
    const getTimeline = async () => {
      try {
        
        const res = await fetch(urlApis["social"]+"/users/"+userId+"/timeline", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+userToken
          },
        });
        
        let currentPosts = await res.json();
        setPosts(currentPosts);
      } catch(err) {
        setPosts([]);
      } finally {
        setLoading(false);
      }  
    }
    getTimeline()
  }, []);

  let onPublishPost = (post) => {
    setPosts([post, ...posts]);
  }

  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Stack spacing="28px">
            <AddPost showTopics onPublishPost={onPublishPost}/>
            {!loading && posts.map(post => (
            <Post
              key={post.post.id}
              showTopics
              userFullname={post.user.name+" "+post.user.surname}
              userId={post.user.id}
              topicSubject={post.topic.subject}
              topicId={post.topic.id}
              postTitle={post.post.title}
              postContent={post.post.content}
              postDate={post.post.date}
              postId={post.post.id}
            />
            ))}
            {loading && 
            <Skeleton variant="rounded" width="100%" height={300}/>
            }
            {!loading && posts.length === 0 &&
              <Box
                sx={{
                  width: "100%",
                  padding: "30px 0"
                }}
              >
                <Typography
                    variant="h1"
                    fontSize="28px"
                    fontWeight="bold"
                    textAlign="center"
                    color= "#b7b7b7"
                >
                    Ainda não existem publicações!
                </Typography>
              </Box>
            }
          </Stack>
        </Grid>
        <Grid item xs={4} sx={{ paddingLeft: "27px" }}>

        </Grid>
      </Grid>
    </>
  );
}
