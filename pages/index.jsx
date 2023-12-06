import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import styles from "../styles/test.module.css";
import Header from "../components/header";
import useLogout from "../hooks/useLogout";
import Footer from "../components/footer";
import HomeFeatureBlurb from "../components/homeFeatureBlurb";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const props = {};
    if (user) {
      props.user = req.session.user;
      props.isLoggedIn = true;
    } else {
      props.isLoggedIn = false;
    }
    return { props };
  },
  sessionOptions
);

export default function Home(props) {
  const router = useRouter();
  const logout = useLogout();
  return (
    <div className={styles.container}>
      <Head>
        <title>Challonge Data Viewer</title>
        <meta
          name="description"
          content="a web app for viewing bracket standings and other operations"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username} />

      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>An eSports Bracket Data Viewer</h1>
          {/* Image removed for now...styling concerns across pages
          <Image />{" "}
          required empty Image tag for the hero image to show up in correct sizing */}
        </div>
        <HomeFeatureBlurb />
      </main>
      <Footer />
    </div>
  );
}
