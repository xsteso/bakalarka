export const LoadingSpinner = ({ width }) => (
	<svg
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 100 100"
		role="presentation"
		focusable="false"
		width={width}>
		<circle
			cx="50"
			cy="50"
			fill="none"
			stroke="currentColor"
			strokeWidth="10"
			r="35"
			strokeDasharray="164.93361431346415 56.97787143782138"
			transform="rotate(255.498 50 50)">
			<animateTransform
				attributeName="transform"
				type="rotate"
				calcMode="linear"
				values="0 50 50;360 50 50"
				keyTimes="0;1"
				dur="1s"
				begin="0s"
				repeatCount="indefinite"></animateTransform>
		</circle>
	</svg>
);
