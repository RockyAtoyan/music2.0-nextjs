"use client";

import { useAppSelector } from "@/hooks/useAppSelector";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ListMusic, ListRestart } from "lucide-react";
import { Playlist } from "@/components/Player/Playlist";
import React, { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const CurrentPlaylist: FC<Props> = ({ children }) => {
  const playlist = useAppSelector((state) => state.audio.currentPlaylist);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <Button variant={"outline"} size={"icon"}>
            <ListMusic />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        side={"bottom"}
        className="flex flex-col gap-5 rounded-t-3xl h-[80%] overflow-auto"
      >
        <SheetHeader className="font-semibold">Current playlist</SheetHeader>
        {playlist ? (
          <Playlist songs={playlist} />
        ) : (
          <h4 className="text-lg text-destructive">No audio!</h4>
        )}
      </SheetContent>
    </Sheet>
  );
};
