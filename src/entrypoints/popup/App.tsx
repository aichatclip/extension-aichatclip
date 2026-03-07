import { useEffect, useState } from "react";
import { WebhookSettings } from "../../components/WebhookSettings";
import { sendMessage } from "../../lib/messaging";
import { clearSessionToken, getApiBaseUrl, watchSessionToken } from "../../lib/storage";

const WEB_ORIGINS: Record<string, string> = {
	"https://api.aichatclip.com": "https://aichatclip.com",
	"http://localhost:8787": "http://localhost:5173",
};

function getWebUrl(apiBaseUrl: string): string {
	return WEB_ORIGINS[apiBaseUrl] ?? apiBaseUrl.replace(/:\d+$/, ":5173");
}

const LOGO_SVG = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
		<circle cx="13" cy="10.27" r="2" />
		<path d="M20.2,9.8l-3.5,6.06c-.27.48-.89.64-1.37.37s-.64-.89-.37-1.37l3.5-6.06c1.11-1.91.45-4.36-1.46-5.46s-4.36-.45-5.46,1.46l-.5.87c-.27.48-.89.64-1.37.37s-.64-.89-.37-1.37l.5-.87C11.46.94,15.13-.05,18,1.61s3.85,5.33,2.2,8.2Z" />
		<path d="M14.7,19.33l-.5.87c-1.66,2.87-5.33,3.85-8.2,2.2s-3.85-5.33-2.2-8.2l3.5-6.06c.27-.48.89-.64,1.37-.37s.64.89.37,1.37l-3.5,6.06c-1.1,1.91-.45,4.36,1.46,5.46s4.36.45,5.46-1.46l.5-.87c.27-.48.89-.64,1.37-.37s.64.89.37,1.37Z" />
	</svg>
);

export function App() {
	const [authenticated, setAuthenticated] = useState<boolean | null>(null);
	const [apiBaseUrl, setApiBaseUrl] = useState("");

	const checkAuth = () => {
		sendMessage("getAuthStatus", undefined).then((res) => {
			setAuthenticated(res.authenticated);
		});
	};

	useEffect(() => {
		checkAuth();
		getApiBaseUrl().then(setApiBaseUrl);

		const unwatch = watchSessionToken(() => {
			checkAuth();
		});
		return unwatch;
	}, []);

	const handleLogin = async () => {
		const url = apiBaseUrl || (await getApiBaseUrl());
		const webUrl = getWebUrl(url);
		browser.tabs.create({ url: `${webUrl}/auth/extension` });
	};

	const handleLogout = async () => {
		await clearSessionToken();
		setAuthenticated(false);
	};

	const openWebsite = () => {
		const webUrl = getWebUrl(apiBaseUrl);
		browser.tabs.create({ url: webUrl });
	};

	return (
		<div className="popup">
			<header className="popup-header">
				<a className="popup-header-link" href="#" onClick={(e) => { e.preventDefault(); openWebsite(); }}>
					{LOGO_SVG}
					<h1>AIChatClip</h1>
				</a>
			</header>

			<section className="section">
				<WebhookSettings />
			</section>

			<hr />

			<section className="section">
				<div className="section-label">AIChatClip Sync</div>
				{authenticated === null && <p className="status">Checking...</p>}
				{authenticated === true && (
					<>
						<p className="status success">Connected</p>
						<button type="button" className="btn" onClick={handleLogout}>
							Disconnect
						</button>
					</>
				)}
				{authenticated === false && (
					<button type="button" className="btn primary" onClick={handleLogin}>
						Log in with Google
					</button>
				)}
			</section>
		</div>
	);
}
