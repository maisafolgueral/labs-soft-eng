import * as React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Post from "@/components/Post";
import InfoBox from "@/components/InfoBox";
import ListDetail from "@/components/ListDetail";
import FollowButton from "@/components/FollowButton";
import AddPost from "@/components/AddPost";
import IconWithTitle from "@/components/IconWithTitle";
import { Icon } from "@/components/Icon";


function Header() {
  return (
    <Grid container alignItems="center">
      <Grid item xs={7}>
        <IconWithTitle
            iconName="ChatQuote"
            title="Galáxias"
            color="#404040"
            href="/h/topics/:id"
        />
      </Grid>
      <Grid container item xs={5} justifyContent="right">
        <FollowButton/>
      </Grid>
    </Grid>
  );
}

function Content() {
  let listDetailItems = [
    {
        "icon": <Icon iconName="Person" color="#777777" size={20}/>,
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
            <AddPost showTopics/>
            {Array.from(Array(10)).map((_, index) => (
              <Post showTopics/>
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