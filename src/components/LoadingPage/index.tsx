import React, { FC, useState } from 'react';
import animationData from '../../animation/loading-github.json';
import Lottie from 'react-lottie';

const LoadingPage: FC = () => {
	const [animationState, setAnimationState] = useState({
		isStopped: false,
		isPaused: false,
		direction: 1
	});

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
		}
	};

	return (
		<div>
			<Lottie
				options={defaultOptions}
				width={200}
				height={200}
				direction={animationState.direction}
				isStopped={animationState.isStopped}
				isPaused={animationState.isPaused}
			/>
		</div>
	);
};

export default LoadingPage;
