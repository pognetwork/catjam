import { SnowstormConfig } from '@snowstorm/core/server';
import vitePluginFonts from 'vite-plugin-fonts';
import vitePluginWasmPack from '@pognetwork/vite-plugin-wasm-pack';

export const Config: SnowstormConfig = {
	sitesFolder: 'sites',
	site: {
		build: {
			vitePlugins: [
				vitePluginFonts({
					google: {
						families: ['Inter'],
					},
				}),
				vitePluginWasmPack([], ['champ-wasm']),
			],
		},
	},
};
