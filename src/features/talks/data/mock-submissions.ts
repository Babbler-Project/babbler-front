import type { TalkSubmission } from "../types";

export const MOCK_SUBMISSIONS: TalkSubmission[] = [
  {
    id: "1",
    title: "React Performance Optimization Techniques",
    description: "Learn how to optimize your React applications...",
    duration: 45,
    level: "Intermediate",
    category: "Frontend",
    submittedAt: "2023-12-15T10:30:00Z",
    status: "accepted",
    schedule: {
      room: "Room A",
      date: "2025-04-15",
      startTime: "10:00",
      endTime: "10:45",
    },
  },
  {
    id: "2",
    title: "Building AI-powered UIs",
    description:
      "Discover how to integrate AI capabilities into your user interfaces to create smarter, more responsive applications.",
    duration: 60,
    level: "Advanced",
    category: "AI",
    submittedAt: "2024-01-10T09:15:00Z",
    status: "pending",
  },
  {
    id: "3",
    title: "Web Performance Optimization",
    description:
      "A comprehensive guide to optimizing web application performance, covering everything from code splitting to rendering optimizations.",
    duration: 30,
    level: "Beginner",
    category: "Performance",
    submittedAt: "2023-11-20T15:45:00Z",
    status: "rejected",
    feedback:
      "The topic has been covered extensively in previous events. Consider a more specific angle for future submissions.",
  },
  {
    id: "4",
    title: "Serverless Architecture Patterns",
    description:
      "Learn how to design and implement robust serverless architectures that scale automatically and require minimal maintenance.",
    duration: 45,
    level: "Intermediate",
    category: "Backend",
    submittedAt: "2024-01-05T13:20:00Z",
    status: "pending",
  },
  {
    id: "5",
    title: "Advanced TypeScript Techniques",
    description:
      "Dive deep into TypeScript's type system and discover advanced patterns for building type-safe applications with maximum developer experience.",
    duration: 60,
    level: "Advanced",
    category: "Languages",
    submittedAt: "2023-12-01T08:30:00Z",
    status: "accepted",
    schedule: {
      room: "Room B",
      date: "2025-04-15",
      startTime: "15:00",
      endTime: "16:00",
    },
  },
];
