import { SnowstormConfig } from '@snowstorm/core';
import { VitePluginFonts } from 'vite-plugin-fonts';
import vitePluginWasmPack from '@pognetwork/vite-plugin-wasm-pack';

export const Config: SnowstormConfig = {
	sitesFolder: 'sites',
	site: {
		build: {
			forcePrebundle: ['@pognetwork/proto'],
			noExternal: [
				'@pognetwork/proto',
				'champ-wasm',
				'd3-array',
				'd3-time-format',
			],
			plugins: [
				VitePluginFonts({
					google: {
						families: ['Inter'],
					},
				}),
				((vitePluginWasmPack as any).default as typeof vitePluginWasmPack)(
					[],
					['champ-wasm'],
				),
			],
		},
	},
};
