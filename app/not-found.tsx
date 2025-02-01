"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Сторінку не знайдено</h1>
      <p className="text-lg text-gray-600 mb-8">Вибачте, сторінка, яку ви шукаєте, не існує.</p>

      <Button>
        <Link href="/">Повернутися на головну сторінку</Link>
      </Button>
    </div>
  );
}
