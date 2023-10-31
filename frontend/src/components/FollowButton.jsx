import * as React from "react";
import Button from "@mui/material/Button";
import { 
  PlusLg,
  CheckLg
} from "react-bootstrap-icons";

export default function FollowButton() {
  const [following, setFollowing] = React.useState(false);

  const handleFollow = () => {
    setFollowing(true);
  };

  const handleUnfollow = () => {
    setFollowing(false);
  };

  return (
    <>
      {following ?
      <Button 
        variant="contained"
        size="small"
        color="secondary"
        startIcon={<CheckLg size={13}/>}
        sx={{
          fontSize: "12px"
        }}
        onClick={handleUnfollow}
      >
        Seguindo
      </Button>
      :
      <Button 
        variant="contained"
        size="small"
        startIcon={<PlusLg size={13}/>}
        sx={{
          fontSize: "12px"
        }}
        onClick={handleFollow}
      >
        Seguir
      </Button>
      }
    </>
  );
}