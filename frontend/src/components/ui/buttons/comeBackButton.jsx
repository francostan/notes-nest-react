
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BackButton = ({handleClose}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if(handleClose) handleClose();
    else navigate("/");
  };

  return (
    <IconButton aria-label="Volver" onClick={handleBack}>
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;