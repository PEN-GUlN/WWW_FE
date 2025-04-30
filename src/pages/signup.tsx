import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Layout from "@/components/layout/Layout";
import { EyeIcon, EyeOffIcon, CheckIcon } from "lucide-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [interest, setInterest] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic
    console.log("Signup submitted with:", { email, password, interest });
  };

  const interests = [
    { value: "development", label: "개발" },
    { value: "electronics", label: "전기/전자" },
    { value: "manufacturing", label: "생산/제조" },
    { value: "construction", label: "건설/토목" },
    { value: "office", label: "사무/서비스" },
    { value: "medical", label: "의료" },
    { value: "other", label: "기타" },
  ];

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">회원가입</h1>
            <p className="mt-2 text-sm text-brand-gray-600">
              JobConnect 서비스를 이용하기 위해 회원가입을 해주세요
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
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
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
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-brand-gray-500">
                  8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray-500 hover:text-brand-gray-800 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <Label>관심 분야</Label>
                <RadioGroup
                  value={interest}
                  onValueChange={setInterest}
                  className="grid grid-cols-2 gap-2"
                >
                  {interests.map((item) => (
                    <div
                      key={item.value}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={item.value} id={item.value} />
                      <Label
                        htmlFor={item.value}
                        className="font-normal cursor-pointer"
                      >
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-yellow hover:bg-brand-yellow-dark text-black font-medium h-12"
            >
              회원가입
            </Button>

            <div className="text-center text-sm">
              <p className="text-brand-gray-600">
                이미 계정이 있으신가요?{" "}
                <Link
                  to="/login"
                  className="font-medium text-brand-yellow hover:underline"
                >
                  로그인
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
