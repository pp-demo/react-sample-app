import { useState } from "react";
import styles from "../styles/Counter.module.css";

// Define the Counter component
function Counter() {
	// Initialize state
	const [count, setCount] = useState(0);

	// Define the increment and decrement functions
	const increment = () => setCount(count + 1);
	const decrement = () => setCount(count - 1);

	// Render the component
	return (
		<div
			style={{
				backgroundColor: "lightgray",
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<h1>Counter: {count}</h1>
			<button onClick={increment} className={styles.incrementButton}>
				Increment
			</button>
			<button onClick={decrement} className={styles.decrementButton}>
				Decrement
			</button>
		</div>
	);
}

// Export the Counter component as the default export
export default Counter;
