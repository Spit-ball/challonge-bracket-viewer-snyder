import styles from "./style.module.css";
import Link from "next/link";
import useLogout from "../../hooks/useLogout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ChallongeCard = ({
  topParticipants,
  tournamentName,
  tournamentURL,
  user,
  savable,
}) => {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(false);
  }, [topParticipants, tournamentName, tournamentURL]); // triggered on re-render; only cares when value provided is updated.

  const handleSave = async () => {
    const userId = user?._doc?.username || user?.username; // check both cases for user object without throwing an error here...should be in either location.
    const data = { userId, topParticipants, tournamentName, tournamentURL };
    console.log("Saving data:", data);

    try {
      const response = await fetch("/api/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSaved(true);
      } else {
        const errorData = await response.json();
        console.error("Failed to save data", errorData);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Top Participants of:</h1>
      <h1 className={styles.subtitle}>{tournamentName}</h1>
      <h1 className={styles.subtitle}>{tournamentURL}</h1>
      <div className={styles.placement}>
        <ul className={styles.participantList}>
          {topParticipants.map((participant) => (
            <li key={participant.seed} className={styles.participantItem}>
              <p className={styles.seed}>Place {participant.seed}</p>
              <p className={styles.names}>{participant.name}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* there is probably a way to check savable state, user state, and saved state all at once, but I'm not sure how to do that. */}
      {savable && (
        <>
          {user ? (
            !saved ? (
              <button className={styles.saveButton} onClick={handleSave}>
                Save
              </button> // TODO: need to make this button disabled/disappearing if already saved... getting lost in the operator weeds here.
            ) : (
              <p>Data saved!</p>
            )
          ) : (
            <div>
              <p>You must login to save data.</p>
              <Link href="/login">
                <button className={styles.saveButton}>Login</button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChallongeCard;
