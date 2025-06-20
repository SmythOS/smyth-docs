import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { createClient } from '@supabase/supabase-js';
import { Smile, Send, X } from 'lucide-react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const KEY   = 'smyth-docs-helper-seen';
const DELAY = 180_000;                  
const AVATAR =
  '/docs/img/aria-smythos-cmo.png';

function useSupabase() {
  const { siteConfig } = useDocusaurusContext();
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = siteConfig.customFields as {
    SUPABASE_URL: string; SUPABASE_ANON_KEY: string;
  };
  return React.useMemo(
    () => createClient(SUPABASE_URL, SUPABASE_ANON_KEY),
    [SUPABASE_URL, SUPABASE_ANON_KEY],
  );
}

function Popup() {
  const supabase = useSupabase();

  const [open, setOpen]     = useState(false);
  const [busy, setBusy]     = useState(false);
  const [text, setText]     = useState('');
  const [sent, setSent]     = useState(false);
  const boxRef              = useRef<HTMLTextAreaElement>(null);

  /* once-per-visit timer */
  useEffect(() => {
    if (localStorage.getItem(KEY) === 'yes') return;
    const id = setTimeout(() => {
      setOpen(true);
      localStorage.setItem(KEY, 'yes');
      setTimeout(() => boxRef.current?.focus(), 200);
    }, DELAY);
    return () => clearTimeout(id);
  }, []);

  const close = () => { setOpen(false); };

  const submit = async () => {
    if (!text.trim()) return;
    setBusy(true);
    await supabase.from('feedback').insert({
      page_id: window.location.pathname,
      vote: 'down',
      comment: text.trim(),
      user_agent: navigator.userAgent.slice(0, 120),
    });
    setBusy(false); setSent(true);
  };

  const mailto = () => {
    const a = document.createElement('a');
    a.href = 'mailto:support@smythos.com?subject=Docs%20question';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  if (!open) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        right: '1.25rem',
        bottom: '1.25rem',
        width: 340,
        maxWidth: 'calc(100vw - 2rem)',
        background: '#fff',
        border: '1px solid #d0d7de',
        borderRadius: 12,
        boxShadow: '0 8px 32px rgba(0,0,0,.16)',
        fontSize: '.9rem',
        color: '#4b5563',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 999,
        animation: 'slideUp .3s ease-out',
      }}
    >
      {/* header */}
      <div style={{ display: 'flex', padding: '0.9rem 1rem 0.7rem' }}>
        <img
          src={AVATAR}
          width={36}
          height={36}
          alt=""
          style={{ borderRadius: '50%', marginRight: 10 }}
        />
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: 0, fontSize: '1rem', color: '#111827' }}>
            Need a hand?
          </h4>
          <p style={{ margin: 0, lineHeight: 1.35 }}>
            Tell us what’s missing and we’ll improve it.
          </p>
        </div>
        <button
          onClick={close}
          aria-label="Close"
          style={{
            background: 'none',
            border: 0,
            cursor: 'pointer',
            padding: 4,
            color: '#6b7280',
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* body */}
      <div style={{ padding: '0 1rem 1rem' }}>
        {sent ? (
          <p style={{ margin: 0, color: '#10b981' }}>
            Got it — thanks for helping us improve!
          </p>
        ) : (
          <>
            <textarea
              ref={boxRef}
              rows={3}
              placeholder="Your suggestion…"
              value={text}
              onChange={e => setText(e.target.value)}
              style={{
                width: '100%',
                border: '1px solid #d0d7de',
                borderRadius: 6,
                padding: '.5rem',
                fontSize: '.85rem',
                marginBottom: 8,
                resize: 'vertical',
              }}
            />

            <div style={{ display: 'flex', gap: 6 }}>
              <button
                onClick={submit}
                disabled={busy || !text.trim()}
                style={{
                  flex: 1,
                  background: busy || !text.trim() ? '#d0d7de' : '#326fc7',
                  color: '#fff',
                  border: 0,
                  padding: '.45rem 0',
                  borderRadius: 6,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 4,
                  cursor: busy || !text.trim() ? 'default' : 'pointer',
                }}
              >
                <Send size={15} /> {busy ? 'Sending…' : 'Send'}
              </button>
              <button
                onClick={mailto}
                style={{
                  background: '#3c89f9',
                  color: '#fff',
                  border: 0,
                  padding: '.45rem .8rem',
                  borderRadius: 6,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  whiteSpace: 'nowrap',
                }}
              >
                <Smile size={15} /> Talk to a human
              </button>
            </div>
          </>
        )}
      </div>

      {/* tiny CSS keyframe */}
      <style>
        {`@keyframes slideUp{from{transform:translateY(80px);opacity:0}
          to{transform:translateY(0);opacity:1}}`}
      </style>
    </div>,
    document.body,
  );
}

// self-mount on every documentation page 
if (typeof window !== 'undefined') {
  import('react-dom/client').then(({ createRoot }) => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    createRoot(host).render(<Popup />);
  });
}

// placeholder export for Docusaurus
export default function DocsHelpPopupPlaceholder() { return null; }
