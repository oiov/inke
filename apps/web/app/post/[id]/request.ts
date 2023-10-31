import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { User } from "@/lib/types/user";
import { Collaboration, ShareNote } from "@prisma/client";
import { IResponse } from "@/lib/types/response";

export function useUserInfoByEmail(email: string) {
  let api = `/api/users?email=${email}`;
  const { data, error, isLoading } = useSWR<User>(
    api,
    () =>
      fetcher(api, {
        method: "GET",
      }),
    { revalidateOnFocus: false },
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export function useUserInfoById(id: string) {
  let api = `/api/users?id=${id}`;
  const { data, error, isLoading } = useSWR<User>(
    api,
    () =>
      fetcher(api, {
        method: "GET",
      }),
    { revalidateOnFocus: false },
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}

export function useUserShareNotes() {
  let api = `/api/share/all`;
  const { data, error, isLoading } = useSWR<IResponse<ShareNote[]>>(
    api,
    () =>
      fetcher(api, {
        method: "GET",
      }),
    { revalidateOnFocus: false },
  );

  return {
    shares: data,
    isLoading,
    isError: error,
  };
}

export function useShareNoteByLocalId(id: string) {
  const api = `/api/share?id=${id}`;
  const { data, error, isLoading } = useSWR<IResponse<ShareNote>>(
    api,
    () =>
      fetcher(api, {
        method: "GET",
      }),
    { revalidateOnFocus: false },
  );

  return {
    share: data,
    isLoading,
    isError: error,
  };
}

export function useCollaborationRoomId(id: string) {
  const api = `/api/collaboration/room?roomId=${id}`;
  const { data, error, isLoading } = useSWR<IResponse<Collaboration>>(
    api,
    () =>
      fetcher(api, {
        method: "GET",
      }),
    { revalidateOnFocus: false },
  );

  return {
    room: data,
    isLoading,
    isError: error,
  };
}
export function useCollaborationById(id: string) {
  const api = `/api/collaboration/id?id=${id}`;
  const { data, error, isLoading } = useSWR<IResponse<Collaboration>>(
    api,
    () =>
      fetcher(api, {
        method: "GET",
      }),
    { revalidateOnFocus: false },
  );

  return {
    room: data,
    isLoading,
    isError: error,
  };
}
export function useCollaborationByLocalId(id: string) {
  const api = `/api/collaboration/local-id?localId=${id}`;
  const { data, error, isLoading } = useSWR<IResponse<Collaboration>>(
    api,
    () =>
      fetcher(api, {
        method: "GET",
      }),
    { revalidateOnFocus: false },
  );

  return {
    room: data,
    isLoading,
    isError: error,
  };
}
export function useCollaborationInviteCount(roomId: string) {
  const api = `/api/collaboration/count?id=${roomId}`;
  const { data, error, isLoading } = useSWR<IResponse<number>>(
    api,
    () =>
      fetcher(api, {
        method: "GET",
      }),
    { revalidateOnFocus: false },
  );

  return {
    count: data,
    isLoading,
    isError: error,
  };
}
export function useCollaborationByUserId() {
  const api = `/api/collaboration`;
  const { data, error, isLoading } = useSWR<IResponse<Collaboration[]>>(
    api,
    () =>
      fetcher(api, {
        method: "GET",
      }),
    { revalidateOnFocus: false },
  );

  return {
    rooms: data,
    isLoading,
    isError: error,
  };
}
// 查询第一个空间创建者
export function useCollaborationByRoomId(roomId: string) {
  const api = `/api/collaboration/room`;
  const { data, error, isLoading } = useSWR<IResponse<Collaboration>>(
    api,
    () =>
      fetcher(api, {
        method: "POST",
        body: JSON.stringify({ roomId }),
      }),
    { revalidateOnFocus: false },
  );

  return {
    room_creator: data,
    isLoading,
    isError: error,
  };
}
