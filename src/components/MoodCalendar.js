import React from 'react';
import ReactModal from 'react-modal';
import "./MoodCalendar.css";
import CurrentMoods from "./CurrentMoods";
import firebase from "firebase/app";
import "firebase/firestore";
import CalendarDetails from "./CalendarDetails";

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

function isSameDay(dateA, dateB) {
  return dateA.getDate() === dateB.getDate() && dateA.getMonth() === dateB.getMonth();
}

export default class MoodCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      moodsByDate: [],
      showCalendarDetails:false,
      disabledButton:false,
      selectedDay: "",
      selectedDayMoods: [],
    };
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  };

  closeModal = () => {
    this.setState({modalIsOpen: false});
  };

  getMoods = async () => {
    const {uid} = firebase.auth().currentUser;
    return firebase.firestore()
      .collection("users")
      .doc(uid)
      .collection("moods")
      .orderBy("date")
      // Where the date is in X days
      .get()
      .then(snapshot =>
        snapshot.docs
          .map(snap => snap.data())
          .map(({date, ...rest}) => ({
            date: date.toDate(),
            ...rest
          }))
      );
  };

  async componentDidMount() {
    try {
      const moods = await this.getMoods();
      const days = getDatesForLastMonth(new Date());

      const moodsByDate = days.map(date => ({
        date,
        moods: moods.filter(mood => isSameDay(mood.date, date))
      }));

      this.setState({moodsByDate});
      console.log("Got moods!", moodsByDate);
    } catch (error) {
      console.error("Failed to fetch moods", error);
    }
  }


  render() {
    const today = new Date();
    const days = getDatesForLastMonth(new Date());
    const spanningTwoMonths = days[0].getMonth() !== today.getMonth();
    const {moodsByDate} = this.state;

    return (
      <>
        <h2>Mood Calendar</h2>
        <h3 className="weekdays font-size-large">
          {spanningTwoMonths
            ? `${MONTHS[today.getMonth() - 1]} - ${MONTHS[today.getMonth()]}`
            : MONTHS[today.getMonth()]
          }
        </h3>
        <div>
          <button>Share Calendar</button>
        </div>
        <div className="calendar-container ">
          <div className="more-info">
            {this.state.showCalendarDetails ? <CalendarDetails date={this.state.selectedDay} moods={this.state.selectedDayMoods}/> :null}
          </div>
          <div className="calendar-background">
            <ol className="calendar-grid">
              {DAYS_OF_THE_WEEK.map(day => <li className="weekdays" key={day}>{day}</li>)}
              {moodsByDate.map(({date, moods}) =>
                <li key={date.getTime()}>
                  <button className="day-button" disabled={this.state.disabledButton}
                    onClick={() => {
                      this.setState({
                        showCalendarDetails: true,
                        selectedDay: date,
                        selectedDayMoods: moods,
                      });
                    }}>
                    {date.getDate()}
                    {/*{moods.map(mood => mood != [] ? mood.mood : this.setState({disabledButton: true}))}*/}
                    {moods.map(mood => mood.emoji)}
                  </button>
                </li>)}
            </ol>
          </div>
        </div>
        <button type="button" onClick={this.openModal} className="submit-btn">Add Today's Mood</button>
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          appElement={document.body}
          contentLabel="Mood Selector">
          <div>
            <CurrentMoods/>
          </div>
        </ReactModal>
      </>
    );
  }
}