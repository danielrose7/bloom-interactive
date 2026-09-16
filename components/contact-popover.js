"use client";

import { useEffect, useState } from "react";

export function ContactTrigger({ className, children = <>Text Daniel <span>↗</span></> }) {
  return (
    <button
      className={className}
      type="button"
      onClick={() => window.dispatchEvent(new Event("bloom:open-contact"))}
    >
      {children}
    </button>
  );
}

export default function ContactPopover() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const openContact = () => {
      setCopied("");
      setOpen(true);
    };
    window.addEventListener("bloom:open-contact", openContact);
    return () => window.removeEventListener("bloom:open-contact", openContact);
  }, []);

  async function copyContact(value, label) {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1800);
  }

  if (!open) return null;

  return <div className="phone-popover-backdrop" role="presentation" onClick={() => setOpen(false)}>
    <div className="contact-celebration" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} />)}</div>
    <div className="phone-popover" role="dialog" aria-modal="true" aria-labelledby="phone-popover-title" onClick={(event) => event.stopPropagation()}>
      <button className="phone-popover-close" type="button" aria-label="Close" onClick={() => setOpen(false)}>×</button>
      <p className="phone-popover-kicker">Direct line</p>
      <h2 id="phone-popover-title">Tag Dan in.</h2>
      <p className="phone-popover-intro">A quick note is all it takes.</p>
      <div className="contact-copy-list">
        <div className="contact-copy-row"><div><small>Text</small><strong>720-878-4015</strong></div><button type="button" onClick={() => copyContact("720-878-4015", "number")}>{copied === "number" ? "Copied" : "Copy"}<span aria-hidden="true">{copied === "number" ? "✓" : "↗"}</span></button></div>
        <div className="contact-copy-row contact-copy-email"><div><small>Email</small><span>dan@gobloom.io</span></div><button type="button" onClick={() => copyContact("dan@gobloom.io", "email")}>{copied === "email" ? "Copied" : "Copy"}<span aria-hidden="true">{copied === "email" ? "✓" : "↗"}</span></button></div>
      </div>
      <small className="phone-popover-signoff">Move the needle. Save the day.</small>
    </div>
  </div>;
}
