import {Modal, Button, Form} from 'react-bootstrap'
import {useState, useEffect} from 'react'

const CalendarEventModal = (props) => {
    const [eventData, setEventData] = useState( {
      index:props.dayIndex,
      title:'',
      description:''
    })

    useEffect(() => {
      if (props.event == null) {
      setEventData({
        index:props.dayIndex,
        title:'',
        description:''
      })
    } else setEventData({...props.event,
      index:props.dayIndex
    })
    },[props.dayIndex, props.eventIndex])
    return(
        <Modal show={props.show} onHide={props.setShow}>
        <Modal.Header closeButton>
          <Modal.Title>Event:<Form.Control type="text" onChange={(e) => setEventData({...eventData, title:e.target.value})} value={eventData.title}/></Modal.Title>
        </Modal.Header>
        <Modal.Body>Description:<Form.Control type="text" onChange={(e) => setEventData({...eventData, description:e.target.value})} value={eventData.description}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.setShow}>
            Close
          </Button>
          {(props.event == null) ? <Button variant="primary" onClick={() => props.handleSaveEvent(eventData)}>
            Save Event
          </Button>:
          <Button variant="primary" onClick={() => props.handleUpdateEvent(eventData,props.dayIndex,props.eventIndex)}>
          Updatete Event
        </Button>
          }
        </Modal.Footer>
      </Modal>
    )
}

export default CalendarEventModal;