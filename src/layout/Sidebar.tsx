import { Link, useLocation } from "react-router-dom";
import { Bell, Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { routes } from "@/lib/routes";
import { useEffect, useState } from "react";
import { useAlertDialog } from "@/components/AlertDialog";
import { GlobalRoutes } from "@/types/RoutesTypes";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";

export default function Sidebar() {
  const { t, tDynamic } = useTypedTranslation();
  const { openDialog, AlertDialogComponent } = useAlertDialog();

  let location = useLocation();
  const [menuSelected, setMenuSelected] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false); // Tambahkan state ini

  useEffect(() => {
    setMenuSelected(location.pathname.split("/")[1]);
  }, [location]);

  useEffect(() => {
    if (menuSelected !== null) {
      setIsReady(true); // Menandakan bahwa menuSelected sudah selesai di-set
    }
  }, [menuSelected]);

  // Render komponen hanya jika isReady sudah true
  if (!isReady) {
    return null; // Atau kamu bisa menambahkan loading spinner di sini jika diperlukan
  }

  const handleLogout = () => {
    openDialog({
      title: t.deleteConfirmTitle,
      description: t.deleteConfirmDesc,
      handleCancel: () => {},
      handleConfirm: () => {},
    });
  };

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <AlertDialogComponent />
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span>Your Logo</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-3">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue={menuSelected != null ? menuSelected : undefined}
            >
              {routes.map((data: GlobalRoutes) => {
                if (data.element === undefined) {
                  return (
                    <AccordionItem
                      value={data.path}
                      className="border-none"
                      key={data.path}
                    >
                      <AccordionTrigger>
                        <div className="flex items-center gap-3 px-2 rounded-lg text-muted-foreground transition-all hover:text-primary">
                          {data.icon}
                          {tDynamic(data.path)}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {data.child?.map((child: GlobalRoutes) => {
                          var path = `/dashboard/${data.path}/${child.path}`;
                          return (
                            <Link
                              key={path}
                              to={path}
                              className={`flex items-center gap-3 px-4 py-2 rounded-lg  text-muted-foreground transition-all hover:text-primary mb-1 ${
                                location.pathname == path
                                  ? "bg-muted text-black"
                                  : ""
                              }`}
                            >
                              {child.icon}
                              {tDynamic(child.path)}
                            </Link>
                          );
                        })}
                      </AccordionContent>
                    </AccordionItem>
                  );
                } else {
                  return (
                    <Link
                      key={data.path}
                      to={"/"}
                      className="flex items-center gap-3 px-3 py-2 bg-muted rounded-lg  text-muted-foreground transition-all hover:text-primary mt-2"
                    >
                      {data.icon}
                      {data.title}
                    </Link>
                  );
                }
              })}
            </Accordion>
          </nav>
        </div>
        <div className="mt-auto mx-4">
          <Card>
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>{t.sidebarTitle}</CardTitle>
              <CardDescription>{t.sidebarDesc}</CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full" onClick={handleLogout}>
                {t.logout}
              </Button>
            </CardContent>
          </Card>
        </div>
        <small className="text-center text-xs mb-2">
          Made With Love From{" "}
          <Link
            to={"https://www.linkedin.com/in/octa-studio-indonesia/"}
            target="_blank"
            className="text-primary"
          >
            Octa Studio Indonesia
          </Link>
        </small>
      </div>
    </div>
  );
}
