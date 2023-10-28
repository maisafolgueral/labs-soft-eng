import React, { useState } from 'react';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import reaction1 from "@/assets/icons/reactions/1.svg";
import reaction2 from "@/assets/icons/reactions/2.svg";
import reaction3 from "@/assets/icons/reactions/3.svg";
import reaction4 from "@/assets/icons/reactions/4.svg";
import reaction5 from "@/assets/icons/reactions/5.svg";


export default function Reactions() {
    const reactions = [
        {
            "title": "Amei",
            "icon": reaction1
        },
        {
            "title": "Rindo",
            "icon": reaction2
        },
        {
            "title": "Surpreso",
            "icon": reaction3
        },
        {
            "title": "Triste",
            "icon": reaction4
        },
        {
            "title": "Bravo",
            "icon": reaction5
        },
    ];

    const [activeReaction, setActiveReaction] = useState(null);

    const handleReactionClick = (index) => {
        if(activeReaction === index) {
            setActiveReaction(null);
        } else {
            setActiveReaction(index);
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