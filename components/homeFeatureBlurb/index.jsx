import styles from "./style.module.css";
import Link from "next/link";
import useLogout from "../../hooks/useLogout";
import ChallongeCard from "../challongeCard";

export default function HomeFeatureBlurb(props) {
  const logout = useLogout();
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.textContainer}>
          <p className={styles.bodyText}>...view and save tournament data</p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.bodyText}>...search ALMOST any Challonge Link</p>
        </div>
        <div className={styles.textContainer}>
          <p className={styles.bodyText}>...more features coming soon!</p>
        </div>
      </div>
      <div className={styles.spacer}></div>
      <div className={styles.card}>
        <ChallongeCard
          topParticipants={[
            { seed: 1, name: "Player 1" },
            { seed: 2, name: "Player 2" },
            { seed: 3, name: "Player 3" },
            { seed: 4, name: "Player 4" },
            { seed: 5, name: "Player 5" },
            { seed: 6, name: "Player 6" },
            { seed: 7, name: "Player 7" },
            { seed: 8, name: "Player 8" },
            { seed: 9, name: "Player 9" },
            { seed: 10, name: "Player 10" },
          ]}
          tournamentName="Test Tournament"
          user={props.user}
          savable={false}
        />
      </div>
    </div>
  );
}
