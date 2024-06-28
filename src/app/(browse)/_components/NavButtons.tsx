"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function NavButtons() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3">
      <Button
        className="rounded-full"
        disabled={!window.history.length}
        size={"icon"}
        variant={"ghost"}
        onClick={() => router.back()}
      >
        <ChevronLeft />
      </Button>
      <Button
        className="rounded-full"
        size={"icon"}
        variant={"default"}
        onClick={() => router.forward()}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
