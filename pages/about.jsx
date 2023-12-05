import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import useLogout from "../hooks/useLogout";
import Footer from "../components/footer";

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

export default function About(props) {
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
        <h1 className={styles.title}>About The App</h1>
        <p className={styles.description}>
          Discover the power of my eSports Bracket Viewer - your ultimate solution
          for managing tournament data from Challonge.com.
        </p>

        <section className={styles.howItWorks}>
          <h2>How It Works</h2>
          <p>
            Using the eSports Bracket Viewer is simple! Follow these steps to
            unlock the full potential of the app:
          </p>
          <ol>
            <li>
              Visit Challonge.com and locate the tournament page you're
              interested in.
            </li>
            <li>Copy the URL of the tournament page.</li>
            <li>
              Open eSports Bracket Viewer's 'Search' page, paste the URL into
              the search bar, and click 'Send'.
            </li>
            <li>
              Watch as the app automatically aggregates top standings,
              participant names, and the tournament name for your convenient access. Save all of your tournament data in one place! No more keeping track of multiple links all of the time!
            </li>
          </ol>
        </section>
      </main>
      <Footer />
    </div>
  );
}
