import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React , {useState,useEffect} from 'react'
import {collection, getDocs} from 'firebase/firestore'
import db from '../component/firebase'

export default function TableSearchMOU () {


const [form, setForm] = useState({
    peopleid: '',
});

const [error, setError] = useState({
    peopleid: '',
})

const [search, setSearch] = useState("")

const onChange = (e) => {
    const {value, name} = e.target;
    setForm((state) => ({
        ...state,
        [name]:value
    }));
    setSearch(e.target.value);
}

const [booking, setBooking] = useState([])

useEffect(() => {
  ;(async () => {

    const colRef = collection(db,'MOUdata')

    const snapshots = await getDocs(colRef)

    const docs = snapshots.docs.map((doc) => {
      const data = doc.data()
      data.id = doc.id
      return data
    })

    setBooking(docs)

  })()
},[])

const onSubmit = () => {
    
  if (form.peopleid.length < 13){
    setError((state) => ({
      ...state,
      peopleid: 'กรุณากรอกเลขประจำตัวต่างด้าว'
    }))
    return;
  } else {
    setError((state) => ({
      ...state,
      peopleid: '',
    }));
    };
}

  return (
    <div className={styles.container}>
      <Head>
        <title>ระบบค้นหาเลขประจำตัวต่างด้าว สจก.7</title>
        <link rel="icon" href="/กรม.PNG" />
      </Head>
      <main className={styles.main}>
      <a className={styles.description}>
          <img src="/สจก.7.png"/>
        </a>
        <label>
          <h2>ค้นหาเลขประจำตัวต่างด้าว:</h2>
          <input type="text" onChange={onChange} required maxLength={13} className={styles.inputprint} 
            name="peopleid" value={form.peopleid} placeholder="กรุณากรอกเลขประจำตัวต่างด้าว"/>
        </label>
        {!!error.id && (<div className={styles.textdanger}><b>{error.id}</b></div>)}
      <form onSubmit={onSubmit}>
        {booking.filter((val => {
            if(search == val.peopleid){
              return val
            }
            })).map((val, key) => {
              return( 
              <div key = {key}>
                  <p/>
                  <img src="/สจก.7.png"/>
                  <h2><p>เลขบัตรประชาชน : {val.peopleid}</p></h2>
                  <h2><p>ชื่อ - นามสกุล : {val.name}</p></h2>
                  <h2><p>สถานประกอบการ : {val.company}</p></h2>
              </div>
              )
            })}
      </form>
      </main>
    </div>
  )
}

