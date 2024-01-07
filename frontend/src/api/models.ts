import { Email, GameRun } from "./api";

export class PlayerAnswer {
	player_answer?: boolean;
	correctness?: boolean;
	players_duration?: string;

	constructor(obj: PlayerAnswer) {
		this.player_answer = obj.player_answer;
		this.correctness = obj.correctness;
		this.players_duration = obj.players_duration;
	}
}

export type NextEmail = (Email | EmailEndResponse) & {
	gamerun_id: string;
	step: number;
};

export class GamerunSummary {
	email?: Email;
	average_correctness?: number;
	average_duration?: number;
	players_duration?: number;
	answer?: PlayerAnswer;

	constructor(obj: GamerunSummary) {
		this.email = obj.email;
		this.average_correctness = obj.average_correctness;
		this.average_duration = obj.average_duration;
		this.players_duration = obj.players_duration;
		this.answer = obj.answer;
	}
}

export class GameRunSummary {
	gamerun: GameRun;
	statistics: Array<{ answer: PlayerAnswer } & EmailWithStatistics>;

	constructor(obj: GameRunSummary) {
		this.gamerun = obj.gamerun;
		this.statistics = obj.statistics;
	}
}

export class GameRunWithStatistics extends GameRun {
	statistics?: Array<PlayerAnswer>;

	constructor(obj: GameRunWithStatistics) {
		super(obj);
		this.statistics = obj.statistics;
	}
}

export class EmailWithStatistics extends Email {
	occurrence?: number;
	average_duration?: number;
	average_correctness?: number;

	constructor(obj: EmailWithStatistics) {
		super(obj);
		this.occurrence = obj.occurrence;
		this.average_duration = obj.average_duration;
		this.average_correctness = obj.average_correctness;
	}
}

export interface EmailEndResponse {
	end: boolean;
}

export interface Player {
	username: string;
	age: string;
	gender: "Man" | "Woman" | "Other";
}

export interface ImageCarouselObj {
	image: string;
	label: string;
	htmlFormatting?: boolean;
}
