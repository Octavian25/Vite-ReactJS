import { Outlet } from "react-router-dom";

export default function ContentContainer() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Outlet />
    </main>
  );
}
