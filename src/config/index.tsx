import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { rootstockTestnet  } from 'wagmi/chains'

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

export const metadata = {
  name: 'Crowd Funding Dapp',
  description: 'A Crowd funding application backed by Bitcoin',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}


export const config = getDefaultConfig({
    appName: 'Crowd Funding Application',
    projectId,
    chains: [
      rootstockTestnet,
      ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [rootstockTestnet] : []),
    ],
    ssr: true,
  });