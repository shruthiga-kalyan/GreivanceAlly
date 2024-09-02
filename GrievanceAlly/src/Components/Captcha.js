import {Alert, Button, CardActions, CardContent, CardHeader, Divider, TextField} from "@mui/material";
import React, {useState} from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import './style.css';

export const Captcha = () => {
  const randomString = Math.random().toString(36).slice(8);
  const [captcha, setCaptcha] = useState(randomString);
  const [text, setText] = useState("");
  const [valid, setValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const[cap,setcap]=useState('');
  const refreshString = () => {
    setCaptcha(Math.random().toString(36).slice(8));
  };

  const matchCaptcha = (event) => {
    event.preventDefault();
    if(text === captcha){
      setValid(false);
      setSuccess(true);
    }
    else{
      setValid(true);
      setSuccess(false);
    }
  }

  return(
    <React.Fragment>
    {success && (
      <Alert variant="outlined" sx={{marginBottom: "20px", width:"130px"}}>Successful</Alert>
    )}<div sx={{marginTop:"30vw"}}>
                <div className="h3">{captcha}</div>
                <Button startIcon={<RefreshIcon/>} onClick={() => refreshString()} >
                </Button>
              <form onSubmit={matchCaptcha}>
                <TextField label="Enter Captcha" size="small"
                focused
                value={cap}
                onChange={(e)=>{setcap(e.target.value)}}
                error={valid} />
                {/* <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{ marginLeft:"50px" }}>Submit</Button> */}
              </form>
              </div>
    </React.Fragment>
  )
}

