import { useEffect, useState } from "react";
import { SettingsForm } from "../../components/SettingsForm";
import { sendMessage } from "../../lib/messaging";
import { clearSessionToken, getApiBaseUrl } from "../../lib/storage";

const WEB_ORIGINS: Record<string, string> = {
	"https://api.aichatclip.com": "https://aichatclip.com",
	"http://localhost:8787": "http://localhost:5173",
};

function getWebUrl(apiBaseUrl: string): string {
	return WEB_ORIGINS[apiBaseUrl] ?? apiBaseUrl.replace(/:\d+$/, ":5173");
}

export function App() {
	const [authenticated, setAuthenticated] = useState<boolean | null>(null);
	const [showSettings, setShowSettings] = useState(false);
	const [apiBaseUrl, setApiBaseUrl] = useState("");

	const checkAuth = () => {
		sendMessage("getAuthStatus", undefined).then((res) => {
			setAuthenticated(res.authenticated);
		});
	};

	useEffect(() => {
		checkAuth();
		getApiBaseUrl().then(setApiBaseUrl);
	}, []);

	const handleLogin = async () => {
		const url = await getApiBaseUrl();
		const webUrl = getWebUrl(url);
		browser.tabs.create({ url: `${webUrl}/auth/extension` });
	};

	const handleLogout = async () => {
		await clearSessionToken();
		setAuthenticated(false);
	};

	return (
		<div className="popup">
			<h1>AIChatClip</h1>

			{authenticated === null && <p className="status">Checking...</p>}
			{authenticated === true && (
				<>
					<p className="status success">Logged in</p>
					<button type="button" className="btn secondary" onClick={handleLogout}>
						Log out
					</button>
				</>
			)}
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
