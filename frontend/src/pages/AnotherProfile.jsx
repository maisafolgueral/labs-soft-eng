import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import Post from '@/components/Post';
import InfoBox from "@/components/InfoBox";
import AvatarInfo from '@/components/AvatarInfo';
import ListDetail from '@/components/ListDetail';
import { 
    ChatQuote,
    Person,
    PlusLg
} from "react-bootstrap-icons";


function InfoBoxHeader() {
  return (
    <Grid container alignItems="center">
      <Grid item xs={7}>
        <AvatarInfo 
          avatarSize={40}
          avatarFontSize={18}
          name="Mark Alain"
          description="@markalain"
        />
      </Grid>
      <Grid container item xs={5} justifyContent="right">
        <Button 
          variant="contained"
          size="small"
          startIcon={<PlusLg size={13} />}
          sx={{
            fontSize: "12px"
          }}
        >
          Seguir
        </Button>
      </Grid>
    </Grid>
  );
}

function InfoBoxContent() {
  let listDetailItems = [
    {
        "icon": <Person color="#777777" size={20}/>,
        "title": "240 pessoas"
    },
    {
        "icon": <ChatQuote color="#777777" size={20}/>,
        "title": "10 tópicos"
    }
  ];

  return (
    <ListDetail title="Seguindo" items={listDetailItems}/>
  );
}

export default function AnotherProfile() {
  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Stack spacing="28px">
            {Array.from(Array(10)).map((_, index) => (
              <Post/>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={4} sx={{ paddingLeft: "27px" }}>
          <InfoBox
            Header={InfoBoxHeader}
            Content={InfoBoxContent}
          />
        </Grid>
      </Grid>
    </>
  );
}