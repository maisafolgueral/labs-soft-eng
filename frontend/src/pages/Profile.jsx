import * as React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Post from "@/components/Post";
import InfoBox from "@/components/InfoBox";
import AvatarInfo from "@/components/AvatarInfo";
import ListDetail from "@/components/ListDetail";
import FollowButton from "@/components/FollowButton";
import { Icon } from "@/components/Icon";


function InfoBoxHeader() {
  const [profileOwner, setProfileOwner] = React.useState(false);

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
        {profileOwner ?
        <Button 
          variant="contained"
          size="small"
          startIcon={<Icon iconName="PencilFill" size={10}/>}
          href="/h/profile/edit"
          sx={{
            fontSize: "12px"
          }}
        >
          Editar
        </Button>
        :
        <FollowButton/>
        }
      </Grid>
    </Grid>
  );
}

function InfoBoxContent() {
  let listDetailItems = [
    {
        "icon": <Icon iconName="Person" color="#777777" size={20}/>,
        "title": "20 pessoas"
    },
    {
        "icon": <Icon iconName="ChatQuote" color="#777777" size={20}/>,
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