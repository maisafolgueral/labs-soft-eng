import * as React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import Post from '@/components/Post';
import Typography from "@mui/material/Typography";
import InfoBox from '@/components/InfoBox';
import ListDetail from '@/components/ListDetail';
import { 
    ChatQuote,
    Person,
    PlusLg,
    CheckLg
} from "react-bootstrap-icons";
import AddPost from '@/components/AddPost';
import Link from "@mui/material/Link";


function Header() {
  const [following, setFollowing] = React.useState(false);

  const handleFollow = () => {
    setFollowing(true);
  };

  const handleUnfollow = () => {
    setFollowing(false);
  };

  return (
    <Grid container alignItems="center">
      <Grid item xs={7}>
        <Stack spacing="8px" direction="row">
          <Link href="/h/topics/:id"
            sx={{
                textDecoration: "none"
            }}
          >
            <ChatQuote color="#404040" size={23}/>
          </Link>
          <Typography 
              component="span"
              color="#404040"
              sx={{
                fontSize: "17px"
              }}
          >
            Galáxias
          </Typography>
        </Stack>
      </Grid>
      <Grid container item xs={5} justifyContent="right">
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
      </Grid>
    </Grid>
  );
}

function Content() {
  let listDetailItems = [
    {
        "icon": <Person color="#777777" size={20}/>,
        "title": "24 mil pessoas"
    }
  ];

  return (
    <ListDetail title="Seguido por" items={listDetailItems}/>
  );
}

export default function OneTopic() {
  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Stack spacing="28px">
            <AddPost insideTopic/>
            {Array.from(Array(10)).map((_, index) => (
              <Post/>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={4} sx={{ paddingLeft: "27px" }}>
          <InfoBox
            Header={Header}
            Content={Content}
          />
        </Grid>
      </Grid>
    </>
  );
}