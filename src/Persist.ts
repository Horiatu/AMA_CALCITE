export default class Persist {
	public static WebmapId: string;

	public static Remember = (name: string, value: any) => {
		if (Persist.WebmapId) {
			localStorage[name + "?" + document["WebmapId"]] = value;
		}
	};

	public static Recall = (name: string, _default?: any): any => {
		if (Persist.WebmapId) {
			let value = localStorage[name + "?" + document["WebmapId"]];
			if (!value && _default != null) {
				value = _default;
				// AddressManagerVM.remember(name, value);
			}
			return value;
		}
		return null;
	};
}
