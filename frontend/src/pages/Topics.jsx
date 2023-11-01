import Grid from "@mui/material/Grid";
import ListDetail from "@/components/ListDetail";
import InfoBox from "@/components/InfoBox";
import IconWithTitle from "@/components/IconWithTitle";
import FollowButton from "@/components/FollowButton";
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

export default function Topics() {
  return (
    <>
      <Grid 
        container 
        spacing="28px" 
        rowSpacing="28px" 
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(20)).map((_, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <InfoBox
            Header={Header}
            Content={Content}
          />
        </Grid>
        ))}
      </Grid>
    </>
  );
}