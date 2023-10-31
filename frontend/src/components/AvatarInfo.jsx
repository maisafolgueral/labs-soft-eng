import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import AvatarWithLetter from '@/components/AvatarWithLetter';


export default function AvatarInfo(props) {
    return (
        <Stack 
            spacing="10px"
            direction="row"
            alignItems="center"
        >
            <Link href={props.href} sx={{ textDecoration: "none" }}>
                <AvatarWithLetter
                    name={props.name}
                    size={props.avatarSize}
                    fontSize={props.avatarFontSize}
                />
            </Link>
            <Stack spacing="7px">
                <Typography 
                    component= "span"
                    fontSize= {props.nameFontSize ? props.nameFontSize : "15px"}
                    color= "#404040"
                    //height= "10.7px"
                >
                    <Link href={props.href}
                        sx={{
                            textDecoration: "none",
                            color: "inherit"
                        }}
                    >
                        {props.onlyFirstName ?
                            props.name.split(" ")[0] :
                            props.name
                        }
                    </Link>
                </Typography>

                {props.description &&
                <Typography 
                    component= "span"
                    fontSize= {props.descFontSize ? props.descFontSize : "11px"}
                    color= "#777777"
                >
                    { props.description }
                </Typography>
                }
            </Stack>
        </Stack>
    );
}