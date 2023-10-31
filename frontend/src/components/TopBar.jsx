import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import AvatarInfo from "@/components/AvatarInfo";
import isologo from "@/assets/branding/hola-isologo-coloful.svg";


export default function TopBar() {
  return (
    <Box
      sx={{
        height: "68px",
        top: 0,
        right: 0,
        left: 0,
        position: "fixed",
        backgroundColor: "#fff",
        borderBottom: "1px solid #c4c4c4",
        padding: "17px 27px",
        zIndex: "3000"
      }}
    >
      <Grid container>
        <Grid item xs={11}>
          <Link href="/h/timeline">
            <img 
              src={isologo}
              style={{
                height: "34px"
              }}
            />
          </Link>
        </Grid>
        <Grid item container xs={1} alignItems="center" justifyContent="right">
          <AvatarInfo 
              avatarSize={34}
              avatarFontSize={15}
              name="Marie Canon"
              nameFontSize={18}
              onlyFirstName
              href="/h/profile/:id"
          />
        </Grid>
      </Grid>
    </Box>
  );
}