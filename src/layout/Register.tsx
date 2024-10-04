import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { Link } from "react-router-dom";

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

export function RegisterScreen() {
  const { t } = useTypedTranslation();
  return (
    <div className="min-h-[100vh] min-w-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1705436637041-5936b61702bd?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t.signUp}</CardTitle>
          <CardDescription>{t.signUpDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">{t.firstName}</Label>
                <Input id="first-name" placeholder="Max" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">{t.lastName}</Label>
                <Input id="last-name" placeholder="Robinson" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              {t.createAnAccount}
            </Button>
            <Button variant="outline" className="w-full">
              {t.signUpWithGoogle}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {t.alreadyHaveAccount}{" "}
            <Link to={"/login"} className="underline">
              {t.login}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
