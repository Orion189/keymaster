import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [react()],
		base: "", // because of Electron
		html: {
			cspNonce: env.VITE_NONCE,
		},
	};
});
