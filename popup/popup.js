// Popup Interface Controller for Price-Splain Extension

class PopupController {
  constructor() {
    this.settings = null;
    this.stats = null;
    this.isProcessing = false;
    
    this.initialize();
  }
  
  async initialize() {
    try {
      // Load settings and stats
      await this.loadData();
      
      // Update UI with loaded data
      this.updateUI();
      
      // Bind event listeners
      this.bindEvents();
      
      // Get current tab stats
      this.updateCurrentTabStats();
      
    } catch (error) {
      console.error('Error initializing popup:', error);
      this.showError('Failed to load extension data');
    }
  }
  
  async loadData() {
    // Load settings
    this.settings = await this.getSettings();
    
    // Load stats
    this.stats = await this.getStats();
  }
  
  async getSettings() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'getSettings' }, (response) => {
        resolve(response || { enabled: false, showTooltips: true, highlightJargon: true });
      });
    });
  }
  
  async getStats() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'getStats' }, (response) => {
        resolve(response || { totalTerms: 0, totalTranslations: 0, lastScan: null });
      });
    });
  }
  
  updateUI() {
    // Update toggle state
    const toggle = document.getElementById('mainToggle');
    const toggleStatus = document.getElementById('toggleStatus');
    const statusIndicator = document.getElementById('statusIndicator');
    const statusDot = statusIndicator.querySelector('.status-dot');
    const statusText = statusIndicator.querySelector('.status-text');
    
    if (this.settings.enabled) {
      toggle.checked = true;
      toggleStatus.textContent = 'On';
      toggleStatus.classList.add('active');
      statusDot.classList.add('active');
      statusText.textContent = 'Active';
    } else {
      toggle.checked = false;
      toggleStatus.textContent = 'Off';
      toggleStatus.classList.remove('active');
      statusDot.classList.remove('active');
      statusText.textContent = 'Ready';
    }
    
    // Update stats
    this.updateStatsDisplay();
  }
  
  updateStatsDisplay() {
    const termCount = document.getElementById('termCount');
    const translationCount = document.getElementById('translationCount');
    
    if (this.stats) {
      termCount.textContent = this.stats.totalTerms || 0;
      translationCount.textContent = this.stats.totalTranslations || 0;
    }
  }
  
  bindEvents() {
    // Toggle switch
    const toggle = document.getElementById('mainToggle');
    toggle.addEventListener('change', () => this.handleToggle());
    
    // Keyboard support
    toggle.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggle.checked = !toggle.checked;
        this.handleToggle();
      }
    });
  }
  
  async handleToggle() {
    if (this.isProcessing) return;
    
    this.isProcessing = true;
    this.setProcessingState(true);
    
    try {
      const result = await this.toggleExtension();
      
      if (result.success) {
        this.settings.enabled = result.enabled;
        this.updateUI();
        this.updateCurrentTabStats();
      } else {
        this.showError('Failed to toggle extension');
        // Revert toggle state
        document.getElementById('mainToggle').checked = !result.enabled;
      }
    } catch (error) {
      console.error('Error toggling extension:', error);
      this.showError('Error toggling extension');
      // Revert toggle state
      document.getElementById('mainToggle').checked = !this.settings.enabled;
    } finally {
      this.isProcessing = false;
      this.setProcessingState(false);
    }
  }
  
  async toggleExtension() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'toggleExtension' }, (response) => {
        resolve(response || { success: false });
      });
    });
  }
  
  setProcessingState(processing) {
    const statusIndicator = document.getElementById('statusIndicator');
    const statusDot = statusIndicator.querySelector('.status-dot');
    const statusText = statusIndicator.querySelector('.status-text');
    
    if (processing) {
      statusDot.classList.add('processing');
      statusText.textContent = 'Processing...';
    } else {
      statusDot.classList.remove('processing');
      statusText.textContent = this.settings.enabled ? 'Active' : 'Ready';
    }
  }
  
  async updateCurrentTabStats() {
    try {
      // Get current tab
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tabs.length === 0) return;
      
      // Request stats from content script
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getCurrentStats' }, (response) => {
        if (response && response.success) {
          this.updateCurrentPageStats(response.stats);
        }
      });
    } catch (error) {
      console.error('Error getting current tab stats:', error);
    }
  }
  
  updateCurrentPageStats(stats) {
    const termCount = document.getElementById('termCount');
    const translationCount = document.getElementById('translationCount');
    
    if (stats) {
      // Animate number changes
      if (stats.termCount !== undefined) {
        this.animateNumber(termCount, stats.termCount);
      }
      if (stats.translationCount !== undefined) {
        this.animateNumber(translationCount, stats.translationCount);
      }
    }
  }
  
  animateNumber(element, newValue) {
    const currentValue = parseInt(element.textContent) || 0;
    
    if (currentValue !== newValue) {
      element.classList.add('updated');
      element.textContent = newValue;
      
      setTimeout(() => {
        element.classList.remove('updated');
      }, 500);
    }
  }
  
  showError(message) {
    const statusText = document.querySelector('.status-text');
    const originalText = statusText.textContent;
    
    statusText.textContent = message;
    statusText.style.color = '#ef4444';
    
    setTimeout(() => {
      statusText.textContent = originalText;
      statusText.style.color = '';
    }, 3000);
  }
  
  // Listen for messages from content scripts
  setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'statsUpdated') {
        this.updateCurrentPageStats(request.stats);
      }
    });
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PopupController();
});

// Also listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'statsUpdated') {
    // Update stats display
    const termCount = document.getElementById('termCount');
    const translationCount = document.getElementById('translationCount');
    
    if (request.stats) {
      if (request.stats.termCount !== undefined) {
        termCount.textContent = request.stats.termCount;
      }
      if (request.stats.translationCount !== undefined) {
        translationCount.textContent = request.stats.translationCount;
      }
    }
  }
});
