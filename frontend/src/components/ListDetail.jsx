import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";


function Item(props) {
    return (
        <Stack spacing="8px" direction="row">
            { props.icon }
            <Typography 
                component="span"
                fontSize={14}
                color="#777777"
            >
                { props.title }
            </Typography>
        </Stack>
    );
}

export default function ListDetail(props) {
    let items = props.items;

    return (
        <Stack spacing="10px">
            <Typography 
                color= "#404040"
                fontSize={14}
            >
                { props.title }
            </Typography>
            {items.map((item) => (
                <Item icon={item.icon} title={item.title}/>
            ))}
        </Stack>
    );
}