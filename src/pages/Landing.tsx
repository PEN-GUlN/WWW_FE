import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Briefcase, Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-white to-brand-gray-50">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[30%] -right-[10%] w-[50%] h-[80%] rounded-full bg-brand-yellow/5 blur-3xl"></div>
          <div className="absolute top-[60%] -left-[5%] w-[30%] h-[40%] rounded-full bg-brand-yellow/10 blur-3xl"></div>
        </div>

        <div className="container px-4 md:px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in text-balance">
              당신의 꿈을 향한 <span className="text-brand-yellow">첫걸음</span>
              을 함께합니다
            </h1>
            <p className="text-lg md:text-xl text-brand-gray-600 mb-10 animate-fade-in animation-delay-100 text-balance">
              다양한 글로벌 취업 정보와 자료를 공유하고, 함께 성장하는
              커뮤니티에 참여하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                className="font-medium text-base px-8 py-6 h-auto animate-fade-in animation-delay-300"
                size="lg"
                onClick={() => navigate('/login')}
              >
                로그인하기
              </Button>

              <Button
                variant="outline"
                className="font-medium text-base px-8 py-6 h-auto animate-fade-in animation-delay-300"
                size="lg"
                onClick={() => navigate('/signup')}
              >
                회원가입하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">서비스 소개</h2>
            <p className="text-brand-gray-600">
              Word Wide Web의 주요 기능을 소개합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-brand-gray-100 shadow-sm hover:shadow-md transition-shadow hover-lift">
              <div className="w-14 h-14 bg-brand-yellow/10 rounded-2xl flex items-center justify-center mb-6">
                <Briefcase className="h-6 w-6 text-brand-yellow" />
              </div>
              <h3 className="text-xl font-bold mb-3">채용공고</h3>
              <p className="text-brand-gray-600 mb-6">
                전 세계 다양한 지역의 채용 정보를 한눈에 확인하고 필터링할 수
                있습니다.
              </p>
              <Link
                to="/jobs"
                className="text-sm font-medium text-brand-yellow hover:underline inline-flex items-center gap-1"
              >
                자세히 보기
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-brand-gray-100 shadow-sm hover:shadow-md transition-shadow hover-lift">
              <div className="w-14 h-14 bg-brand-yellow/10 rounded-2xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-brand-yellow" />
              </div>
              <h3 className="text-xl font-bold mb-3">커뮤니티</h3>
              <p className="text-brand-gray-600 mb-6">
                취업 준비생들과 경험을 공유하고 질문하며 함께 성장하는
                공간입니다.
              </p>
              <Link
                to="/community"
                className="text-sm font-medium text-brand-yellow hover:underline inline-flex items-center gap-1"
              >
                자세히 보기
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 md:py-32 bg-brand-yellow/10">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              지금 바로 시작하세요
            </h2>
            <p className="text-lg text-brand-gray-700 mb-10 text-balance">
              Word Wide Work와 함께 당신의 커리어를 발전시키고, 새로운 기회를
              찾아보세요. 지금 회원가입하고 다양한 기능을 이용해보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button
                  className="bg-brand-yellow hover:bg-brand-yellow-dark text-black font-medium text-base px-8 py-6 h-auto"
                  size="lg"
                >
                  시작하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Landing;
