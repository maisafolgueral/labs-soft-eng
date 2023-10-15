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
      }}
    >
      <Stack spacing="20px" sx={{ padding: "27px" }}>
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
        <Divider variant="middle" sx={{ background: "#c4c4c4" }}/>
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
      </Stack>
    </Box>
  );
}