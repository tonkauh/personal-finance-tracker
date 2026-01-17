import React from 'react';

function Sidebar({ activeMenu, setActiveMenu }) {
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Finance Tracker</h2>
          <p className="sidebar-subtitle">Manage your money wisely</p>
        </div>
        <nav>
          <ul className="sidebar-nav">
            <li>
              <button 
                className={`sidebar-nav-item ${activeMenu === 'Dashboard' ? 'active' : ''}`}
                onClick={() => handleMenuClick('Dashboard')}
              >
                {/* Window/Panel Icon */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="3" width="16" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <line x1="2" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="5" cy="5" r="0.75" fill="currentColor"/>
                  <circle cx="7.5" cy="5" r="0.75" fill="currentColor"/>
                </svg>
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button className="sidebar-nav-item">
                {/* Refresh/Reload Icon */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 4.5C14.7177 3.52417 13.5992 2.85723 12.3431 2.63074C11.087 2.40425 9.78569 2.63408 8.67954 3.27971C7.57338 3.92535 6.73735 4.94414 6.321 6.147" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.5 4.5V8.5H8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.5 15.5C5.28233 16.4758 6.40084 17.1428 7.65694 17.3693C8.91303 17.5958 10.2143 17.3659 11.3205 16.7203C12.4266 16.0747 13.2627 15.0559 13.679 13.853" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.5 15.5V11.5H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Transactions</span>
              </button>
            </li>
            <li>
              <button className="sidebar-nav-item">
                {/* External Link Icon */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3H17C17.5523 3 18 3.44772 18 4V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11L17 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17H15C16.1046 17 17 16.1046 17 15V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Reports</span>
              </button>
            </li>
            <li>
              <button className="sidebar-nav-item">
                {/* Equalizer/Sliders Icon */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="3" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="8" y="2" width="4" height="6" rx="1" fill="currentColor"/>
                  <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="6" y="7.5" width="4" height="5" rx="1" fill="currentColor"/>
                  <line x1="3" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="10" y="12.5" width="4" height="5" rx="1" fill="currentColor"/>
                </svg>
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-bottom-nav">
        <button 
          className={`mobile-nav-item ${activeMenu === 'Dashboard' ? 'active' : ''}`}
          onClick={() => handleMenuClick('Dashboard')}
        >
          {/* Window/Panel Icon */}
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="16" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <line x1="2" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="5" cy="5" r="0.75" fill="currentColor"/>
            <circle cx="7.5" cy="5" r="0.75" fill="currentColor"/>
          </svg>
        </button>
        <button 
          className={`mobile-nav-item ${activeMenu === 'Transactions' ? 'active' : ''}`}
          onClick={() => handleMenuClick('Transactions')}
        >
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 4.5C14.7177 3.52417 13.5992 2.85723 12.3431 2.63074C11.087 2.40425 9.78569 2.63408 8.67954 3.27971C7.57338 3.92535 6.73735 4.94414 6.321 6.147" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.5 4.5V8.5H8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.5 15.5C5.28233 16.4758 6.40084 17.1428 7.65694 17.3693C8.91303 17.5958 10.2143 17.3659 11.3205 16.7203C12.4266 16.0747 13.2627 15.0559 13.679 13.853" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.5 15.5V11.5H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button 
          className={`mobile-nav-item ${activeMenu === 'Reports' ? 'active' : ''}`}
          onClick={() => handleMenuClick('Reports')}
        >
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3H17C17.5523 3 18 3.44772 18 4V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 11L17 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17H15C16.1046 17 17 16.1046 17 15V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button 
          className={`mobile-nav-item ${activeMenu === 'Settings' ? 'active' : ''}`}
          onClick={() => handleMenuClick('Settings')}
        >
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="3" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <rect x="8" y="2" width="4" height="6" rx="1" fill="currentColor"/>
            <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <rect x="6" y="7.5" width="4" height="5" rx="1" fill="currentColor"/>
            <line x1="3" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <rect x="10" y="12.5" width="4" height="5" rx="1" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </>
  );
}

export default Sidebar;
