import Cookies from "universal-cookie";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import { NavLink } from "react-router-dom"
import { 
  House,
  ChatQuote,
  ExclamationTriangle,
  BoxArrowLeft
} from "react-bootstrap-icons";


export default function LeftBar() {
  const logout = () => {
    const cookies = new Cookies();
    cookies.remove("utoken", { path: "/" });
    cookies.remove("uid", { path: "/" });
    cookies.remove("uname", { path: "/" });
    window.location.reload(true);
  }

  return (
    <Box
      sx={{
        width: "219px",
        top: "68px",
        left: 0,
        bottom: 0,
        position: "fixed",
        backgroundColor: "#fff",
        borderRight: "1px solid #c4c4c4",
        zIndex: "3000"
      }}
    >
      <Stack spacing="20px" sx={{ padding: "27px" }}>
        <NavLink to="/h/timeline" className="left-bar-item">
          <Stack 
            spacing="12px" 
            direction="row" 
            sx={{ height: "30px" }}
          >
            <House size={30} className="left-bar-item-icon"/>
            <Typography 
              component="span"
              fontSize={20}
              className="left-bar-item-title"
            >
              Início
            </Typography>
          </Stack>
        </NavLink>
        <NavLink to="/h/topics" className="left-bar-item">
          <Stack spacing="12px" direction="row">
            <ChatQuote size={30} className="left-bar-item-icon"/>
            <Typography 
              component="span"
              fontSize={20}
              className="left-bar-item-title"
            >
              Tópicos
            </Typography>
          </Stack>
        </NavLink>
        <Divider variant="middle" sx={{ background: "#c4c4c4" }}/>
        <NavLink to="/h/feedback" className="left-bar-item">
          <Stack spacing="12px" direction="row">
            <ExclamationTriangle size={30} className="left-bar-item-icon"/>
            <Typography 
              component="span"
              fontSize={20}
              className="left-bar-item-title"
            >
              Feedback
            </Typography>
          </Stack>
        </NavLink>
        <div className="left-bar-item" onClick={logout}>
          <Stack spacing="12px" direction="row">
              <BoxArrowLeft size={30} className="left-bar-item-icon"/>
              <Typography 
                component="span"
                fontSize={20}
                className="left-bar-item-title"
                onClick={logout}
              >
                Sair
              </Typography>
            </Stack>
        </div>
      </Stack>
    </Box>
  );
}