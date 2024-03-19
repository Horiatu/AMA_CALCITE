class Persist {
	public static WebmapId: string;

	public static Remember = (name: string, value: any) => {
		if (Persist.WebmapId) {
			localStorage[name + "?" + Persist.WebmapId] = value;
		}
	};

	public static Recall = (name: string, _default?: any): any => {
		if (Persist.WebmapId) {
			let value = localStorage[name + "?" + Persist.WebmapId];
			if (!value && _default != null) {
				value = _default;
				// AddressManagerVM.remember(name, value);
			}
			return value;
		}
		return null;
	};
}
