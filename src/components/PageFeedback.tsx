import React, { useEffect, useRef, useState } from "react";
import { ThumbsUp, ThumbsDown, Send } from "lucide-react";

type Vote = "up" | "down" | null;
interface Props {
  pageId?: string;
}

/* SmythOS palette */
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

  const [vote,    setVote]    = useState<Vote>(null);     // up / down / null
  const [comment, setComment] = useState("");
  const textareaRef           = useRef<HTMLTextAreaElement>(null);

  /* restore vote from localStorage */
  useEffect(() => { setVote(localStorage.getItem(KEY) as Vote); }, [KEY]);

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
        className={`feedback-btn${active ? " active" : ""}`}
      >
        <Icon size={18} strokeWidth={2} />
      </button>
    );
  };

  return (
    <div className="feedback-wrapper">
      <section className="feedback-section">
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
          <div className="feedback-comment">
            <textarea
              ref={textareaRef}
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What could be better? (optional)"
              className="feedback-textarea"
            />
            <button onClick={submitComment} className="feedback-send">
              <Send size={14} /> Send
            </button>
          </div>
        )}
      </section>
      <style>{`
        .feedback-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 2.5rem;
        }

        .feedback-section {
          display: inline-block;
          padding: 0.8rem 1rem;
          background: ${C.bg};
          border: 1px solid ${C.border};
          border-radius: 10px;
          font-size: 0.85rem;
          color: ${C.text};
        }

        .feedback-btn {
          background: #fff;
          border: 2px solid ${C.border};
          color: ${C.text};
          border-radius: 6px;
          padding: 0.35rem 0.65rem;
          margin-inline-end: 6px;
          cursor: pointer;
        }

        .feedback-btn.active {
          border-color: ${C.mintDark};
          color: ${C.mintDark};
        }

        .feedback-comment {
          margin-top: 10px;
        }

        .feedback-textarea {
          width: 260px;
          max-width: 100%;
          border: 1px solid ${C.border};
          border-radius: 6px;
          padding: 0.5rem;
          font-size: 0.8rem;
        }

        .feedback-send {
          margin-top: 6px;
          background: ${C.mintDark};
          color: #fff;
          border: none;
          padding: 0.35rem 0.8rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
