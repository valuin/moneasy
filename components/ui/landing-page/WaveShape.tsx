import React from 'react';

const WaveShape: React.FC = () => {
  return (
	<svg width="1440" height="356" viewBox="0 0 1440 356" fill="none" xmlns="http://www.w3.org/2000/svg">
	  <path
		fillRule="evenodd"
		clipRule="evenodd"
		d="M0 53.2L60 89.2C120 125.2 240 197.2 360 190C480 182.8 600 96.4 720 82C840 67.6 960 125.2 1080 125.2C1200 125.2 1320 67.6 1380 38.8L1440 10V355.6H1380C1320 355.6 1200 355.6 1080 355.6C960 355.6 840 355.6 720 355.6C600 355.6 480 355.6 360 355.6C240 355.6 120 355.6 60 355.6H0V53.2Z"
		fill="url(#paint0_linear_76_7200)"
	  />
	  <defs>
		<linearGradient id="paint0_linear_76_7200" x1="786" y1="356" x2="781.5" y2="-139" gradientUnits="userSpaceOnUse">
		  <stop offset="0.0589996" stopColor="#022C20" />
		  <stop offset="1" stopColor="#07926A" />
		</linearGradient>
	  </defs>
	</svg>
  );
};

export default WaveShape;
