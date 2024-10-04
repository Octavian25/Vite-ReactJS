import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser, Menu, Languages } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { logout } from "@/utility/redux-auth/authActions";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Header() {
  const { toast } = useToast();
  const { t } = useTypedTranslation();
  const { i18n } = useTypedTranslation();
  const [currentLang, setCurrentLang] = useState("en");

  const dispatch = useDispatch<AppDispatch>();
  const navitate = useNavigate();

  const handleLogout = async () => {
    toast({
      title: "Hold on..",
      description: "We tying to logout your account from this computer..",
    });
    var result = await dispatch(logout());

    if (logout.fulfilled.match(result)) {
      toast({
        title: "Logout Success",
        description: "We Already remove your account data from this computer",
      });
      navitate("/login");
    } else if (logout.pending.match(result)) {
    }
  };

  useEffect(() => {
    var prevLang = localStorage.getItem("language");
    setCurrentLang(prevLang ?? "en");
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    setCurrentLang(lng);
  };
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <span className="sr-only">Acme Inc</span>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <small className="text-gray-300">
          (⌘ + J) / (Ctrl + J) For Open Shorcut Menu
        </small>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Languages className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="mr-10">
            {t.selectLanguage}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => changeLanguage("en")}
            className={
              currentLang == "en" ? "bg-primary text-white" : undefined
            }
          >
            English
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => changeLanguage("id")}
            className={
              currentLang == "id" ? "bg-primary text-white" : undefined
            }
          >
            Indonesia
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t.myAccount}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{t.settings}</DropdownMenuItem>
          <DropdownMenuItem>{t.support}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>{t.logout}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
