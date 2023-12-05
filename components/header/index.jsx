import styles from "./style.module.css";
import Link from "next/link";
import useLogout from "../../hooks/useLogout";

export default function Header(props) {
  const logout = useLogout();
  return (
    <header className={styles.container}>
      {props.isLoggedIn ? (
        <>
          <p>
            <Link href="/">Home</Link>
          </p>
          <p>
            <Link href="/about">About</Link>
          </p>
          <p>
            <Link href="/search">Search</Link>
          </p>
          <p>
            <Link href="/dashboard">Dashboard</Link>
          </p>
          <p onClick={logout} style={{ cursor: "pointer" }}>
            Logout
          </p>
        </>
      ) : (
        <>
          <p>
            <Link href="/">Home</Link>
          </p>
          <p>
            <Link href="/about">About</Link>
          </p>
          <p>
            <Link href="/login">Login</Link>
          </p>
          <p>
            <Link href="/signup">Signup</Link>
          </p>
          <p>
            <Link href="/search">Search</Link>{" "}
            {/* Remove this later; this is so I can easily test search without logging in everytime */}
          </p>
        </>
      )}
    </header>
  );
}
