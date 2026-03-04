import { useState } from "react";
import { setApiBaseUrl } from "../lib/storage";

export function SettingsForm({
	currentUrl,
	onSaved,
}: {
	currentUrl: string;
	onSaved: (url: string) => void;
}) {
	const [url, setUrl] = useState(currentUrl);
	const [saved, setSaved] = useState(false);

	const handleSave = async () => {
		await setApiBaseUrl(url);
		onSaved(url);
		setSaved(true);
		setTimeout(() => setSaved(false), 2000);
	};

	return (
		<div className="settings-form">
			<label htmlFor="api-url">API Base URL</label>
			<input id="api-url" type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
			<button type="button" className="btn" onClick={handleSave}>
				{saved ? "Saved!" : "Save"}
			</button>
		</div>
	);
}
