import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home = ({ location }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          { location }
        </h1>
      </main>

        
    </div>
  )
}

Home.getInitialProps = async ({ req }) => { 
  let location = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  
  return {
      location
  }
}

export default Home