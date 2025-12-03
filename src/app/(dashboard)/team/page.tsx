


// "use client";

// import { useThemeStore } from "@/store/themeStore";
// import Image from "next/image";

// export default function TeamPage() {
//   const { theme } = useThemeStore();

//   // Static team members data
//   const teamMembers = [
//     {
//       id: 1,
//       name: "John Doe",
//       role: "Founder & CEO",
//       image: "/team/Group 392.png"
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       role: "Creative Director",
//       image: "/team/Group 393.png"
//     },
//     {
//       id: 3,
//       name: "Mike Johnson",
//       role: "Lead Developer",
//       image: "/team/Group 394.png"
//     },
//     {
//       id: 4,
//       name: "Sarah Williams",
//       role: "Marketing Manager",
//       image: "/team/Rectangle 302.png"
//     }
//   ];

//   return (
//     <div
//       style={{ color: theme === "dark" ? "#fff" : "#1f2937" }}
//       className="px-6 py-10"
//     >
//       {/* HEADING */}
//       <h1 className="text-4xl font-bold mb-12 text-center">Team</h1>

//       {/* TEAM PHOTOS GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
//         {teamMembers.map((member) => (
//           <div key={member.id} className="relative w-full h-64">
//             <Image
//               src={member.image}
//               alt={member.name}
//               fill
//               className="object-contain"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }









"use client";

import { useThemeStore } from "@/store/themeStore";
import Image from "next/image";

export default function TeamPage() {
  const { theme } = useThemeStore();

  const teamMembers = [
    {
      id: 1,
      name: "Eminem",
      role: "Artist",
      image: "/team/Group 392.png",
    },
    {
      id: 2,
      name: "Eminem",
      role: "Staff",
      image: "/team/Group 393.png",
    },
    {
      id: 3,
      name: "Eminem",
      role: "Team",
      image: "/team/Group 394.png",
    },
    {
      id: 4,
      name: "Eminem",
      role: "Producer",
      image: "/team/Rectangle 302.png",
    },
  ];

  return (
    <div
      className="px-6 py-10"
      style={{ color: theme === "dark" ? "#fff" : "#1f2937" }}
    >
      {/* PAGE TITLE */}
      <h2 className="text-3xl font-bold mb-10">Our team</h2>

      {/* TEAM CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-[#1E1E1E] rounded-2xl p-3 flex flex-col items-center shadow-lg"
          >
            {/* Image Container */}
            <div className="w-full h-64 relative rounded-xl overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>

            {/* TEXT */}
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">{member.role}</p>
              <p className="text-sm opacity-70">{member.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
