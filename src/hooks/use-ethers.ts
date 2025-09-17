'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { ethers, BrowserProvider, Signer } from 'ethers';

interface EthersContextValue {
  provider: BrowserProvider | null;
  signer: Signer | null;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const EthersContext = createContext<EthersContextValue | null>(null);

export const useEthers = () => {
  const context = useContext(EthersContext);
  if (!context) {
    throw new Error('useEthers must be used within a BlockchainProvider');
  }
  return context;
};

export const BlockchainProvider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const connect = async () => {
    if (window.ethereum) {
      try {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        await browserProvider.send('eth_requestAccounts', []);
        const signer = await browserProvider.getSigner();
        const address = await signer.getAddress();

        setProvider(browserProvider);
        setSigner(signer);
        setAddress(address);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const disconnect = () => {
    setProvider(null);
    setSigner(null);
    setAddress(null);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          connect();
        } else {
          disconnect();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  const value = { provider, signer, address, connect, disconnect };

  return (
    <EthersContext.Provider value={value}>
      {children}
    </EthersContext.Provider>
  );
};
