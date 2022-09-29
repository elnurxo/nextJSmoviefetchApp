import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import utilStyles from '../styles/utils.module.css';
import styles from "./layout.module.css";


export default function Layout({ children }) {
  return (
   <>{children}</>
  );
}
