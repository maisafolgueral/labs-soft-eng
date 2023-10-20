
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


export default function Reaction(props) {
    return (
        <Stack 
            spacing="2px"
            alignItems="center"
            justifyContent="center"
        >
            <img 
                src={props.icon} 
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
                { props.title }
            </Typography>
        </Stack>                                              
    );
}