'use client'
import React, { ReactNode } from 'react'
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from '../config';
// Setup queryClient
const queryClient = new QueryClient()


export default function AppKitProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
    <RainbowKitProvider>
        {children}
    </RainbowKitProvider>
    </QueryClientProvider>
    </WagmiProvider>
  )
}