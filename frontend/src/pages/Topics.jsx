import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import ListDetail from '@/components/ListDetail';
import InfoBox from "@/components/InfoBox";
import { 
    ChatQuote,
    Person,
    PlusLg
} from "react-bootstrap-icons";


function Header() {
  return (
    <Grid container alignItems="center">
      <Grid item xs={7}>
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
      <Grid container item xs={5} justifyContent="right">
        <Button 
          fontSize={10}
          variant="contained"
          size="small"
          startIcon={<PlusLg size={14} />}
        >
          Seguir
        </Button>
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

export default function Topics() {
  return (
    <>
      <Grid container spacing="28px" rowSpacing="28px" columns={{ xs: 4, sm: 8, md: 12 }}>
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