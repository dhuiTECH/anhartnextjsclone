"use client";

/**
 * DashboardClient.tsx
 * 
 * Main admin dashboard with navigation cards for different admin functions.
 * Provides a clean interface to access various admin tools.
 */

import Link from 'next/link';
import { FileText, Settings, Users, BarChart3, ArrowRight, Building } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface DashboardClientProps {
  user: User;
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const adminCards = [
    {
      title: "Create Article",
      description: "Create and edit blog posts with rich text editor",
      href: "/admin/dashboard/articlecreation",
      icon: FileText,
      color: "bg-indigo-600",
      hoverColor: "hover:bg-indigo-700",
    },
    {
      title: "Portfolio Manager",
      description: "Create and manage portfolio projects with image uploads",
      href: "/admin/dashboard/portfoliomanager",
      icon: Building,
      color: "bg-emerald-600",
      hoverColor: "hover:bg-emerald-700",
    },
    // Add more admin tools here as needed
    // {
    //   title: "Settings",
    //   description: "Manage site settings and configuration",
    //   href: "/admin/dashboard/settings",
    //   icon: Settings,
    //   color: "bg-gray-600",
    //   hoverColor: "hover:bg-gray-700",
    // },
    // {
    //   title: "Users",
    //   description: "Manage users and permissions",
    //   href: "/admin/dashboard/users",
    //   icon: Users,
    //   color: "bg-blue-600",
    //   hoverColor: "hover:bg-blue-700",
    // },
    // {
    //   title: "Analytics",
    //   description: "View site analytics and statistics",
    //   href: "/admin/dashboard/analytics",
    //   icon: BarChart3,
    //   color: "bg-green-600",
    //   hoverColor: "hover:bg-green-700",
    // },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white p-8 rounded-xl shadow mb-6">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {user.email}</p>
        </div>

        {/* Admin Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`${card.color} ${card.hoverColor} p-4 rounded-lg text-white transition-colors group-hover:scale-110`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {card.description}
                    </p>
                    <div className="flex items-center text-indigo-600 font-semibold text-sm">
                      Open
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats or Additional Info */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/dashboard/articlecreation"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-600 transition-colors"
            >
              <div className="font-semibold text-gray-900">Create New Article</div>
              <div className="text-sm text-gray-600 mt-1">Start writing a new blog post</div>
            </Link>
            <Link
              href="/admin/dashboard/portfoliomanager"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-600 transition-colors"
            >
              <div className="font-semibold text-gray-900">Add Portfolio Project</div>
              <div className="text-sm text-gray-600 mt-1">Create a new portfolio entry</div>
            </Link>
            <Link
              href="/blog"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-600 transition-colors"
              target="_blank"
            >
              <div className="font-semibold text-gray-900">View Blog</div>
              <div className="text-sm text-gray-600 mt-1">See published articles</div>
            </Link>
            <Link
              href="/portfolio"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-600 transition-colors"
              target="_blank"
            >
              <div className="font-semibold text-gray-900">View Portfolio</div>
              <div className="text-sm text-gray-600 mt-1">See all projects</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

