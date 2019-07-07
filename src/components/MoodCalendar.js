import React from 'react';
import ReactModal from 'react-modal';
import "./MoodCalendar.css";
import CurrentMoods from "./CurrentMoods";
const NUM_ROWS = 5;
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const DAYS_OF_THE_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDatesForLastMonth(endDate) {
  const dayOfWeek = endDate.getDay();
  const totalDays = 7 * (NUM_ROWS - 1) + dayOfWeek + 1;

  const datesForLastMonth = [];
  for (let i = 0; i < totalDays; i++) {
    const daysAgo = totalDays - i - 1;
    const date = new Date(endDate.getTime() - daysAgo * DAY_IN_MILLISECONDS);
    datesForLastMonth.push(date);
  }
  return datesForLastMonth;
}
export default class MoodCalendar extends React.Component {
  constructor(props){
    super(props);
    this.state = {modalIsOpen: false};
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  };

  closeModal = () => {
    this.setState({modalIsOpen: false});
  };


  render() {
    const today = new Date();
    const days = getDatesForLastMonth(today);
    const spanningTwoMonths = days[0].getMonth() !== today.getMonth();
    return (
      <div className="calendar-background">
        <h2>Mood Calendar</h2>
        <h3>
          {spanningTwoMonths
            ? `${MONTHS[today.getMonth() - 1]} - ${MONTHS[today.getMonth()]}`
            : MONTHS[today.getMonth()]
          }
        </h3>
        <ol className="calendar-grid">
          {DAYS_OF_THE_WEEK.map(day => <li key={day}>{day}</li>)}
          {days.map(date =>
            <li key={date.getTime()}>
              {date.getDate()}
            </li>)}
        </ol>
        <button type="button" onClick={this.openModal}>Add Today's Mood</button>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Mood Selector">
          <div>
            <CurrentMoods/>
          </div>
        </ReactModal>
      </div>
    );
  }
}