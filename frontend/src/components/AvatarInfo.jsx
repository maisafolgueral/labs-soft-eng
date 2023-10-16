import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";


export default function Profile(props) {
    return (
        <Stack 
            spacing="10px"
            direction="row"
            alignItems="center"
        >
            <Avatar 
                src="/broken-image.jpg" 
                sx={{ 
                    width: props.avatarSize, 
                    height: props.avatarSize
                }}
            />
            <Stack spacing="7px">
                <Typography 
                    component= "span"
                    fontSize= {15}
                    color= "#404040"
                    height= "10.7px" 
                >
                    { props.title }
                </Typography>
                <Typography 
                    component= "span"
                    fontSize= {11}
                    color= "#777777"
                >
                    { props.subtitle }
                </Typography>
            </Stack>
        </Stack>
    );
}