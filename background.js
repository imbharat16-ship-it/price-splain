// Background Service Worker for Price-Splain Extension

class BackgroundService {
  constructor() {
    this.initialize();
  }
  
  initialize() {
    // Handle extension installation
    chrome.runtime.onInstalled.addListener(this.handleInstall.bind(this));
    
    // Handle messages from content scripts and popup
    chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
    
    // Handle tab updates
    chrome.tabs.onUpdated.addListener(this.handleTabUpdate.bind(this));
  }
  
  handleInstall(details) {
    if (details.reason === 'install') {
      // Set default settings
      chrome.storage.sync.set({
        enabled: false,
        showTooltips: true,
        highlightJargon: true,
        whitelistSites: [],
        blacklistSites: [],
        lastActive: Date.now()
      });
      
      console.log('Price-Splain extension installed');
    }
  }
  
  handleMessage(request, sender, sendResponse) {
    switch (request.action) {
      case 'getSettings':
        this.getSettings(sendResponse);
        break;
      case 'updateSettings':
        this.updateSettings(request.settings, sendResponse);
        break;
      case 'toggleExtension':
        this.toggleExtension(sendResponse);
        break;
      case 'getStats':
        this.getStats(sendResponse);
        break;
      case 'logDetection':
        this.logDetection(request.data);
        break;
      default:
        console.log('Unknown message:', request.action);
    }
    return true; // Keep message channel open
  }
  
  async getSettings(callback) {
    try {
      const settings = await chrome.storage.sync.get([
        'enabled', 'showTooltips', 'highlightJargon', 
        'whitelistSites', 'blacklistSites'
      ]);
      
      // Set defaults if not found
      const defaultSettings = {
        enabled: false,
        showTooltips: true,
        highlightJargon: true,
        whitelistSites: [],
        blacklistSites: []
      };
      
      const finalSettings = { ...defaultSettings, ...settings };
      callback(finalSettings);
    } catch (error) {
      console.error('Error getting settings:', error);
      callback({ enabled: false, showTooltips: true, highlightJargon: true, whitelistSites: [], blacklistSites: [] });
    }
  }
  
  async updateSettings(settings, callback) {
    try {
      await chrome.storage.sync.set(settings);
      
      // Notify all content scripts of settings change
      const tabs = await chrome.tabs.query({});
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {
          action: 'settingsUpdated',
          settings: settings
        }).catch(() => {
          // Ignore errors for tabs that don't have content script
        });
      });
      
      callback({ success: true });
    } catch (error) {
      console.error('Error updating settings:', error);
      callback({ success: false, error: error.message });
    }
  }
  
  async toggleExtension(callback) {
    try {
      const settings = await chrome.storage.sync.get(['enabled']);
      const newState = !settings.enabled;
      
      await chrome.storage.sync.set({ 
        enabled: newState,
        lastActive: Date.now()
      });
      
      // Notify all content scripts
      const tabs = await chrome.tabs.query({});
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {
          action: 'toggleExtension',
          enabled: newState
        }).catch(() => {
          // Ignore errors for tabs that don't have content script
        });
      });
      
      callback({ success: true, enabled: newState });
    } catch (error) {
      console.error('Error toggling extension:', error);
      callback({ success: false, error: error.message });
    }
  }
  
  async getStats(callback) {
    try {
      const stats = await chrome.storage.local.get(['totalTerms', 'totalTranslations', 'lastScan']);
      callback({
        totalTerms: stats.totalTerms || 0,
        totalTranslations: stats.totalTranslations || 0,
        lastScan: stats.lastScan || null
      });
    } catch (error) {
      console.error('Error getting stats:', error);
      callback({ totalTerms: 0, totalTranslations: 0, lastScan: null });
    }
  }
  
  logDetection(data) {
    // Log detection data for analytics/improvement
    console.log('Detection logged:', data);
    
    // Store current page stats (not accumulated)
    const newStats = {
      totalTerms: data.termCount || 0,
      totalTranslations: data.translationCount || 0,
      lastScan: Date.now()
    };
    
    chrome.storage.local.set(newStats);
  }
  
  handleTabUpdate(tabId, changeInfo, tab) {
    // Only process when page is completely loaded
    if (changeInfo.status === 'complete' && tab.url) {
      // Check if this is a pricing page
      const isPricingPage = this.isPricingPage(tab.url);
      
      if (isPricingPage) {
        // Notify content script to scan for pricing content
        chrome.tabs.sendMessage(tabId, {
          action: 'scanPage',
          url: tab.url
        }).catch(() => {
          // Ignore errors for tabs that don't have content script
        });
      }
    }
  }
  
  isPricingPage(url) {
    const pricingKeywords = [
      '/pricing', '/plans', '/prices', '/cost',
      '/subscription', '/billing', '/tiers',
      '/packages', '/rates', '/costs'
    ];
    
    return pricingKeywords.some(keyword => url.includes(keyword));
  }
}

// Initialize the background service
new BackgroundService();
