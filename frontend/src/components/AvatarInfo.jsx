import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import AvatarWithLetter from '@/components/AvatarWithLetter';
import Link from "@mui/material/Link";

export default function AvatarInfo(props) {
    return (
        <Stack 
            spacing="10px"
            direction="row"
            alignItems="center"
        >
            <Link href={props.href}
                sx={{
                    textDecoration: "none"
                }}
            >
                <AvatarWithLetter
                    name={props.name}
                    size={props.avatarSize}
                    fontSize={props.avatarFontSize}
                />
            </Link>
            <Stack spacing="7px">
                    <Typography 
                        component= "span"
                        fontSize= {15}
                        color= "#404040"
                        height= "10.7px" 
                    >
                        <Link href={props.href}
                            sx={{
                                textDecoration: "none",
                                color: "inherit"
                            }}
                        >
                        { props.name }
                        </Link>
                    </Typography>
            
                <Typography 
                    component= "span"
                    fontSize= {11}
                    color= "#777777"
                >
                    { props.description }
                </Typography>
            </Stack>
        </Stack>
    );
}