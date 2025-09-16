// Main Content Script for Price-Splain Extension

class PriceSplain {
  constructor() {
    this.settings = null;
    this.translator = null;
    this.tooltipManager = null;
    this.isActive = false;
    this.detectedTerms = [];
    this.translationCount = 0;
    this.isScanning = false;
    
    this.initialize();
  }
  
  async initialize() {
    try {
      // Load settings
      this.settings = await this.getSettings();
      
      // Initialize components
      this.translator = new JargonTranslator();
      
      // Wait for dictionary to load
      await this.translator.loadDictionary();
      
      // Initialize tooltip manager
      if (typeof initializeTooltipManager === 'function') {
        this.tooltipManager = initializeTooltipManager();
      } else {
        this.tooltipManager = new TooltipManager();
      }
      
      // Check if we should activate
      if (this.settings.enabled && this.shouldProcessPage()) {
        this.activate();
      }
      
      // Listen for messages
      this.setupMessageListener();
      
      // Listen for settings changes
      this.setupSettingsListener();
      
    } catch (error) {
      console.error('Error initializing Price-Splain:', error);
    }
  }
  
  async getSettings() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'getSettings' }, (response) => {
        resolve(response || { enabled: false, showTooltips: true, highlightJargon: true });
      });
    });
  }
  
  shouldProcessPage() {
    const url = window.location.href;
    
    // Always process local test pages
    if (url.startsWith('file://') || url.includes('test-extension.html')) {
      console.log('🧪 Test page detected - processing');
      return true;
    }
    
    // Check if it's a pricing page
    const isPricingPage = this.isPricingPage(url);
    
    // Check whitelist/blacklist (with safe defaults)
    const whitelistSites = this.settings.whitelistSites || [];
    const blacklistSites = this.settings.blacklistSites || [];
    const isWhitelisted = whitelistSites.some(site => url.includes(site));
    const isBlacklisted = blacklistSites.some(site => url.includes(site));
    
    return (isPricingPage || isWhitelisted) && !isBlacklisted;
  }
  
  isPricingPage(url) {
    const pricingKeywords = [
      '/pricing', '/plans', '/prices', '/cost',
      '/subscription', '/billing', '/tiers',
      '/packages', '/rates', '/costs'
    ];
    
    return pricingKeywords.some(keyword => url.includes(keyword));
  }
  
  setupMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      switch (request.action) {
        case 'toggleExtension':
          this.handleToggle(request.enabled);
          break;
        case 'settingsUpdated':
          this.handleSettingsUpdate(request.settings);
          break;
        case 'scanPage':
          this.scanPage();
          break;
        case 'getCurrentStats':
          this.sendCurrentStats(sendResponse);
          return true; // Keep message channel open
      }
      return true;
    });
  }
  
  setupSettingsListener() {
    // Listen for storage changes
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'sync' && changes.enabled) {
        this.handleToggle(changes.enabled.newValue);
      }
    });
  }
  
  handleToggle(enabled) {
    this.settings.enabled = enabled;
    
    if (enabled && this.shouldProcessPage()) {
      this.activate();
    } else {
      this.deactivate();
    }
  }
  
  handleSettingsUpdate(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    
    if (this.settings.enabled && this.shouldProcessPage()) {
      this.activate();
    } else {
      this.deactivate();
    }
  }
  
  activate() {
    if (this.isActive) return;
    
    this.isActive = true;
    document.body.classList.add('unjargon-active');
    
    // Add global scroll listener to hide tooltips
    this.setupGlobalScrollListener();
    
    // Start processing
    this.scanPage();
    
    // Set up mutation observer for dynamic content
    this.setupMutationObserver();
    
    console.log('Price-Splain activated');
  }
  
  deactivate() {
    if (!this.isActive) return;
    
    this.isActive = false;
    document.body.classList.remove('unjargon-active');
    
    // Clear all highlights
    this.clearHighlights();
    
    // Remove scroll listener
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
      this.scrollHandler = null;
    }
    
    // Stop mutation observer
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    
    console.log('Price-Splain deactivated');
  }
  
  scanPage() {
    if (!this.isActive) return;
    
    // Prevent multiple overlapping scans
    if (this.isScanning) {
      console.log('⏳ Scan already in progress, skipping...');
      return;
    }
    
    this.isScanning = true;
    
    try {
      console.log('🔍 Scanning entire page for jargon terms...');
      console.log('📄 Page URL:', window.location.href);
      console.log('📄 Page title:', document.title);
      
      // Reset counters for new scan
      this.detectedTerms = [];
      this.translationCount = 0;
      
      // Clean up previous highlights
      this.cleanupPreviousHighlights();
      
      // Scan entire page for jargon terms
      const textElements = this.findAllTextElements();
      console.log(`📊 Found ${textElements.length} text elements to scan`);
      
      // Process each text element
      textElements.forEach((element, index) => {
        if (index % 100 === 0) {
          console.log(`📝 Processing element ${index + 1}/${textElements.length}`);
        }
        this.scanElementForJargon(element);
      });
      
      // Update stats
      this.updateStats();
      
      console.log(`✅ Scan complete. Found ${this.detectedTerms.length} jargon terms`);
      console.log(`📈 Translation count: ${this.translationCount}`);
      
      
    } catch (error) {
      console.error('Error scanning page:', error);
    } finally {
      this.isScanning = false;
    }
  }
  
  
  cleanupPreviousHighlights() {
    // Remove all existing highlights
    const existingHighlights = document.querySelectorAll('.unjargon-term');
    console.log(`🧹 Cleaning up ${existingHighlights.length} previous highlights`);
    
    existingHighlights.forEach(highlight => {
      // Restore original text
      const originalText = highlight.textContent;
      const parent = highlight.parentNode;
      parent.replaceChild(document.createTextNode(originalText), highlight);
      parent.normalize(); // Merge adjacent text nodes
    });
  }
  
  findAllTextElements() {
    // Get all elements that contain text, excluding navigation and UI elements
    const excludedSelectors = [
      'nav', 'header', 'footer', 
      '.nav', '.navbar', '.navigation', '.menu',
      '.header', '.footer', '.sidebar',
      'script', 'style', 'noscript',
      '.advertisement', '.ads', '.banner',
      '.cookie', '.privacy', '.legal',
      '.social', '.share', '.follow',
      '.breadcrumb', '.pagination',
      '.tooltip', '.modal', '.popup',
      '.dropdown', '.select', '.option'
    ];
    
    const allElements = document.querySelectorAll('*');
    const textElements = [];
    
    allElements.forEach(element => {
      // Skip excluded elements
      if (excludedSelectors.some(selector => 
        element.matches(selector) || element.closest(selector)
      )) {
        return;
      }
      
      // Skip elements that are hidden or have no text
      if (element.offsetParent === null || !element.textContent?.trim()) {
        return;
      }
      
      // Skip elements that are too small (likely UI elements)
      const rect = element.getBoundingClientRect();
      if (rect.width < 20 || rect.height < 10) {
        return;
      }
      
      // Only include elements that have text content and aren't just containers
      const textContent = element.textContent?.trim();
      if (textContent && textContent.length > 2) {
        // Skip if this element's text is just a subset of its parent's text
        const parent = element.parentElement;
        if (parent && parent.textContent?.trim() === textContent) {
          return; // This is likely a container, skip it
        }
        
        textElements.push(element);
      }
    });
    
    return textElements;
  }
  
  scanElementForJargon(element) {
    const text = element.textContent;
    if (!text || text.trim().length === 0) return;
    
    // Get all terms from the dictionary
    const dictionary = this.translator.getDictionary();
    if (!dictionary) return;
    
    // Check each term in the dictionary
    Object.keys(dictionary).forEach(term => {
      // Create case-insensitive regex for whole word matching
      const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      const matches = text.match(regex);
      
      if (matches) {
        matches.forEach(match => {
          // Check if this term is already highlighted in this element
          if (element.querySelector('.unjargon-term')) {
            return; // Skip if already processed
          }
          
          const termData = {
            text: match,
            element: element,
            position: text.indexOf(match),
            pattern: regex.source
          };
          
          this.translateJargon(termData, 'general');
        });
      }
    });
  }
  
  translateJargon(termData, context) {
    const { text, element, position } = termData;
    
    const translation = this.translator.translate(text, context);
    
    if (translation && translation !== text) {
      this.highlightJargon(element, text, translation, position);
      this.translationCount++;
    }
  }
  
  highlightJargon(element, originalText, translation, position) {
    try {
      // Create highlight wrapper
      const wrapper = document.createElement('span');
      wrapper.className = 'unjargon-term';
      wrapper.setAttribute('data-original', originalText);
      wrapper.setAttribute('data-translation', translation);
      wrapper.setAttribute('tabindex', '0');
      wrapper.setAttribute('role', 'button');
      wrapper.setAttribute('aria-label', 'View translation');
      
      // Get translation data for severity
      const translationData = this.translator.getTranslationData(originalText);
      if (translationData) {
        wrapper.classList.add(translationData.severity || 'neutral');
      }
      
      // Simple text replacement approach (more reliable)
      const textContent = element.textContent;
      const index = textContent.toLowerCase().indexOf(originalText.toLowerCase());
      
      if (index !== -1) {
        // Find the actual text node containing this text
        const textNode = this.findTextNodeContaining(element, originalText);
        if (textNode) {
          // Use a more reliable replacement method
          this.replaceTextInNode(textNode, originalText, wrapper);
        } else {
          // Fallback: simple innerHTML replacement
          const beforeText = textContent.substring(0, index);
          const afterText = textContent.substring(index + originalText.length);
          element.innerHTML = beforeText + wrapper.outerHTML + afterText;
          wrapper.textContent = originalText;
        }
      }
      
      // Add event listeners
      this.addHighlightListeners(wrapper, translation);
      
      // Store reference
      this.detectedTerms.push({
        element: wrapper,
        original: originalText,
        translation: translation
      });
      
      
    } catch (error) {
      console.error('Error highlighting jargon:', error);
    }
  }
  
  findTextNodeContaining(element, searchText) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          return node.textContent.toLowerCase().includes(searchText.toLowerCase()) 
            ? NodeFilter.FILTER_ACCEPT 
            : NodeFilter.FILTER_SKIP;
        }
      }
    );
    
    return walker.nextNode();
  }
  
  replaceTextInNode(textNode, originalText, wrapper) {
    const text = textNode.textContent;
    const index = text.toLowerCase().indexOf(originalText.toLowerCase());
    
    if (index !== -1) {
      // Split the text node
      const beforeText = text.substring(0, index);
      const afterText = text.substring(index + originalText.length);
      
      // Create new text nodes
      const beforeNode = document.createTextNode(beforeText);
      const afterNode = document.createTextNode(afterText);
      
      // Set the wrapper content
      wrapper.textContent = originalText;
      
      // Replace the original text node
      const parent = textNode.parentNode;
      parent.insertBefore(beforeNode, textNode);
      parent.insertBefore(wrapper, textNode);
      parent.insertBefore(afterNode, textNode);
      parent.removeChild(textNode);
    }
  }
  
  
  addHighlightListeners(element, translation) {
    // Mouse events
    element.addEventListener('mouseenter', (e) => {
      if (this.settings.showTooltips && this.tooltipManager) {
        this.tooltipManager.show(e.target, translation);
      }
    });
    
    element.addEventListener('mouseleave', (e) => {
      if (this.tooltipManager) {
        this.tooltipManager.hide();
      }
    });
    
    // Keyboard events
    element.addEventListener('focus', (e) => {
      if (this.settings.showTooltips && this.tooltipManager) {
        this.tooltipManager.show(e.target, translation);
      }
    });
    
    element.addEventListener('blur', (e) => {
      if (this.tooltipManager) {
        this.tooltipManager.hide();
      }
    });
    
    // Click to toggle tooltip
    element.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.tooltipManager) {
        this.tooltipManager.toggle(e.target, translation);
      }
    });
  }
  
  clearHighlights() {
    // Remove all highlight elements
    const highlights = document.querySelectorAll('.unjargon-term');
    highlights.forEach(highlight => {
      const parent = highlight.parentNode;
      parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
      parent.normalize();
    });
    
    // Clear tooltips
    this.tooltipManager.hide();
    
    // Reset counters
    this.detectedTerms = [];
    this.translationCount = 0;
  }
  
  setupGlobalScrollListener() {
    // Add a global scroll listener to hide tooltips when scrolling
    this.scrollHandler = () => {
      if (this.tooltipManager && this.tooltipManager.isTooltipVisible()) {
        this.tooltipManager.hide();
      }
    };
    
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
  }
  
  setupMutationObserver() {
    this.mutationObserver = new MutationObserver((mutations) => {
      let shouldRescan = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if new nodes contain text content
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Check if the new node has text content that might contain jargon
              const textContent = node.textContent?.trim();
              if (textContent && textContent.length > 2) {
                shouldRescan = true;
              }
            }
          });
        }
      });
      
      if (shouldRescan) {
        // Debounce rescanning
        clearTimeout(this.rescanTimeout);
        this.rescanTimeout = setTimeout(() => {
          this.scanPage();
        }, 500);
      }
    });
    
    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  updateStats() {
    const stats = {
      termCount: this.detectedTerms.length,
      translationCount: this.translationCount,
      timestamp: Date.now()
    };
    
    // Send stats to background script
    chrome.runtime.sendMessage({
      action: 'logDetection',
      data: stats
    });
    
    // Send stats to popup
    chrome.runtime.sendMessage({
      action: 'statsUpdated',
      stats: stats
    });
  }
  
  sendCurrentStats(callback) {
    const stats = {
      termCount: this.detectedTerms.length,
      translationCount: this.translationCount,
      isActive: this.isActive
    };
    
    callback({ success: true, stats: stats });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PriceSplain();
  });
} else {
  new PriceSplain();
}
