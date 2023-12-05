import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Header from "../components/header";
import useLogout from "../hooks/useLogout";
import styles from "../styles/Home.module.css";
import ChallongeCard from "../components/challongeCard";
import Footer from "../components/footer";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    console.log("Session Object:", req.session);
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

function Dashboard(props) {
  const router = useRouter();
  const logout = useLogout();

  const [savedData, setSavedData] = useState([]);

  const handleDelete = async () => {
    try {
      const userId = props.user?._doc?.username || props.user?.username; // Checking all these locations for the username because it changes depending on the context AGAIN.

      if (!userId) {
        console.error("User ID cannot be found.");
        return;
      }

      const response = await fetch("/api/deleteSavedData", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // Send userId in the request body so it can be accessed later.
      });

      if (response.ok) {
        setSavedData(
          savedData.filter((filteredData) => filteredData.userId !== userId) // filter out the data if its not the userId
        );
      } else {
        const errorData = await response.json();
        console.error("Failed to delete data", errorData);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (props.isLoggedIn) {
        const userId = props.user._doc
          ? props.user._doc.username
          : props.user.username; // Checking all these locations for the username because it changes depending on the context... weird

        if (userId) {
          const response = await fetch(`/api/getSavedData?userId=${userId}`, {
            credentials: "include",
          });
          const data = await response.json();
          if (data.success) {
            setSavedData(data.data);
          } else {
            console.error("Failed to fetch saved data");
          }
        }
      }
    };
    fetchData();
  }, [props.isLoggedIn, props.userId]);

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

      <Header isLoggedIn={props.isLoggedIn} username={props.user.username} />

      <main className={styles.main}>
        <h1 className={styles.title}>An eSports Bracket Data Viewer</h1>
        <p>
          Status:{" "}
          <code className={styles.code}>
            {!props.isLoggedIn && " Not"} Logged In
          </code>
        </p>
        <h2>Your Saved Data</h2>
        <div className={styles.savedData}>
          {savedData.map((entry) => (
            <ChallongeCard
              key={entry._id}
              topParticipants={entry.topParticipants}
              tournamentName={entry.tournamentName}
              user={{ _doc: { username: entry.userId } }}
            />
          ))}
        </div>
        {savedData.length > 0 && ( //checks for length of savedData array before allowing a delete button to appear.
          <div>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
        <div className={styles.grid}>
          <Link href="/" className={styles.card}>
            <h2>Home</h2>
            <p>Return to the homepage.</p>
          </Link>
          <div
            onClick={logout}
            style={{ cursor: "pointer" }}
            className={styles.card}
          >
            <h2>Logout</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
