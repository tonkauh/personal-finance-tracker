import React from 'react';

function Settings({ currency, setCurrency }) {
  const handleSave = () => {
    // In a real app, you might save other settings to a backend here
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Preferences</h2>
      
      <div className="settings-content">
        <div className="settings-section">
          <h3 className="settings-section-title">Display</h3>
          <div className="settings-group">
            <label className="settings-label">Currency</label>
            <div className="settings-select-wrapper">
              <select 
                className="settings-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="THB">Thai Baht (THB)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="JPY">Japanese Yen (JPY)</option>
                <option value="GBP">British Pound (GBP)</option>
              </select>
              <div className="select-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
            <p className="settings-description">Choose the currency symbol displayed across the dashboard.</p>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">Notifications</h3>
          <div className="settings-toggle-group">
            <div className="settings-toggle-text">
              <span className="settings-label-text">Enable Push Notifications</span>
              <p className="settings-description">Receive alerts for unusual spending.</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-actions-footer">
          <button className="btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;