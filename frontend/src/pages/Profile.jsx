import * as React from "react";
import { useParams } from 'react-router-dom';
import Cookies from "universal-cookie";
import Skeleton from '@mui/material/Skeleton';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { urlApis } from "@/globals";
import Post from "@/components/Post";
import InfoBox from "@/components/InfoBox";
import AvatarInfo from "@/components/AvatarInfo";
import ListDetail from "@/components/ListDetail";
import FollowButton from "@/components/FollowButton";
import { Icon } from "@/components/Icon";


function InfoBoxHeader(id, user) {
  const [following, setFollowing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const cookies = new Cookies();
  const userToken = cookies.get("utoken");
  const userId = cookies.get("uid");

  React.useEffect(() => {
    let getProfileOwnerFollowers = async () => {
      try {
        const res = await fetch(urlApis["social"]+"/users/"+id+"/followers", {
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
    getProfileOwnerFollowers();
  }, []);

  let handleInteraction = async (isToFollow) => {
    try {
      let method = isToFollow ? 'PUT' : 'DELETE';

      fetch(urlApis["social"]+"/users/"+userId+"/followed/"+id, {
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
        <AvatarInfo 
          avatarSize={40}
          avatarFontSize={18}
          name={user.name +" "+ user.surname}
        />
      </Grid>
      <Grid container item xs={5} justifyContent="right">
        {id === userId ?
        <Button 
          variant="contained"
          size="small"
          startIcon={<Icon iconName="PencilFill" size={10}/>}
          href="/h/profile/edit"
          sx={{
            fontSize: "12px"
          }}
        >
          Editar
        </Button>
        :
        <>
        {loading ? 
        <Skeleton variant="rounded" width={100} height={35}/>
        :
        <FollowButton onClick={handleInteraction} isFollowing={following}/>
        }
        </>
        }
      </Grid>
    </Grid>
  );
}

function InfoBoxContent(followed, topics) {
  let total_followed = followed.length;
  let followed_text = " pessoa";
  if(total_followed === 0 || total_followed > 1)
  {
    followed_text += "s";
  }

  let total_topics = topics.length;
  let topics_text = " tópico";
  if(total_topics === 0 || total_topics > 1)
  {
    topics_text += "s";
  }

  let listDetailItems = [
    {
        "icon": <Icon iconName="Person" color="#777777" size={20}/>,
        "title": total_followed+followed_text
    },
    {
        "icon": <Icon iconName="ChatQuote" color="#777777" size={20}/>,
        "title": total_topics+topics_text
    }
  ];

  return (
    <ListDetail title="Seguindo" items={listDetailItems}/>
  );
}

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = React.useState(null);
  const [userLoading, setUserLoading] = React.useState(true);
  const [followed, setFollowed] = React.useState([]);
  const [followedLoading, setFollowedLoading] = React.useState(true);
  const [topics, setTopics] = React.useState([]);
  const [topicsLoading, setTopicsLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true); 

  const cookies = new Cookies();
  const userToken = cookies.get("utoken");
  const userId = cookies.get("uid");

  React.useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(urlApis["social"]+"/users/"+id, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+userToken
          },
        });
        
        let currentUser = await res.json();
        setUser(currentUser);
      } catch(err) {
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    }
    getUser()
  }, []);

  React.useEffect(() => {
    const getUserFollowed = async () => {
      try {
        const res = await fetch(urlApis["social"]+"/users/"+id+"/followed", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+userToken
          },
        });
        
        let currentFollowed = await res.json();
        setFollowed(currentFollowed);
      } catch(err) {
        setFollowed([]);
      } finally {
        setFollowedLoading(false);
      }
    }
    getUserFollowed()
  }, []);

  React.useEffect(() => {
    const getUserTopics = async () => {
      try {
        const res = await fetch(urlApis["social"]+"/users/"+id+"/topics", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+userToken
          },
        });
        
        let currentTopics = await res.json();
        setTopics(currentTopics);
      } catch(err) {
        setTopics([]);
      } finally {
        setTopicsLoading(false);
      }
    }
    getUserTopics()
  }, []);

  React.useEffect(() => {
    const getUserPosts = async () => {
      try {
        
        const res = await fetch(urlApis["social"]+"/users/"+id+"/posts", {
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
    getUserPosts()
  }, []);

  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Stack spacing="28px">
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
                    {user.id == userId ? "Você" : user.name} ainda não tem publicações!
                </Typography>
              </Box>
            }
          </Stack>
        </Grid>
        <Grid item xs={4} sx={{ paddingLeft: "27px" }}>
          {userLoading && followedLoading && topicsLoading &&
          <Grid item xs={2} sm={4} md={4}>
            <Skeleton variant="rounded" width={340} height={194}/>
          </Grid>
          }
          
          {!userLoading && !followedLoading && !topicsLoading &&
          <InfoBox
            Header={() => InfoBoxHeader(id, user)}
            Content={() => InfoBoxContent(followed, topics)}
          />
          }
        </Grid>
      </Grid>
    </>
  );
}