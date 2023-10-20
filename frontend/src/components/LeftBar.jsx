import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import { 
  House,
  ChatQuote,
  ExclamationTriangle,
  BoxArrowLeft
} from "react-bootstrap-icons";
import Link from '@mui/material/Link';


export default function LeftBar() {
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
        <Link href="/h/timeline" underline="none">
          <Stack 
            spacing="12px" 
            direction="row" 
            sx={{ height: "30px" }}
          >
            <House color="#777777" size={30}/>
            <Typography 
              component="span"
              fontSize={20}
              color="#777777"
            >
              Início
            </Typography>
          </Stack>
        </Link>
        <Link href="/h/topics" underline="none">
          <Stack spacing="12px" direction="row">
            <ChatQuote color="#777777" size={30}/>
            <Typography 
              component="span"
              fontSize={20}
              color="#777777"
            >
              Tópicos
            </Typography>
          </Stack>
        </Link>
        <Divider variant="middle" sx={{ background: "#c4c4c4" }}/>
        <Link href="/h/feedback" underline="none">
          <Stack spacing="12px" direction="row">
            <ExclamationTriangle color="#777777" size={30}/>
            <Typography 
              component="span"
              fontSize={20}
              color="#777777"
            >
              Feedback
            </Typography>
          </Stack>
        </Link>
        <Link href="/" underline="none">
          <Stack spacing="12px" direction="row">
            <BoxArrowLeft color="#777777" size={30}/>
            <Typography 
              component="span"
              fontSize={20}
              color="#777777"
            >
              Sair
            </Typography>
          </Stack>
        </Link>
      </Stack>
    </Box>
  );
}