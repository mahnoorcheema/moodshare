import React from 'react';
import './CalendarDetails.css';

const DAYS_OF_THE_WEEK = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default class CalendarDetails extends React.Component{
  render(){
    const date = this.props.date;
    const moods = this.props.moods;


    return(<>
      <h2 className="date">{`${DAYS_OF_THE_WEEK[date.getDay()]}, ${MONTHS[date.getMonth()]} ` + date.getDate()}</h2>
      {moods.map(mood => <>
        <p>{mood.emoji}</p>
        <b className="more-info-mood"> {`Mood: ${mood.mood}`} </b>
        <p>{mood.value}</p>
      </>)}
    </>);
  }
}