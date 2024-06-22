
import {Container, Row, Col, Form} from 'react-bootstrap';
import {useState, useEffect} from 'react'

const boxStyle = {height:'115px', border:'1px solid'}

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
      day:firstDay.getDate()
    })
    for(let i = 1; i < 7*6; i++) {
      firstDay.setDate(firstDay.getDate()+1)
      daysIn.push({
        month:toMonthString(firstDay.getMonth()),
        day:firstDay.getDate()
      })
      console.log(firstDay.getDay())
      console.log(firstDay.getDate())
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


  
  return (
    <Container>
      <Row>
        <Col>
        <div style={{float:'left', width:'200px'}}>
          <Form.Select defaultValue={month} onChange={(e) => handleMonthChange(e.target.selectedIndex)}>
            {[0,1,2,3,4,5,6,7,8,9,10,11].map((item) => {
              return <option value = {item}>{toMonthString(item)}</option>
            })}
          </Form.Select>
          </div>
        </Col>
        <div style={{float:'left', width:'200px'}}>
          <Form.Select defaultValue={year} onChange={(e) => handleYearChange(e.target.selectedIndex)}>
            {yearsSelector.map((item) => {
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
        {days.filter((item,index) => index < 7).map((item) => {
          return (<Col style={boxStyle}>{item.month} {item.day}</Col>)
        })}
      </Row>
      <Row>
        {days.filter((item,index) => ((index > 6) && (index < 14))).map((item) => {
          return (<Col style={boxStyle}>{item.month} {item.day}</Col>)
        })}
      </Row>      
      <Row>
        {days.filter((item,index) => ((index > 13) && (index < 21))).map((item) => {
          return (<Col style={boxStyle}>{item.month} {item.day}</Col>)
        })}
      </Row>
      <Row>
        {days.filter((item,index) => ((index > 20) && (index < 28))).map((item) => {
          return (<Col style={boxStyle}>{item.month} {item.day}</Col>)
        })}
      </Row>
      <Row>
        {days.filter((item,index) => ((index > 27) && (index < 35))).map((item) => {
          return (<Col style={boxStyle}>{item.month} {item.day}</Col>)
        })}
      </Row>
      <Row>
        {days.filter((item,index) => index > 34).map((item) => {
          return (<Col style={boxStyle}>{item.month} {item.day}</Col>)
        })}
      </Row>
    </Container>
  );
}

export default App;
