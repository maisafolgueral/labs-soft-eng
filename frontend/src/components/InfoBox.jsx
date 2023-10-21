import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AvatarInfo from '@/components/AvatarInfo';
import ListDetail from '@/components/ListDetail';
import { 
    ChatQuote,
    Person,
    PencilFill
} from "react-bootstrap-icons";


export default function InfoBox() {
    let listDetailItems = [
        {
            "icon": <Person color="#777777" size={20}/>,
            "title": "20 pessoas"
        },
        {
            "icon": <ChatQuote color="#777777" size={20}/>,
            "title": "5 tópicos"
        }
    ];

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
            <Grid container alignItems="center">
                <Grid item xs={7}>
                    <AvatarInfo 
                        avatarSize={40}
                        avatarFontSize={18}
                        name="Marie Canon"
                        description="@mariecanon"
                    />
                </Grid>
                <Grid container item xs={5} justifyContent="right">
                    <Button 
                        fontSize={10}
                        variant="contained"
                        size="small"
                        startIcon={<PencilFill size={10} />}
                        href="/h/profile/edit"
                    >
                        Editar
                    </Button>
                </Grid>
            </Grid>

            <Divider sx={{ marginTop: "27px", marginBottom: "27px" }}/>

            <ListDetail title="Seguindo" items={listDetailItems}/>
        </Box>
    );
}