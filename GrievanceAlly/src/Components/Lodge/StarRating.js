import '@fortawesome/fontawesome-free/css/all.css';
import React, { useState } from 'react';
import './StarRating.css';
import { Button } from '@mui/material';

const StarRating = ({handleBackClick}) => {
  const [rating, setRating] = useState(0);
  const[feed,setfeed] = useState('');

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <div>
        <div className="star-rating">
        {[5, 4, 3, 2, 1].map((value) => (
            <React.Fragment key={value}>
            <input
                id={`star-${value}`}
                type="radio"
                name="rating"
                value={`star-${value}`}
                onClick={() => handleStarClick(value)}
            />
            <label htmlFor={`star-${value}`} title={`${value} stars`}>
                <i className={`active fas fa-star${rating === value ? ' selected' : ''}`} aria-hidden="true"></i>
            </label>
            </React.Fragment>
        ))}
        {rating && <p>You selected {rating} stars!</p>}
        </div>
        <textarea
        autoComplete="off"
        className="input1 "
        cols="50"
        id="Remarks"
        maxLength="2000"
        name="Remarks"
        placeholder="Please Enter Text of Grievance (Remarks)"
        rows="5"
        value={feed}
        onChange={(e)=>{setfeed(e.target.value)}}
        ></textarea>
        <Button variant='contained' color='secondary' sx={{backgroundColor:'green'}} onClick={()=>{alert("Submitted Successfully");handleBackClick()}}>Submit</Button>

    </div>
    
  );
};

export default StarRating;