// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// export default function MainLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex bg-[#111] text-white min-h-screen">
//       <Sidebar />

//       <div className="flex flex-col flex-1">
//         <Navbar />

//         <main className="flex-1 p-8 overflow-y-auto">{children}</main>

//         <Footer />
//       </div>
//     </div>
//   );
// }







// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// export default function MainLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex bg-[#111] text-white min-h-screen overflow-visible">
//       <Sidebar />

//       <div className="flex flex-col flex-1 overflow-visible">
//         <Navbar />

//         <main className="flex-1 p-8 overflow-y-auto">{children}</main>

//         <Footer />
//       </div>
//     </div>
//   );
// }






import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-[#111] text-white min-h-screen overflow-visible">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-visible">
        <Navbar />

        <main className="flex-1 p-8 overflow-y-auto">{children}</main>

        <Footer />
      </div>
    </div>
  );
}
