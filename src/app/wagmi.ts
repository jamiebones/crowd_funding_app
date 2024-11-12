"use client"
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  rootstockTestnet
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Crowd Funding Application',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    rootstockTestnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [rootstockTestnet] : []),
  ],
  ssr: true,
});