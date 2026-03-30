import { useState } from 'react';
import './App.css';

function App() {
  const [refCode, setRefCode] = useState('');
  const [copied, setCopied] = useState(false);
  const baseUrl = 'https://jet.bank/welcome?ref=';
  const fullLink = refCode ? `${baseUrl}${refCode}` : '';

  const handleCopy = async () => {
    if (fullLink) {
      try {
        await navigator.clipboard.writeText(fullLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (err) {
        setCopied(false);
      }
    }
  };

  return (
    <div className="ref-container">
      <h1>Referral Link Generator</h1>
      <label htmlFor="ref-input">Referral Code:</label>
      <input
        id="ref-input"
        type="text"
        value={refCode}
        onChange={e => setRefCode(e.target.value)}
        placeholder="E7R-B44V-OC9"
        className="ref-input"
        autoFocus
      />
      <div className="link-section">
        <input
          type="text"
          value={fullLink}
          readOnly
          className="link-output"
          placeholder="Your full referral link will appear here"
        />
        <button
          className="copy-btn"
          onClick={handleCopy}
          disabled={!refCode}
        >
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}

export default App
