import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';


export default function InfoBox(props) {
    const { Header, Content } = props;
    return (
        <Box
            sx={{
                width: "100%",
                backgroundColor: "#fff",
                border: "1px solid #c4c4c4",
                borderRadius: "5px",
                padding: "28px"
            }}
        >
            <Header/>
            <Divider sx={{ marginTop: "27px", marginBottom: "27px" }}/>
            <Content/>
        </Box>
    );
}