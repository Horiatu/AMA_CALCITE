/* eslint-disable no-extend-native */
/* eslint-disable prefer-rest-params */
// import {ApplicationConfig} from "ApplicationBase/interfaces";
// import html from "dojo/_base/html";
// import Graphic from "esri/Graphic";
// import FeatureLayer from "esri/layers/FeatureLayer";
// import CodedValueDomain from "esri/layers/support/CodedValueDomain";
// import i18n = require("dojo/i18n!./widgets/nls/resources");
// import {property} from "esri/core/accessorSupport/decorators";
// import {Geometry} from "esri/geometry";
// import {IDirtyFeature} from "./widgets/AMACore/AMACoreViewModel";

// export function Has(config: ApplicationConfig, tool: string): boolean {
// 	// console.log("config", config);
// 	const hasTool = tool === "filter" || config[`tool_${tool}`];
// 	return hasTool !== "undefined" && hasTool;
// }

String.prototype.stripTags = function (): string {
	return this.replace(/<[^>]*>/g, "") as string;
};

String.prototype.normalizeTitle = function (): string {
	return this.replace("_", " ")
		.replace(/(\1[a-z])(\2[A-Z])/g, "$1 $2")
		.replace(/(\1[A-Z]+)(\2[A-Z])(\3[a-z])/g, "$1 $2$3");
};

String.prototype.camelToReadable = function (): string {
	return this.replace(/(\1[a-z])(\2[A-Z])/g, "$1 $2");
};

String.prototype.isNullOrWhiteSpace = function (): boolean {
	return this === undefined || this === null || this.trim() === "";
};

String.prototype.mixIn = function (o: any): string {
	const regexp = /{([^{]+)}/g;

	return (function (str, o) {
		return str.replace(regexp, function (ignore: any, key: string | number) {
			return (key = o[key]) == null ? "" : key;
		});
	})(this, o);
};

Number.prototype.padLeft = function (n, str) {
	return new Array(n - String(this).length + 1).join(str || "0") + this;
};

Date.prototype.toSQL = function (): string {
	if (this.toDateString() === "Invalid Date") {
		return null;
	}
	return this.getFullYear().padLeft(4) + (this.getMonth() + 1).padLeft(2) + this.getDate().padLeft(2);
};

Date.prototype.toInputDate = function (time: boolean = false): string {
	if (this.toDateString() === "Invalid Date") {
		return null;
	}
	let date = this.getFullYear().padLeft(4) + "-" + (this.getMonth() + 1).padLeft(2) + "-" + this.getDate().padLeft(2);
	if (time) {
		date += "T" + this.getHours().padLeft(2) + ":" + this.getMinutes().padLeft(2); // + ":" + this.getSeconds().padLeft(2);
	}
	// console.log("toInputDate", date);
	return date.startsWith("1899-12-31") || date.startsWith("1969-12-31") ? null : date;
};

Date.prototype.toUTC = function (): Date {
	if (this.toDateString() === "Invalid Date") {
		return null;
	}
	return new Date(
		this.getUTCFullYear(),
		this.getUTCMonth(),
		this.getUTCDate(),
		this.getUTCHours(),
		this.getUTCMinutes(),
		this.getUTCSeconds()
	);
};

if (!String.prototype.startsWith) {
	String.prototype.startsWith = function (search: string, pos?: number): boolean {
		pos = !pos || pos < 0 ? 0 : +pos;
		return this.substring(pos, pos + search.length) === search;
	};
}

// eslint-disable-next-line no-extend-native
String.prototype.format = function (): string {
	const args = arguments;
	return this.replace(/{(\d+)}/g, function (match: any, number: string | number) {
		return typeof args[number] !== "undefined" ? args[number] : match;
	});
};

String.prototype.Format = function (...args): string {
	let a = this;
	for (const k in args) {
		if (args.hasOwnProperty(k)) {
			a = a.replace(new RegExp("\\{" + k + "\\}", "g"), arguments[k]);
		}
	}
	return a;
};

String.prototype.nameEscape = function (): string {
	let a = this as string;
	a = a.replace(/\'/g, "''");
	return a;
};

Graphic.prototype.isDirtyField = function (fieldName: string, isDate = false): boolean {
	if (fieldName !== "geometry") {
		const hasOriginalValue =
			this.attributes &&
			this.attributes.hasOwnProperty(fieldName) &&
			this.originalValues &&
			this.originalValues.hasOwnProperty(fieldName);

		if (hasOriginalValue) {
			if (isDate) {
				const originalDate = new Date(this.originalValues[fieldName]).setSeconds(0, 0);
				const date = new Date(this.attributes[fieldName]).setSeconds(0, 0);
				// console.log("dates", originalDate, date, originalDate !== date);
				return originalDate !== date;
			}
			// tslint:disable-next-line: triple-equals
			return this.originalValues[fieldName] != this.attributes[fieldName]; // !!!
		}
		return false;
	} else {
		const hasOriginalValue = this.originalValues && this.originalValues["geometry"];
		if (hasOriginalValue) {
			const same = JSON.stringify(this.originalValues["geometry"]) === JSON.stringify(this.geometry);
			// console.log("Geometries.JSON", same, JSON.stringify(this.originalValues["geometry"]), JSON.stringify(this.geometry));
			return hasOriginalValue && !same;
		}
	}
	return false;
};

Graphic.prototype.setDirty = function (
	value: any,
	fieldName?: string,
	input?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
): boolean {
	if (input) {
		input.removeAttribute("title");
		input.classList.remove("dirty");
	}

	let dirty = !this.isSaved();
	const revisionFieldName = this.sourceLayer["SpecialFieldNames"]["revisiondate"];

	if (!fieldName || fieldName === "") {
		this.Dirty = dirty = !!this.Dirty || value;
	} else {
		if (!this.attributes) {
			this.attributes = {};
		}

		const nullCompare = (a, b) => {
			// tslint:disable-next-line: triple-equals
			return a === null && b === null ? true : a === null || b === null ? false : a == b;
		};
		const isGeometry = () => {
			return fieldName === "geometry";
		};
		const _Value = (value, field: __esri.Field) => {
			return field && field.type === "date" ? new Date(value).toInputDate(true) : value !== null ? value : "";
		};

		// const _Value = (fieldName: string) => {
		//     if (fieldName === "geometry") {
		//         return this.geometry;
		//     }
		//     const field = (this.layer as FeatureLayer).fields.find(f => f.name === fieldName);
		//     const value = this.attributes[fieldName];
		//     return (field && field.type === "date") ? new Date(value).toInputDate(true) : value !== null ? value : "";
		// };

		let isfieldDirty = false;
		let layerField = (this.sourceLayer as FeatureLayer).fields.find(
			(f) => f.name.toLowerCase() === fieldName.toLowerCase()
		);
		if (!layerField && fieldName.toLowerCase() === "full_add") {
			layerField = (this.sourceLayer as FeatureLayer).fields.find(
				(f) => f.name.toLowerCase() === "road_name_body"
			);
		}
		let origValue = !isGeometry() ? _Value(this.attributes[fieldName], layerField) : this.geometry;

		if (!this.originalValues) {
			this.originalValues = {};
			this.originalValues[fieldName] = origValue;
		} else {
			if (this.originalValues.hasOwnProperty(fieldName)) {
				origValue = this.originalValues[fieldName];
			} else {
				this.originalValues[fieldName] = origValue;
			}
		}
		if (isGeometry()) {
			isfieldDirty = JSON.stringify(this.geometry) !== JSON.stringify(value);
			// if (!fieldDirty && value.type === "polyline") {
			//     const polyline = value as Polyline;
			//     const oPolyline = origValue as Polyline;
			//     if (polyline && oPolyline) {
			//         fieldDirty = polyline.paths[0][0][0] !== oPolyline.paths[0][0][0] || polyline.paths[0][0][1] !== oPolyline.paths[0][0][1];
			//     }
			// }
			if (isfieldDirty) {
				this.geometry = value;
			}
		} else {
			isfieldDirty = !nullCompare(origValue, _Value(value, layerField));

			this.attributes[fieldName] = value;
			if (layerField && input) {
				input.value = _Value(value, layerField);

				input.classList.toggle("dirty", isfieldDirty);

				if (isfieldDirty) {
					if (!origValue) {
						origValue = "";
					}
					let initialValue = _Value(origValue, layerField);
					if (layerField["domain"]) {
						const codedValues = (layerField.domain as CodedValueDomain).codedValues;
						try {
							// tslint:disable-next-line: triple-equals
							const valueName = codedValues.find((cv) => cv.code == initialValue).name;
							if (valueName) {
								initialValue = valueName;
							}
						} catch (e) {}
					}
					const title = [i18n.InitialValue.format(initialValue)];
					if (!(input as any).readOnly && !input.disabled) {
						// title.push(`([Esc] to restore)`);
						title.push(i18n.Restore);
					}
					input.title = title.join("\n");
				} else {
					html.removeAttr(input, "title");
				}
			}
		}

		if (!isfieldDirty) {
			// delete feature.originalValues[fieldName];
			this.Dirty = false; // ???
			for (const attribute in this.attributes) {
				if (attribute !== revisionFieldName) {
					this.Dirty =
						this.originalValues &&
						this.originalValues.hasOwnProperty(attribute) &&
						!nullCompare(this.originalValues[attribute], this.attributes[attribute]);
					if (this.Dirty) {
						break;
					}
				}
			}
			if (!this.Dirty && this.originalValues.hasOwnProperty("geometry")) {
				this.Dirty = this.geometry.toJSON() !== this.originalValues["geometry"].toJSON();
			}

			// if (!this.Dirty && this.originalValues && this.originalValues.hasOwnProperty(revisionFieldName)) {
			//     // this.setDirty(feature, revisionFieldName, feature.originalValues[revisionFieldName], this.inputControls[revisionFieldName]); // ???
			// }
		}

		dirty = !this.isSaved();
		if (this.originalValues) {
			Object.keys(this.originalValues).forEach((key) => {
				if (key !== revisionFieldName) {
					dirty = dirty || this.isDirtyField(key);
				}
			});
		}
		if (!dirty && this.features && this.features.length) {
			if ((this.features as IDirtyFeature[]).some((unit) => !!unit.Dirty)) {
				dirty = true;
			}
		}
		this.Dirty = dirty;
	}

	this.sourceLayer.emit("dirtyFeature", {feature: this, dirty: this.Dirty, fieldName: fieldName});

	return dirty;
};

Graphic.prototype.isDirty = function (): boolean {
	return "Dirty" in this && this.Dirty;
};

Graphic.prototype.isSaved = function (): boolean | string {
	if (this.sourceLayer) {
		const objectIdField = this.sourceLayer.objectIdField;
		const result =
			this.attributes && objectIdField in this.attributes && this.attributes[objectIdField]
				? this.attributes[objectIdField]
				: false;
		return result;
	}
	return false;
};

Graphic.prototype.isNew = function (): boolean {
	return !this.notNew && !this.isSaved();
};

Object.defineProperty(Graphic, "doNotSave", {
	get: function myProperty(): boolean {
		return !!this._get("doNotSave");
	},
	set: function myProperty(value: boolean) {
		return this._set("doNotSave", value);
	},
});

Graphic.prototype.originalGeometry = function (): Geometry {
	return this.originalValues?.geometry ?? this.geometry;
};

// export class Mutex {
// 	@property()
// 	private _lock: Promise<void>;

// 	constructor() {
// 		this._lock = Promise.resolve();
// 	}

// 	private _resolve = null;
// 	private _acquire() {
// 		this._resolve = null;
// 		this._lock = new Promise((resolve) => {
// 			this._resolve = resolve;
// 		});
// 		return this._resolve;
// 	}

// 	public lock(callback?: (release) => void) {
// 		const q = this._lock.then(() => release);
// 		const release = this._acquire();
// 		if (callback) {
// 			q.then(() => callback(release));
// 		}
// 		return q;
// 	}

// 	public cancel = (result?: any) => {
// 		if (this._resolve) {
// 			this._resolve(result);
// 		}
// 	};
// }

// Mutex.prototype.toString = function () {
// 	return "[Mutex]";
// };

// export function logError(errorName: string, ...args) {
//     // console.log(`\x1B[31mError ${errorName}\x1B[m`, args);
//     return [`\x1B[31mError ${errorName}\x1B[m`, ...args];
// };

// export class Debugger {
// // = function(gState: any, klass: { isDebug: any; toString: () => string; }) {
//     @property()
//         isDebug: boolean = true;

//     @property()
//         klass: any; // { isDebug: any; toString: () => string; };

//     @property()
//         debug = {};

//     constructor(klass: any, isDebug: boolean = true, callback?: (console) => void) {
//         this.klass = klass ?? this;
//         this.isDebug = isDebug;
//         this.klass["isDebug"] = this.isDebug;

//         // https://developer.chrome.com/docs/devtools/console/format-style/
//         if (this.isDebug) {
//             for (const m in console) {
//                 if (typeof console[m] === "function") {
//                     const ms = m.toString();
//                     if (ms === "assert" || ms === "dir" || ms === "table") {
//                         this.debug[m] = console[m].bind(window.console);
//                     } else {
//                         this.debug[m] = console[m].bind(window.console, `\x1B[${
//                         (ms === "log") ? "36" :
//                         (ms === "error") ? "31" :
//                         (ms === "warn") ? "91" :
//                         (ms === "debug") ? "34" :
//                         (ms === "clear") ? "37" :
//                         ""
//                         }m${ms}:\x1B[m`);
//                     }
//                 }
//             };
//             this.debug["logError"] = console["log"].bind(window.console, `\x1B[31mError:\x1B[m`);
//             this.debug["logWarn"] = console["log"].bind(window.console, `\x1B[91m\Warning:\x1B[m`);
//         } else {
//             for (const m in console) {
//                 if (typeof console[m] == "function") {
//                     this.debug[m] = function() {};
//                 }
//             };
//             this.debug["logError"] = function() {};
//             this.debug["logWarn"] = function() {};
//         }

//         if (callback) {
//             callback(this.debug);
//         }
//     }
// }

String.prototype.logColor = function (color: consoleColor): string {
	const colorToCode = {red: 31, green: 32, yellow: 33, blue: 34, cyan: 36, purple: 35, gray: 37};
	return `\x1B[${colorToCode[color]}m${this}\x1B[m`;
};
