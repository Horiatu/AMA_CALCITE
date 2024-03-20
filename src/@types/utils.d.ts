/// <reference types="typescript" />

import {Geometry} from "@arcgis/core/geometry";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export type consoleColor = "red" | "yellow" | "green" | "blue" | "cyan" | "purple" | "gray";

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

export type formulaModeType = "max" | "applyFieldAfter";

export interface IAutoFeatureLayer extends FeatureLayer {
	hasAuto: boolean;
	autoGenerateSeed: number;
	getNextAutoSeed: () => number;
	autoField: string;
	SpecialFieldNames: {};
	FormulaFields: {mode: formulaModeType; formula: string; field; input}[];
	initialDefinitionExpression: string;
}

export interface IDirtyFeature extends Graphic {
	geometry: Geometry;
	Dirty?: boolean;
	originalValues?: Object;
	originalGeometry(): Geometry;
	features?: IDirtyFeature[];
	detetedFeatures?: IDirtyFeature[];
	notNew?: boolean;
	selectionGraphic?: any;
	sourceLayer?: IAutoFeatureLayer;
	brokenRules?: string[];
	doNotSave?: boolean;

	isDirtyField(fieldName: string, isDate?): boolean;
	setDirty(
		value: any,
		fieldName?: string,
		input?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
	): boolean;
	isDirty(): boolean;
	isNew(): boolean;
	isSaved(): boolean | string;
	relatedGraphics?: Graphic[];
}

// declare interface PromiseConstructor {
// 	allSettled(
// 		promises: Array<Promise<any>>
// 	): Promise<Array<{status: "fulfilled" | "rejected"; value?: any; reason?: any}>>;
// }
