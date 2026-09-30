import { Bookmark, Send, Heart } from "lucide-react";
import type { Slide, SlideElement } from "@/types/carousel";

const KEYWORDS =
  /\b(def|return|import|from|for|while|if|else|elif|class|new|const|let|var|function|public|private|static|void|Map|List|SELECT|FROM|WHERE|IN|null|true|false|self)\b/g;

function highlight(code: string) {
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .replace(/(#[^\n]*|\/\/[^\n]*)/g, '<span style="color:#64748b">$1</span>')
    .replace(/('[^']*'|"[^"]*")/g, '<span style="color:#86efac">$1</span>')
    .replace(KEYWORDS, '<span style="color:#c084fc">$1</span>')
    .replace(/\b(\d+)\b/g, '<span style="color:#fca5a5">$1</span>');
}

interface Props {
  slide: Slide;
  width: number;
  height: number;
  interactive?: boolean;
  selectedId?: string | null;
  onSelect?: (id: string | null) => void;
  onPointerDownElement?: (e: React.PointerEvent, el: SlideElement, mode: "move" | "resize") => void;
  onEditText?: (el: SlideElement) => void;
  editingId?: string | null;
  onCommitText?: (id: string, value: string) => void;
}

export function SlideRenderer({
  slide,
  width,
  height,
  interactive,
  selectedId,
  onSelect,
  onPointerDownElement,
  onEditText,
  editingId,
  onCommitText,
}: Props) {
  const ordered = [...slide.elements].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div
      style={{ width, height, background: slide.background.value, position: "relative", overflow: "hidden" }}
      onPointerDown={interactive ? () => onSelect?.(null) : undefined}
    >
      {ordered.map((el) => {
        const selected = interactive && selectedId === el.id;
        const common: React.CSSProperties = {
          position: "absolute",
          left: el.x,
          top: el.y,
          width: el.width,
          height: el.height,
          zIndex: el.zIndex,
          opacity: el.opacity ?? 1,
          transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
          cursor: interactive && !el.isLocked ? "move" : "default",
        };

        const start = (e: React.PointerEvent) => {
          if (!interactive) return;
          e.stopPropagation();
          onSelect?.(el.id);
          if (!el.isLocked) onPointerDownElement?.(e, el, "move");
        };

        let inner: React.ReactNode = null;

        if (el.type === "shape") {
          inner = (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: el.backgroundColor,
                borderRadius: el.radius,
              }}
            />
          );
        } else if (el.type === "logo" || el.type === "image") {
          inner = el.content ? (
            <img
              src={el.content}
              alt=""
              crossOrigin="anonymous"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: el.radius }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: el.radius,
                background: "rgba(148,163,184,.25)",
              }}
            />
          );
        } else if (el.type === "icon") {
          inner = (
            <div
              style={{
                display: "flex",
                gap: 28,
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: el.color,
              }}
            >
              <Heart size={el.height * 0.7} strokeWidth={1.8} />
              <Bookmark size={el.height * 0.7} strokeWidth={1.8} />
              <Send size={el.height * 0.7} strokeWidth={1.8} />
            </div>
          );
        } else if (el.type === "code") {
          inner = (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: el.backgroundColor,
                borderRadius: el.radius,
                overflow: "hidden",
                border: "1px solid rgba(148,163,184,.25)",
              }}
            >
              <div
                style={{
                  height: 56,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "0 24px",
                  background: "rgba(148,163,184,.12)",
                }}
              >
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <span
                    key={c}
                    style={{ width: 16, height: 16, borderRadius: 8, background: c, display: "block" }}
                  />
                ))}
              </div>
              <pre
                style={{
                  margin: 0,
                  padding: "28px 32px",
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: el.fontSize,
                  lineHeight: 1.55,
                  color: el.color,
                  whiteSpace: "pre-wrap",
                }}
                dangerouslySetInnerHTML={{ __html: highlight(el.content) }}
              />
            </div>
          );
        } else {
          const textStyle: React.CSSProperties = {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: el.type === "badge" ? "center" : "flex-start",
            justifyContent:
              el.textAlign === "center" ? "center" : el.textAlign === "right" ? "flex-end" : "flex-start",
            textAlign: el.textAlign,
            fontFamily: el.fontFamily ?? "'Inter', sans-serif",
            fontSize: el.fontSize,
            fontWeight: el.fontWeight,
            fontStyle: el.fontStyle ?? "normal",
            color: el.color,
            background: el.backgroundColor,
            borderRadius: el.radius,
            padding: el.backgroundColor !== "transparent" ? "0 28px" : 0,
            letterSpacing: el.letterSpacing,
            lineHeight: el.lineHeight ?? 1.25,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          };
          inner =
            editingId === el.id ? (
              <textarea
                autoFocus
                defaultValue={el.content}
                onPointerDown={(e) => e.stopPropagation()}
                onBlur={(e) => onCommitText?.(el.id, e.target.value)}
                style={{
                  ...textStyle,
                  display: "block",
                  resize: "none",
                  outline: "2px solid #6366f1",
                  background: "rgba(0,0,0,.35)",
                }}
              />
            ) : (
              <div style={textStyle}>{el.content}</div>
            );
        }

        return (
          <div
            key={el.id}
            style={common}
            onPointerDown={start}
            onDoubleClick={(e) => {
              if (!interactive) return;
              e.stopPropagation();
              if (["heading", "subheading", "body", "badge", "code"].includes(el.type) && !el.isLocked) {
                onEditText?.(el);
              }
            }}
          >
            {inner}
            {selected && (
              <>
                <div
                  style={{
                    position: "absolute",
                    inset: -4,
                    border: "3px solid #6366f1",
                    borderRadius: 8,
                    pointerEvents: "none",
                  }}
                />
                {!el.isLocked && (
                  <div
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      onPointerDownElement?.(e, el, "resize");
                    }}
                    style={{
                      position: "absolute",
                      right: -14,
                      bottom: -14,
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      background: "#6366f1",
                      border: "3px solid #fff",
                      cursor: "nwse-resize",
                    }}
                  />
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
