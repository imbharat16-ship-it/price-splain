// Comprehensive SaaS Jargon Dictionary for Price-Splain Extension

const PRICING_JARGON_DICTIONARY = {
  // PRICING OBFUSCATION (Hidden Costs)
  "Contact Sales": {
    translation: "Hidden pricing (have to ask)",
    severity: "warning",
    explanation: "Price not publicly listed",
    category: "pricing"
  },
  "Custom Pricing": {
    translation: "Pricing varies by company size",
    severity: "warning", 
    explanation: "They'll charge what they think you can afford",
    category: "pricing"
  },
  "Request a Quote": {
    translation: "Fill out forms for pricing",
    severity: "warning",
    explanation: "Sales team will call you",
    category: "pricing"
  },
  "Enterprise Pricing": {
    translation: "If you have to ask, it's expensive",
    severity: "warning",
    explanation: "Usually 10x the listed price",
    category: "pricing"
  },
  "Get Pricing": {
    translation: "Pricing behind contact form",
    severity: "warning",
    explanation: "Prepare for sales calls",
    category: "pricing"
  },
  "Book a Demo": {
    translation: "See pricing after sales pitch",
    severity: "warning",
    explanation: "30-min pitch before price reveal",
    category: "pricing"
  },
  "Starting at": {
    translation: "Minimum price (goes up fast)",
    severity: "neutral",
    explanation: "Most features cost extra",
    category: "pricing"
  },
  "From $X": {
    translation: "Base price (addons extra)",
    severity: "neutral",
    explanation: "Real price is higher",
    category: "pricing"
  },
  "Flexible Pricing": {
    translation: "Price changes based on you",
    severity: "neutral",
    explanation: "Negotiable but unclear",
    category: "pricing"
  },
  "Volume Pricing": {
    translation: "Bulk discounts available",
    severity: "good",
    explanation: "Save money at scale",
    category: "pricing"
  },

  // FEATURE DESCRIPTIONS
  "Unlimited*": {
    translation: "Has hidden limits (check terms)",
    severity: "warning",
    explanation: "Never truly unlimited",
    category: "features"
  },
  "Unlimited Users": {
    translation: "No user limit (but expensive)",
    severity: "neutral",
    explanation: "Scales with your team",
    category: "features"
  },
  "Unlimited Storage": {
    translation: "Storage with fair use policy",
    severity: "neutral",
    explanation: "Soft caps exist",
    category: "features"
  },
  "Advanced Analytics": {
    translation: "Analytics (details unclear)",
    severity: "neutral",
    explanation: "Vague marketing term",
    category: "features"
  },
  "Enterprise-Grade": {
    translation: "Built for large companies",
    severity: "neutral",
    explanation: "Usually means expensive",
    category: "features"
  },
  "Professional Features": {
    translation: "Standard features renamed",
    severity: "neutral",
    explanation: "Marketing fluff",
    category: "features"
  },
  "Premium Support": {
    translation: "Faster support responses",
    severity: "good",
    explanation: "Actually helpful",
    category: "features"
  },
  "Real-time Sync": {
    translation: "Instant updates across devices",
    severity: "good",
    explanation: "Genuinely useful",
    category: "features"
  },
  "End-to-end Encryption": {
    translation: "Properly secured data",
    severity: "good",
    explanation: "Real security feature",
    category: "features"
  },
  "API Access": {
    translation: "For developer integrations",
    severity: "good",
    explanation: "Useful for automation",
    category: "features"
  },

  // USAGE-BASED PRICING
  "Credits": {
    translation: "Prepaid usage units",
    severity: "neutral",
    explanation: "Pay upfront, use later",
    category: "usage"
  },
  "Monthly Credits": {
    translation: "Credits that reset monthly",
    severity: "neutral",
    explanation: "Use it or lose it",
    category: "usage"
  },
  "Credit Rollover": {
    translation: "Unused credits carry forward",
    severity: "good",
    explanation: "Don't lose what you paid for",
    category: "usage"
  },
  "Token-based": {
    translation: "Pay per word/action",
    severity: "neutral",
    explanation: "Common in AI tools",
    category: "usage"
  },
  "Per API Call": {
    translation: "Charged for each request",
    severity: "neutral",
    explanation: "Costs can add up",
    category: "usage"
  },
  "Per User": {
    translation: "Price multiplied by team size",
    severity: "neutral",
    explanation: "Gets expensive fast",
    category: "usage"
  },
  "Per Seat": {
    translation: "Price multiplied by team size",
    severity: "neutral",
    explanation: "Gets expensive fast",
    category: "usage"
  },
  "Per GB": {
    translation: "Storage/bandwidth pricing",
    severity: "neutral",
    explanation: "Monitor your usage",
    category: "usage"
  },
  "Overage Charges": {
    translation: "Extra fees for exceeding limits",
    severity: "warning",
    explanation: "Can be expensive",
    category: "usage"
  },
  "Pay as You Go": {
    translation: "No commitment, higher rates",
    severity: "neutral",
    explanation: "Flexible but pricey",
    category: "usage"
  },
  "Consumption-based": {
    translation: "Pay for what you use",
    severity: "neutral",
    explanation: "Hard to predict costs",
    category: "usage"
  },

  // AI/LLM SPECIFIC TERMS
  "Context Window": {
    translation: "AI's memory per conversation",
    severity: "neutral",
    explanation: "How much it remembers",
    category: "ai"
  },
  "Token Limits": {
    translation: "Max words per request",
    severity: "neutral",
    explanation: "Processing limits",
    category: "ai"
  },
  "Model Selection": {
    translation: "Choose AI quality/speed",
    severity: "good",
    explanation: "Pick what you need",
    category: "ai"
  },
  "Fine-tuned Models": {
    translation: "Custom-trained AI",
    severity: "good",
    explanation: "Better for specific tasks",
    category: "ai"
  },
  "Input Tokens": {
    translation: "Words you send to AI",
    severity: "neutral",
    explanation: "Charged both ways",
    category: "ai"
  },
  "Output Tokens": {
    translation: "Words AI sends back",
    severity: "neutral",
    explanation: "Charged both ways",
    category: "ai"
  },
  "Inference Time": {
    translation: "AI thinking speed",
    severity: "neutral",
    explanation: "Faster costs more",
    category: "ai"
  },
  "Background Agents": {
    translation: "Automated AI workers",
    severity: "good",
    explanation: "Runs tasks for you",
    category: "ai"
  },
  "Auto Mode": {
    translation: "AI picks best model",
    severity: "good",
    explanation: "Optimizes for you",
    category: "ai"
  },
  "Priority Queue": {
    translation: "Faster AI responses",
    severity: "neutral",
    explanation: "Pay for speed",
    category: "ai"
  },
  "Rate Limits": {
    translation: "Max requests per minute",
    severity: "neutral",
    explanation: "Prevents overuse",
    category: "ai"
  },

  // SUPPORT & SERVICE LEVELS
  "24/7 Support": {
    translation: "Always available (response time varies)",
    severity: "neutral",
    explanation: "Check actual response time",
    category: "support"
  },
  "Priority Support": {
    translation: "Faster than basic support",
    severity: "good",
    explanation: "Jump the queue",
    category: "support"
  },
  "Dedicated Support": {
    translation: "Assigned support person",
    severity: "good",
    explanation: "Personal help",
    category: "support"
  },
  "Email Support": {
    translation: "Support via email only",
    severity: "neutral",
    explanation: "Can be slow",
    category: "support"
  },
  "Live Chat": {
    translation: "Chat support (may be bot)",
    severity: "neutral",
    explanation: "Check if human",
    category: "support"
  },
  "Phone Support": {
    translation: "Call for help",
    severity: "good",
    explanation: "Direct assistance",
    category: "support"
  },
  "Community Support": {
    translation: "Help from other users",
    severity: "neutral",
    explanation: "Free but variable",
    category: "support"
  },
  "SLA Guarantee": {
    translation: "Uptime/response promise",
    severity: "good",
    explanation: "Accountability",
    category: "support"
  },
  "White-glove Service": {
    translation: "Premium hand-holding",
    severity: "good",
    explanation: "VIP treatment",
    category: "support"
  },
  "Onboarding Assistance": {
    translation: "Setup help included",
    severity: "good",
    explanation: "Good for beginners",
    category: "support"
  },

  // INTEGRATION & TECHNICAL
  "API Access": {
    translation: "Developer integration tools",
    severity: "good",
    explanation: "For automation",
    category: "technical"
  },
  "Webhook Support": {
    translation: "Real-time event notifications",
    severity: "good",
    explanation: "Instant updates",
    category: "technical"
  },
  "Native Integrations": {
    translation: "Built-in connections",
    severity: "good",
    explanation: "Works out of box",
    category: "technical"
  },
  "Third-party Integrations": {
    translation: "Connects to other tools",
    severity: "neutral",
    explanation: "May need setup",
    category: "technical"
  },
  "Zapier Integration": {
    translation: "No-code automation",
    severity: "good",
    explanation: "Easy workflows",
    category: "technical"
  },
  "Make Integration": {
    translation: "No-code automation",
    severity: "good",
    explanation: "Easy workflows",
    category: "technical"
  },
  "OAuth/SSO": {
    translation: "Single sign-on security",
    severity: "good",
    explanation: "One password",
    category: "technical"
  },
  "REST API": {
    translation: "Standard developer tools",
    severity: "good",
    explanation: "Well-documented",
    category: "technical"
  },
  "GraphQL API": {
    translation: "Flexible developer tools",
    severity: "good",
    explanation: "Query what you need",
    category: "technical"
  },
  "SDK Available": {
    translation: "Developer libraries",
    severity: "good",
    explanation: "Easier coding",
    category: "technical"
  },
  "Sandbox Environment": {
    translation: "Safe testing space",
    severity: "good",
    explanation: "Try without breaking",
    category: "technical"
  },
  "Custom Integrations": {
    translation: "Built specifically for you",
    severity: "warning",
    explanation: "Usually expensive",
    category: "technical"
  },

  // STORAGE & DATA
  "Cloud Storage": {
    translation: "Files on remote servers",
    severity: "neutral",
    explanation: "Accessible anywhere",
    category: "storage"
  },
  "Local Storage": {
    translation: "Files on your device",
    severity: "good",
    explanation: "You control it",
    category: "storage"
  },
  "Data Retention": {
    translation: "How long data is kept",
    severity: "neutral",
    explanation: "Important for compliance",
    category: "storage"
  },
  "Automatic Backups": {
    translation: "Regular data copies",
    severity: "good",
    explanation: "Prevents data loss",
    category: "storage"
  },
  "Version History": {
    translation: "Track file changes",
    severity: "good",
    explanation: "Undo mistakes",
    category: "storage"
  },
  "Data Export": {
    translation: "Download your data",
    severity: "good",
    explanation: "Not locked in",
    category: "storage"
  },
  "Cold Storage": {
    translation: "Cheap, slow storage",
    severity: "neutral",
    explanation: "For archives",
    category: "storage"
  },
  "CDN Included": {
    translation: "Fast global delivery",
    severity: "good",
    explanation: "Better performance",
    category: "storage"
  },
  "Bandwidth Limits": {
    translation: "Data transfer caps",
    severity: "neutral",
    explanation: "Can hit limits",
    category: "storage"
  },

  // SECURITY & COMPLIANCE
  "Enterprise Security": {
    translation: "Enhanced security features",
    severity: "good",
    explanation: "Actually important",
    category: "security"
  },
  "SOC 2 Compliant": {
    translation: "Audited security practices",
    severity: "good",
    explanation: "Third-party verified",
    category: "security"
  },
  "GDPR Compliant": {
    translation: "EU privacy rules followed",
    severity: "good",
    explanation: "Privacy focused",
    category: "security"
  },
  "HIPAA Compliant": {
    translation: "Medical data secure",
    severity: "good",
    explanation: "Healthcare ready",
    category: "security"
  },
  "2FA": {
    translation: "Two-factor authentication",
    severity: "good",
    explanation: "Extra security",
    category: "security"
  },
  "MFA": {
    translation: "Multi-factor authentication",
    severity: "good",
    explanation: "Extra security",
    category: "security"
  },
  "Zero-Knowledge": {
    translation: "Provider can't see data",
    severity: "good",
    explanation: "True privacy",
    category: "security"
  },
  "Audit Logs": {
    translation: "Activity tracking",
    severity: "good",
    explanation: "See who did what",
    category: "security"
  },
  "Role-based Access": {
    translation: "Permission controls",
    severity: "good",
    explanation: "Limit access",
    category: "security"
  },
  "IP Whitelisting": {
    translation: "Restrict access locations",
    severity: "good",
    explanation: "Extra control",
    category: "security"
  },
  "Encryption at Rest": {
    translation: "Stored data encrypted",
    severity: "good",
    explanation: "Secure storage",
    category: "security"
  },

  // TEAM & COLLABORATION
  "Team Workspaces": {
    translation: "Separate team areas",
    severity: "good",
    explanation: "Organized collaboration",
    category: "team"
  },
  "Unlimited Collaborators": {
    translation: "No limit on team members",
    severity: "good",
    explanation: "Scale freely",
    category: "team"
  },
  "Guest Access": {
    translation: "External user access",
    severity: "neutral",
    explanation: "Limited permissions",
    category: "team"
  },
  "Admin Controls": {
    translation: "Management tools",
    severity: "good",
    explanation: "Oversight ability",
    category: "team"
  },
  "User Permissions": {
    translation: "Access level controls",
    severity: "good",
    explanation: "Security feature",
    category: "team"
  },
  "Activity Dashboard": {
    translation: "See team activity",
    severity: "neutral",
    explanation: "Can feel like monitoring",
    category: "team"
  },
  "Shared Workspace": {
    translation: "Everyone sees everything",
    severity: "neutral",
    explanation: "No privacy",
    category: "team"
  },
  "Private Channels": {
    translation: "Restricted team areas",
    severity: "good",
    explanation: "Confidential work",
    category: "team"
  },
  "Team Analytics": {
    translation: "Usage statistics",
    severity: "neutral",
    explanation: "Track productivity",
    category: "team"
  },
  "Collaboration Tools": {
    translation: "Team features included",
    severity: "good",
    explanation: "Work together",
    category: "team"
  },

  // BILLING & CONTRACTS
  "Annual Billing": {
    translation: "Pay yearly upfront",
    severity: "neutral",
    explanation: "Usually cheaper",
    category: "billing"
  },
  "Monthly Billing": {
    translation: "Pay each month",
    severity: "good",
    explanation: "More flexible",
    category: "billing"
  },
  "No Credit Card Required": {
    translation: "True free trial",
    severity: "good",
    explanation: "Try without commitment",
    category: "billing"
  },
  "Auto-renewal": {
    translation: "Automatic charges",
    severity: "neutral",
    explanation: "Remember to cancel",
    category: "billing"
  },
  "Prorated Billing": {
    translation: "Pay for partial period",
    severity: "good",
    explanation: "Fair pricing",
    category: "billing"
  },
  "Money-back Guarantee": {
    translation: "Refund if unhappy",
    severity: "good",
    explanation: "Risk-free trial",
    category: "billing"
  },
  "Contract Required": {
    translation: "Locked-in commitment",
    severity: "warning",
    explanation: "Hard to cancel",
    category: "billing"
  },
  "Month-to-month": {
    translation: "No long commitment",
    severity: "good",
    explanation: "Maximum flexibility",
    category: "billing"
  },
  "Setup Fees": {
    translation: "One-time startup cost",
    severity: "warning",
    explanation: "Hidden initial cost",
    category: "billing"
  },
  "Cancellation Fees": {
    translation: "Penalty for leaving",
    severity: "warning",
    explanation: "Expensive to quit",
    category: "billing"
  },

  // PERFORMANCE & RELIABILITY
  "99.9% Uptime": {
    translation: "~8 hours downtime/year",
    severity: "neutral",
    explanation: "Industry standard",
    category: "performance"
  },
  "99.99% Uptime": {
    translation: "~1 hour downtime/year",
    severity: "good",
    explanation: "Very reliable",
    category: "performance"
  },
  "High Availability": {
    translation: "Redundant systems",
    severity: "good",
    explanation: "Stays online",
    category: "performance"
  },
  "Auto-scaling": {
    translation: "Grows with demand",
    severity: "good",
    explanation: "Handles traffic",
    category: "performance"
  },
  "Load Balancing": {
    translation: "Distributes traffic",
    severity: "good",
    explanation: "Better performance",
    category: "performance"
  },
  "Global CDN": {
    translation: "Fast worldwide",
    severity: "good",
    explanation: "Speed everywhere",
    category: "performance"
  },
  "Low Latency": {
    translation: "Fast response times",
    severity: "good",
    explanation: "Snappy performance",
    category: "performance"
  },
  "Real-time Updates": {
    translation: "Instant changes",
    severity: "good",
    explanation: "No delays",
    category: "performance"
  },
  "Blazing Fast": {
    translation: "Marketing for 'fast'",
    severity: "neutral",
    explanation: "Subjective claim",
    category: "performance"
  },
  "Lightning Speed": {
    translation: "Another way to say fast",
    severity: "neutral",
    explanation: "Marketing fluff",
    category: "performance"
  },

  // MARKETING FLUFF
  "Game-changing": {
    translation: "Probably not",
    severity: "neutral",
    explanation: "Overhyped",
    category: "marketing"
  },
  "Revolutionary": {
    translation: "Slightly improved",
    severity: "neutral",
    explanation: "Marketing speak",
    category: "marketing"
  },
  "Industry-leading": {
    translation: "We think we're good",
    severity: "neutral",
    explanation: "Self-proclaimed",
    category: "marketing"
  },
  "Award-winning": {
    translation: "Got an award somewhere",
    severity: "neutral",
    explanation: "Check which award",
    category: "marketing"
  },
  "Best-in-class": {
    translation: "Good (according to us)",
    severity: "neutral",
    explanation: "Subjective",
    category: "marketing"
  },
  "Cutting-edge": {
    translation: "Using recent tech",
    severity: "neutral",
    explanation: "May be unstable",
    category: "marketing"
  },
  "Next-generation": {
    translation: "Newer version",
    severity: "neutral",
    explanation: "Incremental update",
    category: "marketing"
  },
  "Innovative": {
    translation: "Has some new features",
    severity: "neutral",
    explanation: "Subjective term",
    category: "marketing"
  },
  "Disruptive": {
    translation: "Trying to compete",
    severity: "neutral",
    explanation: "May not last",
    category: "marketing"
  },
  "World-class": {
    translation: "International quality",
    severity: "neutral",
    explanation: "Vague claim",
    category: "marketing"
  },

  // LIMITS & RESTRICTIONS
  "Fair Use Policy": {
    translation: "Hidden limits exist",
    severity: "warning",
    explanation: "Can suspend you",
    category: "limits"
  },
  "Acceptable Use": {
    translation: "Terms you must follow",
    severity: "neutral",
    explanation: "Read carefully",
    category: "limits"
  },
  "Soft Limits": {
    translation: "Flexible boundaries",
    severity: "neutral",
    explanation: "Can be exceeded",
    category: "limits"
  },
  "Hard Limits": {
    translation: "Absolute maximums",
    severity: "neutral",
    explanation: "Cannot exceed",
    category: "limits"
  },
  "Rate Limiting": {
    translation: "Speed restrictions",
    severity: "neutral",
    explanation: "Prevents abuse",
    category: "limits"
  },
  "Quota": {
    translation: "Usage allowance",
    severity: "neutral",
    explanation: "Monthly limits",
    category: "limits"
  },
  "Throttling": {
    translation: "Slowed when over limit",
    severity: "warning",
    explanation: "Performance hit",
    category: "limits"
  },
  "Burst Capacity": {
    translation: "Temporary higher limits",
    severity: "good",
    explanation: "Handle spikes",
    category: "limits"
  },
  "Reserved Capacity": {
    translation: "Guaranteed resources",
    severity: "good",
    explanation: "Always available",
    category: "limits"
  },
  "On-demand": {
    translation: "Available when needed",
    severity: "neutral",
    explanation: "May have delays",
    category: "limits"
  },

  // TRIAL & FREEMIUM
  "Free Forever": {
    translation: "Actually free tier",
    severity: "good",
    explanation: "No payment needed",
    category: "trial"
  },
  "Free Trial": {
    translation: "Temporary free access",
    severity: "neutral",
    explanation: "Will charge later",
    category: "trial"
  },
  "Freemium": {
    translation: "Free with paid upgrades",
    severity: "neutral",
    explanation: "Limited free version",
    category: "trial"
  },
  "14-day Trial": {
    translation: "Two weeks to test",
    severity: "neutral",
    explanation: "Set reminder",
    category: "trial"
  },
  "No Credit Card": {
    translation: "True free trial",
    severity: "good",
    explanation: "No surprise charges",
    category: "trial"
  },
  "Limited Trial": {
    translation: "Restricted features",
    severity: "neutral",
    explanation: "Not full access",
    category: "trial"
  },
  "Full-featured Trial": {
    translation: "Complete access",
    severity: "good",
    explanation: "Try everything",
    category: "trial"
  },
  "Developer Preview": {
    translation: "Early access version",
    severity: "neutral",
    explanation: "May have bugs",
    category: "trial"
  },
  "Beta Access": {
    translation: "Testing phase",
    severity: "neutral",
    explanation: "Expect issues",
    category: "trial"
  },
  "Lifetime Deal": {
    translation: "One-time payment",
    severity: "good",
    explanation: "No recurring fees",
    category: "trial"
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PRICING_JARGON_DICTIONARY;
} else if (typeof window !== 'undefined') {
  window.PRICING_JARGON_DICTIONARY = PRICING_JARGON_DICTIONARY;
}
