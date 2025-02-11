import { createSlice } from '@reduxjs/toolkit';
import { GameState } from '../types/gameTypes';

const initialState: GameState = {
	score: { teamA: 0, teamB: 0 },
	time: '0:00',
	kda: { kills: 0, deaths: 0, assists: 0 },
	gameFound: false,
};

export const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		updateGameData: state => {
			state.score.teamA = Math.floor(Math.random() * 16);
			state.score.teamB = Math.floor(Math.random() * 16);
			state.time = String(Math.floor(Math.random() * 120));
			state.kda.kills = Math.floor(Math.random() * 30);
			state.kda.deaths = Math.floor(Math.random() * 30);
			state.kda.assists = Math.floor(Math.random() * 15);
			state.gameFound = true;
		},
	},
});

export const { updateGameData } = gameSlice.actions;
export default gameSlice.reducer;
