import { Note_Storage_Key } from "@/lib/consts";
import { ContentItem } from "@/lib/types/note";
import Dexie, { Table } from "dexie";

const db = new Dexie("database");
db.version(1).stores({
  note_storage_data:
    "id, title, content, tag, created_at, updated_at, collapsed",
});

export const noteTable = db.table(Note_Storage_Key);

export default db;

export const addNote = async (item: ContentItem) => {
  await noteTable.add(item);
};
export const updateNote = async (item: ContentItem) => {
  await noteTable.put(item);
};
export const deleteNote = async (id: string) => {
  await noteTable.delete(id);
};
export const patchNote = async (data: ContentItem[]) => {
  await noteTable.bulkAdd(data);
};
