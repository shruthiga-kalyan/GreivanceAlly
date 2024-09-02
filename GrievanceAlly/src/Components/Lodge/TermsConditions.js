import React, { useState } from 'react'
import { Button } from '@mui/material'
import '@fortawesome/fontawesome-free/css/all.css';


export default function TermsConditions({handleBackClick,handletolodge}) {
    const[isChecked,setChecked] = useState(false);
    const handleClick=()=>{
        if(!isChecked){
            alert("Accept Terms and Conditions");
            return;
        }
        else{
            handletolodge();
        }
    }
    return (
        <div style={{ margin: '20px auto',padding:'40px', border: '4px solid #ddd', borderRadius: '8px', width: '92%' }}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
                <p style={{fontSize:'22px'}}><b>Terms and Conditions:</b></p>
                <Button sx={{backgroundColor:'rgb(226, 62, 62)'}}variant="contained" color='secondary' onClick={()=>{handleBackClick()}}>Back</Button>
            </div>
            <div>
                <form role="form" id="myFormSubmit">
                    <div class="card-body">
                        <br></br>
                        <p class="text-center" style={{fontSize:'18px'}}><b>List of subjects/topics which can not be treated as grievance.</b></p><br></br>
                        <ul class="list-unstyled">
                            <li><small><i class="fa fa-circle text-primary" aria-hidden="true"></i></small>  RTI Matters</li><br></br>
                            <li><small><i class="fa fa-circle text-primary" aria-hidden="true"></i></small>  Court related / Subjudice matters</li><br></br>
                            <li><small><i class="fa fa-circle text-primary" aria-hidden="true"></i></small>  Religious matters</li><br></br>
                            <li><small><i class="fa fa-circle text-primary" aria-hidden="true"></i></small>  Suggestions</li><br></br>
                            <li><small><i class="fa fa-circle text-primary" aria-hidden="true"></i></small>  Grievances of Government employees concerning their service matters including disciplinary proceedings etc. unless the aggrieved employee has already exhausted the prescribed channels keeping in view the <a target="_blank" href="Home/Preview/RE9QVF9PTV9PblNlcnZpY2VNYXR0ZXJzKEVuZ2xpc2gpMzEtMDgtMjAxMy1Fc3R0LUEtSUlJLUVuZy5wZGY%3d">DoPT OM No. 11013/08/2013-Estt.(A-III) dated 31.08.2015</a></li>
                        </ul>
                        <br></br>
                        <label> <input size='large' type="checkbox" checked={isChecked} onChange={()=>{setChecked(!isChecked)}}/>&nbsp;&nbsp;&nbsp;
                        I agree that my grievance does not fall in any of the above listed categories</label>    
                    </div><br></br>
                    <div class="card-footer">
                        <Button variant='contained' color='secondary' sx={{backgroundColor:'green'}} onClick={handleClick}>Submit &nbsp;<i class="fa fa-arrow-circle-right"></i></Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
