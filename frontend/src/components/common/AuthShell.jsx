const AuthShell = ({ sideTitle, sideText, points = [], footnote, children }) => (
  <div className="auth-shell">
    <div className="auth-side">
      <div className="auth-side__brand">CampusCoin</div>

      <div>
        <h1 className="auth-side__title">{sideTitle}</h1>
        <p className="auth-side__text">{sideText}</p>
        <div className="auth-side__points">
          {points.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>

      <p className="auth-side__footnote">{footnote}</p>
    </div>

    <div className="auth-form-wrap">
      <div className="auth-form-card">
        <div className="auth-mobile-brand">
          <span>CampusCoin</span>
        </div>
        {children}
      </div>
    </div>
  </div>
);

export default AuthShell;
