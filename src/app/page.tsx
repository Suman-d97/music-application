// import { redirect } from "next/navigation";

// export default function Home() {
//   redirect("/home");
// }


import { redirect } from "next/navigation";

export default function Page() {
  // Redirect root to dashboard home
  redirect("/home");
}