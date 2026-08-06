import { getMessageBankStats } from "@/lib/message-bank";

const MESSAGE_COUNT = getMessageBankStats().total;

export function LandingJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RIZN",
    url: "https://rizn.app",
    description:
      "Daily personalized notifications for motivation, habits, bills, water, sleep, and steps.",
    logo: "https://rizn.app/logo.svg",
  };

  const product = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "RIZN Personal",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web, Android, iOS",
    offers: {
      "@type": "Offer",
      price: "99",
      priceCurrency: "INR",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
    },
    description: `${MESSAGE_COUNT}+ personalized daily messages, bill reminders, and habit tracking.`,
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is RIZN?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RIZN sends daily personalized notifications for motivation, bill reminders, water, sleep, steps, and habits — with your name.",
        },
      },
      {
        "@type": "Question",
        name: "How much does RIZN cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "₹99/month after a 7-day free trial. Cancel anytime.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}
