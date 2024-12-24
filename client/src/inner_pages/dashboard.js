import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import '../App.css'
import style from '../Styles/dashbord.module.css'
const getDayName = (date) => {
  const option = { weekday: 'long' }
  return new Intl.DateTimeFormat('en-US', option).format(date);
}
const currentdate = new Date();
const formatdate = format(currentdate, ' MMMM dd , yyyy');
const dayname = getDayName(currentdate);
function Dashboard() {
  const user = localStorage.getItem('username');
  const [studentcount, setstudentcount] = useState(0);
  const [teachercount, setteachercount] = useState(0);
  const [facultycount, setfacultycount] = useState(0);
  const [departmentcount, setdepartmentcount] = useState(0);
  const login = localStorage.getItem('login');
  const Navigate = useNavigate();
  useEffect(() => {
    const fetchrow = async () => {
      try {
        //for student dcount
        const studentresponse = await fetch('http://localhost:5000/inner_pages/dasboard')
        if (!studentresponse.ok) {
          console.log('error');
        }
        const data = await studentresponse.json();
        setstudentcount(data.count)
        //for teacher count
        const teacherresponse = await fetch(`http://localhost:5000/src/`)
        if (!teacherresponse.ok) {
          console.log('error');
        }
        const data1 = await teacherresponse.json();
        setteachercount(data1.count)
        //for faculty count
        const facultyresponse = await fetch('http://localhost:5000/inner_pages/DepartmentRegistartion')
        if (!facultyresponse.ok) {
          console.log('error');
        }
        const facultydata = await facultyresponse.json();
        setfacultycount(facultydata.count)
        //for department counter
        const departmentresponse = await fetch('http://localhost:5000/src/login')
        if (!departmentresponse.ok) {
          console.log('error');
        }
        const departmentdata = await departmentresponse.json();
        setdepartmentcount(departmentdata.count)
      } catch (err) {
        console.log('no number')
      }
    }
    fetchrow()
  }, []) 
  const data = [
    {
      name: '2004',
      Male: 6000,
      Female: 2400,
      amt: 2400,
    },
    {
      name: '2005',
      Male: 3000,
      Female: 1398,
      amt: 2210,
    },
    {
      name: '2006',
      Male: 2000,
      Female: 9800,
      amt: 2290,
    },
    {
      name: '2007',
      Male: 2780,
      Female: 3908,
      amt: 2000,
    },
    {
      name: '2008',
      Male: 1890,
      Female: 4800,
      amt: 2181,
    },
    {
      name: '2009',
      Male: 2390,
      Female: 3800,
      amt: 2500,
    },
    {
      name: '20010',
      Male: 3490,
      Female: 4300,
      amt: 2100,
    },
  ];
  // const [message, setmessage] = useState('')
  // const [exist,setexist]=useState(false)
  // setInterval(() => {
  //   setexist(true)
  //   setmessage('you have a new message') 
  // }, 5000)
  // setTimeout(() => {
  //   setexist(false)
  //   setmessage('')
  // },2000)
  if (user && login) {
    return (
      <>
        <main className='main-container' >

          <div className='main-title'>
            <span>Today: {dayname + formatdate} </span>
          </div>
          <div className='main-card '>
            <div className='card '>
              <div className='card-inner'>
                <h3>Total students</h3>
              </div>
              <div className={style.rownumber}>
                {studentcount}
              </div>
              <div className={style.icondiv} >
                <FaUserFriends className={style.icon} />
              </div>
            </div>
            <div className='card '>
              <div className='card-inner'>
                <h3>Total Teacher</h3>
              </div>
              <div className={style.rownumber}>
                {teachercount}
              </div>
              <div className={style.icondiv} >
                <FaUserFriends className={style.icon} />
              </div>
            </div>
            <div className='card '>
              <div className='card-inner'>
                <h3>Total Faculty</h3>
              </div>
              <div className={style.rownumber}>
                {facultycount}
              </div>
              <div className={style.icondiv} >
                <FaUserFriends className={style.icon} />
              </div>
            </div>
            <div className='card '>
              <div className='card-inner'>
                <h3>Total Department</h3>
              </div>
              <div className={style.rownumber}>
                {departmentcount}
              </div>
              <div className={style.icondiv} >
                <FaUserFriends className={style.icon} />
              </div>
            </div>


          </div>
          <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Male" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="Female" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
              </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Male" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Female" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </main>
      </>
    )
  } else {
    return (
      Navigate('/')
    )
  }
}
export default Dashboard 
