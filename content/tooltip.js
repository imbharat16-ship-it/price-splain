// Tooltip Manager for Price-Splain Extension

class TooltipManager {
  constructor() {
    this.tooltip = null;
    this.isVisible = false;
    this.currentTarget = null;
    this.createTooltip();
  }
  
  createTooltip() {
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'unjargon-tooltip';
    this.tooltip.setAttribute('role', 'tooltip');
    this.tooltip.setAttribute('aria-live', 'polite');
    this.tooltip.style.cssText = `
      position: fixed;
      z-index: 999999;
      background: #2d2d2d;
      color: #ffffff;
      padding: 16px 20px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      max-width: 320px;
      font-size: 14px;
      line-height: 1.5;
      pointer-events: none;
      opacity: 0;
      transform: translateY(8px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      word-wrap: break-word;
      border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    document.body.appendChild(this.tooltip);
    console.log('📝 Tooltip created and added to DOM');
  }
  
  show(element, translation) {
    if (!this.tooltip) return;
    
    this.currentTarget = element;
    this.isVisible = true;
    
    // Get translation data
    const translationData = this.parseTranslation(translation);
    
    // Build tooltip content
    this.buildTooltipContent(translationData);
    
    // Position tooltip
    this.positionTooltip(element);
    
    // Show with animation
    this.tooltip.classList.add('visible');
    this.tooltip.style.display = 'block';
    this.tooltip.style.opacity = '1';
    this.tooltip.style.visibility = 'visible';
    this.tooltip.style.zIndex = '999999';
  }
  
  hide() {
    if (!this.tooltip || !this.isVisible) return;
    
    this.isVisible = false;
    this.currentTarget = null;
    this.tooltip.classList.remove('visible');
    
    // Ensure tooltip is completely hidden
    this.tooltip.style.opacity = '0';
    this.tooltip.style.visibility = 'hidden';
    this.tooltip.style.display = 'none';
    
  }
  
  toggle(element, translation) {
    if (this.isVisible && this.currentTarget === element) {
      this.hide();
    } else {
      this.show(element, translation);
    }
  }
  
  parseTranslation(translation) {
    // If translation is a string, try to extract data from element attributes
    if (typeof translation === 'string') {
      // Try to get data from the current target element
      if (this.currentTarget) {
        const original = this.currentTarget.getAttribute('data-original') || translation;
        const translationText = this.currentTarget.getAttribute('data-translation') || translation;
        
        // Determine severity based on element classes
        let severity = 'neutral';
        if (this.currentTarget.classList.contains('warning')) {
          severity = 'warning';
        } else if (this.currentTarget.classList.contains('good')) {
          severity = 'good';
        }
        
        return {
          original: original,
          translation: translationText,
          explanation: '',
          severity: severity
        };
      }
      
      return {
        original: translation,
        translation: translation,
        explanation: '',
        severity: 'neutral'
      };
    }
    
    return translation;
  }
  
  buildTooltipContent(data) {
    const { original, translation, explanation, severity } = data;
    
    // Create main content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'tooltip-content';
    
    // Create translation (main text)
    const translationDiv = document.createElement('div');
    translationDiv.className = 'tooltip-translation';
    translationDiv.textContent = translation;
    
    // Create explanation (if exists)
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'tooltip-explanation';
    explanationDiv.textContent = explanation || '';
    
    // Clear existing content
    this.tooltip.innerHTML = '';
    
    // Add content
    this.tooltip.appendChild(contentDiv);
    contentDiv.appendChild(translationDiv);
    if (explanation) {
      contentDiv.appendChild(explanationDiv);
    }
    
    // Add severity styling
    this.tooltip.classList.remove('warning', 'good', 'neutral');
    this.tooltip.classList.add(severity || 'neutral');
  }
  
  getSeverityIcon(severity) {
    switch (severity) {
      case 'good': return '✅';
      case 'warning': return '⚠️';
      case 'neutral': 
      default: return 'ℹ️';
    }
  }
  
  positionTooltip(element) {
    if (!this.tooltip || !element) return;
    
    const elementRect = element.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    // First, make tooltip visible to get accurate dimensions
    this.tooltip.style.visibility = 'hidden';
    this.tooltip.style.opacity = '1';
    this.tooltip.style.display = 'block';
    
    // Force a reflow to ensure tooltip is rendered
    this.tooltip.offsetHeight;
    
    // Now get the actual tooltip dimensions
    const tooltipRect = this.tooltip.getBoundingClientRect();
    
    
    // Calculate initial position (below element)
    let top = elementRect.bottom + 8;
    let left = elementRect.left + (elementRect.width / 2) - (tooltipRect.width / 2);
    
    // Adjust horizontal position if tooltip goes off screen
    if (left < 10) {
      left = 10;
    } else if (left + tooltipRect.width > viewport.width - 10) {
      left = viewport.width - tooltipRect.width - 10;
    }
    
    // Check if tooltip goes below viewport
    const spaceBelow = viewport.height - elementRect.bottom;
    const spaceAbove = elementRect.top;
    
    if (spaceBelow < tooltipRect.height + 20 && spaceAbove > tooltipRect.height + 20) {
      // Position above element
      top = elementRect.top - tooltipRect.height - 8;
      this.tooltip.classList.add('tooltip-top');
    } else {
      // Position below element
      this.tooltip.classList.remove('tooltip-top');
    }
    
    // Apply position using fixed positioning
    this.tooltip.style.top = `${top}px`;
    this.tooltip.style.left = `${left}px`;
    this.tooltip.style.position = 'fixed';
    this.tooltip.style.visibility = 'visible';
    
  }
  
  // Handle window resize
  handleResize() {
    if (this.isVisible && this.currentTarget) {
      this.positionTooltip(this.currentTarget);
    }
  }
  
  // Handle scroll
  handleScroll() {
    if (this.isVisible) {
      // Hide tooltip on scroll for better UX
      this.hide();
    }
  }
  

  // Clean up
  destroy() {
    if (this.tooltip && this.tooltip.parentNode) {
      this.tooltip.parentNode.removeChild(this.tooltip);
    }
    this.tooltip = null;
    this.isVisible = false;
    this.currentTarget = null;
  }
  
  // Update tooltip content
  updateContent(translation) {
    if (!this.tooltip || !this.isVisible) return;
    
    const translationData = this.parseTranslation(translation);
    this.buildTooltipContent(translationData);
  }
  
  // Check if tooltip is currently visible
  isTooltipVisible() {
    return this.isVisible;
  }
  
  // Get current tooltip target
  getCurrentTarget() {
    return this.currentTarget;
  }
  
  // Force hide tooltip
  forceHide() {
    this.hide();
  }
  
  // Show tooltip with custom data
  showWithData(element, data) {
    if (!this.tooltip) return;
    
    this.currentTarget = element;
    this.isVisible = true;
    
    this.buildTooltipContent(data);
    this.positionTooltip(element);
    this.tooltip.classList.add('visible');
  }
}

// Global tooltip manager instance
let globalTooltipManager = null;

// Initialize tooltip manager
function initializeTooltipManager() {
  if (!globalTooltipManager) {
    globalTooltipManager = new TooltipManager();
    
    // Add event listeners for positioning
    window.addEventListener('resize', () => {
      globalTooltipManager.handleResize();
    });
    
    window.addEventListener('scroll', () => {
      globalTooltipManager.handleScroll();
    }, true);
  }
  
  return globalTooltipManager;
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.TooltipManager = TooltipManager;
  window.initializeTooltipManager = initializeTooltipManager;
}
