import React, { useState } from 'react';

function Settings() {
  const [currency, setCurrency] = useState('THB');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [theme, setTheme] = useState('dark');

  const handleSave = () => {
    // In a real app, this would save to backend/localStorage
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <h3 className="settings-title">Settings</h3>
      <div className="settings-content">
        {/* Currency Settings */}
        <div className="settings-section">
          <h4 className="settings-section-title">Currency</h4>
          <div className="settings-group">
            <label className="settings-label">Default Currency</label>
            <select 
              className="settings-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="THB">THB (Thai Baht)</option>
              <option value="USD">USD (US Dollar)</option>
              <option value="EUR">EUR (Euro)</option>
              <option value="GBP">GBP (British Pound)</option>
              <option value="JPY">JPY (Japanese Yen)</option>
            </select>
          </div>
        </div>

        {/* Date Format Settings */}
        <div className="settings-section">
          <h4 className="settings-section-title">Date & Time</h4>
          <div className="settings-group">
            <label className="settings-label">Date Format</label>
            <select 
              className="settings-select"
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              <option value="DD MMM YYYY">DD MMM YYYY</option>
            </select>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="settings-section">
          <h4 className="settings-section-title">Notifications</h4>
          <div className="settings-group">
            <label className="settings-checkbox-label">
              <input
                type="checkbox"
                className="settings-checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <span>Enable notifications</span>
            </label>
            <p className="settings-description">Receive alerts for budget limits and important updates</p>
          </div>
        </div>

        {/* Auto Save Settings */}
        <div className="settings-section">
          <h4 className="settings-section-title">Data Management</h4>
          <div className="settings-group">
            <label className="settings-checkbox-label">
              <input
                type="checkbox"
                className="settings-checkbox"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
              />
              <span>Auto-save transactions</span>
            </label>
            <p className="settings-description">Automatically save transactions as you create them</p>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="settings-section">
          <h4 className="settings-section-title">Appearance</h4>
          <div className="settings-group">
            <label className="settings-label">Theme</label>
            <select 
              className="settings-select"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>
        </div>

        {/* Export/Import Settings */}
        <div className="settings-section">
          <h4 className="settings-section-title">Data Export</h4>
          <div className="settings-actions">
            <button className="btn btn-secondary" onClick={() => alert('Export feature coming soon!')}>
              Export Data (CSV)
            </button>
            <button className="btn btn-secondary" onClick={() => alert('Import feature coming soon!')}>
              Import Data
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="settings-actions-footer">
          <button className="btn btn-primary" onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
