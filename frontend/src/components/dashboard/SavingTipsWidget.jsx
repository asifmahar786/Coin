const SavingTipsWidget = ({ insights, onPin, onDismiss }) => {
  if (!insights || insights.length === 0) {
    return (
      <div className="card">
        <div className="stw-head">
          <p>Smart tips</p>
        </div>
        <p className="stw-empty-text">
          Log a few more transactions and personalized tips will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="stw-head">
        <p>Smart tips</p>
      </div>

      <div className="stw-list">
        {insights.map((insight) => (
          <div
            key={insight._id}
            className="stw-item"
          >
            <div>
              <p className="stw-item-text">{insight.summaryText}</p>
              {insight.tipText && (
                <p className="stw-item-tip">{insight.tipText}</p>
              )}
            </div>
            <div className="stw-item-actions">
              <button
                onClick={() => onPin(insight._id)}
                aria-label="Pin tip"
                className={`stw-pin-btn${insight.isPinned ? ' is-pinned' : ''}`}
              >
                {insight.isPinned ? 'Pinned' : 'Pin'}
              </button>
              <button
                onClick={() => onDismiss(insight._id)}
                aria-label="Dismiss tip"
                className="stw-dismiss-btn"
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavingTipsWidget;
