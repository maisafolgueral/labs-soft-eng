import * as React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import AddPost from "@/components/AddPost";
import Post from "@/components/Post";


export default function Timeline() {
  const [posts, setPosts] = React.useState([]);

  let onPublishPost = (post) => {
    setPosts([post, ...posts]);
  }

  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Stack spacing="28px">
            <AddPost onPublishPost={onPublishPost}/>
            {posts.map(post => (
            <Post
              userFullname={post.user.name+" "+post.user.surname}
              userId={post.user.id}
              topicSubject={post.topic.subject}
              topicId={post.topic.id}
              postTitle={post.post.title}
              postContent={post.post.content}
              postDate={post.post.date}
            />
            ))}
          </Stack>
        </Grid>
        <Grid item xs={4} sx={{ paddingLeft: "27px" }}>

        </Grid>
      </Grid>
    </>
  );
}
