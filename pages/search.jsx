import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import useLogout from "../hooks/useLogout";
import ChallongeCard from "../components/challongeCard";
import Searchbar from "../components/searchBar";
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

export default function Search(props) {
  const router = useRouter();
  const logout = useLogout();

  const [topParticipants, setTopParticipants] = useState([]);
  const [tournamentName, setTournamentName] = useState("");

  const handleTopParticipants = (participants) => {
    setTopParticipants(participants);
  };

  const handleTournamentName = (tournamentName) => {
    setTournamentName(tournamentName);
  };

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
        <h1 className={styles.title}>Find Your Data</h1>
        <h2>Things to Note</h2>
        <p className={styles.usageInfo}>
          You may input a standard Challonge URL. Keep in mind, if you use a
          Challonge Community organized tournament, this will not work due to
          API limitations. If your URL does not look like
          "https://challonge.com/123456", chances are it is a community
          tournament link.
        </p>
        <p className={styles.usageInfo}>
          Keep in mind, you might see the same seed number more than once. This
          is because of how the points/ranking system works, along with score
          reporting conventions. This is not an error, but rather it helps to
          verify ties.
        </p>
        <Searchbar
          onTopParticipants={handleTopParticipants}
          onTournamentNameChange={handleTournamentName}
        />
        {topParticipants.length > 0 && tournamentName.length > 0 && (
          <ChallongeCard
            topParticipants={topParticipants}
            tournamentName={tournamentName}
            user={props.user}
            savable={true}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
