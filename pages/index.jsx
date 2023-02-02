import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React , {useState} from 'react'
import {collection, addDoc} from 'firebase/firestore'
import db from '../component/firebase'

export default function TableMOU() {

    const [form, setForm] = useState({
        peopleid: '',
        name: '',
        company: '',
    });

    const [error, setError] = useState({
        peopleid: '',
        name: '',
        company: '',
    })

    const onChange = (e) => {
        const {value, name} = e.target;
        setForm((state) => ({
            ...state,
            [name]:value
        }));
    }

    const showData = () => {
        console.log('Form: ', form);
    }

    const onSubmit = async (e) => {

        e.preventDefault();
        const colRef = collection(db, 'MOUdata')
        await addDoc(colRef, form)

      if (form.peopleid.length < 13){
        setError((state) => ({
          ...state,
          id: 'กรุณากรอกเลขประจำตัวต่างด้าว'
        }))
        return;
      }if (form.name.length < 10){
        setError((state) => ({
          ...state,
          name: 'กรุณากรอกชื่อต่างด้าว'
        }))
        return;
      }if (form.company.length < 7){
        setError((state) => ({
          ...state,
          company: 'กรุณากรอกชื่อนายจ้าง'
        }))
        return;
      } else {
        setError((state) => ({
          ...state,
          peopleid: '',
          name: '',
          company: '',
        }));
        };

        showData();
        alert('บันทึกเรียบร้อย')

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
        <form onSubmit={onSubmit}>
            <label>
              <h2>เลขประจำตัวต่างด้าว :</h2>
              <input type="text" onChange={onChange} required maxLength={13} className={styles.input} 
              name="peopleid" value={form.peopleid} placeholder="กรอกเลขประจำตัวต่างด้าว"/>
            </label>
            {!!error.peopleid && (<div className={styles.textdanger}><b>{error.peopleid}</b></div>)}
            <label>
              <h2>ชื่อต่างด้าว :</h2>
              <input type="text" onChange={onChange} className={styles.input} 
              name="name" value={form.name} placeholder="กรอกชื่อต่างด้าว"/>
            </label>
            {!!error.name && (<div className={styles.textdanger}><b>{error.name}</b></div>)}
            <label>
              <h2>ชื่อนายจ้าง :</h2>
              <input type="text" onChange={onChange} className={styles.input} 
              name="company" value={form.company} placeholder="กรอกชื่อนายจ้าง"/>
            </label>
            {!!error.company && (<div className={styles.textdanger}><b>{error.company}</b></div>)}
            <p/>
            <div>
              <center><button type="submit" className={styles.button}>บันทึก</button></center>
            </div>
        </form>
      </main>
    </div>
  )
}
