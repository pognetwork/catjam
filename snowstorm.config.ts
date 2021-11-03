import { SnowstormConfig } from '@snowstorm/core/server';
import VitePluginFonts from 'vite-plugin-fonts';

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
			],
		},
	},
};
