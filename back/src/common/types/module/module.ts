export interface Module {
	initModule(): void;
	initModuleAsync(): Promise<void>;
}
