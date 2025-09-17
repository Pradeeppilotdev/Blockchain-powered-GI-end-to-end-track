import Link from 'next/link';
import { Card, CardContent, CardFooter } from '../ui/card';
import { QrCode, ExternalLink } from 'lucide-react';

interface QrCodeDisplayProps {
  produceId: string;
}

export default function QrCodeDisplay({ produceId }: QrCodeDisplayProps) {
  const traceUrl = `/trace/${produceId}`;

  return (
    <Link href={traceUrl} target="_blank" rel="noopener noreferrer">
      <Card className="hover:shadow-lg transition-shadow bg-card border-none w-56">
        <CardContent className="p-4">
          <div className="aspect-square w-full mx-auto bg-white p-2 rounded-lg">
            {/* This is a placeholder SVG for a QR code */}
            <svg
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <rect width="256" height="256" fill="#fff" />
              <path
                fill="#000"
                d="M112 112h32v32h-32v-32ZM96 96v64h64V96H96Zm48 48h-32v-32h32v32ZM48 48h64v64H48V48Zm48 48H64V64h32v32Zm-48-32v16h16V64H48Zm128-16h-64v64h64V48Zm-16 48h-32v-32h32v32Zm16-32v16h-16V64h16Zm-32 80h32v32h-32v-32Zm-16 16v-16h-16v16h-16v16h16v16h16v-16h16v-16h-16Zm-16 0v-16h16v16h-16Zm-32 32h16v-16h-16v-16h-16v32h16Zm16 0v-16h-16v16h16ZM48 144H16v-32h16v32h16v16H48v-16Zm0 0v16H32v-16h16Zm-32 32h16v16h16v16h16v16H16v-48Zm16 16v-16h16v16H32Zm144 32h16v16h16v16h32v-64h-16v32h-16v-16h-32v16Zm32-16v-16h-16v16h16Zm-96-64h16v16h16v16h-32v-32Zm16 0v16h-16v-16h16Zm64 32h16v-16h16v-16h16v-16h16v32h-32v16h-16v-16h-16v16Zm16 0v-16h16v16h-16Z"
              />
            </svg>
          </div>
        </CardContent>
        <CardFooter className="bg-transparent px-4 py-3">
          <div className="flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors">
            <ExternalLink className="w-4 h-4 mr-2" />
            <span>Click to view trace page</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
