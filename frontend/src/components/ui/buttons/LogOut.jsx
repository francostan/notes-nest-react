import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabase/client';

const BackButton = () => {

  const navigate = useNavigate();

  const handleBack = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }    
  };

  return (
    <IconButton aria-label="Volver" style={{ color: "red" }} onClick={handleBack}>
      <Logout />
    </IconButton>
  );
};

export default BackButton;