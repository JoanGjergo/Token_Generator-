import { useState } from 'react';
import './App.css';

function App() {
  const [refCode, setRefCode] = useState('');
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);
  const [msgCopied, setMsgCopied] = useState(false);
  const baseUrl = 'https://jet.bank/welcome?ref=';
  const fullLink = refCode ? `${baseUrl}${refCode}` : '';

  const message = name && fullLink
    ? `Përshëndetje ${name},\nJu jeni regjistruar me sukses dhe nuk kërkohet asnjë veprim tjetër për t’u futur në Listë.\nMë poshtë gjeni linkun tuaj unik. Kopjojeni dhe dërgojeni te miqtë dhe të afërmit për t’i referuar në Listën Jet.\nFillo tani: ${fullLink}`
    : '';

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

  const handleCopyMessage = async () => {
    if (message) {
      try {
        await navigator.clipboard.writeText(message);
        setMsgCopied(true);
        setTimeout(() => setMsgCopied(false), 1500);
      } catch (err) {
        setMsgCopied(false);
      }
    }
  };

  return (
    <div className="ref-container">
      <h1>Referral Link Generator</h1>
      <label htmlFor="name-input">Emri:</label>
      <input
        id="name-input"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Shkruani emrin e Lead-it"
        className="ref-input"
        style={{ marginBottom: '1.2rem' }}
      />
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
      {message && (
        <>
          <div className="message-box" style={{whiteSpace: 'pre-line', marginTop: '1.5rem', background: '#f6f8fa', padding: '1rem', borderRadius: '8px', color: '#222', fontSize: '1.05rem'}}>
            {message}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.7rem' }}>
            <button
              className="copy-btn"
              style={{ fontSize: '0.95rem', padding: '0.3rem 0.8rem' }}
              onClick={handleCopyMessage}
              disabled={!message}
            >
              {msgCopied ? 'Copied!' : 'Copy Message'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App
