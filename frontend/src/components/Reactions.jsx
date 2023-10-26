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
            "title": "Engraçado",
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
            "title": "Raiva",
            "icon": reaction5
        },
    ];

    return (
        <Stack direction="row" spacing="25px">
            {Array.from(reactions).map((reaction, index) => (
            <Stack 
                spacing="2px"
                alignItems="center"
                justifyContent="center"
            >
                <img 
                    src={reaction.icon} 
                    style={{
                        height: "28px",
                        cursor: "pointer"
                    }}
                />
                <Typography 
                    component="span"
                    fontSize={11}
                    color="#404040"
                    sx={{
                        display: 'none'
                    }}
                >
                    { reaction.title }
                </Typography>
            </Stack>
            ))}
        </Stack>                                            
    );
}