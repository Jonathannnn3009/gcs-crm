export type Product = {
  slug: string;
  name: string;
  tagline: string;
  rateFrom: number;
  rateTo: number;
  maxTenure: string;
  maxAmount: string;
  highlights: string[];
  documents: string[];
};

export const products: Product[] = [
  {
    slug: "home-loan",
    name: "Home Loan",
    tagline: "Buy, build or transfer at the lowest running rates.",
    rateFrom: 8.1,
    rateTo: 9.75,
    maxTenure: "30 years",
    maxAmount: "₹10 Cr",
    highlights: [
      "Top-up & balance transfer facility",
      "Tax benefits under Section 80C",
      "Smart Saver (MaxGain) overdraft option",
      "Affordable EMI with long tenure",
    ],
    documents: ["KYC (PAN + Aadhaar)", "Income proof / ITR", "Bank statements (6 m)", "Property papers"],
  },
  {
    slug: "loan-against-property",
    name: "Loan Against Property",
    tagline: "Unlock the idle value of residential or commercial property.",
    rateFrom: 9.0,
    rateTo: 12.5,
    maxTenure: "20 years",
    maxAmount: "₹25 Cr",
    highlights: [
      "LTV of 60% to 100% of market value",
      "Residential, commercial & industrial accepted",
      "Lower interest than unsecured credit",
      "Quick sanctions with dedicated manager",
    ],
    documents: ["KYC (PAN + Aadhaar)", "Property title chain", "ITR (2-3 years)", "Bank statements (12 m)"],
  },
  {
    slug: "business-loan",
    name: "Business Loan",
    tagline: "Unsecured growth capital for MSMEs and professionals.",
    rateFrom: 11.0,
    rateTo: 18.0,
    maxTenure: "5 years",
    maxAmount: "₹75 L",
    highlights: [
      "Fully digital, easy process",
      "Flexible repayment options",
      "Minimum documentation",
      "Approvals in as fast as 48 hours",
    ],
    documents: ["KYC + GST certificate", "GST returns (12 m)", "ITR with computation", "Bank statements (12 m)"],
  },
  {
    slug: "personal-loan",
    name: "Personal Loan",
    tagline: "Collateral-free funds for weddings, travel or emergencies.",
    rateFrom: 10.25,
    rateTo: 20.0,
    maxTenure: "6 years",
    maxAmount: "₹50 L",
    highlights: [
      "Minimal documentation",
      "Flexible EMI plans",
      "One profile, many lenders — no multiple hits",
      "Offers beyond your salary bank",
    ],
    documents: ["KYC (PAN + Aadhaar)", "Latest 3 salary slips", "Bank statements (6 m)", "Form 16"],
  },
  {
    slug: "working-capital",
    name: "Working Capital Loan",
    tagline: "Term loans, CC/OD, LC and bank guarantee limits.",
    rateFrom: 9.5,
    rateTo: 15.0,
    maxTenure: "Renewable annually",
    maxAmount: "₹50 Cr",
    highlights: [
      "Cash credit & overdraft facility",
      "Plant, machinery & industrial purchase",
      "Letter of credit & bank guarantee",
      "Hassle-free processing and renewals",
    ],
    documents: ["Audited financials (3 yrs)", "GST returns", "Stock & debtor statement", "Existing sanction letters"],
  },
  {
    slug: "car-loan",
    name: "Car Loan",
    tagline: "New and pre-owned vehicle funding up to 100% on-road.",
    rateFrom: 8.75,
    rateTo: 13.0,
    maxTenure: "7 years",
    maxAmount: "₹2 Cr",
    highlights: [
      "Transparent dealing, no hidden charges",
      "Optimal down payment & tenure mix",
      "Early repayment flexibility",
      "Fastest approvals at the dealership",
    ],
    documents: ["KYC (PAN + Aadhaar)", "Income proof", "Bank statements (6 m)", "Proforma invoice"],
  },
  {
    slug: "education-loan",
    name: "Education Loan",
    tagline: "Domestic and overseas studies with moratorium support.",
    rateFrom: 8.5,
    rateTo: 13.5,
    maxTenure: "15 years",
    maxAmount: "₹1.5 Cr",
    highlights: [
      "Moratorium during the course period",
      "Tax benefits under Section 80E",
      "Minimum processing fees",
      "Secured & unsecured structures",
    ],
    documents: ["Admission letter", "Fee structure", "Co-applicant income proof", "Academic records"],
  },
  {
    slug: "credit-cards",
    name: "Credit Cards",
    tagline: "Compare lifetime-free and premium reward cards.",
    rateFrom: 0,
    rateTo: 0,
    maxTenure: "Revolving",
    maxAmount: "Limit as per profile",
    highlights: [
      "Lifetime-free options available",
      "Fuel, travel & cashback variants",
      "Instant digital issuance",
      "Balance transfer on EMI",
    ],
    documents: ["KYC (PAN + Aadhaar)", "Income proof", "Bank statements (3 m)", "Address proof"],
  },
];

export const partners = [
  "HDFC Bank",
  "ICICI Bank",
  "State Bank of India",
  "Axis Bank",
  "Kotak Mahindra",
  "Bajaj Finserv",
  "Tata Capital",
  "IDFC FIRST",
  "Yes Bank",
  "L&T Finance",
  "Aditya Birla Capital",
  "Piramal Finance",
  "IIFL Finance",
  "Standard Chartered",
  "Bank of Baroda",
  "PNB Housing",
];

export const cities = ["Mumbai", "Thane", "Navi Mumbai", "Pune", "Other"];

export const contact = {
  phone: "+91 98200 00000",
  phoneHref: "tel:+919820000000",
  email: "info@growthcapitalservices.in",
  address: "Growth Capital Services, Thane West, Mumbai Metropolitan Region, Maharashtra 400601",
  instagram: "https://www.instagram.com/growth_capital_services/",
  facebook: "https://www.facebook.com/GCSloans",
};
