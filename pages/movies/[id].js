import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

function MovieDetail({ data, budgetFormatter }) {
  console.log("param:", data);
  return (
    <>
     <Head>
        <title>Detail Page</title>
     </Head>
     <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h3>Movie Name: {data?.title}</h3>
        <h4>Movie Budget: {budgetFormatter}</h4>
        <p>{data?.overview}</p>
        <p>Status: {data?.status}</p>
        <div>
          <Link href="/">
            <button type="button" style={{ backgroundColor: "hotpink",padding:'10px 25px',marginBottom:'20px' }}>
              Go Back
            </button>
          </Link>
        </div>
        <Image
          src={`https://www.themoviedb.org/t/p/w220_and_h330_face${data?.backdrop_path}`}
          alt={data?.title}
          width={700}
          height={500}
        />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const req = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=3bcbf53467fc2d52de8e0d67324ce9cc`
  );
  const data = await req.json();

  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  const budgetFormatter = formatter.format(data?.budget);
  return {
    props: {
      data,
      budgetFormatter,
    },
  };
}

export default MovieDetail;
