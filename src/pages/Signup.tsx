import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/layout/Layout";
import { EyeOff, EyeOpen } from "@/assets";
import { AuthContext } from "@/lib/AuthContext";
import { Interest, SignupRequestType } from "@/apis/user/type";
import { signup } from "@/apis/user";

const interests: { value: Interest; label: string }[] = [
  { value: Interest.DEVELOPMENT, label: "개발" },
  { value: Interest.ELECTRICAL_ELECTRONIC, label: "전기/전자" },
  { value: Interest.MANUFACTURING, label: "생산/제조" },
  { value: Interest.CHEMICAL, label: "화학" },
  { value: Interest.TEXTILE_APPAREL, label: "섬유/의류" },
  { value: Interest.MECHANICAL_METAL, label: "기계/금속" },
  { value: Interest.CONSTRUCTION, label: "건설/토목" },
  { value: Interest.OFFICE, label: "사무/서비스" },
  { value: Interest.MEDICAL, label: "의료" },
  { value: Interest.OTHER, label: "기타" },
];

const Signup = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [interest, setInterest] = useState<Interest[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);
  const { isLogin } = useContext(AuthContext);
  const [errors, setErrors] = useState<Record<string, string>>({
    mail: "",
    interest: "",
  });

  const validation = () => {
    const newErrors = { accountId: "", position: "" };
    if (!mail.trim()) newErrors.accountId = "이메일을 입력해주세요";
    if (interest.length === 0) newErrors.position = "관심분야를 선택해주세요";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async () => {
    if (validation()) {
      const finalForm: SignupRequestType = {
        mail,
        password,
        interest,
      };
      console.log("회원가입 요청", finalForm);

      try {
        await signup(finalForm);
        navigate("/jobs");
        isLogin();
      } catch (error: any) {
        setErrors((prev) => ({
          ...prev,
          position:
            error.response?.data.message || "회원가입 중 오류가 발생했습니다",
        }));
      }
    }
  };

  const handleInterestChange = (value: Interest) => {
    setInterest((prev) => {
      console.log("현재 관심 분야:", prev);
      console.log("선택된 관심 분야:", value);
      const isSelected = prev.includes(value);
      if (isSelected) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">회원가입</h1>
            <p className="mt-2 text-sm text-brand-gray-600">
              서비스를 이용하기 위해 회원가입을 해주세요
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md">
              <div className="space-y-2">
                <Label htmlFor="mail">이메일</Label>
                <Input
                  id="mail"
                  name="mail"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@example.com"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
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
                    <img
                      src={showPassword ? EyeOpen : EyeOff}
                      alt={showPassword ? "Hide password" : "Show password"}
                    />
                  </button>
                </div>
                <p className="text-xs text-brand-gray-500">
                  8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다
                </p>
                {password && checkPassword && password !== checkPassword && (
                  <p className="text-red-500 text-xs">
                    비밀번호가 일치하지 않습니다
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showCheckPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={checkPassword}
                    onChange={(e) => setCheckPassword(e.target.value)}
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray-500 hover:text-brand-gray-800 transition-colors"
                    onClick={() => setShowCheckPassword(!showCheckPassword)}
                  >
                    <img
                      src={showCheckPassword ? EyeOpen : EyeOff}
                      alt={
                        showCheckPassword ? "Hide password" : "Show password"
                      }
                    />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <Label>관심 분야</Label>
                <div className="grid grid-cols-2 gap-4">
                  {interests.map((item) => (
                    <div
                      key={item.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={item.value}
                        checked={interest.includes(item.value)}
                        onCheckedChange={() => handleInterestChange(item.value)}
                      />

                      <Label
                        htmlFor={item.value}
                        className="font-normal cursor-pointer"
                      >
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-yellow hover:bg-brand-yellow-dark text-black font-medium h-12"
              disabled={
                !mail || !password || !checkPassword || !interest.length
              }
              onClick={handleSubmit}
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
