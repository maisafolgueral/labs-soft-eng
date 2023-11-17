import * as React from "react";
import Cookies from "universal-cookie";
import { useParams } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { urlApis } from "@/globals";
import Post from "@/components/Post";
import InfoBox from "@/components/InfoBox";
import ListDetail from "@/components/ListDetail";
import FollowButton from "@/components/FollowButton";
import AddPost from "@/components/AddPost";
import IconWithTitle from "@/components/IconWithTitle";
import { Icon } from "@/components/Icon";


const Header = (subject, id) => {
  const [following, setFollowing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const cookies = new Cookies();
  const userToken = cookies.get("utoken");
  const userId = cookies.get("uid");

  React.useEffect(() => {
    let getTopicFollowers = async () => {
      try {
        const res = await fetch(urlApis["social"]+"/topics/"+id+"/users", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+userToken
          },
        });
        
        const followers = await res.json();
        const isUserInFollowers = followers.some(obj => obj['id'] == userId);
        setFollowing(isUserInFollowers);
      } catch(err) {

      }
      finally {
        setLoading(false);
      }
    }
    getTopicFollowers();
  }, []);

  let handleInteraction = async (isToFollow) => {
    try {
      let method = isToFollow ? 'PUT' : 'DELETE';

      fetch(urlApis["social"]+"/users/"+userId+"/topics/"+id, {
          method: method,
          mode: "cors",
          headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+userToken
        },
      });
    } catch (err) {}
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={7}>
        <IconWithTitle
            iconName="ChatQuote"
            title={subject}
            color="#404040"
        />
      </Grid>
      <Grid container item xs={5} justifyContent="right">
        {loading ? 
        <Skeleton variant="rounded" width={100} height={35}/>
        :
        <FollowButton onClick={handleInteraction} isFollowing={following}/>
        }
      </Grid>
    </Grid>
  );
}

const Content = (total_followers) => {
  let followers_text = " pessoa";
  if(total_followers === 0 || total_followers > 1)
  {
    followers_text += "s";
  }

  let listDetailItems = [
    {
        "icon": <Icon iconName="Person" color="#777777" size={20}/>,
        "title": total_followers+followers_text
    }
  ];

  return (
    <ListDetail title="Seguido por" items={listDetailItems}/>
  );
};

export default function OneTopic() {
  const { id } = useParams();
  const [topic, setTopic] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const cookies = new Cookies();
  const userToken = cookies.get("utoken");

  React.useEffect(() => {
    const getTopic = async () => {
      try {
        
        const res = await fetch(urlApis["social"]+"/topics/"+id, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+userToken
          },
        });
        
        let currentTopic = await res.json();
        setTopic(currentTopic);
      } catch(err) {
        setTopic(null);
      } finally {
        setLoading(false);
      }  
    }
    getTopic()
  }, []);

  React.useEffect(() => {
    const getTopicPosts = async () => {
      try {
        
        const res = await fetch(urlApis["social"]+"/topics/"+id+"/posts", {
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
    getTopicPosts()
  }, []);

  let onPublishPost = (post) => {
    setPosts([post, ...posts]);
  }
  
  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Stack spacing="28px">
            <AddPost topicId={id} onPublishPost={onPublishPost}/>
            {!loading && posts.map(post => (
            <Post
              key={post.post.id}
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
        {loading && 
          <Grid item xs={2} sm={4} md={4}>
            <Skeleton variant="rectangular" width={340} height={194}/>
          </Grid>
        }
        {!loading && 
        <Grid item xs={4} sx={{ paddingLeft: "27px" }}>
          <InfoBox
            Header={() => Header(topic.subject, topic.id)}
            Content={() => Content(topic.total_followers)}
          />
        </Grid>
        }
      </Grid>
    </>
  );
}