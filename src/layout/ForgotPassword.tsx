import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { useNavigate } from "react-router-dom";

export const description =
  "A simple login form with email and password. The submit button says 'Sign in'.";

export function ForgotPasswordScreen() {
  const { t } = useTypedTranslation();
  const navigate = useNavigate();
  return (
    <div className="min-h-[100vh] w-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1705436637041-5936b61702bd?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t.forgotPassword}</CardTitle>
          <CardDescription>{t.forgotPasswordDesc}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">{t.email}</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <Button className="w-full">{t.forgotPassword}</Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => navigate("/login")}
          >
            {t.login}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
