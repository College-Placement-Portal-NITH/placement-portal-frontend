import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons'
import styles from './TprHeadForm.module.scss'

export default function TprHeadForm() {
  const [branch, setBranch] = useState('')
  const [course, setCourse] = useState('')
  const [rollno, setRollno] = useState('')
  const data = ['one', 'two', 'three', 'one', 'two', 'three', 'one', 'two', 'three']
  const [userData, setUserData] = useState([])
  function handleClick() {
    if (branch.length !== 0 && course.length !== 0 && rollno.length !== 0) {
      const updatedData = [
        ...userData,
        {
          branch,
          course,
          rollno,
        },
      ]
      setUserData(updatedData)
      setBranch('')
      setCourse('')
      setRollno('')
      // this.mainInput.value = ''
    } else if (branch.length === 0) alert("you haven't added the branch")
    else if (course.length === 0) alert("you haven't added the course")
    else if (rollno.length === 0) alert("you haven't added the rollno")
  }
  function deleteclick(branchName) {
    const newData = userData.filter((li) => li.branchName !== branchName)
    setUserData(newData)
  }
  return (
    <div className={styles.TprHeadForm}>
      <div className={styles.section1}>
        <img
          src="https://images.unsplash.com/photo-1682005418978-d7ccb6595fa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=900&q=60"
          alt=""
        />
      </div>
      <div className={styles.section2}>
        <div className={styles.form}>
          <div className={styles.text}>Please Select Your Course</div>
          <div className={styles.inputField}>
            <div className={styles.main}>
              <input
                list="data2"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Choose your Course"
              />
              <datalist id="data2">
                {data.map((op) => (
                  <option key={op}>{op}</option>
                ))}
              </datalist>
            </div>
          </div>
          <div className={styles.text}>Please Select Your Branch</div>
          <div className={styles.inputField}>
            <div className={styles.main}>
              <input
                list="data"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="Choose your Branch"
              />
              <datalist id="data">
                {data.map((op) => (
                  <option key={op}>{op}</option>
                ))}
              </datalist>
            </div>
          </div>
          <div className={styles.text}>Please Add Your RollNo</div>
          <div className={styles.input__flexx}>
            <input
              type="text"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
              placeholder="Write your Rollno"
            />
            <div className={styles.icon} onClick={handleClick}>
              <FontAwesomeIcon icon={faUserPlus} />
            </div>
          </div>
          <div className={styles.table}>
            <table>
              <tr>
                <th>Course</th>
                <th>Bramch </th>
                <th>Roll No</th>
              </tr>
              {userData.map((op) => (
                <tr key={op.course}>
                  <td>{op.course}</td>
                  <td>{op.branch}</td>
                  <td>{op.rollno}</td>
                  <td>
                    <button onClick={() => deleteclick(op.branch)}>
                      <FontAwesomeIcon icon={faUserMinus} />
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
