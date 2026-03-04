import { useEffect, useState } from "react";
import { SettingsForm } from "../../components/SettingsForm";
import { sendMessage } from "../../lib/messaging";
import { getApiBaseUrl } from "../../lib/storage";

export function App() {
	const [authenticated, setAuthenticated] = useState<boolean | null>(null);
	const [showSettings, setShowSettings] = useState(false);
	const [apiBaseUrl, setApiBaseUrl] = useState("");

	useEffect(() => {
		sendMessage("getAuthStatus", undefined).then((res) => {
			setAuthenticated(res.authenticated);
		});
		getApiBaseUrl().then(setApiBaseUrl);
	}, []);

	const handleLogin = async () => {
		const url = await getApiBaseUrl();
		browser.tabs.create({ url: `${url}/api/auth/sign-in/social?provider=google` });
	};

	return (
		<div className="popup">
			<h1>AIChatClip</h1>

			{authenticated === null && <p className="status">Checking...</p>}
			{authenticated === true && <p className="status success">Logged in</p>}
			{authenticated === false && (
				<>
					<p className="status">Not logged in</p>
					<button type="button" className="btn primary" onClick={handleLogin}>
						Log in with Google
					</button>
				</>
			)}

			<hr />

			<button
				type="button"
				className="btn secondary"
				onClick={() => setShowSettings(!showSettings)}
			>
				{showSettings ? "Hide Settings" : "Settings"}
			</button>

			{showSettings && <SettingsForm currentUrl={apiBaseUrl} onSaved={setApiBaseUrl} />}
		</div>
	);
}
