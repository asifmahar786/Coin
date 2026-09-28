import { useEffect, useState } from 'react';
import Navbar from './Navbar';

const STORAGE_KEY = 'campuscoin_rail_expanded';

const readStored = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

const Layout = ({ children }) => {
  const [expanded, setExpanded] = useState(readStored);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, expanded ? '1' : '0');
    } catch {
    }
  }, [expanded]);

  return (
    <div className="app-shell">
      <Navbar expanded={expanded} onToggle={() => setExpanded((v) => !v)} />
      <main className={`app-main${expanded ? ' is-rail-expanded' : ''}`}>
        <div className="app-main__inner">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
