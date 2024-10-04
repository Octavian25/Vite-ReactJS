import { ShorcutMenuDialog } from "@/components/SearchMenu";
import ContentContainer from "./ContentContainer";
import Header from "./Header";
import Sidebar from "./Sidebar";

export function Dashboard() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <ContentContainer />
      </div>
      <ShorcutMenuDialog />
    </div>
  );
}
