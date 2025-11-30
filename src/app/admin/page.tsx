"use client";

import React from "react";
import Link from "next/link";
import { Disc, Music, Users, BarChart3, Plus } from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        { label: "Total Albums", value: "12", icon: Disc, color: "bg-purple-500" },
        { label: "Total Songs", value: "48", icon: Music, color: "bg-blue-500" },
        { label: "Total Users", value: "156", icon: Users, color: "bg-green-500" },
        { label: "Total Plays", value: "1.2k", icon: BarChart3, color: "bg-orange-500" },
    ];

    return (
        <div className="p-8 text-white">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-[#1b1b1b] border border-[#2a2a2a] p-6 rounded-2xl flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} bg-opacity-20 text-white`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">{stat.label}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/admin/albums/new" className="group">
                    <div className="bg-[#1b1b1b] border border-[#2a2a2a] p-6 rounded-2xl hover:border-purple-500 transition-colors flex flex-col items-center justify-center gap-3 h-40">
                        <div className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                            <Plus size={24} className="text-white" />
                        </div>
                        <span className="font-semibold">Create New Album</span>
                    </div>
                </Link>

                <Link href="/admin/songs/new" className="group">
                    <div className="bg-[#1b1b1b] border border-[#2a2a2a] p-6 rounded-2xl hover:border-blue-500 transition-colors flex flex-col items-center justify-center gap-3 h-40">
                        <div className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                            <Music size={24} className="text-white" />
                        </div>
                        <span className="font-semibold">Add New Song</span>
                    </div>
                </Link>

                <Link href="/admin/users" className="group">
                    <div className="bg-[#1b1b1b] border border-[#2a2a2a] p-6 rounded-2xl hover:border-green-500 transition-colors flex flex-col items-center justify-center gap-3 h-40">
                        <div className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors">
                            <Users size={24} className="text-white" />
                        </div>
                        <span className="font-semibold">Manage Users</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
