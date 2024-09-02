import React, { useState } from 'react'
import StarRating from './StarRating';
import { Button } from '@mui/material';

export default function Feedback({handleBackClick}) {
    return (
        <div style={{ margin: '20px auto',padding:'40px', border: '4px solid #ddd', borderRadius: '8px', width: '92%' }}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
                <p style={{fontSize:'22px'}}><b>Rate the Quality of the department</b></p>
                <Button sx={{backgroundColor:'rgb(226, 62, 62)'}}variant="contained" color='secondary' onClick={()=>{handleBackClick()}}>Back</Button>
            </div>
            <StarRating handleBackClick={handleBackClick}/>
        </div>
    )
}
