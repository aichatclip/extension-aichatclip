import { useState, useEffect } from "react";
import { type WebhookConfig, getWebhooks, setWebhooks } from "../lib/storage";

function generateId() {
	return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export function WebhookSettings() {
	const [hooks, setHooks] = useState<WebhookConfig[]>([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		getWebhooks().then((h) => {
			setHooks(h);
			setLoaded(true);
		});
	}, []);

	const save = (updated: WebhookConfig[]) => {
		setHooks(updated);
		setWebhooks(updated);
	};

	const addHook = () => {
		save([...hooks, { id: generateId(), name: "", url: "", enabled: true }]);
	};

	const updateHook = (id: string, patch: Partial<WebhookConfig>) => {
		save(hooks.map((h) => (h.id === id ? { ...h, ...patch } : h)));
	};

	const removeHook = (id: string) => {
		save(hooks.filter((h) => h.id !== id));
	};

	if (!loaded) return null;

	return (
		<div className="webhook-settings">
			<div className="webhook-header">
				<span className="webhook-title">Webhooks</span>
				<span className="webhook-count">{hooks.length}</span>
			</div>
			{hooks.length === 0 && (
				<button type="button" className="btn" onClick={addHook}>
					Add Webhook
				</button>
			)}
			{hooks.map((hook) => (
				<div key={hook.id} className="webhook-item">
					<div className="webhook-item-header">
						<input
							type="text"
							className="webhook-name"
							placeholder="Name"
							value={hook.name}
							onChange={(e) => updateHook(hook.id, { name: e.target.value })}
						/>
						<label className="webhook-toggle">
							<input
								type="checkbox"
								checked={hook.enabled}
								onChange={(e) => updateHook(hook.id, { enabled: e.target.checked })}
							/>
							<span className="toggle-slider" />
						</label>
						<button
							type="button"
							className="btn-icon btn-remove"
							onClick={() => removeHook(hook.id)}
							title="Remove"
						>
							&times;
						</button>
					</div>
					<input
						type="url"
						className="webhook-url"
						placeholder="https://..."
						value={hook.url}
						onChange={(e) => updateHook(hook.id, { url: e.target.value })}
					/>
				</div>
			))}
			{hooks.length > 0 && (
				<button type="button" className="btn btn-add-webhook" onClick={addHook}>
					Add Webhook
				</button>
			)}
		</div>
	);
}
