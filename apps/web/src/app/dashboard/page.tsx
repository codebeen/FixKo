"use client";

import BaseLayout from "../components/layout/BaseLayout";
import PageHeader from "@/app/components/page-header/PageHeader";
import SummaryCard from "./components/SummaryCard";
import RecentApplications, {
  type RecentApplicationItem,
} from "./components/RecentApplications";
import RecentConcerns, {
  type RecentConcernItem,
} from "./components/RecentConcerns";

import {
  IconBriefcase,
  IconUserCheck,
  IconMessageCircle,
  IconUserCog,
} from "@tabler/icons-react";
import { SimpleGrid } from "@mantine/core";
import { useState, useEffect } from "react";

import applicantsRaw from "../data/applicants.json";
import workersRaw from "../data/worker.json";
import usersRaw from "../data/UserManagementData.json";

// Customer service mocked counters
const OPEN_TICKETS = 7;
const IN_PROGRESS_TICKETS = 4;
const RESOLVED_TODAY = 12;

// ─── Recent customer concerns (mocked) ────────────────────────────────────────

const RECENT_CONCERNS: RecentConcernItem[] = [
  {
    id: "cs-1",
    customerName: "Bryan Dela Cruz",
    subject: "Worker didn't show up",
    message: "I booked a plumber yesterday but nobody arrived. I need a reschedule immediately.",
    status: "Open",
    receivedAt: new Date(Date.now() - 15 * 60000).toISOString(),
  },
  {
    id: "cs-2",
    customerName: "Patricia Santos",
    subject: "Overcharged for cleaning service",
    message: "My receipt shows a different amount from what was agreed. Please review my booking.",
    status: "In Progress",
    receivedAt: new Date(Date.now() - 1.5 * 3600000).toISOString(),
  },
  {
    id: "cs-3",
    customerName: "Rodel Aquino",
    subject: "Request for refund",
    message: "The electrician could not fix the issue and I am requesting a full refund.",
    status: "Open",
    receivedAt: new Date(Date.now() - 3 * 3600000).toISOString(),
  },
  {
    id: "cs-4",
    customerName: "Maricel Flores",
    subject: "Feedback on recent service",
    message: "Just wanted to say the gardener was very professional and did a great job!",
    status: "Resolved",
    receivedAt: new Date(Date.now() - 5 * 3600000).toISOString(),
  },
  {
    id: "cs-5",
    customerName: "James Reyes",
    subject: "Can't login to my account",
    message: "I forgot my password and the reset link is not working on my phone.",
    status: "In Progress",
    receivedAt: new Date(Date.now() - 8 * 3600000).toISOString(),
  },
  {
    id: "cs-6",
    customerName: "Angela Mendoza",
    subject: "Wrong worker assigned",
    message: "I requested a carpenter but was assigned a gardener. Please fix this.",
    status: "Resolved",
    receivedAt: new Date(Date.now() - 22 * 3600000).toISOString(),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [workers, setWorkers] = useState<any[]>([]);
  const [users] = useState<any[]>(usersRaw);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedApplicants = localStorage.getItem("fixko_applicants");
      const storedWorkers = localStorage.getItem("fixko_workers");

      if (storedApplicants) {
        setApplicants(JSON.parse(storedApplicants));
      } else {
        setApplicants(applicantsRaw);
      }

      if (storedWorkers) {
        setWorkers(JSON.parse(storedWorkers));
      } else {
        setWorkers(workersRaw);
      }
      setInitialized(true);
    }
  }, []);

  const currentApplicants = initialized ? applicants : applicantsRaw;
  const currentWorkers = initialized ? workers : workersRaw;

  // Derived stats
  const totalApplicants = currentApplicants.length;
  const pendingApplicants = currentApplicants.filter((a) => a.status === "Pending").length;
  const forReviewApplicants = currentApplicants.filter((a) => a.status === "For Review").length;

  const totalWorkers = currentWorkers.length;
  const activeWorkers = currentWorkers.filter((w) => w.employment_status === "Active").length;
  const onLeaveWorkers = currentWorkers.filter((w) => w.employment_status === "On Leave").length;

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const inactiveUsers = users.filter((u) => u.status === "Inactive").length;

  // ─── Summary cards ────────────────────────────────────────────────────────────

  const cards = [
    {
      title: "Total Applicants",
      total: totalApplicants,
      icon: <IconBriefcase size={20} />,
      accentColor: "#18388c",
      statuses: [
        { label: "Pending", value: pendingApplicants, color: "#E67E22" },
        { label: "For Review", value: forReviewApplicants, color: "#2980B9" },
      ],
    },
    {
      title: "Total Workers",
      total: totalWorkers,
      icon: <IconUserCheck size={20} />,
      accentColor: "#27AE60",
      statuses: [
        { label: "Active", value: activeWorkers, color: "#27AE60" },
        { label: "On Leave", value: onLeaveWorkers, color: "#E67E22" },
      ],
    },
    {
      title: "Customer Service",
      total: OPEN_TICKETS + IN_PROGRESS_TICKETS + RESOLVED_TODAY,
      icon: <IconMessageCircle size={20} />,
      accentColor: "#2980B9",
      statuses: [
        { label: "Open", value: OPEN_TICKETS, color: "#C0392B" },
        { label: "In Progress", value: IN_PROGRESS_TICKETS, color: "#E67E22" },
        { label: "Resolved Today", value: RESOLVED_TODAY, color: "#27AE60" },
      ],
    },
    {
      title: "System Users",
      total: totalUsers,
      icon: <IconUserCog size={20} />,
      accentColor: "#8E44AD",
      statuses: [
        { label: "Active", value: activeUsers, color: "#27AE60" },
        { label: "Inactive", value: inactiveUsers, color: "var(--brand-mid-gray)" },
      ],
    },
  ];

  // ─── Recent applications ───────────────────────────────────────────────────────

  const recentApplications: RecentApplicationItem[] = currentApplicants
    .slice()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6)
    .map((a) => ({
      id: a.id,
      name: [a.first_name, a.middle_name, a.last_name].filter(Boolean).join(" "),
      jobType: a.job_type,
      status: a.status as RecentApplicationItem["status"],
      appliedAt: a.created_at,
    }));

  return (
    <BaseLayout>
      <PageHeader
        title="Dashboard"
        description="Overview of system activities and performance metrics."
        area="FixKo PH"
        showArea={true}
      />

      {/* 4 Summary Cards */}
      <SimpleGrid cols={{ base: 1, xs: 2, lg: 4 }} spacing="lg" mb="xl" mt="xl">
        {cards.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </SimpleGrid>

      {/* Two recent lists side-by-side */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        <RecentApplications items={recentApplications} />
        <RecentConcerns items={RECENT_CONCERNS} />
      </SimpleGrid>
    </BaseLayout>
  );
}
