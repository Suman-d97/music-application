// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabaseClient";

// export default function TeamPage() {
//   const [team, setTeam] = useState([]);

//   useEffect(() => {
//     const loadTeam = async () => {
//       const { data, error } = await supabase.from("team").select("*");
//       if (!error && data) setTeam(data);
//     };

//     loadTeam();
//   }, []);

//   return (
//     <div className="space-y-8">
//       {/* Team Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {team.map((member: any) => (
//           <div
//             key={member.id}
//             className="bg-[#1a1a1a] border border-[#333] p-6 rounded-xl shadow-lg flex flex-col items-center"
//           >
//             <img
//               src={member.image_url || "/profile.png"}
//               className="w-24 h-24 rounded-full object-cover border border-[#444]"
//             />

//             <h2 className="mt-4 text-xl font-semibold text-white">{member.name}</h2>
//             <p className="text-gray-400 text-sm">{member.role}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }







"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useThemeStore } from "@/store/themeStore";

export default function TeamPage() {
  const { theme } = useThemeStore();
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("team")
        .select("*")
        .order("id", { ascending: true });

      if (!error && data) setTeam(data);
    };

    load();
  }, []);

  return (
    <div
      style={{ color: theme === "dark" ? "#fff" : "#1f2937" }}
      className="px-6 py-10"
    >

      {/* TITLE */}
      <h1 className="text-2xl font-semibold mb-8">Our team</h1>

      {/* TEAM GRID — EXACT FIGMA WIDTH & STYLE */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8">

        {team.map((member) => (
          <div
            key={member.id}
            className="flex flex-col items-center text-center"
          >
            {/* IMAGE BLOCK (FIGMA STYLE) */}
            <div
              style={{ backgroundColor: theme === "dark" ? "#222" : "#e5e7eb" }}
              className="w-36 h-40 rounded-xl overflow-hidden shadow-md"
            >
              <img
                src={member.avatar_url || "/default-avatar.png"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* NAME */}
            <h2 className="mt-3 text-lg font-semibold">{member.name}</h2>

            {/* ROLE */}
            <p
              style={{ color: theme === "dark" ? "#9ca3af" : "#6b7280" }}
              className="text-sm"
            >
              {member.role}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}
