import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { motion } from 'framer-motion';
import { updateGameData } from '../store/gameSlice';
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';

function Overlay() {
	const dispatch: AppDispatch = useDispatch();
	const { score, time, kda, gameFound } = useSelector((state: RootState) => state.game);
	const [showDetails, setShowDetails] = useState<boolean>(false);
	const [showOverlay, setShowOverlay] = useState<boolean>(false);

	const handleShowOverlay = () => {
		setShowOverlay(prev => !prev);
	};

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'q') {
				handleShowOverlay();
			}
		};

		window.addEventListener('keydown', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			dispatch(updateGameData());
		}, 3000);
		return () => clearInterval(interval);
	}, [dispatch]);

	// useEffect(() => {
	// 	window.overwolf.games.events.setRequiredFeatures(['match_info', 'kill', 'death', 'assist', 'round_phase'], (response: unknown) => {
	// 		console.log('Required features response:', response);
	// 	});

	// 	window.overwolf.games.events.onNewEvents.addListener((event: any) => {
	// 		console.log('CS2 event received:', event);
	// 		if (event.info) {
	// 			dispatch(
	// 				gameSlice.actions.updateGameData({
	// 					gameFound: true,
	// 					time: event.info.match_time || 'Updating...',
	// 					score: event.info.score || { teamA: 0, teamB: 0 },
	// 					kda: {
	// 						kills: event.info.kills || 0,
	// 						deaths: event.info.deaths || 0,
	// 						assists: event.info.assists || 0,
	// 					},
	// 				})
	// 			);
	// 		}
	// 	});
	// }, [dispatch]);

	return (
		<>
			{showOverlay ? (
				<motion.div
					className="fixed top-5 right-5 p-4 bg-gray-900 text-white rounded-2xl shadow-lg w-64 opacity-[.80]! "
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					{!gameFound ? (
						<p className="text-red-500">Игра не обнаружена</p>
					) : (
						<>
							<h2 className="text-xl font-bold">Counter-Strike 2</h2>
							<p className="mt-2">Время раунда: {time}</p>
							<p>
								Счет: {score.teamA} - {score.teamB}
							</p>
							{showDetails && (
								<p className="mt-2">
									KDA: {kda.kills}/{kda.deaths}/{kda.assists}
								</p>
							)}
							<button
								className="mt-3 p-2 bg-blue-600 rounded-xl hover:bg-blue-500 cursor-pointer"
								onClick={() => setShowDetails(!showDetails)}
							>
								{showDetails ? 'Скрыть детали' : 'Показать KDA'}
							</button>
							<button
								className="fixed top-5 right-5 p-2 text-white rounded-2xl shadow-lg hover:bg-gray-700 cursor-pointer"
								onClick={handleShowOverlay}
							>
								<EyeOff />
							</button>
						</>
					)}
				</motion.div>
			) : (
				<button
					className="fixed top-5 right-5 p-2 bg-gray-900 text-white rounded-2xl shadow-lg hover:bg-gray-700 opacity-[.80] cursor-pointer"
					onClick={handleShowOverlay}
				>
					<Eye />
				</button>
			)}
		</>
	);
}

export default Overlay;
