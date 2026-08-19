import { products, partners, cities } from "@/data/site";

export { products, partners, cities };

export const loanTypes = products.map((p) => p.name);

export type LeadStatus = "Pending" | "Done" | "Rejected";

export type Lead = {
  id: string;
  date: string;
  name: string;
  contact: string;
  email?: string;
  loanType: string;
  loanAmount: number;
  ro: string;
  sm: string;
  referenceType: "Self" | "Sourcing Partner";
  referenceName?: string;
  employeeType: "Salaried" | "Self-Employed";
  monthlyIncome: number;
  nextMeetingDate: string;
  nextMeetingMode: "In-person" | "Phone" | "Video Call";
  status: LeadStatus;
};

export const leads: Lead[] = [
  {
    id: "GCS-L-000001",
    date: "2026-08-05",
    name: "Arjun Choudhary",
    contact: "98200 11234",
    email: "arjun.choudhary@example.com",
    loanType: "Home Loan",
    loanAmount: 5000000,
    ro: "Kavya Menon",
    sm: "Rahul Deshpande",
    referenceType: "Self",
    employeeType: "Salaried",
    monthlyIncome: 145000,
    nextMeetingDate: "2026-08-22",
    nextMeetingMode: "In-person",
    status: "Pending",
  },
  {
    id: "GCS-L-000002",
    date: "2026-08-06",
    name: "Chetan Bhosale",
    contact: "70248 77771",
    loanType: "Business Loan",
    loanAmount: 2500000,
    ro: "Sameer Kulkarni",
    sm: "Rahul Deshpande",
    referenceType: "Sourcing Partner",
    referenceName: "Nikhil Rane",
    employeeType: "Self-Employed",
    monthlyIncome: 210000,
    nextMeetingDate: "2026-08-20",
    nextMeetingMode: "Phone",
    status: "Done",
  },
  {
    id: "GCS-L-000003",
    date: "2026-08-09",
    name: "Priya Iyer",
    contact: "98765 43210",
    loanType: "Loan Against Property",
    loanAmount: 8500000,
    ro: "Kavya Menon",
    sm: "Rahul Deshpande",
    referenceType: "Self",
    employeeType: "Salaried",
    monthlyIncome: 190000,
    nextMeetingDate: "2026-08-24",
    nextMeetingMode: "Video Call",
    status: "Pending",
  },
  {
    id: "GCS-L-000004",
    date: "2026-08-11",
    name: "Meera Nair",
    contact: "90040 55621",
    loanType: "Working Capital Loan",
    loanAmount: 1500000,
    ro: "Sameer Kulkarni",
    sm: "Rahul Deshpande",
    referenceType: "Sourcing Partner",
    referenceName: "Vikram Singh",
    employeeType: "Self-Employed",
    monthlyIncome: 260000,
    nextMeetingDate: "2026-08-19",
    nextMeetingMode: "In-person",
    status: "Done",
  },
  {
    id: "GCS-L-000005",
    date: "2026-08-13",
    name: "Rohan Kapadia",
    contact: "88888 20044",
    loanType: "Personal Loan",
    loanAmount: 600000,
    ro: "Kavya Menon",
    sm: "Rahul Deshpande",
    referenceType: "Self",
    employeeType: "Salaried",
    monthlyIncome: 95000,
    nextMeetingDate: "2026-08-18",
    nextMeetingMode: "Phone",
    status: "Rejected",
  },
  {
    id: "GCS-L-000006",
    date: "2026-08-15",
    name: "Sunita Verma",
    contact: "99870 12233",
    loanType: "Home Loan",
    loanAmount: 6000000,
    ro: "Sameer Kulkarni",
    sm: "Rahul Deshpande",
    referenceType: "Self",
    employeeType: "Salaried",
    monthlyIncome: 175000,
    nextMeetingDate: "2026-08-26",
    nextMeetingMode: "In-person",
    status: "Pending",
  },
];

export type ApplicationStatus = "Applicant" | "Co-Applicant" | "Loan Details" | "References" | "Login Done";

export type Application = {
  id: string;
  applicant: string;
  loanType: string;
  bank: string;
  loanAmount: number;
  loginDate: string;
  status: ApplicationStatus;
};

export const applications: Application[] = [
  { id: "GCS-A-000001", applicant: "Arjun Choudhary", loanType: "Home Loan", bank: "HDFC Bank", loanAmount: 5000000, loginDate: "2026-08-08", status: "Login Done" },
  { id: "GCS-A-000002", applicant: "Chetan Bhosale", loanType: "Business Loan", bank: "ICICI Bank", loanAmount: 2500000, loginDate: "2026-08-10", status: "Login Done" },
  { id: "GCS-A-000003", applicant: "Priya Iyer", loanType: "Loan Against Property", bank: "Axis Bank", loanAmount: 8500000, loginDate: "2026-08-12", status: "References" },
  { id: "GCS-A-000004", applicant: "Meera Nair", loanType: "Working Capital Loan", bank: "Kotak Mahindra", loanAmount: 1500000, loginDate: "2026-08-13", status: "Login Done" },
];

export type SanctionStatus = "Pending" | "Financially Sanctioned" | "Rejected";

export type Sanction = {
  id: string;
  applicant: string;
  bank: string;
  loanAmount: number;
  technicalStatus: "Approved" | "Pending";
  financialStatus: SanctionStatus;
  sanctionDate: string;
};

export const sanctions: Sanction[] = [
  { id: "GCS-S-000001", applicant: "Arjun Choudhary", bank: "HDFC Bank", loanAmount: 4800000, technicalStatus: "Approved", financialStatus: "Financially Sanctioned", sanctionDate: "2026-08-14" },
  { id: "GCS-S-000002", applicant: "Chetan Bhosale", bank: "ICICI Bank", loanAmount: 2500000, technicalStatus: "Approved", financialStatus: "Financially Sanctioned", sanctionDate: "2026-08-15" },
  { id: "GCS-S-000003", applicant: "Meera Nair", bank: "Kotak Mahindra", loanAmount: 1500000, technicalStatus: "Pending", financialStatus: "Pending", sanctionDate: "2026-08-17" },
];

export type Disbursement = {
  id: string;
  applicant: string;
  bank: string;
  sanctionedAmount: number;
  disbursedAmount: number;
  disbursementType: "Full" | "Part";
  roi: number;
  roiType: "Fixed" | "Floating";
  date: string;
};

export const disbursements: Disbursement[] = [
  { id: "GCS-D-000001", applicant: "Arjun Choudhary", bank: "HDFC Bank", sanctionedAmount: 4800000, disbursedAmount: 4800000, disbursementType: "Full", roi: 8.4, roiType: "Floating", date: "2026-08-18" },
  { id: "GCS-D-000002", applicant: "Chetan Bhosale", bank: "ICICI Bank", sanctionedAmount: 2500000, disbursedAmount: 1500000, disbursementType: "Part", roi: 11.5, roiType: "Fixed", date: "2026-08-18" },
];

export type Commission = {
  id: string;
  applicant: string;
  bank: string;
  totalCommission: number;
  paidOut: number;
  remaining: number;
  payoutStatus: "Pending" | "Partial" | "Paid";
  payoutDate: string;
};

export const commissions: Commission[] = [
  { id: "GCS-C-000001", applicant: "Arjun Choudhary", bank: "HDFC Bank", totalCommission: 48000, paidOut: 48000, remaining: 0, payoutStatus: "Paid", payoutDate: "2026-08-19" },
  { id: "GCS-C-000002", applicant: "Chetan Bhosale", bank: "ICICI Bank", totalCommission: 25000, paidOut: 10000, remaining: 15000, payoutStatus: "Partial", payoutDate: "2026-08-19" },
];

export type TeamRole = "Super Admin" | "Manager" | "Coordinator" | "Executive" | "Relationship Officer";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: TeamRole;
  city: string;
  status: "Active" | "Inactive";
};

export const team: TeamMember[] = [
  { id: "T-01", name: "Mahesh Ghadge", email: "mahesh@growthcapitalservices.in", phone: "88280 01700", role: "Super Admin", city: "Thane", status: "Active" },
  { id: "T-02", name: "Rahul Deshpande", email: "rahul@growthcapitalservices.in", phone: "98220 33445", role: "Manager", city: "Mumbai", status: "Active" },
  { id: "T-03", name: "Kavya Menon", email: "kavya@growthcapitalservices.in", phone: "99870 22114", role: "Relationship Officer", city: "Navi Mumbai", status: "Active" },
  { id: "T-04", name: "Sameer Kulkarni", email: "sameer@growthcapitalservices.in", phone: "90040 88221", role: "Relationship Officer", city: "Pune", status: "Active" },
  { id: "T-05", name: "Ananya Joshi", email: "ananya@growthcapitalservices.in", phone: "89999 11223", role: "Coordinator", city: "Thane", status: "Active" },
];

export type SourcingPartner = {
  id: string;
  name: string;
  email: string;
  phone: string;
  commissionPct: number;
  reportsTo: string;
  joiningDate: string;
  status: "Active" | "Inactive";
};

export const sourcingPartners: SourcingPartner[] = [
  { id: "SP-01", name: "Nikhil Rane", email: "nikhil.rane@example.com", phone: "97690 44112", commissionPct: 0.35, reportsTo: "Rahul Deshpande", joiningDate: "2025-11-02", status: "Active" },
  { id: "SP-02", name: "Vikram Singh", email: "vikram.singh@example.com", phone: "96540 88732", commissionPct: 0.4, reportsTo: "Rahul Deshpande", joiningDate: "2026-01-14", status: "Active" },
  { id: "SP-03", name: "Farah Sheikh", email: "farah.sheikh@example.com", phone: "93250 66210", commissionPct: 0.3, reportsTo: "Rahul Deshpande", joiningDate: "2026-04-30", status: "Inactive" },
];

export const monthlyVolume = [
  { month: "Mar", disbursed: 1.8 },
  { month: "Apr", disbursed: 2.4 },
  { month: "May", disbursed: 2.1 },
  { month: "Jun", disbursed: 3.2 },
  { month: "Jul", disbursed: 2.9 },
  { month: "Aug", disbursed: 3.7 },
];

export const loanMix = loanTypes.slice(0, 6).map((name, i) => ({
  name,
  value: [34, 22, 18, 12, 9, 5][i] ?? 5,
}));
