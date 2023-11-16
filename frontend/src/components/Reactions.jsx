import * as React from "react";
import Cookies from "universal-cookie";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { urlApis } from "@/globals";
import reaction1 from "@/assets/icons/reactions/1.svg";
import reaction2 from "@/assets/icons/reactions/2.svg";
import reaction3 from "@/assets/icons/reactions/3.svg";
import reaction4 from "@/assets/icons/reactions/4.svg";
import reaction5 from "@/assets/icons/reactions/5.svg";


export default function Reactions({ postId }) {
    const [activeReaction, setActiveReaction] = React.useState(null);
    const [myReaction, setMyReaction] = React.useState(null);
    const reactions = [
        {
            "title": "Amei",
            "label": "love",
            "icon": reaction1
        },
        {
            "title": "Rindo",
            "label": "funny",
            "icon": reaction2
        },
        {
            "title": "Surpreso",
            "label": "surprise",
            "icon": reaction3
        },
        {
            "title": "Triste",
            "label": "sadness",
            "icon": reaction4
        },
        {
            "title": "Bravo",
            "label": "anger",
            "icon": reaction5
        },
    ];
    const cookies = new Cookies();
    const userToken = cookies.get("utoken");
    const userId = cookies.get("uid");

    const findElementIndexByKey = (array, key, value) => {
        return array.findIndex((element) => element[key] === value);
    };

    React.useEffect(() => {
        const getReactions = () => {
          return new Promise((resolve, reject) => {
            fetch(urlApis["social"] + "/posts/" + postId + "/reactions", {
              method: "GET",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userToken,
              },
            })
              .then((res) => res.json())
              .then((currentReactions) => {
                let my_reaction_index = findElementIndexByKey(currentReactions, "user_id", parseInt(userId));

                if(my_reaction_index !== -1) {
                    let my_reaction = currentReactions[my_reaction_index];

                    setMyReaction(my_reaction);

                    let index_in_reactions = findElementIndexByKey(reactions, "label", my_reaction.type);

                    setActiveReaction(index_in_reactions);
                }

                resolve();
              })
              .catch((err) => {
                reject();
              });
          });
        };
      
        getReactions();
    }, []);

    let addReaction = async (type) => {
        try {
            let method = (myReaction === null) ? "POST" : "PUT";
            let urlExtra = (myReaction === null) ? "" : "/"+myReaction.id;
            let res = await fetch(urlApis["social"]+"/posts/"+postId+"/reactions"+urlExtra, {
                    method: method,
                    mode: "cors",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+userToken
                },
                body: JSON.stringify({
                    user_id: userId,
                    post_id: postId,
                    type: type,
                }),
            });
        } catch (err) {}
    };

    let removeReaction = async () => {
        try {
            let res = await fetch(urlApis["social"]+"/posts/"+postId+"/reactions/"+myReaction.id, {
                    method: "DELETE",
                    mode: "cors",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+userToken
                },
            });
        } catch (err) {}
    };

    const handleReactionClick = (index) => {
        if(activeReaction === index) {
            setActiveReaction(null);
            removeReaction();
        } else {
            setActiveReaction(index);
            addReaction(reactions[index].label);
        }
    };

    return (
        <Stack 
            direction="row" 
            spacing="25px" 
            className={`reactions${activeReaction !== null ? ' reacted' : ''}`}
        >
            {Array.from(reactions).map((reaction, index) => (
            <Stack 
                key={index}
                spacing="2px"
                alignItems="center"
                justifyContent="center"
                className={`reaction${activeReaction === index ? ' active' : ''}`}
                onClick={() => handleReactionClick(index)}
            >
                <img 
                    src={reaction.icon} 
                    className="reaction-icon"
                />
                <Typography 
                    component="span"
                    fontSize={11}
                    className="reaction-title"
                >
                    { reaction.title }
                </Typography>
            </Stack>
            ))}
        </Stack>                                            
    );
}