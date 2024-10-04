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
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { login } from "@/utility/redux-auth/authActions";
import { LoginEntity } from "@/types/AuthTypes";
import { useTypedTranslation } from "@/hooks/useTypedTranslation";
import { useToast } from "@/hooks/use-toast";

const resolver: Resolver<LoginEntity> = async (values) => {
  const errors: any = {};

  // Validasi untuk email
  if (!values.email) {
    errors.email = {
      type: "required",
      message: "Email is required.",
    };
  }

  // Validasi untuk password
  if (!values.password) {
    errors.password = {
      type: "required",
      message: "Password is required.",
    };
  }

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

export function LoginScreen() {
  const { t } = useTypedTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginEntity>({ resolver });

  const dispatch = useDispatch<AppDispatch>();

  const handleLogin: SubmitHandler<LoginEntity> = async (data: LoginEntity) => {
    try {
      var result = await dispatch(login(data));
      if (login.fulfilled.match(result)) {
        navigate("/dashboard");
      } else if (login.rejected.match(result)) {
        throw new Error((result.payload as string) ?? "Invalid login");
      }
    } catch (error) {
      toast({
        title: error?.toString() ?? "We Cant find your user data..",
        description: "this is description of the error",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full lg:grid lg:grid-cols-1 min-h-[100vh] bg-[url('https://images.unsplash.com/photo-1705436637041-5936b61702bd?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
      <div className="flex items-center justify-center py-12">
        <Card>
          <div className="mx-auto grid ">
            <CardHeader>
              <CardTitle className="text-2xl">{t.login}</CardTitle>
              <CardDescription>{t.loginDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="grid gap-4">
                  <small>
                    For email use <strong>admin@gmail.com</strong> and password{" "}
                    <strong>admin</strong>
                  </small>
                  <div className="grid gap-2">
                    <Label htmlFor="email">{t.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@gmail.com"
                      {...register("email", { required: true })}
                    />
                    {errors?.email && (
                      <p className="text-red-500 text-xs">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">{t.password}</Label>
                      <Link
                        to="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        {t.forgotPassword}
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      {...register("password", { required: true })}
                    />
                    {errors?.password && (
                      <p className="text-red-500 text-xs">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {t.login}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {t.loginWithGoogle}
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-center text-sm">
                {t.dontHaveAccount}{" "}
                <Link to="/register" className="underline">
                  {t.signUp}
                </Link>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
