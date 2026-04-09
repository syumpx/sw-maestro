"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface NameFormProps {
  initialName?: string;
  initialEmail?: string;
  onSubmit: (name: string, email: string) => void;
}

export function NameForm({ initialName = "", initialEmail = "", onSubmit }: NameFormProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim(), email.trim());
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex w-full max-w-sm flex-col gap-6"
    >
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">시작하기 전에</h2>
        <p className="text-gray-500">이름을 알려주세요</p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
            required
            autoFocus
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            이메일 <span className="text-gray-400">(선택)</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <Button type="submit" size="lg" disabled={!name.trim()}>
        테스트 시작
      </Button>
    </motion.form>
  );
}
