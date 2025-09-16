// Jargon Translation Engine for Price-Splain Extension

class JargonTranslator {
  constructor() {
    this.dictionary = null;
    this.loadDictionary();
  }
  
  async loadDictionary() {
    try {
      console.log('📚 Loading dictionary...');
      
      // Try to load from the data directory
      if (typeof PRICING_JARGON_DICTIONARY !== 'undefined') {
        console.log('📚 Using global dictionary');
        this.dictionary = PRICING_JARGON_DICTIONARY;
      } else {
        // Load from chrome extension as JSON
        console.log('📚 Fetching dictionary from extension...');
        const response = await fetch(chrome.runtime.getURL('data/glossary.json'));
        this.dictionary = await response.json();
        console.log('📚 Dictionary loaded from JSON:', Object.keys(this.dictionary).length, 'entries');
      }
    } catch (error) {
      console.error('❌ Error loading dictionary:', error);
      this.dictionary = this.getFallbackDictionary();
      console.log('📚 Using fallback dictionary:', Object.keys(this.dictionary).length, 'entries');
    }
    
    // If still no dictionary, use fallback
    if (!this.dictionary) {
      console.log('📚 No dictionary found, using fallback');
      this.dictionary = this.getFallbackDictionary();
    }
    
    console.log('📚 Dictionary ready with', Object.keys(this.dictionary).length, 'entries');
  }
  
  getDictionary() {
    return this.dictionary;
  }
  
  getFallbackDictionary() {
    // Minimal fallback dictionary
    return {
      "Contact Sales": {
        translation: "Hidden pricing (have to ask)",
        severity: "warning",
        explanation: "Price not publicly listed",
        category: "pricing"
      },
      "Unlimited*": {
        translation: "Has hidden limits (check terms)",
        severity: "warning",
        explanation: "Never truly unlimited",
        category: "features"
      },
      "Enterprise-Grade": {
        translation: "Built for large companies",
        severity: "neutral",
        explanation: "Usually means expensive",
        category: "features"
      },
      "API Access": {
        translation: "For developer integrations",
        severity: "good",
        explanation: "Useful for automation",
        category: "technical"
      }
    };
  }
  
  translate(text, context) {
    if (!this.dictionary) {
      return text; // Return original if dictionary not loaded
    }
    
    // Direct match first
    if (this.dictionary[text]) {
      return this.createTranslation(text, this.dictionary[text]);
    }
    
    // Case-insensitive match
    const lowerText = text.toLowerCase();
    for (const [key, value] of Object.entries(this.dictionary)) {
      if (key.toLowerCase() === lowerText) {
        return this.createTranslation(text, value);
      }
    }
    
    // Partial match
    for (const [key, value] of Object.entries(this.dictionary)) {
      if (text.toLowerCase().includes(key.toLowerCase()) && key.length > 3) {
        return this.createTranslation(text, value, key);
      }
    }
    
    // Pattern-based matching
    const patternMatch = this.findPatternMatch(text);
    if (patternMatch) {
      return this.createTranslation(text, patternMatch);
    }
    
    return text; // No translation found
  }
  
  createTranslation(originalText, translationData, matchedKey = null) {
    const { translation, severity, explanation, category } = translationData;
    
    // If it's a partial match, replace the matched part
    if (matchedKey && originalText.toLowerCase() !== matchedKey.toLowerCase()) {
      const regex = new RegExp(matchedKey, 'gi');
      return originalText.replace(regex, translation);
    }
    
    return translation;
  }
  
  getTranslationData(text) {
    if (!this.dictionary) return null;
    
    // Direct match first
    if (this.dictionary[text]) {
      return this.dictionary[text];
    }
    
    // Case-insensitive match
    const lowerText = text.toLowerCase();
    for (const [key, value] of Object.entries(this.dictionary)) {
      if (key.toLowerCase() === lowerText) {
        return value;
      }
    }
    
    // Partial match
    for (const [key, value] of Object.entries(this.dictionary)) {
      if (text.toLowerCase().includes(key.toLowerCase()) && key.length > 3) {
        return value;
      }
    }
    
    return null;
  }
  
  findPatternMatch(text) {
    const patterns = [
      // Pricing patterns
      { pattern: /contact\s+sales/i, data: {
        translation: "Hidden pricing (have to ask)",
        severity: "warning",
        explanation: "Price not publicly listed",
        category: "pricing"
      }},
      { pattern: /custom\s+pricing/i, data: {
        translation: "Pricing varies by company size",
        severity: "warning",
        explanation: "They'll charge what they think you can afford",
        category: "pricing"
      }},
      { pattern: /request\s+a\s+quote/i, data: {
        translation: "Fill out forms for pricing",
        severity: "warning",
        explanation: "Sales team will call you",
        category: "pricing"
      }},
      
      // Unlimited patterns
      { pattern: /unlimited\s*\*/i, data: {
        translation: "Has hidden limits (check terms)",
        severity: "warning",
        explanation: "Never truly unlimited",
        category: "features"
      }},
      { pattern: /unlimited\s+users/i, data: {
        translation: "No user limit (but expensive)",
        severity: "neutral",
        explanation: "Scales with your team",
        category: "features"
      }},
      { pattern: /unlimited\s+storage/i, data: {
        translation: "Storage with fair use policy",
        severity: "neutral",
        explanation: "Soft caps exist",
        category: "features"
      }},
      
      // Feature patterns
      { pattern: /advanced\s+analytics/i, data: {
        translation: "Analytics (details unclear)",
        severity: "neutral",
        explanation: "Vague marketing term",
        category: "features"
      }},
      { pattern: /enterprise-grade/i, data: {
        translation: "Built for large companies",
        severity: "neutral",
        explanation: "Usually means expensive",
        category: "features"
      }},
      { pattern: /ai-powered/i, data: {
        translation: "Uses some AI (probably basic)",
        severity: "neutral",
        explanation: "Marketing term for automation",
        category: "features"
      }},
      
      // Support patterns
      { pattern: /24\/7\s+support/i, data: {
        translation: "Always available (response time varies)",
        severity: "neutral",
        explanation: "Check actual response time",
        category: "support"
      }},
      { pattern: /priority\s+support/i, data: {
        translation: "Faster than basic support",
        severity: "good",
        explanation: "Jump the queue",
        category: "support"
      }},
      { pattern: /dedicated\s+support/i, data: {
        translation: "Assigned support person",
        severity: "good",
        explanation: "Personal help",
        category: "support"
      }},
      
      // Technical patterns
      { pattern: /api\s+access/i, data: {
        translation: "For developer integrations",
        severity: "good",
        explanation: "Useful for automation",
        category: "technical"
      }},
      { pattern: /webhook\s+support/i, data: {
        translation: "Real-time event notifications",
        severity: "good",
        explanation: "Instant updates",
        category: "technical"
      }},
      { pattern: /third-party\s+integrations/i, data: {
        translation: "Connects to other tools",
        severity: "neutral",
        explanation: "May need setup",
        category: "technical"
      }},
      
      // Usage patterns
      { pattern: /per\s+user/i, data: {
        translation: "Price multiplied by team size",
        severity: "neutral",
        explanation: "Gets expensive fast",
        category: "usage"
      }},
      { pattern: /per\s+seat/i, data: {
        translation: "Price multiplied by team size",
        severity: "neutral",
        explanation: "Gets expensive fast",
        category: "usage"
      }},
      { pattern: /credits/i, data: {
        translation: "Prepaid usage units",
        severity: "neutral",
        explanation: "Pay upfront, use later",
        category: "usage"
      }},
      { pattern: /tokens/i, data: {
        translation: "Pay per word/action",
        severity: "neutral",
        explanation: "Common in AI tools",
        category: "usage"
      }},
      
      // Security patterns
      { pattern: /2fa/i, data: {
        translation: "Two-factor authentication",
        severity: "good",
        explanation: "Extra security",
        category: "security"
      }},
      { pattern: /mfa/i, data: {
        translation: "Multi-factor authentication",
        severity: "good",
        explanation: "Extra security",
        category: "security"
      }},
      { pattern: /soc\s+2/i, data: {
        translation: "Audited security practices",
        severity: "good",
        explanation: "Third-party verified",
        category: "security"
      }},
      { pattern: /gdpr/i, data: {
        translation: "EU privacy rules followed",
        severity: "good",
        explanation: "Privacy focused",
        category: "security"
      }}
    ];
    
    for (const { pattern, data } of patterns) {
      if (pattern.test(text)) {
        return data;
      }
    }
    
    return null;
  }
  
  
  getSeverityColor(severity) {
    switch (severity) {
      case 'good': return 'good';
      case 'warning': return 'warning';
      case 'neutral': 
      default: return 'neutral';
    }
  }
  
  getSeverityIcon(severity) {
    switch (severity) {
      case 'good': return '✅';
      case 'warning': return '⚠️';
      case 'neutral': 
      default: return 'ℹ️';
    }
  }
  
  // Get all available terms for debugging
  getAllTerms() {
    if (!this.dictionary) return [];
    return Object.keys(this.dictionary);
  }
  
  // Get terms by category
  getTermsByCategory(category) {
    if (!this.dictionary) return [];
    return Object.entries(this.dictionary)
      .filter(([key, value]) => value.category === category)
      .map(([key, value]) => key);
  }
  
  // Get terms by severity
  getTermsBySeverity(severity) {
    if (!this.dictionary) return [];
    return Object.entries(this.dictionary)
      .filter(([key, value]) => value.severity === severity)
      .map(([key, value]) => key);
  }
  
  // Check if text contains any jargon
  containsJargon(text) {
    if (!this.dictionary) return false;
    
    const lowerText = text.toLowerCase();
    
    // Check direct matches
    for (const key of Object.keys(this.dictionary)) {
      if (lowerText.includes(key.toLowerCase())) {
        return true;
      }
    }
    
    // Check patterns
    const patterns = Object.keys(this.patterns || {});
    return patterns.some(pattern => {
      try {
        return new RegExp(pattern, 'i').test(text);
      } catch {
        return false;
      }
    });
  }
}
