import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ThumbsUp, ThumbsDown, Send, CheckCircle } from 'lucide-react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { createClient } from '@supabase/supabase-js';
import styles from './PageFeedback.module.css'; 

type Vote = 'up' | 'down' | null;
interface Props { pageId?: string }

function useSupabase() {
  const { siteConfig } = useDocusaurusContext();
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = siteConfig.customFields as {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
  };
  return useMemo(() => createClient(SUPABASE_URL, SUPABASE_ANON_KEY), [SUPABASE_URL, SUPABASE_ANON_KEY]);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function PageFeedback({ pageId }: Props) {
  const pagePath = pageId ?? (typeof window !== 'undefined' ? window.location.pathname : 'unknown');
  const STORAGE_KEY = `feedback-${pagePath}`;
  const supabase = useSupabase();
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 120) : 'ssr';

  const [vote, setVote] = useState<Vote>(null);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // Fetch stored email on initial mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('feedback-email');
    if (storedEmail) setEmail(storedEmail);
  }, []);

  // Fetch previous feedback for this user/page
  useEffect(() => {
    let isActive = true; // Flag to prevent race conditions

    async function fetchFeedback() {
      setBusy(true);
      let query = supabase.from('feedback').select('vote, comment').eq('page_id', pagePath);
      query = email ? query.eq('email', email) : query.eq('user_agent', userAgent);
      
      const { data, error } = await query.single();

      if (!isActive) return; // Don't update state if component has unmounted or deps changed

      if (!error && data) {
        setVote(data.vote);
        setComment(data.comment ?? '');
        setStatus('Thanks for your previous feedback!');
        setSubmitted(true);
        localStorage.setItem(STORAGE_KEY, data.vote);
        if (email) localStorage.setItem('feedback-email', email);
      } else {
        setVote(null);
        setComment('');
        setStatus('');
        setSubmitted(false);
        localStorage.removeItem(STORAGE_KEY);
      }
      setBusy(false);
    }

    if (pagePath !== 'unknown') fetchFeedback();
    
    return () => { isActive = false; }; // Cleanup function
  }, [email, pagePath, supabase, STORAGE_KEY, userAgent]);

  const upsertFeedback = async (v: Vote, text: string | null, emailVal: string | null) => {
    if (!v) return { error: { message: 'Vote required' } };
    if (emailVal && !isValidEmail(emailVal)) return { error: { message: 'Invalid email' } };

    const onConflictCols = emailVal ? 'email,page_id' : 'user_agent,page_id';
    return await supabase.from('feedback').upsert(
      [{ page_id: pagePath, vote: v, comment: text, user_agent: userAgent, email: emailVal }],
      { onConflict: onConflictCols }
    );
  };

  const handleRemoveFeedback = async () => {
    if (busy) return;
    setBusy(true);
    setStatus('Removing…');
    
    let query = supabase.from('feedback').delete().eq('page_id', pagePath);
    query = email ? query.eq('email', email) : query.eq('user_agent', userAgent);
    const { error } = await query;

    setBusy(false);
    if (!error) {
      setVote(null);
      setComment('');
      setSubmitted(false);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem('feedback-email', email);
      setStatus('Feedback cleared');
    } else {
      setStatus('Error removing feedback');
    }
  };
  
  const handleVote = async (dir: 'up' | 'down') => {
    if (busy) return;
    
    if (vote === dir) { // If clicking the same button again, remove feedback
      await handleRemoveFeedback();
      return;
    }

    // If switching vote or setting a new one
    setVote(dir);
    setComment('');
    setStatus('');
    setSubmitted(false);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const handleSubmit = async () => {
    if (busy) return;
    if (!vote) {
      setStatus('Please select up or down vote first.');
      statusRef.current?.focus();
      return;
    }
    if (email && !isValidEmail(email)) {
      setStatus('Please enter a valid email address.');
      emailRef.current?.focus();
      return;
    }

    setBusy(true);
    setStatus('Submitting…');
    const { error } = await upsertFeedback(vote, comment.trim() || null, email.trim() || null);
    
    setBusy(false);
    if (!error) {
      localStorage.setItem(STORAGE_KEY, vote);
      if (email) localStorage.setItem('feedback-email', email);
      setStatus('Thanks for the feedback!');
      setSubmitted(true);
      setComment('');
      statusRef.current?.focus();
    } else {
      setStatus('Error submitting feedback. Please try again.');
    }
  };

  const commentLabel =
    vote === 'up' ? 'What did you like? (optional)' : 'What can be improved? (optional)';

  const VoteButton = ({ dir }: { dir: 'up' | 'down' }) => {
    const Icon = dir === 'up' ? ThumbsUp : ThumbsDown;
    return (
      <button
        onClick={() => handleVote(dir)}
        disabled={busy}
        aria-pressed={vote === dir}
        aria-label={dir === 'up' ? 'Helpful' : 'Not helpful'}
        className={`${styles.voteButton} ${vote === dir ? styles.active : ''}`}
      >
        <Icon size={18} strokeWidth={2} />
      </button>
    );
  };

  return (
    <div className={styles.container}>
      <section className={styles.widget}>
        <label htmlFor="vote-buttons" className={styles.prompt}>Was this page helpful?</label>
        <div id="vote-buttons" className={styles.voteButtonGroup}>
          <VoteButton dir="up" />
          <VoteButton dir="down" />
        </div>
        
        <span role="status" aria-live="polite" tabIndex={-1} ref={statusRef} className={`${styles.status} ${submitted ? styles.success : ''}`}>
          {submitted && <CheckCircle size={18} />}
          {status}
        </span>

        {vote && !submitted && (
          <div className={styles.formArea}>
            <label htmlFor="feedback-comment" className={styles.label}>{commentLabel}</label>
            <textarea
              id="feedback-comment"
              ref={textareaRef}
              rows={4}
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Your suggestions or comments..."
              disabled={busy}
              className={styles.textarea}
            />
            <label htmlFor="feedback-email" className={styles.label}>Your email (optional, for follow-up)</label>
            <input
              id="feedback-email"
              ref={emailRef}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@example.com"
              disabled={busy}
              className={styles.input}
            />
            <div className={styles.actions}>
              <button onClick={handleSubmit} disabled={busy} className={styles.submitButton}>
                <Send size={16} /> {busy ? 'Sending…' : 'Send'}
              </button>
              <button type="button" disabled={busy} onClick={handleRemoveFeedback} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}