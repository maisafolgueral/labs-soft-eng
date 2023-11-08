import { Outlet, Navigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { isAuthenticated } from "@/globals";
import TopBar from "@/components/TopBar";
import LeftBar from "@/components/LeftBar";


export default function Global() {
  let location = useLocation();
  let isAuth = isAuthenticated();
  
  if(!isAuth) {
      return <Navigate to="/login" state={{ from: location}} replace />
  }

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