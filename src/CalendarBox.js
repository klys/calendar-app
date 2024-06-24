
import {Col,Button} from 'react-bootstrap'

import { useEffect } from 'react'

const boxStyle = {height:'115px', border:'1px solid'}

/*
    props:
        month
        day
        events:[]
        handleAddEvent
*/


const CalendarBox = (props) => {
    useEffect(() => {
        console.log("props.events",props.events)
    },[props.events])
    
    return(
        <Col style={boxStyle}>{`[${props.dayIndex}]`}{props.month} {props.day} <Button onClick={() => props.handleAddEvent()} variant="link" size="sm" style={{paddingTop:'0px', paddingBottom:'0px', borderTop:'0px',borderBottom:'0px'}}>[+]</Button>
            <div>
                {props.events.map((item, eventIndex) => {
                    return <div style={{height:'18px'}}><Button variant="link" size="sm" style={{paddingTop:'0px', paddingBottom:'0px', borderTop:'0px',borderBottom:'0px'}} onClick={() => props.handleEditEvent(item, props.dayIndex, eventIndex)}>{`[${eventIndex}]`}{item.title}</Button></div>      
                })}
                
            </div>
                    
        </Col>
    )
}

export default CalendarBox;