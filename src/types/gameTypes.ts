export interface Score {
	teamA: number;
	teamB: number;
}

export interface KDA {
	kills: number;
	deaths: number;
	assists: number;
}

export interface GameState {
	score: Score;
	time: string;
	kda: KDA;
	gameFound: boolean;
}

// export interface GameEvent {
// 	info?: {
// 		match_time?: string;
// 		score?: Score;
// 		kills?: number;
// 		deaths?: number;
// 		assists?: number;
// 	};
// }
