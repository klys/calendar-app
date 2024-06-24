
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {useState, useEffect} from 'react'
import CalendarBox from './CalendarBox';
import CalendarEventModal from './CalendarEventModal';




const yearSelector = () => {
  let currentYear = new Date().getFullYear()
  let years = []
  
  for(let i = 1; i < 5; i++) {
    years.push(currentYear-i)
  }
  years.push(currentYear)
  for(let i = 1; i < 5; i++) {
    years.push(currentYear+1)
  }
  return years
}

const yearsSelector = yearSelector()

// APP
function App() {
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const [days, setDays] = useState([])
  const toMonthString = (monthArg=month) => {
    switch(monthArg) {
      case 0: return "January";
      case 1: return "February";
      case 2: return "March";
      case 3: return "April";
      case 4: return "May";
      case 5: return "June";
      case 6: return "July";
      case 7: return "August";
      case 8: return "September";
      case 9: return "October";
      case 10: return "November";
      case 11: return "December";
      default: return "Invalid";
    }
  }
  const calculateCalendarDays = () => {
    const daysIn = []
    const firstDay = new Date()
    firstDay.setFullYear(year)
    firstDay.setMonth(month)
    firstDay.setDate(1)
    console.log(firstDay.getDay())
    firstDay.setDate(firstDay.getDate()-firstDay.getDay())
    daysIn.push({
      month:toMonthString(firstDay.getMonth()),
      day:firstDay.getDate(),
      events:[]
    })
    for(let i = 1; i < 7*6; i++) {
      firstDay.setDate(firstDay.getDate()+1)
      daysIn.push({
        month:toMonthString(firstDay.getMonth()),
        day:firstDay.getDate(),
        events:[]
      })
      //console.log(firstDay.getDay())
      //console.log(firstDay.getDate())
    }
    setDays(daysIn)

  }
  useEffect(() => {
    calculateCalendarDays()
  },[month,year])

  

  const handleMonthChange = (monthSelected) => {
    console.log("chaging month",monthSelected)
    setMonth(monthSelected)

  }

  const handleYearChange = (yearSelected) => {
    setYear(yearSelected)
  }

  // modal Event controllers
  const [showEvent, setShowEvent] = useState(false)
  const [dayIndex, setDayIndex] = useState(null)
  const [eventIndex, setEventIndex] = useState(null)
  const [eventSelected, setEventSelected] = useState({
    title:'',
    description:''
  })

  const handleAddEvent = (day_index) => {
    console.log("day_index:",day_index)
    setShowEvent(true)
    setEventSelected(null)
    setDayIndex(day_index)
    setEventIndex(null)
  }

  const handleSaveEvent = (event_data) => {
    console.log("day:",days[event_data.index])
    
    days[event_data.index].events.push({
      title:event_data.title,
      description:event_data.description
    })
     
    console.log("event_data:",event_data)
    console.log("days[event_data.index].events",days[event_data.index].events)
    setDays([...days])
    setShowEvent(false)
  }

  const handleEditEvent = (event_data, day_index, event_index) => {
   
    setShowEvent(true)
    setDayIndex(day_index)
    setEventSelected(event_data)
    setEventIndex(event_index)
    console.log("event_data:",event_data)

  }

  const handleUpdateEvent = (event_data, day_index, event_index) => {
    console.log("event_data:",event_data)
    console.log("event_index",event_index)
    console.log("days[event_data.index].events",days[day_index].events)
    console.log("day_index",day_index)
    days[day_index].events[event_index] = {
      title:event_data.title,
      description:event_data.description
    };
    
    setDays([...days])
    setShowEvent(false)
  }
  useEffect(() => {
    console.log("days",days)
  },[days])
  
  return (
    <Container>
      <Row>
        <Col>
        <div style={{float:'left', width:'200px'}}>
          <Form.Select defaultValue={month} onChange={(e) => handleMonthChange(e.target.selectedIndex)}>
            {[0,1,2,3,4,5,6,7,8,9,10,11].map((item, index) => {
              return <option value = {item}>{toMonthString(item)}</option>
            })}
          </Form.Select>
          </div>
        </Col>
        <div style={{float:'left', width:'200px'}}>
          <Form.Select defaultValue={year} onChange={(e) => handleYearChange(e.target.selectedIndex)}>
            {yearsSelector.map((item, index) => {
              return <option value = {item}>{item}</option>
            })}
          </Form.Select>
          </div>
      </Row>
      <Row>
        
        <Col>Sunday</Col>
        <Col>Monday</Col>
        <Col>Tuesday</Col>
        <Col>Wednesday</Col>
        <Col>Thursday</Col>
        <Col>Friday</Col>
        <Col>Saturday</Col>
      </Row>
      <Row>
        {days.filter((item,index) => index < 7).map((item, index) => {
          return (<CalendarBox key={index} dayIndex={index} day={item.day} month={item.month} events={item.events} handleAddEvent={() => handleAddEvent(index)} handleEditEvent={handleEditEvent} />)
        })}
      </Row>
      <Row>
        {days.filter((item,index) => ((index > 6) && (index < 14))).map((item, index) => {
          return (<CalendarBox key={index+7} dayIndex={index+7} day={item.day} month={item.month} events={item.events} handleAddEvent={() => handleAddEvent(index+7)} handleEditEvent={handleEditEvent}/>)
        })}
      </Row>      
      <Row>
        {days.filter((item,index) => ((index > 13) && (index < 21))).map((item, index) => {
          return (<CalendarBox key={index+(7*2)} dayIndex={index+(7*2)} day={item.day} month={item.month} events={item.events} handleAddEvent={() => handleAddEvent(index+(7*2))} handleEditEvent={handleEditEvent}/>)
        })}
      </Row>
      <Row>
        {days.filter((item,index) => ((index > 20) && (index < 28))).map((item, index) => {
          return (<CalendarBox key={index+(7*3)} dayIndex={index+(7*3)} day={item.day} month={item.month} events={item.events} handleAddEvent={() => handleAddEvent(index+(7*3))} handleEditEvent={handleEditEvent}/>)
        })}
      </Row>
      <Row>
        {days.filter((item,index) => ((index > 27) && (index < 35))).map((item, index) => {
          return (<CalendarBox key={index+(7*4)} dayIndex={index+(7*4)} day={item.day} month={item.month} events={item.events} handleAddEvent={() => handleAddEvent(index+(7*4))} handleEditEvent={handleEditEvent}/>)
        })}
      </Row>
      <Row>
        {days.filter((item,index) => index > 34).map((item, index) => {
          return (<CalendarBox key={index+(7*5)} dayIndex={index+(7*5)} day={item.day} month={item.month} events={item.events} handleAddEvent={() => handleAddEvent(index+(7*5))} handleEditEvent={handleEditEvent}/>)
        })}
      </Row>
      <CalendarEventModal show={showEvent} setShow={setShowEvent} event={eventSelected} dayIndex={dayIndex} handleSaveEvent={handleSaveEvent} eventIndex={eventIndex} handleUpdateEvent={handleUpdateEvent}/>
    </Container>
  );
}

export default App;
