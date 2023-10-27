import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AvatarInfo from "@/components/AvatarInfo";
import PostExpanded from "@/components/PostExpanded";
import Reactions from "@/components/Reactions";
import { ChatQuote, Chat } from "react-bootstrap-icons";


export default function Post() {
  return (
    <Box
        sx={{
            width: "100%",
            height: "auto",
            backgroundColor: "#fff",
            border: "1px solid #c4c4c4",
            borderRadius: "5px",
            padding: "20px"
        }}
    >
        <Grid container alignItems="center">
            <Grid item xs={6}>
                <AvatarInfo 
                    avatarSize={35}
                    avatarFontSize={16}
                    name="Mark Alain"
                    description="Publicado em 03 set 2023"
                    href="/h/profile/:id"
                />
            </Grid>
            <Grid item container xs={6} justifyContent="right">
                <Stack spacing="8px" direction="row">
                    <ChatQuote color="#777777" size={23}/>
                    <Typography 
                        component="span"
                        fontSize={18}
                        color="#777777"
                    >
                        Galáxias
                    </Typography>
                </Stack>
            </Grid>
        </Grid>

        <Box sx={{ width: "100%", marginTop: "30px" }}>
            <Typography 
                component="span"
                fontSize={16}
                fontWeight="bold"
                color="#404040"
            >
                Título da publicação
            </Typography>
            <Typography 
                component="p"
                fontSize={14}
                color="#404040"
                textAlign="justify"
            >
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas quis erat sed massa lacinia accumsan sit amet sit amet quam. Morbi at ante sed turpis blandit molestie. Duis lacus nunc, rhoncus a mattis vel, imperdiet at sem. Ut in lorem ac nisl venenatis malesuada vel non massa. Maecenas nec fringilla eros, tempor ultricies risus. Nullam risus lacus, luctus non viverra ac, suscipit non magna. Ut quis risus varius, rutrum sem sit amet, ullamcorper nibh. Fusce tincidunt rutrum leo, eget posuere diam dictum eget. Mauris sollicitudin sem nec erat dictum, eget consectetur tortor pulvinar. Ut facilisis sagittis ante ac tincidunt. Sed porttitor interdum sodales. Nunc lacinia leo vitae sapien consectetur rutrum at eu risus. Ut mollis arcu non diam accumsan congue. 
            </Typography>
        </Box>
        
        <Grid container alignItems="center" sx={{ paddingTop: "35px" }}>
            <Grid item xs={6}>
                <Reactions/>
            </Grid>
            <Grid item container xs={6} justifyContent="right">
                <Stack 
                    spacing="8px" 
                    alignItems="center"
                    direction="row"
                >
                    <PostExpanded/>
                </Stack>
            </Grid>
        </Grid>

    </Box>                                                 
  );
}