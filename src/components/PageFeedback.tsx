import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { createClient } from '@supabase/supabase-js';

type Vote = 'up' | 'down' | null;
interface Props { pageId?: string }

/* palette */
const SMYTH_COLOR = {
  accent:     '#3c89f9',
  accentDark: '#326fc7',
  border:     '#d0d7de',
  text:       '#4b5563',
  bg:         '#f9fafb',
};

/* Supabase client */
function useSupabase() {
  const { siteConfig } = useDocusaurusContext();
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = siteConfig.customFields as {
    SUPABASE_URL: string; SUPABASE_ANON_KEY: string;
  };
  return useMemo(() => createClient(SUPABASE_URL, SUPABASE_ANON_KEY), [
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
  ]);
}

export default function PageFeedback({ pageId }: Props) {
  const pagePath =
    pageId ?? (typeof window !== 'undefined' ? window.location.pathname : 'unknown');
  const STORAGE = `feedback-${pagePath}`;
  const supabase  = useSupabase();
  const userAgent = typeof navigator !== 'undefined'
    ? navigator.userAgent.slice(0, 120)
    : 'ssr';

  const [vote,   setVote]   = useState<Vote>(null);
  const [comment,setComment]= useState('');
  const [busy,   setBusy]   = useState(false);
  const [status, setStatus] = useState(''); // text under icons
  const textareaRef         = useRef<HTMLTextAreaElement>(null);

  /* localStorage hydrate */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE) as Vote;
    if (stored) { setVote(stored); setStatus('Thanks for the feedback ✓'); }
  }, [STORAGE]);

  const cache = (v: Vote | null) => {
    v ? localStorage.setItem(STORAGE, v) : localStorage.removeItem(STORAGE);
  };

  /* insert helper w/ timeout */
  const insertRow = async (v: Vote, text: string | null) => {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    const { error, status } = await supabase
      .from('feedback')
      .insert({ page_id: pagePath, vote: v, comment: text, user_agent: userAgent })
      .abortSignal(ctrl.signal);
    clearTimeout(t);
    /* retry once on cold-start */
    if (error && status === 503) {
      await new Promise(r => setTimeout(r, 2200));
      return insertRow(v, text);
    }
    return error;
  };

  const removeRow = async () =>
    supabase
      .from('feedback')
      .delete()
      .eq('page_id', pagePath)
      .eq('user_agent', userAgent);

  /* pick 👍/👎 */
  const pick = async (dir: Vote) => {
    if (busy) return;

    /* undo */
    if (vote === dir) {
      setBusy(true); setStatus('Removing…');
      await removeRow();
      setBusy(false); setVote(null); setComment(''); cache(null);
      setStatus('Feedback cleared');
      return;
    }

    /* switch vote */
    if (vote) {
      setBusy(true); await removeRow(); setBusy(false);
    }

    /* new vote */
    setVote(dir);
    if (dir === 'up') {
      setBusy(true); setStatus('Submitting…');
      const err = await insertRow('up', null);
      setBusy(false);
      if (!err) { cache('up'); setStatus('Thanks for the feedback ✓'); }
      else setStatus('Error — please try again');
    } else {
      setStatus('');       // wait for comment
      setTimeout(() => textareaRef.current?.focus(), 25);
    }
  };

  const send = async () => {
    if (!comment.trim() || busy) return;
    setBusy(true); setStatus('Submitting…');
    const err = await insertRow('down', comment.trim());
    setBusy(false);
    if (!err) {
      cache('down'); setStatus('Thanks for the feedback ✓');
      setComment('');
    } else setStatus('Error — please try again');
  };

  const Btn = ({ dir }: { dir: 'up' | 'down' }) => {
    const Icon = dir === 'up' ? ThumbsUp : ThumbsDown;
    const active = vote === dir;
    return (
      <button
        onClick={() => pick(dir)}
        disabled={busy}
        aria-pressed={active}
        aria-label={dir === 'up' ? 'Helpful' : 'Not helpful'}
        style={{
          background: '#fff',
          border: `2px solid ${active ? SMYTH_COLOR.accentDark : SMYTH_COLOR.border}`,
          color: active ? SMYTH_COLOR.accentDark : SMYTH_COLOR.text,
          borderRadius: 6,
          padding: '0.35rem 0.65rem',
          marginRight: 6,
          cursor: busy ? 'default' : 'pointer',
          opacity: busy ? 0.6 : 1,
          outlineOffset: 2,
          transition: 'transform .15s',
          transform: busy && active ? 'scale(.9)' : 'none',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#f1f5f9')}
        onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
      >
        <Icon size={18} strokeWidth={2} />
      </button>
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
      <section
        style={{
          display: 'inline-block',
          padding: '0.9rem 1rem',
          background: SMYTH_COLOR.bg,
          border: `1px solid ${SMYTH_COLOR.border}`,
          borderRadius: 10,
          fontSize: '0.85rem',
          color: SMYTH_COLOR.text,
        }}
      >
        <span style={{ marginRight: 10 }}>Was this page helpful?</span>
        <Btn dir="up" />
        <Btn dir="down" />

        <span role="status" aria-live="polite" style={{ marginLeft: 10 }}>
          {status}
        </span>

        {vote === 'down' && status === '' && (
          <div style={{ marginTop: 10 }}>
            <textarea
              ref={textareaRef}
              rows={3}
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="What could be better? (optional)"
              disabled={busy}
              style={{
                width: 260,
                border: `1px solid ${SMYTH_COLOR.border}`,
                borderRadius: 6,
                padding: '0.5rem',
                fontSize: '0.8rem',
              }}
            />
            <button
              onClick={send}
              disabled={busy || !comment.trim()}
              style={{
                marginTop: 6,
                background: busy || !comment.trim() ? SMYTH_COLOR.border : SMYTH_COLOR.accentDark,
                color: '#fff',
                border: 'none',
                padding: '0.35rem 0.85rem',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                cursor: busy || !comment.trim() ? 'default' : 'pointer',
              }}
            >
              <Send size={14} /> {busy ? 'Sending…' : 'Send'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
