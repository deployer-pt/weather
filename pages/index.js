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
  let location =  'nada'
  if(req) {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    let apiKey = 'a1d158ab609b17188de18fda0ae56cec'
    let url = `http://api.ipapi.com/${ip}?access_key=${apiKey}&format=1`
    const res = await fetch(url)
    const json = await res.json()

    location = json.region_name
  }
  
  
  return {
      location
  }
}

export default Home