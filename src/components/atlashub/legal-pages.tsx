'use client';

import { motion } from 'framer-motion';
import { t } from '@/lib/i18n';
import { useAppStore } from '@/stores/app-store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalPageConfig {
  titleKey: string;
  sections: LegalSection[];
}

/* ------------------------------------------------------------------ */
/*  Legal page content definitions                                     */
/* ------------------------------------------------------------------ */

const LEGAL_PAGES: Record<string, LegalPageConfig> = {
  privacy: {
    titleKey: 'legal.privacy',
    sections: [
      {
        heading: 'Introduction',
        paragraphs: [
          'AtlasHub Digital Ltd ("we", "us", or "our") is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
          'This policy applies to all individuals who access our services, including customers, partners, and website visitors. By using our services, you agree to the collection and use of information in accordance with this policy.',
        ],
      },
      {
        heading: 'Data Collection',
        paragraphs: [
          'We collect information that you provide directly to us, including your name, email address, telephone number, company name, and payment information when you create an account, make a purchase, or contact us.',
          'We also automatically collect certain information when you visit our website, including your IP address, browser type, device information, pages visited, and referring URLs through the use of cookies and similar technologies.',
        ],
      },
      {
        heading: 'Data Usage',
        paragraphs: [
          'We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.',
          'Your data may also be used to communicate with you about products, services, offers, and events, and to monitor and analyse trends, usage, and activities in connection with our services.',
        ],
      },
      {
        heading: 'Data Sharing',
        paragraphs: [
          'We do not sell your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.',
          'We may also disclose your information when required to do so by law, in response to valid legal requests, or to protect our rights, privacy, safety, or property, or that of our users or the public.',
        ],
      },
      {
        heading: 'Your Rights',
        paragraphs: [
          'Under applicable data protection laws, you have the right to access, rectify, or delete your personal data. You may also have the right to restrict processing, data portability, and to object to the processing of your personal information.',
          'To exercise any of these rights, please contact us using the details provided at the bottom of this policy. We will respond to all legitimate requests within 30 days.',
        ],
      },
      {
        heading: 'Data Retention',
        paragraphs: [
          'We retain your personal information only for as long as necessary to fulfil the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements.',
          'When your data is no longer required, we will securely delete or anonymise it in accordance with our data retention policy and applicable regulations.',
        ],
      },
    ],
  },
  terms: {
    titleKey: 'legal.terms',
    sections: [
      {
        heading: 'Introduction',
        paragraphs: [
          'These Terms and Conditions ("Terms") govern your use of the services provided by AtlasHub Digital Ltd ("Company", "we", "us", or "our"). By accessing or using our services, you agree to be bound by these Terms.',
          'If you do not agree to these Terms, you may not access or use our services. We recommend that you read these Terms carefully before using our platform.',
        ],
      },
      {
        heading: 'Acceptance',
        paragraphs: [
          'By creating an account, purchasing a subscription, or using any of our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.',
          'We reserve the right to update these Terms at any time. Continued use of our services following any changes constitutes your acceptance of the revised Terms.',
        ],
      },
      {
        heading: 'Services',
        paragraphs: [
          'AtlasHub Digital Ltd provides SaaS platforms, AI-powered applications, digital commerce solutions, marketplace technologies, and workflow automation systems (collectively, "Services").',
          'We reserve the right to modify, suspend, or discontinue any part of our services at any time, with reasonable notice where possible. We shall not be liable for any such modification, suspension, or discontinuance.',
        ],
      },
      {
        heading: 'User Obligations',
        paragraphs: [
          'You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
          'You must not use our services in any way that could damage, disable, overburden, or impair our servers or networks, or interfere with any other party\'s use and enjoyment of our services.',
        ],
      },
      {
        heading: 'Limitation of Liability',
        paragraphs: [
          'To the fullest extent permitted by law, AtlasHub Digital Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of or inability to use our services.',
          'Our total liability for any claim arising out of or relating to our services shall not exceed the amount you paid to us in the twelve months preceding the event giving rise to the claim.',
        ],
      },
      {
        heading: 'Governing Law',
        paragraphs: [
          'These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to its conflict of law provisions.',
          'Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.',
        ],
      },
    ],
  },
  refund: {
    titleKey: 'legal.refund',
    sections: [
      {
        heading: 'Introduction',
        paragraphs: [
          'At AtlasHub Digital Ltd, we strive to ensure your complete satisfaction with our products and services. This Refund Policy outlines the circumstances under which refunds are offered and the process for requesting one.',
          'This policy applies to all purchases made through our website or directly with our sales team.',
        ],
      },
      {
        heading: 'Eligibility',
        paragraphs: [
          'Digital products and services may be eligible for a refund within 14 calendar days of purchase, provided that the product has not been substantially used or accessed beyond reasonable evaluation purposes.',
          'Subscription services may be cancelled at any time. Refunds for recurring subscriptions will be considered on a pro-rata basis for the unused portion of the current billing period.',
        ],
      },
      {
        heading: 'Process',
        paragraphs: [
          'To request a refund, please contact our support team at support@atlashub.digital with your order number, the reason for your request, and any relevant documentation.',
          'Our team will review your request and respond within 5 business days. If approved, refunds will be processed to the original payment method within 10 business days.',
        ],
      },
      {
        heading: 'Timeline',
        paragraphs: [
          'Refund requests must be submitted within the eligible period as described above. Requests received after this period may not be considered.',
          'Once a refund is approved, the processing time depends on your payment provider. Credit card refunds typically appear within 5–10 business days. Bank transfers may take up to 15 business days.',
        ],
      },
      {
        heading: 'Exceptions',
        paragraphs: [
          'Refunds will not be provided for custom development work, bespoke solutions, or services that have been fully delivered and accepted, unless there is a material defect or failure to meet agreed specifications.',
          'Promotional or discounted purchases, and products marked as final sale, may have different refund terms which will be clearly stated at the time of purchase.',
        ],
      },
    ],
  },
  cookie: {
    titleKey: 'legal.cookie',
    sections: [
      {
        heading: 'Introduction',
        paragraphs: [
          'This Cookie Policy explains how AtlasHub Digital Ltd uses cookies and similar tracking technologies when you visit our website. It explains what these technologies are, why we use them, and your rights to control our use of them.',
          'By continuing to use our website, you consent to the use of cookies in accordance with this policy unless you have adjusted your browser settings to refuse cookies.',
        ],
      },
      {
        heading: 'What Are Cookies',
        paragraphs: [
          'Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and supply information to the website owners.',
          'Cookies can be "persistent" (remaining on your device until they expire or you delete them) or "session" cookies (deleted when you close your browser).',
        ],
      },
      {
        heading: 'Types',
        paragraphs: [
          'We use essential cookies that are necessary for the website to function properly, including session management and security features. These cannot be disabled.',
          'We also use analytical cookies to understand how visitors interact with our website, collecting information about pages visited, time spent, and navigation patterns to improve our services.',
        ],
      },
      {
        heading: 'Management',
        paragraphs: [
          'You can manage your cookie preferences through your browser settings. Most browsers allow you to refuse or accept cookies, delete existing cookies, and set preferences for certain websites.',
          'Please note that disabling certain cookies may affect the functionality of our website and limit your ability to use some features.',
        ],
      },
      {
        heading: 'Third-Party Cookies',
        paragraphs: [
          'Some cookies on our website are placed by third-party services that appear on our pages, such as analytics providers and payment processors. We do not control these cookies and recommend reviewing the privacy policies of these third parties.',
          'We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.',
        ],
      },
    ],
  },
  shipping: {
    titleKey: 'legal.shipping',
    sections: [
      {
        heading: 'Introduction',
        paragraphs: [
          'This Shipping Policy applies to the delivery of physical products, licence keys, and digital goods purchased from AtlasHub Digital Ltd. As a provider of primarily digital products and services, most of our deliveries are completed electronically.',
          'For any physical goods or merchandise, this policy outlines our delivery methods, timeframes, and international shipping options.',
        ],
      },
      {
        heading: 'Delivery Methods',
        paragraphs: [
          'Digital products, licence keys, and access credentials are delivered via email to the address provided at the time of purchase. Delivery is typically instantaneous upon successful payment processing.',
          'For physical products where applicable, we offer standard and express delivery options through reputable courier services. Tracking information will be provided for all physical shipments.',
        ],
      },
      {
        heading: 'Timeframes',
        paragraphs: [
          'Digital products are typically available within minutes of purchase confirmation. In some cases, manual verification may be required, in which case delivery may take up to 24 hours.',
          'Physical product delivery timeframes vary by destination and shipping method selected. Standard delivery within the UK typically takes 3–5 business days. Express delivery is available for 1–2 business day delivery.',
        ],
      },
      {
        heading: 'International Shipping',
        paragraphs: [
          'Where international shipping is available, delivery times and costs will be calculated at checkout based on the destination country. Customers are responsible for any applicable customs duties, taxes, or import fees.',
          'We are not responsible for delays caused by customs processing, local postal services, or unforeseen circumstances beyond our control. We will provide tracking information where available to help monitor shipments.',
        ],
      },
    ],
  },
  acceptable: {
    titleKey: 'legal.acceptable',
    sections: [
      {
        heading: 'Introduction',
        paragraphs: [
          'This Acceptable Use Policy sets out the rules and guidelines for using the services provided by AtlasHub Digital Ltd. By using our services, you agree to comply with this policy at all times.',
          'We reserve the right to suspend or terminate access to our services for any user who violates this policy.',
        ],
      },
      {
        heading: 'Permitted Use',
        paragraphs: [
          'You may use our services for legitimate business purposes, including but not limited to operating e-commerce platforms, managing marketplaces, automating business workflows, and integrating with authorised third-party services.',
          'All use of our services must comply with applicable laws, regulations, and industry standards. You are responsible for ensuring that your use of our services does not infringe upon the rights of others.',
        ],
      },
      {
        heading: 'Prohibited Activities',
        paragraphs: [
          'You may not use our services for any unlawful purpose, including fraud, money laundering, terrorism financing, or any activity that violates UK or international law. Distribution of malware, spam, or malicious content is strictly prohibited.',
          'You may not attempt to gain unauthorised access to our systems, interfere with the proper functioning of our services, or use automated tools to scrape, extract, or harvest data from our platform without explicit permission.',
        ],
      },
      {
        heading: 'Enforcement',
        paragraphs: [
          'We monitor usage patterns to detect potential violations of this policy. If we suspect a violation, we may investigate, issue a warning, restrict access, or terminate your account, depending on the severity of the breach.',
          'We reserve the right to report suspected illegal activities to the relevant authorities and to cooperate with law enforcement investigations as required by law.',
        ],
      },
    ],
  },
  aml: {
    titleKey: 'legal.aml',
    sections: [
      {
        heading: 'Introduction',
        paragraphs: [
          'AtlasHub Digital Ltd is committed to the highest standards of Anti-Money Laundering (AML) and Counter-Terrorism Financing (CTF) compliance. This policy outlines our approach to preventing, detecting, and reporting money laundering and terrorist financing activities.',
          'As a registered company in England and Wales, we comply with all applicable UK AML legislation, including the Proceeds of Crime Act 2002, the Terrorism Act 2000, and the Money Laundering Regulations 2017.',
        ],
      },
      {
        heading: 'KYC Requirements',
        paragraphs: [
          'We implement Know Your Customer (KYC) procedures to verify the identity of our customers before establishing a business relationship. This may include requesting government-issued identification, proof of address, and information about the nature of your business.',
          'For business customers, we may request information about company registration, beneficial ownership, and the source of funds. Enhanced due diligence is applied to higher-risk customers and transactions.',
        ],
      },
      {
        heading: 'Monitoring',
        paragraphs: [
          'We employ ongoing transaction monitoring systems to detect unusual or suspicious activity. Our systems analyse transaction patterns, volumes, and frequencies to identify potential indicators of money laundering or terrorist financing.',
          'Staff are trained to recognise and escalate suspicious activity. Regular reviews of customer relationships and transaction histories are conducted to ensure ongoing compliance.',
        ],
      },
      {
        heading: 'Reporting',
        paragraphs: [
          'Where we identify or suspect money laundering or terrorist financing, we are legally obligated to submit a Suspicious Activity Report (SAR) to the National Crime Agency (NCA). We will not inform the customer of such a report.',
          'We maintain comprehensive records of all AML-related activities, including customer due diligence, transaction monitoring, and SAR submissions, in accordance with regulatory requirements.',
        ],
      },
      {
        heading: 'Compliance',
        paragraphs: [
          'Our AML compliance programme is overseen by a designated compliance officer who is responsible for implementing and maintaining our AML controls, conducting staff training, and ensuring regulatory adherence.',
          'We conduct regular independent audits of our AML procedures and update our policies to reflect changes in legislation and regulatory guidance.',
        ],
      },
    ],
  },
  gdpr: {
    titleKey: 'legal.gdpr',
    sections: [
      {
        heading: 'Introduction',
        paragraphs: [
          'This GDPR Statement explains how AtlasHub Digital Ltd complies with the General Data Protection Regulation (GDPR) and the UK GDPR in relation to the processing of personal data of individuals within the European Economic Area (EEA) and the United Kingdom.',
          'We are committed to ensuring that your personal data is processed lawfully, fairly, and transparently, and that appropriate technical and organisational measures are in place to protect your data.',
        ],
      },
      {
        heading: 'Data Controller',
        paragraphs: [
          'AtlasHub Digital Ltd is the data controller for personal data collected through our website and services. Our registered address is 71–75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom.',
          'As data controller, we determine the purposes and means of processing your personal data and are responsible for ensuring compliance with data protection legislation.',
        ],
      },
      {
        heading: 'Legal Basis',
        paragraphs: [
          'We process your personal data on the following legal bases: (a) consent, where you have given clear affirmative consent to specific processing activities; (b) contractual necessity, where processing is required to perform our contract with you; (c) legitimate interests, where processing is necessary for our legitimate business interests and does not override your rights.',
          'We also process data to comply with legal obligations, such as AML regulations, tax requirements, and other applicable laws.',
        ],
      },
      {
        heading: 'Rights',
        paragraphs: [
          'Under GDPR, you have the right to: access your personal data; rectify inaccurate or incomplete data; erase your data ("right to be forgotten"); restrict processing; data portability; object to processing; and not be subject to automated decision-making including profiling.',
          'To exercise any of these rights, please contact our Data Protection Officer using the details below. We will respond to all requests within one month, which may be extended by a further two months for complex requests.',
        ],
      },
      {
        heading: 'Data Protection Officer',
        paragraphs: [
          'We have appointed a Data Protection Officer (DPO) who is responsible for overseeing our data protection strategy and compliance. The DPO can be contacted at dpo@atlashub.digital.',
          'If you believe that our processing of your personal data infringes your rights, you have the right to lodge a complaint with the Information Commissioner\'s Office (ICO) at ico.org.uk.',
        ],
      },
    ],
  },
  accessibility: {
    titleKey: 'legal.accessibility',
    sections: [
      {
        heading: 'Introduction',
        paragraphs: [
          'AtlasHub Digital Ltd is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.',
          'This Accessibility Statement describes our ongoing efforts to make our website and services accessible and usable by all visitors, regardless of ability or technology.',
        ],
      },
      {
        heading: 'Standards',
        paragraphs: [
          'We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, as recommended by the World Wide Web Consortium (W3C). These guidelines explain how to make web content more accessible for people with disabilities.',
          'Our website is designed to be compatible with assistive technologies, including screen readers, magnification software, and speech recognition tools. We use semantic HTML, ARIA attributes, and keyboard navigation throughout.',
        ],
      },
      {
        heading: 'Compliance',
        paragraphs: [
          'We conduct regular accessibility audits of our website and services using both automated tools and manual testing. We also seek feedback from users with disabilities to identify and address barriers.',
          'While we strive for full compliance, some areas of our website may not yet fully meet accessibility standards. We are actively working to address any identified issues and prioritise improvements based on their impact on users.',
        ],
      },
      {
        heading: 'Feedback',
        paragraphs: [
          'We welcome your feedback on the accessibility of our website and services. If you encounter any barriers or difficulties while using our platform, please let us know so we can address them.',
          'Your feedback helps us continuously improve our accessibility. We aim to acknowledge all accessibility-related feedback within 2 business days and provide a substantive response within 10 business days.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'If you have any questions or concerns about the accessibility of our website or services, or if you require assistance, please contact us at support@atlashub.digital.',
          'We are committed to providing an accessible experience for all users and will work with you to find an effective solution to any accessibility issue you may encounter.',
        ],
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const dialogContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const dialogItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function LegalPages() {
  const locale = useAppStore((s) => s.locale);
  const legalPage = useAppStore((s) => s.legalPage);
  const setLegalPage = useAppStore((s) => s.setLegalPage);

  const pageConfig = legalPage ? LEGAL_PAGES[legalPage] : null;

  return (
    <Dialog
      open={legalPage !== null}
      onOpenChange={(open) => {
        if (!open) setLegalPage(null);
      }}
    >
      {pageConfig && (
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-6 md:p-8">
          <motion.div
            variants={dialogContainer}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Title */}
            <motion.div variants={dialogItem}>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold md:text-3xl">
                  <span className="gradient-text">
                    {t(pageConfig.titleKey, locale)}
                  </span>
                </DialogTitle>
                <DialogDescription className="mt-2">
                  {t('legal.lastUpdated', locale)} — January 2026
                </DialogDescription>
              </DialogHeader>
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={dialogItem}
              className="h-px w-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, oklch(0.7 0.18 160 / 30%) 50%, transparent 100%)',
              }}
              aria-hidden="true"
            />

            {/* Sections */}
            {pageConfig.sections.map((section, idx) => (
              <motion.div key={idx} variants={dialogItem} className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">
                  {section.heading}
                </h3>
                <div className="space-y-3">
                  {section.paragraphs.map((paragraph, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Bottom divider */}
            <motion.div
              variants={dialogItem}
              className="h-px w-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, oklch(0.7 0.18 160 / 30%) 50%, transparent 100%)',
              }}
              aria-hidden="true"
            />

            {/* Contact info */}
            <motion.div
              variants={dialogItem}
              className="rounded-lg bg-muted/30 p-4"
            >
              <p className="text-sm text-muted-foreground">
                For questions about this policy, contact{' '}
                <a
                  href="mailto:support@atlashub.digital"
                  className="font-medium text-primary transition-colors hover:text-primary/80"
                >
                  support@atlashub.digital
                </a>
              </p>
            </motion.div>
          </motion.div>
        </DialogContent>
      )}
    </Dialog>
  );
}
