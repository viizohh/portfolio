import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const client = createClient({
  projectId: 'zjdwzsdp',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

// Helper to upload image from file
async function uploadImage(imagePath: string) {
  const imageBuffer = readFileSync(resolve(process.cwd(), imagePath))
  const asset = await client.assets.upload('image', imageBuffer, {
    filename: imagePath.split('/').pop(),
  })
  return asset._id
}

// Portfolio entries data
const portfolioData = [
  // 001 - PROJECTS
  {
    title: 'AI Recon Docker',
    slug: 'ai-recon-docker',
    category: 'project',
    description: 'AI-powered reconnaissance Docker container for automated security testing',
    technologies: ['Docker', 'Python', 'AI/ML', 'Security Testing'],
    featured: true,
  },
  {
    title: 'Nikto+',
    slug: 'nikto-plus',
    category: 'project',
    description: 'Enhanced web server scanner with extended vulnerability detection',
    technologies: ['Perl', 'Web Security', 'Vulnerability Scanning'],
    featured: false,
  },
  {
    title: 'CookieTracker',
    slug: 'cookie-tracker',
    category: 'project',
    description: 'Browser extension for tracking and analyzing third-party cookies',
    technologies: ['JavaScript', 'Browser Extensions', 'Privacy'],
    featured: false,
  },
  {
    title: 'Syntax Programming Language',
    slug: 'syntax-language',
    category: 'project',
    description: 'Custom programming language implementation with compiler',
    technologies: ['Python', 'Compiler Design', 'Language Theory'],
    featured: false,
  },
  {
    title: 'Capital One Document Validation',
    slug: 'capital-one-doc-validation',
    category: 'project',
    description: 'Automated document validation system for financial processing',
    technologies: ['Python', 'OCR', 'Document Processing'],
    featured: false,
  },

  // 002 & 003 - WORK EXPERIENCE
  {
    title: 'Application Security Lead Analyst — Silknode',
    slug: 'silknode-appsec-lead',
    category: 'work',
    logo: 'public/images/silknode.png',
    description: 'Leading application security testing and vulnerability research for 15,000+ user platform',
    technologies: ['Burp Suite', 'API Security', 'OWASP', 'Security Automation'],
    content: `**Position:** Application Security Lead Analyst
**Duration:** August 2025 – Present
**Impact:** 15,000+ users affected by security findings

**Responsibilities:**
- Conducted comprehensive security testing using Burp Suite, identifying critical vulnerabilities across web applications and APIs
- Performed API enumeration and security assessments, discovering authentication bypasses and data exposure issues
- Identified and documented DoS attack vectors and resource exhaustion vulnerabilities
- Developed automated security testing scripts to streamline vulnerability discovery
- Collaborated with development team on remediation strategies and secure coding practices

**Key Achievements:**
- Discovered vulnerabilities affecting 15,000+ users
- Automated security testing workflows reducing assessment time by 60%
- Established security testing framework for continuous vulnerability assessment`,
    featured: true,
  },
  {
    title: 'Software & Cyber Engineering Intern — Lockheed Martin',
    slug: 'lockheed-martin-intern',
    category: 'work',
    logo: 'public/images/Lockheed-Martin-Logo.jpg',
    description: 'Multi-summer cybersecurity internship focusing on NIST RMF, STIG validation, and threat modeling',
    technologies: ['NIST RMF', 'DISA STIG', 'Python', 'Nessus', 'OWASP ZAP', 'MITRE ATT&CK'],
    content: `**Position:** Software/Cyber Engineering Intern
**Duration:** Summers 2020-2025 (6 consecutive summers)
**Clearance:** Security+

**Responsibilities:**
- Developed and maintained 3-5 System Security Plans (SSPs) under NIST Risk Management Framework
- Validated 300+ DISA STIG findings for Linux and Windows systems
- Created Python-based cyber resilience scripts mapping 150+ MITRE ATT&CK techniques
- Conducted vulnerability assessments generating 500+ findings using Nessus and OWASP ZAP
- Participated in red team exercises and threat modeling workshops

**Key Achievements:**
- Maintained 100% compliance on SSP audits
- Automated STIG validation reducing review time by 40%
- Developed reusable threat modeling framework adopted by team`,
    featured: true,
  },

  // 004 - VULNERABILITIES & FINDINGS
  {
    title: 'Title Boxing Club — Unencrypted Data Exposure',
    slug: 'title-boxing-unencrypted-data',
    category: 'vulnerability',
    logo: 'public/images/title-boxing-club_logo.png',
    severity: 'high',
    cvss: 7.5,
    description: 'Discovered unencrypted transmission of sensitive user data including payment information',
    technologies: ['Burp Suite', 'TLS Analysis', 'Network Security'],
    content: `**Vulnerability Type:** Unencrypted Data Transmission
**Severity:** High (CVSS 7.5)
**Tools Used:** Burp Suite Pro, Browser DevTools

**Discovery:**
Using Burp Suite to intercept and analyze network traffic, identified that Title Boxing Club's mobile application and web portal were transmitting sensitive user data without encryption:

**Affected Data:**
- User authentication credentials
- Payment card information (last 4 digits, card type)
- Membership details and personal information
- Session tokens and API keys

**Technical Details:**
- HTTP traffic instead of HTTPS for sensitive endpoints
- Weak TLS configuration on payment processing endpoints
- Session tokens transmitted in cleartext URL parameters
- API responses containing PII without encryption

**Impact:**
- Man-in-the-middle attack vulnerability
- Credential theft risk on public WiFi networks
- Payment data exposure to network eavesdroppers

**Disclosure:**
Reported to Title Boxing Club security team following responsible disclosure practices. Status: Under review.`,
    featured: true,
  },
  {
    title: 'Cameo — $18M Paywall Bypass Vulnerability',
    slug: 'cameo-paywall-bypass',
    category: 'vulnerability',
    logo: 'public/images/Cameo-Logo.png',
    severity: 'critical',
    cvss: 9.1,
    description: 'Critical business logic flaw allowing complete bypass of payment system on $18M revenue platform',
    technologies: ['Burp Suite', 'API Security', 'Business Logic'],
    content: `**Vulnerability Type:** Business Logic Flaw / Authentication Bypass
**Severity:** Critical (CVSS 9.1)
**Business Impact:** $18M+ annual revenue at risk

**Discovery:**
Identified critical business logic vulnerability allowing users to access premium celebrity content without payment:

**Technical Details:**
- Insecure direct object references (IDOR) in video delivery API
- Predictable resource IDs for premium content
- Missing server-side payment verification
- JWT token manipulation bypassing subscription checks

**Exploitation:**
1. User requests premium celebrity video
2. Payment process initiated but not completed
3. Video resource ID leaked in failed transaction response
4. Direct API call to video endpoint with modified JWT
5. Premium content delivered without payment

**Impact:**
- Complete bypass of $18M+ paywall system
- Access to all premium celebrity content
- Revenue loss and potential fraud
- Celebrity content copyright exposure

**Disclosure:**
Reported to Cameo security team via HackerOne. Acknowledged and patched within 72 hours. Bounty awarded.`,
    featured: true,
  },
  {
    title: 'Alibaba — Prompt Injection Vulnerabilities',
    slug: 'alibaba-prompt-injection',
    category: 'vulnerability',
    logo: 'public/images/Alibaba-Logo.jpg',
    severity: 'medium',
    cvss: 6.5,
    description: 'AI/LLM prompt injection vulnerabilities in e-commerce chat and product recommendation systems',
    technologies: ['LLM Security', 'Prompt Injection', 'AI Red Teaming'],
    content: `**Vulnerability Type:** LLM Prompt Injection
**Severity:** Medium (CVSS 6.5)
**Platform:** Alibaba.com AI Assistant

**Discovery:**
Identified multiple prompt injection vectors in Alibaba's AI-powered customer service and product recommendation systems:

**Attack Vectors:**
1. **Instruction Bypass:** Injecting system-level commands to override AI behavior
2. **Data Exfiltration:** Extracting internal product data and pricing information
3. **Recommendation Manipulation:** Forcing AI to recommend specific products
4. **Content Filter Evasion:** Bypassing safety guardrails for inappropriate content

**Technical Examples:**
- Injected prompts revealing internal product categories
- Manipulated recommendation algorithm to favor specific vendors
- Extracted training data snippets through carefully crafted queries

**Impact:**
- Competitive intelligence leakage
- Unfair marketplace manipulation
- Customer trust degradation
- Content policy violations

**Disclosure:**
Reported to Alibaba Security Response Center (ASRC). Under investigation.`,
    featured: false,
  },
  {
    title: 'Prada — Exposed Staging Environments',
    slug: 'prada-staging-exposure',
    category: 'vulnerability',
    logo: 'public/images/prada-logo.png',
    severity: 'high',
    cvss: 7.8,
    description: 'Discovered publicly accessible development environments exposing employee portals and blockchain infrastructure',
    technologies: ['Subdomain Enumeration', 'OSINT', 'Infrastructure Security'],
    content: `**Vulnerability Type:** Exposed Development Infrastructure
**Severity:** High (CVSS 7.8)
**Target:** Prada.com luxury retail platform

**Discovery:**
Comprehensive subdomain enumeration revealed multiple publicly accessible development and staging environments containing sensitive systems:

**Exposed Subdomains:**
- \`beta2.prada.com\` - Development e-commerce environment
- \`beta3.prada.com\` - Staging environment with production data
- \`beta2-employeesonlinestore.prada.com\` - Employee portal with authentication bypass
- \`aurablockchain.prada.com\` - NFT/blockchain infrastructure exposure
- \`dev-api.prada.com\` - Development API with debug endpoints enabled

**Security Issues:**
- Missing authentication on development portals
- Debug endpoints exposing system information
- Production database credentials in source code
- Employee PII accessible without authorization
- Blockchain wallet private keys in configuration files

**Information Disclosure:**
- Customer order data from staging database
- Employee discount codes and inventory information
- API documentation revealing internal architecture
- Source code comments with deployment credentials

**Missing Security Headers:**
- No Content-Security-Policy (CSP)
- Missing X-Frame-Options (clickjacking risk)
- Permissive CORS allowing any origin

**Impact:**
- Customer data breach risk
- Employee credential theft
- Intellectual property exposure
- Brand reputation damage

**Disclosure:**
Reported to Prada IT Security via email. Acknowledged. Remediation in progress.`,
    featured: true,
  },
  {
    title: 'Strava — Missing Security Headers Assessment',
    slug: 'strava-security-headers',
    category: 'vulnerability',
    logo: 'public/images/strava-logo.png',
    severity: 'medium',
    cvss: 5.3,
    description: 'Comprehensive security assessment revealing missing HTTP security headers across fitness platform',
    technologies: ['Security Headers', 'Web Security', 'OWASP'],
    content: `**Vulnerability Type:** Missing Security Headers
**Severity:** Medium (CVSS 5.3)
**Platform:** Strava.com fitness tracking platform

**Discovery:**
Conducted comprehensive security header analysis on Strava's web application and API endpoints revealing critical security header omissions:

**Missing Headers:**
1. **HTTP Strict-Transport-Security (HSTS)**
   - Risk: SSL stripping attacks
   - Impact: User credentials exposed on downgrade attacks

2. **Content-Security-Policy (CSP)**
   - Risk: Cross-Site Scripting (XSS) attacks
   - Impact: Malicious script injection

3. **X-Frame-Options**
   - Risk: Clickjacking attacks
   - Impact: UI redressing and credential theft

4. **X-Content-Type-Options**
   - Risk: MIME confusion attacks
   - Impact: Malicious content execution

5. **Referrer-Policy**
   - Risk: Information leakage through referer header
   - Impact: Sensitive URL parameters exposed

**Testing Methodology:**
- Authenticated testing with test account
- Public endpoint analysis
- API security header evaluation
- Browser security header inspection

**Positive Findings:**
- IDOR protection properly implemented (tested and verified)
- XSS protection active on user input fields
- API endpoints have better header configuration than public pages

**Attack Scenarios:**
1. **SSL Stripping:** Attacker downgrades HTTPS to HTTP on public WiFi
2. **Clickjacking:** Malicious iframe embedding Strava login
3. **XSS Injection:** Malicious scripts in activity descriptions

**Impact:**
- User session hijacking risk
- Credential theft on public networks
- Privacy concerns for athlete data

**Disclosure:**
Reported to Strava security team. Acknowledged with thanks. Headers partially implemented on API endpoints.`,
    featured: false,
  },

  // 005 - RESEARCH / WRITEUPS
  {
    title: 'SigmaHQ — NetExec Credential Dumping Detection Rule',
    slug: 'sigmahq-netexec-detection',
    category: 'finding',
    description: 'Developed Sigma detection rule targeting NetExec credential dumping modules for Gentlemen ransomware detection',
    technologies: ['Sigma', 'Threat Detection', 'SIEM', 'MITRE ATT&CK'],
    content: `**Project:** Sigma Detection Rule for NetExec Credential Dumping
**Context:** Gentlemen Ransomware Campaign Detection
**Status:** Published to SigmaHQ repository

**Background:**
Developed a Sigma detection rule targeting NetExec (formerly CrackMapExec) credential dumping modules specifically observed in Gentlemen ransomware campaigns. This rule enables SIEM platforms to detect early-stage reconnaissance and credential harvesting activities.

**Detection Rule Capabilities:**
- Identifies NetExec LSA secrets dumping (\`--lsa\`)
- Detects SAM database extraction (\`--sam\`)
- Monitors NTDS.dit Active Directory database dumping (\`--ntds\`)
- Catches DPAPI credential dumping operations (\`--dpapi\`)

**MITRE ATT&CK Mapping:**
- **T1003.001** - OS Credential Dumping: LSASS Memory
- **T1003.002** - OS Credential Dumping: Security Account Manager
- **T1003.003** - OS Credential Dumping: NTDS
- **T1555.003** - Credentials from Password Stores: DPAPI

**Technical Implementation:**
The Sigma rule detects command-line execution patterns associated with NetExec credential dumping modules. It monitors process creation events looking for characteristic flags and module names used by threat actors during the credential harvesting phase.

**Detection Logic:**
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

**Real-World Application:**
This rule has been deployed in enterprise SIEM environments to detect early indicators of Gentlemen ransomware campaigns, providing SOC teams with actionable alerts during the reconnaissance phase before encryption occurs.

**Impact:**
- Early detection of ransomware campaigns
- Reduced dwell time for threat actors
- Enabled proactive incident response`,
    featured: true,
  },
]

async function main() {
  console.log('🚀 Starting portfolio population...\n')

  for (const item of portfolioData) {
    try {
      console.log(`📝 Creating: ${item.title}`)

      // Upload logo if exists
      let coverImageRef = null
      if (item.logo) {
        try {
          const imageId = await uploadImage(item.logo)
          coverImageRef = {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageId,
            },
          }
          console.log(`  ✅ Logo uploaded: ${item.logo}`)
        } catch (err) {
          console.log(`  ⚠️  Logo upload failed: ${item.logo}`)
        }
      }

      // Create portfolio item
      const doc = {
        _type: 'portfolioItem',
        title: item.title,
        slug: {
          _type: 'slug',
          current: item.slug,
        },
        category: item.category,
        description: item.description,
        technologies: item.technologies,
        featured: item.featured,
        publishedAt: new Date().toISOString(),
        ...(coverImageRef && { coverImage: coverImageRef }),
        ...(item.severity && { severity: item.severity }),
        ...(item.cvss && { cvss: item.cvss }),
        ...(item.content && {
          content: [
            {
              _type: 'block',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  text: item.content,
                },
              ],
            },
          ],
        }),
      }

      await client.create(doc)
      console.log(`  ✅ Created successfully\n`)
    } catch (error) {
      console.error(`  ❌ Error creating ${item.title}:`, error instanceof Error ? error.message : String(error))
    }
  }

  console.log('✅ Portfolio population complete!')
}

main().catch(console.error)
