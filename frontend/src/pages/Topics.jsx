import * as React from "react";
import Cookies from "universal-cookie";
import Skeleton from '@mui/material/Skeleton';
import Grid from "@mui/material/Grid";
import { urlApis } from "@/globals";
import ListDetail from "@/components/ListDetail";
import InfoBox from "@/components/InfoBox";
import IconWithTitle from "@/components/IconWithTitle";
import FollowButton from "@/components/FollowButton";
import { Icon } from "@/components/Icon";


const Header = (subject, id) => {
  const [following, setFollowing] = React.useState(false);
  const [loading, setLoading] = React.useState(true); 

  React.useEffect(() => {
    let getTopicFollowers = async () => {
      try {
        const cookies = new Cookies();
        const user_id = cookies.get("uid");
        
        const res = await fetch(urlApis["social"]+"/topics/"+id+"/users", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+cookies.get("utoken")
          },
        });
        
        const followers = await res.json();
        if(res.status === 200) {
          const isUserInFollowers = followers.some(obj => obj['id'] == user_id);
          setFollowing(isUserInFollowers);
        }
      } catch(err) {

      }
      finally {
        setLoading(false);
      }
    }
    getTopicFollowers()
  }, []);

  let handleInteraction = async (isToFollow) => {
    try {
      const cookies = new Cookies();
      const user_id = cookies.get("uid");
      let method = isToFollow ? 'PUT' : 'DELETE';

      fetch(urlApis["social"]+"/users/"+user_id+"/topics/"+id, {
          method: method,
          mode: "cors",
          headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+cookies.get("utoken")
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
            href={"/h/topics/"+id}
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
};


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


export default function Topics() {
  const [topics, setTopics] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const getTopics = async () => {
      try {
        const cookies = new Cookies();

        const res = await fetch(urlApis["social"]+"/topics", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+cookies.get("utoken")
          },
        });

        if (res.status !== 200) {
          setError("Ocorreu um erro em nosso servidor");
        }
        
        let currentTopics = await res.json();
        if(res.status === 200) {
          setTopics(currentTopics);
          setError(null);
        }
      } catch(err) {
        setError("Ocorreu um erro ao carregar os tópicos");
        setTopics(null);
      } finally {
        setLoading(false);
      }  
    }
    getTopics()
  }, []);

  return (
    <>
      <Grid 
        container 
        spacing="28px" 
        rowSpacing="28px" 
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {loading && Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Skeleton variant="rounded" width={340} height={194}/>
          </Grid>
        ))}

        {!loading && topics.map(topic => (
          <Grid item xs={2} sm={4} md={4} key={topic.id}>
            <InfoBox
              key={topic.id}
              Header={() => Header(topic.subject, topic.id)}
              Content={() => Content(topic.total_followers)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}