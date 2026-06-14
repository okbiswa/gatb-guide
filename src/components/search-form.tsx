"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, COURSE_TYPES } from "@/lib/constants";

export function SearchForm() {
  const router = useRouter();
  const [exam, setExam] = useState("GAT-B");
  const [courseType, setCourseType] = useState("All");
  const [category, setCategory] = useState("");
  const [score, setScore] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const scoreNum = parseFloat(score);
    if (!category) {
      setError("Please select your category.");
      return;
    }
    if (!score || isNaN(scoreNum)) {
      setError("Please enter a valid GAT-B score.");
      return;
    }
    if (scoreNum < 0 || scoreNum > 240) {
      setError("Score must be between 0 and 240.");
      return;
    }

    const params = new URLSearchParams({
      exam,
      courseType,
      category,
      score: scoreNum.toString(),
    });

    router.push(`/results?${params.toString()}`);
  };

  return (
    <section id="search-form" className="pb-20 px-4">
      <div className="mx-auto max-w-2xl">
        <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-800 p-8 sm:p-10">
          {/* Decorative top border gradient */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-violet-500 to-blue-600 rounded-t-2xl" />

          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50">
              <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Find Your Opportunities
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Enter your score to discover matching institutes
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Exam Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="exam-select">
                Exam
              </label>
              <Select value={exam} onValueChange={setExam}>
                <SelectTrigger id="exam-select">
                  <SelectValue placeholder="Select exam" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GAT-B">GAT-B 2026</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Course Type Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="course-type-select">
                Course Type
              </label>
              <Select value={courseType} onValueChange={setCourseType}>
                <SelectTrigger id="course-type-select">
                  <SelectValue placeholder="Select course type" />
                </SelectTrigger>
                <SelectContent>
                  {COURSE_TYPES.map((ct) => (
                    <SelectItem key={ct.value} value={ct.value}>
                      {ct.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="category-select">
                Category
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category-select">
                  <SelectValue placeholder="Select your category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Score Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="score-input">
                GAT-B Score
              </label>
              <Input
                id="score-input"
                type="number"
                placeholder="Enter your GAT-B score between 0 and 240"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                min={0}
                max={240}
                step={0.5}
              />
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Enter your GAT-B score between 0 and 240
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Submit */}
            <Button type="submit" size="lg" className="w-full group">
              Find My Opportunities
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
