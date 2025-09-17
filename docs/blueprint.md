# **App Name**: TraceHarvest

## Core Features:

- User Authentication: Secure user authentication with role-based access control (Farmer, Distributor, Retailer, Consumer) via Firebase Authentication.
- Data Provenance: Farmers input harvest data (name, harvest date, metrics) that tool is used by an LLM to confirm the format.
- QR Code Generation: Generate QR codes that reference the produce harvest entry that was entered.
- Supply Chain Logging: Scan QR codes at each step of the supply chain (processing, transport, retail) to add immutable transactions to the blockchain using smart contracts. Include location, timestamp, and status.
- Consumer Traceability: Consumers scan QR codes to view the full product history from the blockchain, displayed as a timeline.
- Offline Data Handling: Implement local caching of QR code data using Firestore for offline support, with synchronization to the blockchain when online.

## Style Guidelines:

- Primary color: Vibrant green (#90EE90) to evoke freshness and agricultural focus.
- Background color: Light green (#F0FFF0) provides a soft, clean backdrop.
- Accent color: Earthy orange (#D2691E) to highlight key actions and elements, reminiscent of the harvest.
- Body and headline font: 'PT Sans', a humanist sans-serif, for a blend of modern clarity and approachability.
- Use custom icons to represent each step in the supply chain (farm, processing, transport, retail). 
- Mobile-first design with clear, step-by-step UI patterns. Timeline layout for the traceability view.