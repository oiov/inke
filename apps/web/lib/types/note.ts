import { JSONContent } from "@tiptap/react";

export interface ContentItem {
  id: string;
  title: string;
  content: JSONContent;
  tag?: string;
  created_at?: number;
  updated_at?: number;

  collapsed?: boolean;
}

export interface ShareNoteItem {
  id: string;
  userId: string;
  localId: string;
  data: string;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
}
