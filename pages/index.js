import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import axios from "axios";
import useSWR from 'swr';


export default function Home({res}) {

  //SWR HOOK FOR FETCHING
  const address = `https://api.themoviedb.org/3/trending/all/day?api_key=3bcbf53467fc2d52de8e0d67324ce9cc`;
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);

  if (!data) <h1>Loading...</h1>;
  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <Layout>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Movies</h2>
        <ul className={utilStyles.list}>
          {res.results.map(({ id, original_language, title,name,poster_path }) => (
            <li className={utilStyles.listItem} key={id}>
             <Link href={`/movies/${id}`}>
              <a>
              <div className={utilStyles.card}>
              <h3 className={utilStyles.heading3}>{title || name}/ {original_language}</h3>
              </div>
              <Image 
              src= {`https://www.themoviedb.org/t/p/w220_and_h330_face${poster_path}`}
              alt={title}
              width={220}
              height={330}
              />
              </a>
             </Link>
            </li>
          ))}

            {/* SWR GET DATA */}
          {/* {data?.results.map(({ id, original_language, title,name,poster_path }) => (
            <li className={utilStyles.listItem} key={id}>
              <div className={utilStyles.card}>
              <h3 className={utilStyles.heading3}>{title || name}/ {original_language}</h3>
              </div>
              <Image 
              src= {`https://www.themoviedb.org/t/p/w220_and_h330_face${poster_path}`}
              alt={title}
              width={220}
              height={330}
              />
            </li>
          ))} */}
        </ul>
      </section>
    </Layout>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps(){
 const req = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=3bcbf53467fc2d52de8e0d67324ce9cc&language=en-US&page=3');
 const res = await req.json();
  console.log('data loaded');
  return {
    props: {
      res 
    }
  };
} 
