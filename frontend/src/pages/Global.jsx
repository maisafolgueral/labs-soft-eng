import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import TopBar from "@/components/TopBar";
import LeftBar from "@/components/LeftBar";


export default function Global() {
  return (
    <>
      <TopBar/>
      <LeftBar/>
      <Box
        sx={{
          minHeight: "100vh",
          padding: "96px 28px 28px 247px",
          boxSizing: "border-box",
          backgroundColor: "#eaeaea"
        }}
      >
        <Outlet/>
      </Box>
    </>
  );
}