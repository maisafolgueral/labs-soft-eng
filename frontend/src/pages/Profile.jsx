import * as React from "react";
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
    PencilFill,
    PlusLg,
    CheckLg
} from "react-bootstrap-icons";

function InfoBoxAction() {
  const [following, setFollowing] = React.useState(false);

  const handleFollow = () => {
    setFollowing(true);
  };

  const handleUnfollow = () => {
    setFollowing(false);
  };

  return (
    <>
      {following ?
      <Button 
        variant="contained"
        size="small"
        color="secondary"
        startIcon={<CheckLg size={13}/>}
        sx={{
          fontSize: "12px"
        }}
        onClick={handleUnfollow}
      >
        Seguindo
      </Button>
      :
      <Button 
        variant="contained"
        size="small"
        startIcon={<PlusLg size={13}/>}
        sx={{
          fontSize: "12px"
        }}
        onClick={handleFollow}
      >
        Seguir
      </Button>
      }
    </>
  );
}

function InfoBoxHeader() {
  const [owner, setOwner] = React.useState(false);

  return (
    <Grid container alignItems="center">
      <Grid item xs={7}>
        <AvatarInfo 
          avatarSize={40}
          avatarFontSize={18}
          name="Marie Canon"
          description="@mariecanon"
          href="/h/profile/:id"
        />
      </Grid>
      <Grid container item xs={5} justifyContent="right">
        {owner ?
        <Button 
          variant="contained"
          size="small"
          startIcon={<PencilFill size={10} />}
          href="/h/profile/edit"
          sx={{
            fontSize: "12px"
          }}
        >
          Editar
        </Button>
        :
        <InfoBoxAction/>
        }
      </Grid>
    </Grid>
  );
}

function InfoBoxContent() {
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
    <ListDetail title="Seguindo" items={listDetailItems}/>
  );
}

export default function Profile() {
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