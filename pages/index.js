import Head from "next/head";
import homeStyles from "../styles/Home.module.css";
import Counter from "../components/Counter";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Counter Demo App</title>
			</Head>
			<header className={homeStyles.header}>
				<h1>Welcome to the Counter Demo App!</h1>
			</header>
			<Counter />
		</div>
	);
}
