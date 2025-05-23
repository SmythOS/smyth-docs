import React, { useEffect, useRef, useState } from "react";
import { ThumbsUp, ThumbsDown, Send } from "lucide-react";

type Vote = "up" | "down" | null;
interface Props {
  /** slug override – defaults to current pathname in browser */
  pageId?: string;
}

/* SmythOS palette ---------------------------------------------------*/
const C = {
  mint:       "#3EFCC2",  // main accent
  mintDark:   "#08B68F",  // 4.7 : 1 contrast on white
  border:     "#d0d7de",
  text:       "#4b5563",
  bg:         "#f9fafb",
};

export default function PageFeedback({ pageId }: Props) {
  const id  = pageId ?? (typeof window !== "undefined" ? window.location.pathname : "unknown");
  const KEY = `smythos-feedback-${id}`;

  /* ---------------------------------------------------------------- */
  const [vote,    setVote]    = useState<Vote>(null);     // up / down / null
  const [comment, setComment] = useState("");
  const textareaRef           = useRef<HTMLTextAreaElement>(null);

  /* restore vote from localStorage */
  useEffect(() => { setVote(localStorage.getItem(KEY) as Vote); }, [KEY]);

  /* keyboard shortcuts */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isTyping = (e.target as HTMLElement).tagName === "TEXTAREA";
      if (isTyping) return;
      if (e.key === "u") toggleVote("up");
      if (e.key === "d") toggleVote("down");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  /* helpers ---------------------------------------------------------*/
  const toggleVote = (v: Vote) => {
    const newVote = vote === v ? null : v; 
    setVote(newVote);
    newVote ? localStorage.setItem(KEY, newVote) : localStorage.removeItem(KEY);
    if (newVote === "down") setTimeout(() => textareaRef.current?.focus(), 30);
  };

  const submitComment = () => {
    if (!comment.trim()) return;
    // analytics here //
    setComment("");
    alert("Thanks for the detailed feedback!");
  };

  const Btn = ({ dir }: { dir: "up" | "down" }) => {
    const Icon   = dir === "up" ? ThumbsUp : ThumbsDown;
    const active = vote === dir;
    return (
      <button
        onClick={() => toggleVote(dir)}
        aria-label={dir === "up" ? "Helpful" : "Not helpful"}
        aria-pressed={active}
        style={{
          background: "#fff",
          border: `2px solid ${active ? C.mintDark : C.border}`,
          color: active ? C.mintDark : C.text,
          borderRadius: 6,
          padding: "0.35rem 0.65rem",
          marginInlineEnd: 6,
          cursor: "pointer",
        }}
      >
        <Icon size={18} strokeWidth={2} />
      </button>
    );
  };

  /* render ----------------------------------------------------------*/
  return (
    /* center the compact card */
    <div style={{ display: "flex", justifyContent: "center", marginTop: "2.5rem" }}>
      <section
        style={{
          display: "inline-block",
          padding: "0.8rem 1rem",
          background: C.bg,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          fontSize: "0.85rem",
          color: C.text,
        }}
      >
        <span style={{ marginRight: 10 }}>Was this page helpful?</span>
        <Btn dir="up" />
        <Btn dir="down" />

        {/* thank-you banner on any vote */}
        {vote && (
          <span style={{ marginLeft: 10, color: C.mintDark }}>
            Thanks for the feedback!
          </span>
        )}

        {/* follow-up textarea only for 👎 */}
        {vote === "down" && (
          <div style={{ marginTop: 10 }}>
            <textarea
              ref={textareaRef}
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What could be better? (optional)"
              style={{
                width: 260,
                maxWidth: "100%",
                border: `1px solid ${C.border}`,
                borderRadius: 6,
                padding: "0.5rem",
                fontSize: "0.8rem",
              }}
            />
            <button
              onClick={submitComment}
              style={{
                marginTop: 6,
                background: C.mintDark,
                color: "#fff",
                border: "none",
                padding: "0.35rem 0.8rem",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                gap: 4,
                cursor: "pointer",
              }}
            >
              <Send size={14} /> Send
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
