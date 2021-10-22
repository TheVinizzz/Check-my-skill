import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Button from '@material-ui/core/Button';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Button variant="contained" color="primary" onClick={() => alert("eita carai")}>
        Hello World
      </Button>
    </div>
  )
}

export default Home
