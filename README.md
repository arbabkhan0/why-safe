# SecureScan

SecureScan is a web-based security analysis application designed to help users identify potential cyber threats such as phishing, malware, scam messages, and malicious QR codes.

## Project Structure

- `server/`: Node.js + Express Backend
- `why-safe/client/`: React + Vite Frontend

## Setup & Running

### Backend

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

### Frontend

1. Navigate to the client directory:
   ```bash
   cd why-safe/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (or similar).

## Features

- **URL Analyzer**: Check URLs for phishing, malware, and suspicious patterns.
- **Message Analyzer**: Analyze SMS, Email, and WhatsApp messages for scams.
- **Identity Checker**: Check if emails or usernames are part of known breaches or look suspicious.
- **QR Code Scanner**: Decode and analyze QR codes for malicious links.

## Deployment

- **Frontend**: Deploy `why-safe/client` to Vercel.
- **Backend**: Deploy `server` to Render.
