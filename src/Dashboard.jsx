import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  Space,
  Table,
  Modal,
  Row,
  Col,
  Input,
  message,
  Card,
  Button,
  Breadcrumb,
} from 'antd'
import { fetchAllAppointment, fetchUserById } from './redux/action/userAction'
import axios from 'axios'
import { Router, useNavigate } from 'react-router-dom'

const Dashboard = (props) => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    patient_name: '',
    doctor_name: '',
    appointment_time: '',
    appointment_date: '',
  })
  const [action, setAction] = useState('')
  useEffect(() => {
    props.fetchAllAppointment()
  }, [])

  useEffect(() => {
    if (props.selectedAppointment?.patient_name) {
      setState({
        ...state,
        patient_name: props.selectedAppointment.patient_name,
        doctor_name: props.selectedAppointment.doctor_name,
        appointment_time: props.selectedAppointment.appointment_time,
        appointment_date: props.selectedAppointment.appointment_date,
      })
    }
  }, [props.selectedAppointment?.patient_name])

  const updateUser = async () => {
    const data = {
      patient_name: state.patient_name,
      doctor_name: state.doctor_name,
      appointment_time: state.appointment_time,
      appointment_date: state.appointment_date,
    }
    const response = await axios({
      method: 'put',
      url: `http://localhost:8080/appointment/${props.selectedAppointment._id}`,
      data: data,
    })
    if (response.data) {
      message.open({
        type: 'success',
        content: 'Appointment Updated Successfully',
        duration: 3,
      })
      props.fetchAllAppointment()
      await props.RemoveSelectduser()
      setAction('')
      setState({
        patient_name: '',
        doctor_name: '',
        appointment_time: '',
        appointment_date: '',
      })
    }
  }

  const createAppointment = async () => {
    const data = {
      patient_name: state.patient_name,
      doctor_name: state.doctor_name,
      appointment_time: state.appointment_time,
      appointment_date: state.appointment_date,
    }
    const response = await axios({
      method: 'post',
      url: `http://localhost:8080/appointment`,
      data: data,
    })
    if (response.data) {
      message.open({
        type: 'success',
        content: 'Appointment Created Successfully',
        duration: 3,
      })
      setState({
        patient_name: '',
        doctor_name: '',
        appointment_time: '',
        appointment_date: '',
      })
      setAction('')
      props.fetchAllAppointment()
    }
  }

  const handleCancel = async () => {
    await props.RemoveSelectduser()
    setAction('')
    setState({
      patient_name: '',
      doctor_name: '',
      appointment_time: '',
      appointment_date: '',
    })
  }

  const addHandler = async () => {
    setAction('Add')
  }

  const editHandler = (data) => {
    setAction('Edit')
    props.fetchUserById(data._id)
  }

  const deleteHandler = async (data) => {
    const response = await axios({
      method: 'delete',
      url: `http://localhost:8080/appointment/${data._id}`,
    })
    if (response.data) {
      message.open({
        type: 'success',
        content: 'Appointment deleted successfully',
        duration: 3,
      })
      props.fetchAllAppointment()
    }
  }

  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'patient_name',
      key: 'patient_name',
    },
    {
      title: 'Doctor Name',
      dataIndex: 'doctor_name',
      key: 'doctor_name',
    },
    {
      title: 'Appointment Time',
      dataIndex: 'appointment_time',
      key: 'appointment_time',
    },
    {
      title: 'Appointment Date',
      key: 'appointment_date',
      dataIndex: 'appointment_date',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => editHandler(record)}>Edit </a>
          <a onClick={() => deleteHandler(record)}>Delete</a>
        </Space>
      ),
    },
  ]

  return (
    <>
      {state.patient_name && (
        <Modal
          title={'Edit Appointment'}
          open={action === 'Edit'}
          onOk={updateUser}
          onCancel={handleCancel}
        >
          <Row
            style={{ marginTop: 5 }}
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Col className="gutter-row" span={6}>
              <div>Patient Name:</div>
            </Col>
            <Col className="gutter-row" span={18}>
              <div>
                <Input
                  onChange={(e) =>
                    setState({ ...state, patient_name: e.target.value })
                  }
                  defaultValue={state.patient_name}
                />
              </div>
            </Col>
          </Row>
          <Row
            style={{ marginTop: 5 }}
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Col className="gutter-row" span={6}>
              <div>Doctor Name:</div>
            </Col>
            <Col className="gutter-row" span={18}>
              <div>
                <Input
                  onChange={(e) =>
                    setState({ ...state, doctor_name: e.target.value })
                  }
                  defaultValue={state.doctor_name}
                />
              </div>
            </Col>
          </Row>
          <Row
            style={{ marginTop: 5 }}
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Col className="gutter-row" span={6}>
              <div>Appointment Date:</div>
            </Col>
            <Col className="gutter-row" span={18}>
              <div>
                <Input
                  onChange={(e) =>
                    setState({ ...state, appointment_date: e.target.value })
                  }
                  type="date"
                  defaultValue={state.appointment_date}
                />
              </div>
            </Col>
          </Row>
          <Row
            style={{ marginTop: 5 }}
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Col className="gutter-row" span={6}>
              <div>Appointment Time:</div>
            </Col>
            <Col className="gutter-row" span={18}>
              <div>
                <Input
                  onChange={(e) =>
                    setState({ ...state, appointment_time: e.target.value })
                  }
                  type="time"
                  defaultValue={state.appointment_time}
                />
              </div>
            </Col>
          </Row>
        </Modal>
      )}
      {
        <Modal
          title={'Create Appointment'}
          open={action === 'Add'}
          onOk={createAppointment}
          onCancel={handleCancel}
        >
          <Row
            style={{ marginTop: 5 }}
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Col className="gutter-row" span={6}>
              <div>Patient Name:</div>
            </Col>
            <Col className="gutter-row" span={18}>
              <div>
                <Input
                  onChange={(e) =>
                    setState({ ...state, patient_name: e.target.value })
                  }
                  value={state.patient_name}
                />
              </div>
            </Col>
          </Row>
          <Row
            style={{ marginTop: 5 }}
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Col className="gutter-row" span={6}>
              <div>Doctor Name:</div>
            </Col>
            <Col className="gutter-row" span={18}>
              <div>
                <Input
                  onChange={(e) =>
                    setState({ ...state, doctor_name: e.target.value })
                  }
                  value={state.doctor_name}
                />
              </div>
            </Col>
          </Row>

          <Row
            style={{ marginTop: 5 }}
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Col className="gutter-row" span={6}>
              <div>Appointment Date:</div>
            </Col>
            <Col className="gutter-row" span={18}>
              <Input
                onChange={(e) =>
                  setState({ ...state, appointment_date: e.target.value })
                }
                type="date"
                className="form-control"
                value={state.appointment_date}
              />
            </Col>
          </Row>
          <Row
            style={{ marginTop: 5 }}
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          >
            <Col className="gutter-row" span={6}>
              <div>Appointment Date:</div>
            </Col>
            <Col className="gutter-row" span={18}>
              <Input
                onChange={(e) =>
                  setState({ ...state, appointment_time: e.target.value })
                }
                type="time"
                className="form-control"
                value={state.appointment_time}
              />
            </Col>
          </Row>
        </Modal>
      }
      <Card>
        <Breadcrumb
          items={[
            {
              title: 'Dashboard',
            },
          ]}
        />
        <div style={{ marginBottom: '2rem', textAlign: 'end' }}>
          <Button
            onClick={() => navigate('/calenderview')}
            style={{ backgroundColor: 'skyblue' }}
          >
            {' '}
            Calender View
          </Button>{' '}
          <Button onClick={addHandler} style={{ backgroundColor: 'skyblue' }}>
            {' '}
            + Create Appointment
          </Button>{' '}
        </div>
        <Table columns={columns} dataSource={props.user} />
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
