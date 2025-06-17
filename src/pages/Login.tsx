import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import { EyeOff, EyeOpen } from "@/assets";
import { login } from "@/apis/user";
import { AuthContext } from "@/lib/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLogin } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ mail: email, password });

      isLogin();
      navigate("/jobs");
    } catch (error: any) {
      console.error("로그인 실패:", error.response?.data || error.message);
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    }
  };

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">로그인</h1>
            <p className="mt-2 text-sm text-brand-gray-600">
              World Wide Work에 오신 것을 환영합니다!
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">비밀번호</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray-500 hover:text-brand-gray-800 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img
                      src={showPassword ? EyeOpen : EyeOff}
                      alt={showPassword ? "Hide password" : "Show password"}
                    />
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-yellow hover:bg-brand-yellow-dark text-black font-medium h-12"
              onClick={handleSubmit}
            >
              로그인
            </Button>

            <div className="text-center text-sm">
              <p className="text-brand-gray-600">
                아직 계정이 없으신가요?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-brand-yellow hover:underline"
                >
                  회원가입
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
