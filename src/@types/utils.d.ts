/// <reference types="typescript" />

declare type consoleColor = "red" | "yellow" | "green" | "blue" | "cyan" | "purple" | "gray";

declare interface String {
	isNullOrWhiteSpace(): boolean;
	camelToReadable(): string;
	normalizeTitle(): string;
	stripTags(): string;
	format(...replacements: string[]): string;
	// mixIn(o: any): string;
	startsWith(searchString: String, pos?: number): boolean;
	Format(...args: any[]): String;
	nameEscape(): string;
	logColor(color: consoleColor): string;
}

declare interface Date {
	toSQL(): string;
	toInputDate(time?: boolean): string;
	toUTC(): Date;
}

declare interface Number {
	padLeft(n: number, str?: string): any;
}

declare interface Graphic {
	isDirtyField(fieldName: string, isDate?: boolean): boolean;
	setDirty(fieldName: string, value, input?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): boolean;
	isDirty(): boolean;
	isSaved(): boolean | string;
}

declare interface PromiseConstructor {
	allSettled(
		promises: Array<Promise<any>>
	): Promise<Array<{status: "fulfilled" | "rejected"; value?: any; reason?: any}>>;
}
