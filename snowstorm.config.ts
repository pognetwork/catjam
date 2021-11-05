import { SnowstormConfig } from '@snowstorm/core/server';
import VitePluginFonts from 'vite-plugin-fonts';
import VitePluginWasmPack from 'vite-plugin-wasm-pack';

export const Config: SnowstormConfig = {
	sitesFolder: 'sites',
	site: {
		build: {
			vitePlugins: [
				VitePluginFonts({
					google: {
						families: ['Inter'],
					},
				}),
				VitePluginWasmPack([], ['champ-wasm']),
			],
		},
	},
};
