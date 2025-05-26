import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Upload,
  Tag as TagIcon,
  X,
  Plus,
  FileText,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Tag options
const tagOptions = [
  { value: "interview", label: "면접후기" },
  { value: "portfolio", label: "포트폴리오" },
  { value: "resume", label: "이력서" },
  { value: "experience", label: "취업경험" },
  { value: "tip", label: "취업팁" },
  { value: "usa", label: "미국취업" },
  { value: "japan", label: "일본취업" },
  { value: "singapore", label: "싱가포르취업" },
  { value: "europe", label: "유럽취업" },
  { value: "software", label: "소프트웨어" },
  { value: "finance", label: "금융" },
  { value: "manufacturing", label: "제조" },
  { value: "medical", label: "의료" },
];

// 게시글 작성 폼의 값 타입 정의
interface WriteFormValues {
  title: string;
  content: string;
  postType: string;
}

const CommunityWrite = () => {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // React Hook Form 설정
  const form = useForm<WriteFormValues>({
    defaultValues: {
      title: "",
      content: "",
      postType: "experience",
    },
  });

  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag) && selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      customTag &&
      !selectedTags.includes(customTag) &&
      selectedTags.length < 5
    ) {
      setSelectedTags([...selectedTags, customTag]);
      setCustomTag("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const onSubmit = (data: WriteFormValues) => {
    // 게시글 데이터를 백엔드로 전송하는 로직
    console.log({
      ...data,
      tags: selectedTags,
      file: selectedFile,
    });

    toast.success("게시글이 성공적으로 등록되었습니다.");
    navigate("/community");
  };

  return (
    <Layout>
      <div className="container px-4 md:px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Link to="/community">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                커뮤니티로 돌아가기
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">게시글 작성</h1>
            <p className="text-brand-gray-600 mt-2">
              경험과 지식을 공유하여 다른 취업 준비생들에게 도움을 주세요.
            </p>
          </div>

          {/* 작성 폼 */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* 글 종류 선택 */}
              <FormField
                control={form.control}
                name="postType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>글 종류</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="글 종류를 선택하세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="experience">경험 공유</SelectItem>
                        <SelectItem value="resource">자료 공유</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 제목 */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="제목을 입력하세요"
                        {...field}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 내용 */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>내용</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="내용을 입력하세요"
                        {...field}
                        className="min-h-[300px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 태그 */}
              <div className="space-y-2">
                <FormLabel>태그 (최대 5개)</FormLabel>

                {/* 선택된 태그 */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-brand-yellow text-black flex items-center gap-1 py-1.5 px-3"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:bg-black/10 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}

                  {selectedTags.length === 0 && (
                    <div className="text-sm text-brand-gray-500">
                      태그를 선택하세요
                    </div>
                  )}
                </div>

                {/* 태그 선택 */}
                <div className="bg-white border border-brand-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tagOptions.map((tag) => (
                      <button
                        key={tag.value}
                        type="button"
                        className={`py-1.5 px-3 text-sm rounded-full transition-all ${
                          selectedTags.includes(tag.label)
                            ? "bg-brand-yellow text-black font-medium"
                            : "bg-brand-gray-100 text-brand-gray-700 hover:bg-brand-gray-200"
                        }`}
                        onClick={() => handleAddTag(tag.label)}
                        disabled={
                          selectedTags.includes(tag.label) ||
                          selectedTags.length >= 5
                        }
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>

                  {/* 커스텀 태그 */}
                  <form onSubmit={handleAddCustomTag} className="flex gap-2">
                    <div className="relative flex-1">
                      <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-gray-400" />
                      <Input
                        type="text"
                        placeholder="커스텀 태그 추가"
                        value={customTag}
                        onChange={(e) => setCustomTag(e.target.value)}
                        className="pl-10"
                        disabled={selectedTags.length >= 5}
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="outline"
                      disabled={!customTag || selectedTags.length >= 5}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      추가
                    </Button>
                  </form>
                </div>
              </div>

              {/* 파일 첨부 (리소스 유형일 경우에만) */}
              {form.watch("postType") === "resource" && (
                <div className="space-y-2">
                  <FormLabel>파일 첨부</FormLabel>

                  {selectedFile ? (
                    <div className="bg-brand-gray-50 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-brand-gray-200 h-10 w-10 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-brand-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">{selectedFile.name}</div>
                          <div className="text-sm text-brand-gray-500">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </div>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveFile}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-brand-gray-200 rounded-lg p-8 text-center">
                      <Upload className="mx-auto h-10 w-10 text-brand-gray-300 mb-3" />
                      <p className="text-brand-gray-500 mb-2">
                        파일을 드래그하거나 클릭하여 업로드
                      </p>
                      <p className="text-sm text-brand-gray-400 mb-4">
                        PDF, DOCX, ZIP 파일 (최대 10MB)
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="mx-auto"
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                      >
                        파일 선택
                      </Button>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.docx,.zip"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* 제출 버튼 */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/community")}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  className="bg-brand-yellow hover:bg-brand-yellow-dark text-black"
                >
                  등록하기
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityWrite;
