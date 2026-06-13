import { useState } from "react";

// Dynamic identity — no hardcoded users. Sign in with any name; we generate a
// stable user_id and persist it in localStorage so learning carries across
// sessions. "Guest" means anonymous (no personalization).

export default function Identity({ user, onSignIn, onSignOut }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  function submit() {
    const trimmed = name.trim();
    if (!trimmed) return;
    onSignIn(trimmed);
    setName("");
    setEditing(false);
  }

  if (user.id && !editing) {
    return (
      <div className="identity">
        <div className="identity-info">
          <span className="identity-avatar">{user.name.slice(0, 1).toUpperCase()}</span>
          <div>
            <div className="identity-name">Hello, {user.name}</div>
            <div className="identity-sub">Turant is learning your preferences</div>
          </div>
        </div>
        <div className="identity-actions">
          <button className="link-btn" onClick={() => setEditing(true)}>Switch user</button>
          <button className="link-btn" onClick={onSignOut}>Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="identity">
      <div className="identity-info">
        <span className="identity-avatar guest">?</span>
        <div>
          <div className="identity-name">{user.id ? "Switch user" : "Shopping as Guest"}</div>
          <div className="identity-sub">Sign in so Turant can learn what you order</div>
        </div>
      </div>
      <div className="identity-signin">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        <button className="signin-btn" onClick={submit} disabled={!name.trim()}>
          Sign in
        </button>
      </div>
    </div>
  );
}
