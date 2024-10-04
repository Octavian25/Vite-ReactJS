import { Button } from "@/components/ui/button";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function EmptyPage() {
  const { t } = useTypedTranslation();
  const navigate = useNavigate();
  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="container min-h-screenmx-auto lg:flex lg:items-center lg:gap-12 min-w-[100vw]">
        <div className="wf-ull lg:w-1/2 px-10">
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            404
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            {t.notFoundTitle}
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            {t.notFoundDesc}
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Button variant={"outline"} onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-3" />
              {t.goBack}
            </Button>

            <Button onClick={() => navigate("/dashboard")}>
              {t.takeMeHome}
            </Button>
          </div>
        </div>

        <div className="min-h-[100vh] min-w-[50vw]">
          <img
            className="min-h-[100vh]  object-cover"
            src="https://images.unsplash.com/photo-1508881598441-324f3974994b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          />
        </div>
      </div>
    </section>
  );
}
