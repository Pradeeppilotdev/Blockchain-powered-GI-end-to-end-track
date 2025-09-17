'use client';

import { Button } from '@/components/ui/button';
import { ScanLine, Loader2, QrCode } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ConsumerDashboard() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning and fetching data
    setTimeout(() => {
      // In a real app, the QR code would contain the ID.
      // We're using a mock ID for this prototype.
      router.push('/trace/prod-12345');
    }, 1500);
  };

  return (
    <div className="text-center flex flex-col items-center">
      <div className="p-4 bg-primary/10 rounded-full mb-6">
        <QrCode className="w-12 h-12 text-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-4">Verify Product Authenticity</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Make informed purchasing decisions. Scan the QR code on a GI product to view its complete, verified history on the blockchain.
      </p>
      <Button size="lg" onClick={handleScan} disabled={isScanning} className="h-14 text-lg">
        {isScanning ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <ScanLine className="mr-2 h-5 w-5" />
        )}
        {isScanning ? 'Verifying...' : 'Scan Product QR Code'}
      </Button>
    </div>
  );
}
