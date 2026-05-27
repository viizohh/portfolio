// Static portfolio data - add new entries here instead of using Sanity Studio
export interface PortfolioItem {
  id: string
  title: string
  slug: string
  category: 'project' | 'work' | 'internship' | 'vulnerability' | 'finding'
  description: string
  technologies: string[]
  featured: boolean
  logo?: string
  severity?: 'critical' | 'high' | 'medium' | 'low' | 'info'
  cvss?: number
  content?: string
  publishedAt: string
  dateRange?: string
}

export const portfolioItems: PortfolioItem[] = [
  // SECTION 001 - PROJECTS (Most recent first)
  {
    id: '5',
    title: 'Capital One Document Validation',
    slug: 'capital-one-doc-validation',
    category: 'project',
    description: 'Automated document validation system for financial processing',
    technologies: ['Python', 'OCR', 'Document Processing'],
    featured: false,
    content: 'Automated document validation system developed for financial document processing. Uses OCR and machine learning to validate document authenticity and extract structured data.',
    publishedAt: '2026-12-01',
  },
  {
    id: '4',
    title: 'Syntax Web Security Scanner',
    slug: 'syntax-scanner',
    category: 'project',
    description: 'FastAPI-based web security scanner for reconnaissance and misconfiguration detection',
    technologies: ['Python', 'FastAPI', 'Web Security', 'CVE Detection'],
    featured: false,
    content: 'FastAPI-based web security scanner built for reconnaissance and misconfiguration detection. Identifies exposed staging environments and outdated libraries on production sites with known CVEs. Successfully discovered security issues on production sites including luxury retail platforms, detecting vulnerable dependencies and misconfigurations.',
    publishedAt: '2026-02-01',
  },
  {
    id: '1',
    title: 'AI Recon Docker',
    slug: 'ai-recon-docker',
    category: 'project',
    description: 'AI-powered reconnaissance Docker container for automated security testing',
    technologies: ['Docker', 'Python', 'AI/ML', 'Security Testing'],
    featured: true,
    content: 'AI-powered reconnaissance Docker container designed for automated security testing and vulnerability discovery. Integrates machine learning models for intelligent target enumeration and attack surface analysis.',
    publishedAt: '2025-08-01',
  },
  {
    id: '2',
    title: 'Nikto+',
    slug: 'nikto-plus',
    category: 'project',
    description: 'Enhanced web server scanner with extended vulnerability detection',
    technologies: ['Perl', 'Web Security', 'Vulnerability Scanning'],
    featured: false,
    content: 'Enhanced version of the popular Nikto web server scanner with extended vulnerability detection capabilities. Includes custom modules for modern web application testing and improved reporting.',
    publishedAt: '2025-06-01',
  },
  {
    id: '3',
    title: 'CookieTracker',
    slug: 'cookie-tracker',
    category: 'project',
    description: 'Browser extension for tracking and analyzing third-party cookies',
    technologies: ['JavaScript', 'Browser Extensions', 'Privacy'],
    featured: false,
    content: 'Browser extension that tracks and analyzes third-party cookies across websites. Provides detailed visualizations of data sharing and helps users understand their digital footprint.',
    publishedAt: '2025-04-01',
  },

  // SECTION 002 & 003 - WORK EXPERIENCE
  {
    id: '18',
    title: 'Lockheed Martin',
    slug: 'lockheed-martin-cybersecurity-engineer',
    category: 'work',
    logo: '/images/Lockheed-Martin-Logo.jpg',
    description: 'Full-time cybersecurity engineering role focusing on defensive security operations and threat detection',
    technologies: ['NIST RMF', 'DISA STIG', 'Security Operations', 'Threat Detection', 'MITRE ATT&CK', 'Compliance'],
    featured: true,
    dateRange: 'Starting 2026',
    content: `Position: Cybersecurity Engineer
Duration: Starting 2026
Role: Full-Time

Focus Areas:
- Defensive security operations and threat detection
- Security compliance and risk management
- Security architecture and system hardening
- Incident response and threat hunting
- Security automation and tooling development

Responsibilities:
- Design and implement security controls for mission-critical systems
- Conduct security assessments and vulnerability management
- Develop and maintain security documentation under NIST RMF
- Collaborate with cross-functional teams on security initiatives
- Monitor and respond to security events and incidents

Background:
Transitioning from 6 years of summer internship experience to full-time cybersecurity engineering role, bringing expertise in NIST RMF, STIG compliance validation, and defensive security operations.`,
    publishedAt: '2026-01-01',
  },
  {
    id: '6',
    title: 'Silknode',
    slug: 'silknode-appsec-lead',
    category: 'work',
    logo: '/images/silknode.png',
    description: 'Leading application security testing and vulnerability research for 15,000+ user platform',
    technologies: ['Burp Suite', 'Chrome DevTools', 'Bash Scripting', 'cURL', 'API Security', 'Security Automation'],
    featured: true,
    dateRange: '2025-Present',
    content: `Position: Application Security Lead Analyst
Duration: Aug 2025 - Present
Impact: 15,000+ users affected by security findings

Responsibilities:
- Conducted comprehensive security testing using Burp Suite, identifying critical vulnerabilities across web applications and APIs
- Performed API enumeration and security assessments, discovering authentication bypasses and data exposure issues
- Identified and documented DoS attack vectors and resource exhaustion vulnerabilities
- Developed automated security testing scripts to streamline vulnerability discovery
- Collaborated with development team on remediation strategies and secure coding practices

Key Achievements:
- Discovered vulnerabilities affecting 15,000+ users
- Automated security testing workflows reducing assessment time by 60%
- Established security testing framework for continuous vulnerability assessment`,
    publishedAt: '2025-08-01',
  },
  {
    id: '7',
    title: 'Cybersecurity/Software Engineer - Lockheed Martin',
    slug: 'lockheed-martin-intern',
    category: 'internship',
    logo: '/images/Lockheed-Martin-Logo.jpg',
    description: 'Multi-summer cybersecurity internship focusing on NIST RMF, STIG validation, and threat modeling',
    technologies: ['NIST RMF', 'DISA STIG', 'Python', 'Nessus Tenable', 'OWASP ZAP', 'MITRE ATT&CK'],
    featured: true,
    dateRange: '2020-2025',
    content: `Position: Software/Cyber Engineering Intern
Duration: June 2020 - 2025 (Summer Internship)
Clearance: Security+

Responsibilities:
- Developed and maintained 3-5 System Security Plans (SSPs) under NIST Risk Management Framework
- Validated 300+ DISA STIG findings for Linux and Windows systems
- Created Python-based cyber resilience scripts mapping 150+ MITRE ATT&CK techniques
- Conducted vulnerability assessments generating 500+ findings using Nessus and OWASP ZAP
- Participated in red team exercises and threat modeling workshops

Key Achievements:
- Maintained 100% compliance on SSP audits
- Automated STIG validation reducing review time by 40%
- Developed reusable threat modeling framework adopted by team`,
    publishedAt: '2020-06-01',
  },

  // SECTION 004 - VULNERABILITIES & FINDINGS
  {
    id: '8',
    title: 'Title Boxing Club: Unencrypted Data Exposure',
    slug: 'title-boxing-unencrypted-data',
    category: 'vulnerability',
    logo: '/images/title-boxing-club_logo.png',
    severity: 'high',
    cvss: 7.5,
    description: 'Discovered unencrypted transmission of sensitive user data including payment information',
    technologies: ['Burp Suite', 'TLS Analysis', 'Network Security'],
    featured: true,
    content: `Vulnerability Type: Unencrypted Data Transmission
Severity: High (CVSS 7.5)
Tools Used: Burp Suite Pro, Browser DevTools

Discovery:
Using Burp Suite to intercept and analyze network traffic, identified that Title Boxing Club's mobile application and web portal were transmitting sensitive user data without encryption.

Affected Data:
- User authentication credentials
- Payment card information (last 4 digits, card type)
- Membership details and personal information
- Session tokens and API keys

Technical Details:
- HTTP traffic instead of HTTPS for sensitive endpoints
- Weak TLS configuration on payment processing endpoints
- Session tokens transmitted in cleartext URL parameters
- API responses containing PII without encryption

Impact:
- Man-in-the-middle attack vulnerability
- Credential theft risk on public WiFi networks
- Payment data exposure to network eavesdroppers

Disclosure:
Reported to Title Boxing Club security team following responsible disclosure practices. Status: Under review.`,
    publishedAt: '2025-10-01',
  },
  {
    id: '9',
    title: 'Cameo: $18M Paywall Bypass Vulnerability',
    slug: 'cameo-paywall-bypass',
    category: 'vulnerability',
    logo: '/images/Cameo-Logo.png',
    severity: 'critical',
    cvss: 9.1,
    description: 'Critical business logic flaw allowing complete bypass of payment system on $18M revenue platform',
    technologies: ['Burp Suite', 'API Security', 'Business Logic'],
    featured: true,
    content: `Vulnerability Type: Business Logic Flaw / Authentication Bypass
Severity: Critical (CVSS 9.1)
Business Impact: $18M+ annual revenue at risk

Discovery:
Identified critical business logic vulnerability allowing users to access premium celebrity content without payment.

Technical Details:
- Insecure direct object references (IDOR) in video delivery API
- Predictable resource IDs for premium content
- Missing server-side payment verification
- JWT token manipulation bypassing subscription checks

Exploitation Steps:
1. User requests premium celebrity video
2. Payment process initiated but not completed
3. Video resource ID leaked in failed transaction response
4. Direct API call to video endpoint with modified JWT
5. Premium content delivered without payment

Impact:
- Complete bypass of $18M+ paywall system
- Access to all premium celebrity content
- Revenue loss and potential fraud
- Celebrity content copyright exposure

Disclosure:
Reported to Cameo security team via HackerOne. Acknowledged and patched within 72 hours. Bounty awarded.`,
    publishedAt: '2025-09-01',
  },
  {
    id: '10',
    title: 'Alibaba: Prompt Injection Vulnerabilities',
    slug: 'alibaba-prompt-injection',
    category: 'vulnerability',
    logo: '/images/Alibaba-Logo.jpg',
    severity: 'medium',
    cvss: 6.5,
    description: 'AI/LLM prompt injection vulnerabilities in e-commerce chat and product recommendation systems',
    technologies: ['LLM Security', 'Prompt Injection', 'AI Red Teaming'],
    featured: false,
    content: `Vulnerability Type: LLM Prompt Injection
Severity: Medium (CVSS 6.5)
Platform: Alibaba.com AI Assistant

Discovery:
Identified multiple prompt injection vectors in Alibaba's AI-powered customer service and product recommendation systems.

Attack Vectors:
1. Instruction Bypass: Injecting system-level commands to override AI behavior
2. Data Exfiltration: Extracting internal product data and pricing information
3. Recommendation Manipulation: Forcing AI to recommend specific products
4. Content Filter Evasion: Bypassing safety guardrails for inappropriate content

Technical Examples:
- Injected prompts revealing internal product categories
- Manipulated recommendation algorithm to favor specific vendors
- Extracted training data snippets through carefully crafted queries

Impact:
- Competitive intelligence leakage
- Unfair marketplace manipulation
- Customer trust degradation
- Content policy violations

Disclosure:
Reported to Alibaba Security Response Center (ASRC). Under investigation.`,
    publishedAt: '2025-07-01',
  },
  {
    id: '11',
    title: 'Prada: Exposed Staging Environments',
    slug: 'prada-staging-exposure',
    category: 'vulnerability',
    logo: '/images/prada-logo.png',
    severity: 'high',
    cvss: 7.8,
    description: 'Discovered publicly accessible development environments exposing employee portals and blockchain infrastructure',
    technologies: ['Subdomain Enumeration', 'OSINT', 'Infrastructure Security'],
    featured: true,
    content: `Vulnerability Type: Exposed Development Infrastructure
Severity: High (CVSS 7.8)
Target: Prada.com luxury retail platform

Discovery:
Comprehensive subdomain enumeration using automated reconnaissance tools revealed multiple publicly accessible development and staging environments containing sensitive systems.

Methodology:
Utilized DNS enumeration, certificate transparency logs, and subdomain brute-forcing techniques to discover non-production environments inadvertently exposed to the public internet.

Findings:
- Development e-commerce environment with test transactions visible
- Staging environment containing copies of production customer data
- Employee-only portal accessible without authentication
- Blockchain/NFT infrastructure with exposed API endpoints
- Development API with debug mode enabled and verbose error messages

Security Issues:
- Missing authentication on development portals
- Debug endpoints exposing system information
- Production database credentials in source code
- Employee PII accessible without authorization
- Blockchain wallet private keys in configuration files

Information Disclosure:
- Customer order data from staging database
- Employee discount codes and inventory information
- API documentation revealing internal architecture
- Source code comments with deployment credentials

Missing Security Headers:
- No Content-Security-Policy (CSP)
- Missing X-Frame-Options (clickjacking risk)
- Permissive CORS allowing any origin

Impact:
- Customer data breach risk
- Employee credential theft
- Intellectual property exposure
- Brand reputation damage

Disclosure:
Reported to Prada IT Security via email. Acknowledged. Remediation in progress.`,
    publishedAt: '2025-05-01',
  },
  {
    id: '12',
    title: 'Strava: Missing Security Headers Assessment',
    slug: 'strava-security-headers',
    category: 'vulnerability',
    logo: '/images/strava-logo.png',
    severity: 'medium',
    cvss: 5.3,
    description: 'Comprehensive security assessment revealing missing HTTP security headers across fitness platform',
    technologies: ['Security Headers', 'Web Security', 'OWASP'],
    featured: false,
    content: `Vulnerability Type: Missing Security Headers
Severity: Medium (CVSS 5.3)
Platform: Strava.com fitness tracking platform

Discovery:
Conducted comprehensive security header analysis on Strava's web application and API endpoints revealing critical security header omissions.

Missing Headers:

1. HTTP Strict-Transport-Security (HSTS)
   - Risk: SSL stripping attacks
   - Impact: User credentials exposed on downgrade attacks

2. Content-Security-Policy (CSP)
   - Risk: Cross-Site Scripting (XSS) attacks
   - Impact: Malicious script injection

3. X-Frame-Options
   - Risk: Clickjacking attacks
   - Impact: UI redressing and credential theft

4. X-Content-Type-Options
   - Risk: MIME confusion attacks
   - Impact: Malicious content execution

5. Referrer-Policy
   - Risk: Information leakage through referer header
   - Impact: Sensitive URL parameters exposed

Testing Methodology:
- Authenticated testing with test account
- Public endpoint analysis
- API security header evaluation
- Browser security header inspection

Positive Findings:
- IDOR protection properly implemented (tested and verified)
- XSS protection active on user input fields
- API endpoints have better header configuration than public pages

Attack Scenarios:
1. SSL Stripping: Attacker downgrades HTTPS to HTTP on public WiFi
2. Clickjacking: Malicious iframe embedding Strava login
3. XSS Injection: Malicious scripts in activity descriptions

Impact:
- User session hijacking risk
- Credential theft on public networks
- Privacy concerns for athlete data

Disclosure:
Reported to Strava security team. Acknowledged with thanks. Headers partially implemented on API endpoints.`,
    publishedAt: '2025-03-01',
  },
  {
    id: '15',
    title: 'Supreme: Information Disclosure & Missing Security Headers',
    slug: 'supreme-info-disclosure',
    category: 'vulnerability',
    logo: '/images/supremelogo.png',
    severity: 'medium',
    cvss: 5.5,
    description: 'Passive reconnaissance revealing technology stack exposure and missing Content-Security-Policy enabling XSS attacks',
    technologies: ['Passive Recon', 'HTTP Headers', 'OSINT', 'Subdomain Enumeration'],
    featured: false,
    content: `Vulnerability Type: Information Disclosure + Missing Security Headers
Severity: Medium (CVSS 5.5)
Target: Supreme.com streetwear e-commerce platform

Discovery:
Passive reconnaissance assessment identified multiple information disclosure vectors and missing defensive security headers on Supreme's Next.js-based e-commerce platform.

Finding 1: Technology Stack Information Disclosure

Exposed Headers:
\`\`\`
X-Powered-By: Next.js
Server: cloudflare
X-Vercel-Cache: HIT
X-Vercel-Id: iad1::iad1::fjvxw-1777398622977-104bf62ee7e1
\`\`\`

Impact:
- Framework identification enables targeted reconnaissance
- Vercel deployment metadata leaks infrastructure details
- Attackers can focus on Next.js-specific vulnerabilities
- Regional deployment information revealed (iad1 = Virginia datacenter)

Finding 2: Missing Content-Security-Policy

Security Assessment:
- No CSP header present
- No X-Frame-Options (clickjacking risk)
- No Referrer-Policy (information leakage)
- HSTS implemented (max-age=31536000)

Impact:
- No defense-in-depth against XSS attacks
- Malicious scripts can execute without CSP restrictions
- No protection against clickjacking attacks
- Limited ability to restrict resource loading

Finding 3: Subdomain Enumeration

Discovered Subdomains (19 total):
- Regional sites: cn.supreme.com, hk.supreme.com, jp.supreme.com, kr.supreme.com, eu.supreme.com, uk.supreme.com, us.supreme.com
- Account portals: account.eu.supreme.com, account.jp.supreme.com, account.uk.supreme.com, account.us.supreme.com
- WeChat integration: wechat.supreme.com
- Payment infrastructure: secure.supreme.com
- Product management: pdm.supreme.com

Attack Surface:
- 19 publicly enumerable subdomains via certificate transparency
- Multiple regional authentication portals (phishing target)
- WeChat integration endpoint (China market attack vector)
- Expanded attack surface for credential harvesting

Finding 4: Third-Party Tracking

Identified Trackers:
- Google Analytics GA4: G-YXLMT5H68B
- Data transmission to www.google-analytics.com/g/collect
- GDPR/CCPA compliance considerations

Technical Details:

Technology Stack:
- Frontend Framework: Next.js (React-based)
- Hosting: Vercel (edge functions + CDN)
- CDN: Cloudflare (DDoS protection layer)
- Analytics: Google Analytics GA4

CVE Research:
Analyzed disclosed framework version against known vulnerabilities:
- CVE-2025-55182 (Critical RCE) - Requires specific Next.js version (not confirmed)
- CVE-2025-29927 (Middleware bypass) - Mitigated by Vercel edge firewall
- No exploitable CVE identified without version confirmation

Remediation:

Immediate Actions:
1. Remove X-Powered-By header (obscurity, minimal security impact)
2. Suppress Vercel debugging headers in production
3. Implement Content-Security-Policy with nonces/hashes
4. Add X-Frame-Options: DENY or SAMEORIGIN
5. Implement Referrer-Policy: strict-origin-when-cross-origin

Long-Term Improvements:
1. Subdomain inventory and decommissioning audit
2. Regional portal consolidation to reduce attack surface
3. Web Application Firewall (WAF) rules for known attack patterns
4. Security header monitoring and enforcement

Disclosure:
Findings documented as part of luxury retail security assessment. Passive reconnaissance only - no active exploitation attempted.`,
    publishedAt: '2026-04-28',
  },
  {
    id: '16',
    title: 'Off-White: Missing CSP & AWS Infrastructure Exposure',
    slug: 'off-white-security-assessment',
    category: 'vulnerability',
    logo: '/images/Off-White-Symbol.png',
    severity: 'medium',
    cvss: 5.3,
    description: 'Security assessment revealing missing Content-Security-Policy and extensive AWS/Salesforce infrastructure fingerprinting',
    technologies: ['Passive Recon', 'HTTP Headers', 'AWS Security', 'Tech Stack Analysis'],
    featured: false,
    content: `Vulnerability Type: Missing Security Headers + Infrastructure Exposure
Severity: Medium (CVSS 5.3)
Target: Off-White.com luxury fashion e-commerce platform

Discovery:
Passive security assessment of Off-White's e-commerce platform revealing missing defensive headers and extensive cloud infrastructure exposure through HTTP response analysis.

Finding 1: Missing Content-Security-Policy

Security Header Assessment:
- No Content-Security-Policy implemented
- HSTS present (max-age=15552000)
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

Impact:
- No defense-in-depth against XSS attacks
- Malicious scripts can execute without CSP restrictions
- Inline script injection possible
- No resource loading restrictions

CSP Missing Protections:
- No script-src directive (any script can load)
- No connect-src restrictions (API exfiltration risk)
- No frame-ancestors control beyond X-Frame-Options
- No upgrade-insecure-requests enforcement

Finding 2: AWS Infrastructure Exposure

Identified Cloud Architecture:
\`\`\`
X-Amz-Cf-Pop: IAD89-P2
X-Amz-Cf-Id: [redacted]
X-Amz-Request-Id: [request identifiers]
\`\`\`

Revealed Infrastructure:
- CDN: AWS CloudFront (fronted by Cloudflare)
- Region: IAD (US East - Virginia)
- API Gateway: AWS API Gateway detected
- Distribution: Multi-region CloudFront distribution

Impact:
- AWS architecture enumeration aids targeted attacks
- CloudFront distribution configuration can be analyzed
- Regional deployment information assists in compliance mapping
- Dual CDN setup (Cloudflare → CloudFront) reveals architecture complexity

Finding 3: Salesforce Commerce Cloud PWA Detection

Technology Fingerprinting:
\`\`\`
X-Mobify-Request-Class: SPLASH-US-DEF
\`\`\`

Revealed Technology:
- Platform: Salesforce Commerce Cloud (Demandware)
- PWA Framework: Mobify (Salesforce PWA Kit)
- Request Classification: SPLASH-US-DEF (US default splash configuration)

Attack Surface:
- Known Salesforce Commerce Cloud vulnerabilities can be targeted
- Mobify PWA specific security issues may apply
- Request classification header reveals routing logic
- Platform-specific reconnaissance enabled

Finding 4: Certificate Transparency Parsing Limitation

Subdomain Enumeration:
- Certificate transparency log parsing failed
- Possible certificate pinning or minimal SAN entries
- Subdomain attack surface unknown (could be extensive)
- Requires alternative enumeration methods for complete assessment

Attack Scenarios:

1. XSS Without CSP:
- Malicious script injection in user-generated content
- Reflected XSS in search parameters
- DOM-based XSS without CSP protection
- Third-party script compromise (supply chain attack)

2. Infrastructure-Targeted Attacks:
- CloudFront misconfigurations (S3 bucket exposure)
- AWS API Gateway enumeration
- Salesforce Commerce Cloud specific exploits
- Mobify PWA security issues

3. Regional Exploitation:
- Target IAD region specifically
- CloudFront cache poisoning attempts
- Region-specific compliance violations

Technical Details:

Technology Stack:
- Platform: Salesforce Commerce Cloud
- PWA: Mobify/Salesforce PWA Kit
- Cloud: AWS (API Gateway, CloudFront)
- CDN: Cloudflare (primary) + CloudFront (origin)
- Region: US East (Virginia)

Security Posture:
- Strong foundation (HSTS, X-Frame-Options, nosniff, referrer policy)
- Missing CSP (critical XSS defense gap)
- Extensive infrastructure fingerprinting possible
- Dual CDN architecture adds complexity

Remediation:

Immediate Actions (Week 1):
1. Implement Content-Security-Policy in report-only mode
2. Analyze CSP violation reports for 2 weeks
3. Remove or obfuscate X-Mobify-Request-Class header
4. Suppress AWS-specific headers (X-Amz-Cf-Pop, X-Amz-Cf-Id)

Short-Term (Month 1):
1. Deploy CSP in enforcement mode with strict directives
2. Implement header obfuscation at Cloudflare layer
3. Review CloudFront distribution security configuration
4. Audit Salesforce Commerce Cloud security settings

Long-Term:
1. Subdomain enumeration using alternative methods
2. Complete attack surface mapping
3. Third-party security review of Mobify PWA implementation
4. AWS infrastructure hardening audit

Disclosure:
Findings documented as part of luxury retail security assessment. Passive reconnaissance only - no authorization testing performed.`,
    publishedAt: '2026-04-28',
  },
  {
    id: '17',
    title: 'Gucci: Internal Subdomain Exposure & Infrastructure Enumeration',
    slug: 'gucci-subdomain-exposure',
    category: 'vulnerability',
    logo: '/images/Gucci-Logo.png',
    severity: 'high',
    cvss: 7.2,
    description: 'Critical subdomain enumeration revealing internal infrastructure, employee portals, and extensive authentication system exposure',
    technologies: ['Subdomain Enumeration', 'OSINT', 'Certificate Transparency', 'Infrastructure Security'],
    featured: true,
    content: `Vulnerability Type: Exposed Internal Infrastructure + Extensive Subdomain Enumeration
Severity: High (CVSS 7.2)
Target: Gucci.com luxury fashion e-commerce platform

Discovery:
Passive subdomain enumeration via certificate transparency logs revealed 50+ publicly discoverable subdomains including internal infrastructure, employee portals, and testing environments representing significant attack surface expansion.

Finding 1: Internal Subdomain Exposure (CRITICAL)

Exposed Internal Infrastructure:
Subdomain enumeration revealed internal corporate infrastructure and executive portal endpoints publicly accessible via DNS.

Impact:
- Internal infrastructure hostname publicly discoverable
- Corporate network entry point enumeration
- Executive portal discovery enables targeted phishing
- Subdomain takeover risk if DNS records misconfigured
- Information disclosure about organizational structure

Attack Vectors:
1. Targeted Phishing: Craft emails referencing legitimate internal URLs for social engineering
2. Subdomain Takeover: If DNS points to decommissioned cloud resources
3. Social Engineering: Use discovered internal URLs for credibility in attacks
4. Credential Harvesting: Target executive portals for high-value credentials

Finding 2: Employee Infrastructure Exposure

Discovered Employee Portals:
Subdomain enumeration revealed multiple employee-facing portals including discount store infrastructure, associated API endpoints, and HR/recruiting platforms.

Impact:
- Employee portal enumeration enables targeted attacks
- API endpoints exposed for reconnaissance
- Phishing campaigns can reference legitimate employee URLs
- Internal discount system exposed to reconnaissance
- HR/recruiting platform discoverable

Attack Scenarios:
1. Phishing emails referencing legitimate employee URLs for credibility
2. API enumeration for authentication bypass vulnerabilities
3. Credential harvesting targeting employee discount portals
4. Social engineering using careers platform information

Finding 3: Testing & Development Environment Exposure

Discovered Non-Production Environments:
Beta testing environment and development infrastructure publicly accessible via DNS.

Concerns:
- Development environments often have weaker security
- May contain debug endpoints or verbose error messages
- Testing data might include production-like PII
- Beta environments may lack security hardening

Finding 4: Authentication Infrastructure Enumeration

Discovered Identity/Auth Infrastructure:
Multiple authentication-related subdomains discovered including identity management platform, authentication portals, and SSO/authentication service endpoints.

Impact:
- Complete authentication architecture enumerable
- SSO infrastructure discoverable
- Identity management platform exposed
- Multiple authentication endpoints increase attack surface
- Enables targeted credential stuffing campaigns

Attack Scenarios:
1. Credential stuffing against authentication portals
2. SSO bypass attempts on authentication services
3. Identity platform reconnaissance for vulnerabilities
4. Password reset flow manipulation across multiple portals

Finding 5: API & Media Infrastructure

Discovered Technical Infrastructure:
Multiple technical subdomains discovered including primary API gateway, geolocation/mapping services, product catalog system, and media asset delivery infrastructure.

Technical Details:
- API gateway architecture revealed
- Geolocation services exposed
- Product catalog system discoverable
- Media delivery infrastructure enumerated

Impact:
- API endpoint discovery enables targeted reconnaissance
- Catalog system may expose inventory data
- Media CDN configuration can be analyzed
- Geolocation API could have authorization flaws

Finding 6: Missing Security Header Assessment

Assessment Status:
- Unable to retrieve HTTP headers (connection timeout/blocking)
- HSTS status unknown
- CSP implementation unknown
- X-Frame-Options unknown
- Other security headers unverified

Recommendation:
Manual security header review required to assess defensive posture.

Complete Subdomain Inventory (50+ discovered):

Critical Risk (4 subdomains):
- Internal corporate infrastructure
- Executive/board portal
- Employee discount store portal
- Employee store API endpoint

High Risk (4+ subdomains):
- Beta testing environment
- Identity management platform
- Authentication portals (multiple)
- SSO/authentication services

Medium Risk (10+ subdomains):
- Primary API gateway
- Geolocation/mapping APIs
- Product catalog system
- Media delivery CDN
- HR/recruiting platform

Low Risk (30+ subdomains):
- Marketing campaign sites
- Various regional/language subdomains

Certificate Information:

TLS Certificate Details:
- Issuer: Let's Encrypt (R12)
- Certificate Validity: April 16, 2026 - July 15, 2026
- SAN Entries: 21+ subdomains in certificate
- Automated Renewal: Required (90-day validity)

Impact:
- Short validity period requires automation (good practice)
- Certificate transparency logs expose full subdomain list
- SAN entries provide attacker roadmap

Attack Surface Summary:

Total Discovered: 50+ subdomains
Critical Risk: 4 subdomains (internal infrastructure, executive portals, employee systems)
High Risk: 4+ subdomains (authentication infrastructure, dev environments)
Medium Risk: 10+ subdomains (APIs, media delivery, technical infrastructure)
Low Risk: 30+ subdomains (marketing campaigns, regional sites)

Remediation Priority Matrix:

Immediate (Week 1):
1. Audit internal infrastructure and executive portal accessibility
2. Implement IP allowlisting for employee portals
3. Verify beta/development environments are properly secured or decommissioned
4. Review authentication subdomain attack surface

Short-Term (Month 1):
1. Subdomain inventory and access control audit
2. Decommission unused subdomains
3. Implement subdomain monitoring and alerting
4. Deploy MFA on all employee-facing portals
5. Security header assessment and implementation

Long-Term (Quarter 1):
1. Certificate SAN minimization strategy
2. Subdomain naming convention security review
3. Zero Trust architecture for internal services
4. Employee security awareness training (phishing with internal URLs)
5. Bug bounty program inclusion of subdomain enumeration

Disclosure:
Findings documented as part of luxury retail security assessment. Passive reconnaissance via certificate transparency only - no active exploitation or unauthorized access attempted.`,
    publishedAt: '2026-04-28',
  },

  // SECTION 005 - RESEARCH / WRITEUPS
  {
    id: '13',
    title: 'SigmaHQ: NetExec Credential Dumping Detection Rule',
    slug: 'sigmahq-netexec-detection',
    category: 'finding',
    description: 'Developed Sigma detection rule targeting NetExec credential dumping modules for Gentlemen ransomware detection',
    technologies: ['Sigma', 'Threat Detection', 'SIEM', 'MITRE ATT&CK'],
    featured: true,
    content: `Project: Sigma Detection Rule for NetExec Credential Dumping
Context: Gentlemen Ransomware Campaign Detection
Status: Published to SigmaHQ repository

Background:
Developed a Sigma detection rule targeting NetExec (formerly CrackMapExec) credential dumping modules specifically observed in Gentlemen ransomware campaigns. This rule enables SIEM platforms to detect early-stage reconnaissance and credential harvesting activities.

Detection Rule Capabilities:
- Identifies NetExec LSA secrets dumping (--lsa)
- Detects SAM database extraction (--sam)
- Monitors NTDS.dit Active Directory database dumping (--ntds)
- Catches DPAPI credential dumping operations (--dpapi)

MITRE ATT&CK Mapping:
- T1003.001 - OS Credential Dumping: LSASS Memory
- T1003.002 - OS Credential Dumping: Security Account Manager
- T1003.003 - OS Credential Dumping: NTDS
- T1555.003 - Credentials from Password Stores: DPAPI

Technical Implementation:
The Sigma rule detects command-line execution patterns associated with NetExec credential dumping modules. It monitors process creation events looking for characteristic flags and module names used by threat actors during the credential harvesting phase.

Detection Logic:
\`\`\`yaml
title: NetExec Credential Dumping Modules
status: experimental
description: Detects NetExec credential dumping modules
logsource:
  category: process_creation
  product: windows
detection:
  selection:
    CommandLine|contains:
      - '--lsa'
      - '--sam'
      - '--ntds'
      - '--dpapi'
\`\`\`

Real-World Application:
This rule has been deployed in enterprise SIEM environments to detect early indicators of Gentlemen ransomware campaigns, providing SOC teams with actionable alerts during the reconnaissance phase before encryption occurs.

Impact:
- Early detection of ransomware campaigns
- Reduced dwell time for threat actors
- Enabled proactive incident response`,
    publishedAt: '2026-11-01',
  },
  {
    id: '14',
    title: 'AI Model Vulnerability Convergence',
    slug: 'ai-model-convergence-analysis',
    category: 'finding',
    description: 'Comparative research analyzing architectural patterns, security vulnerabilities, and code quality across 4 frontier AI models',
    technologies: ['AI Research', 'Code Analysis', 'Security Research', 'Flask', 'Python'],
    featured: true,
    content: `Research: AI Model Convergence Analysis
Date: May 2026
Models Analyzed: ChatGPT, Claude, DeepSeek, Gemini (N=4)
Report Size: 3,705 lines, 146KB, 400+ data points

Research Question:
What architectural patterns, security mechanisms, and vulnerabilities consistently emerge when multiple frontier LLMs are given implementation freedom within a specified framework?

Methodology:
Tasked 4 AI models with building identical Flask marketplace applications with 20 specified features. Analyzed code generated where models had implementation freedom to identify convergent patterns, vulnerabilities, and anti-patterns.

---

## Critical Findings

### 1. Universal IDOR Vulnerability (100% of models)

Most Significant Discovery:
All 4 models implemented role-based access control (RBAC) as requested but systematically failed to implement object-level authorization, resulting in Insecure Direct Object Reference (IDOR) vulnerabilities.

Pattern:
- ✓ Authentication checks present (\`@login_required\`)
- ✓ Role checks present (admin/customer)
- ✗ Ownership checks missing (does user own this resource?)

Example Vulnerable Code:
\`\`\`python
@app.route('/order/<int:order_id>')
@login_required  # Authentication ✓
def view_order(order_id):
    order = Order.query.get(order_id)
    # Missing: if order.user_id != current_user.id
    return render_template('order.html', order=order)
\`\`\`

Impact: Any logged-in user can access any order by manipulating the order_id parameter.

Interpretation: LLMs implement security syntactically (decorators present) but miss semantic depth (granular authorization). This represents a systematic gap in LLM security understanding, not random error.

---

### 2. Flask Ecosystem Library Convergence (100% consensus)

When prompt specified outcomes but not implementation details, all models converged on identical libraries:

Universal Choices:
- SQLAlchemy ORM (prompt only said "SQLite")
- Flask-WTF for forms (prompt only said "input validation")
- Flask-Limiter for rate limiting
- Werkzeug password hashing
- CSRFProtect (never mentioned in prompt - added as safety default)

Interpretation: Strong convergence on Flask ecosystem "best practices" when given implementation freedom. Suggests training data heavily weighted toward these libraries.

---

### 3. Five Universal Anti-Patterns (100% of models)

All 4 models exhibited identical code quality issues:

1. No Service Layer - Business logic embedded in route handlers
2. Magic Numbers - Hardcoded values (bcrypt rounds, file sizes, status codes)
3. No DTOs - ORM models exposed directly to templates
4. Repeated Error Handling - Try-except blocks duplicated across routes
5. Inconsistent Naming - Audit log actions vary (snake_case, UPPER_CASE, camelCase)

Interpretation: Training data bias toward Flask tutorial code (route-centric) rather than production patterns (service layers, DTOs).

---

### 4. Testing-Security Correlation

Observed Pattern:
- Claude: 27 tests → Security score 9/10
- DeepSeek: 40+ tests → Security score 8/10
- ChatGPT: 1 test file → Security score 6/10
- Gemini: 0 tests → Security score 3/10

Finding: More comprehensive testing correlates with fewer total vulnerabilities (though IDOR persists in all).

Caveat: Causation unclear - higher-quality models may independently produce both better tests AND more secure code.

---

### 5. Architectural Divergence (50/50 split)

Despite framework convergence, no consensus on architecture:

Monolithic (ChatGPT, Gemini):
- Single app.py or routes.py
- Lower file count (9-43 files)
- Minimal testing

Modular (Claude, DeepSeek):
- Blueprint-based organization
- Higher file count (42-51 files)
- Comprehensive test suites

Interpretation: Specification ambiguity allowed divergence in project structure despite functional equivalence.

---

## Consensus Metrics Summary

| Category | Universal (1.00) | High (≥0.75) | Moderate (0.50) |
|----------|------------------|--------------|-----------------|
| Framework Libraries | 5 choices | 2 choices | - |
| Security Mechanisms | 11/17 | 3/17 | - |
| Vulnerabilities | IDOR (1) | - | 5 patterns |
| Anti-Patterns | 5/14 | 3/14 | 2/14 |

AI Software Genome - Convergence Coefficient: 64%
16 of 25 analyzed tokens achieved complete consensus across all models.

---

## Research Hypotheses

H1: Core Security Mechanism Convergence
LLMs converge on foundational security (password hashing, CSRF, RBAC) but diverge on advanced security (headers, HTTPS enforcement).

H2: Route-Centric Architecture Dominance
LLMs universally generate route-centric architectures (business logic in handlers) vs service-oriented architectures.

H3: IDOR Universality
IDOR appears universally despite universal RBAC implementation, suggesting systematic gap in LLM authorization understanding.

H4: Universal Anti-Pattern Persistence
Five anti-patterns persist across all models regardless of capability, suggesting training data bias.

H5: Testing Implementation Gradient
Testing coverage inversely correlates with vulnerability count.

---

## Implications

### For AI Code Generation:
1. Security mechanisms present ≠ secure implementation
2. Explicit security prompts required for object-level authorization
3. Architectural patterns may need explicit specification

### For Code Review:
When reviewing LLM-generated code, systematically check for:
1. IDOR vulnerabilities (assume present until verified absent)
2. The 5 universal anti-patterns (no service layer, magic values, no DTOs, repeated error handling, inconsistent naming)
3. Missing security tests (add IDOR, CSRF, concurrency tests)

### Secure IDOR Fix Example:
\`\`\`python
@login_required
def view_order(order_id):
    order = Order.query.get(order_id)
    # Add ownership check:
    if order.user_id != current_user.id and not current_user.is_admin:
        abort(403)
    return render_template('order.html', order=order)
\`\`\`

---

## Limitations

- Sample size: N=4 models (exploratory, not statistically significant)
- Single task: Flask marketplace only
- Static analysis: Runtime confirmation needed for some findings
- No human baseline: Cannot compare LLM vs human developer convergence
- Temporal snapshot: Models evolve rapidly

---

## Future Research Directions

1. Increase sample size (N=10+ models)
2. Test across multiple domains (mobile apps, data pipelines, microservices)
3. Implement human developer baseline comparison
4. Evaluate impact of explicit architecture prompts
5. Longitudinal study tracking model evolution over time

---

Publication Status: Complete analysis (3,705 lines)
Data Points: 400+ measurements across 4 AI models
Methodology: Parallel agent analysis with consensus ratio calculation
Key Discovery: 100% IDOR vulnerability rate despite 100% RBAC implementation reveals systematic semantic gap in LLM security understanding`,
    publishedAt: '2026-05-10',
  },
]

// Helper functions to filter by category
export const getProjectItems = () => portfolioItems.filter(item => item.category === 'project')
export const getWorkItems = () => portfolioItems.filter(item => item.category === 'work')
export const getInternshipItems = () => portfolioItems.filter(item => item.category === 'internship')
export const getVulnerabilityItems = () => portfolioItems.filter(item => item.category === 'vulnerability')
export const getFindingItems = () => portfolioItems.filter(item => item.category === 'finding')
export const getFeaturedItems = () => portfolioItems.filter(item => item.featured)
