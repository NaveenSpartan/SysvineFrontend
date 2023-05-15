import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { connect } from 'react-redux'
import { Card, Breadcrumb } from 'antd'
import { fetchAllAppointment, fetchUserById } from './redux/action/userAction'
import { useNavigate } from 'react-router-dom'

const Dashboard = (props) => {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])

  useEffect(() => {
    props.fetchAllAppointment()
  }, [])

  useEffect(() => {
    if (props.user.length) {
      let naveen = []
      props.user?.map((dt) => {
        let obj = { title: dt.patient_name, date: dt.appointment_date }
        naveen.push(obj)
      })
      setEvents(naveen)
    }
  }, [props.user])

  return (
    <>
      <Card className="calenderview">
        <Breadcrumb
          style={{ marginBottom: '1rem' }}
          items={[
            {
              title: <a onClick={() => navigate('/')}>Dashboard</a>,
            },

            {
              title: 'Calender View',
            },
          ]}
        />
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          dayMaxEventRows={25}
          style={{ color: 'red' }}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          showNonCurrentDates={false}
          fixedWeekCount={false}
        />
      </Card>
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.appointmentDetails,
  selectedAppointment: state.user.selectedAppointment,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllAppointment: () => dispatch(fetchAllAppointment()),
    fetchUserById: (id) => dispatch(fetchUserById(id)),
    RemoveSelectduser: () => {
      return dispatch({ type: 'RemoveselectedAppointment', payload: [] })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
