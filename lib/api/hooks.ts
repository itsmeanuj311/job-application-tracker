// 'use client';

// import { useCallback, useState } from 'react';
// import { apiClient } from './client';
// import {
//   Board,
//   Column,
//   CreateColumnRequest,
//   CreateJobRequest,
//   JobApplication,
//   ReorderColumnsRequest,
//   ReorderJobRequest,
//   UpdateBoardRequest,
//   UpdateColumnRequest,
//   UpdateJobRequest,
//   ApiError,
// } from './types';

// export interface UseAsyncState<T> {
//   data: T | null;
//   loading: boolean;
//   error: ApiError | null;
//   refetch?: () => Promise<void>;
// }

// // useCurrentBoard - fetch and sync user's board
// export function useCurrentBoard() {
//   const [state, setState] = useState<UseAsyncState<Board>>({
//     data: null,
//     loading: true,
//     error: null,
//   });

//   const fetch = useCallback(async () => {
//     setState({ data: null, loading: true, error: null });
//     const result = await apiClient.getCurrentBoard();
//     if (result.error) {
//       setState({ data: null, loading: false, error: result.error });
//     } else {
//       setState({ data: result.data || null, loading: false, error: null });
//     }
//   }, []);

//   return { ...state, refetch: fetch };
// }

// // useCreateColumn
// export function useCreateColumn() {
//   const [state, setState] = useState<UseAsyncState<Column>>({
//     data: null,
//     loading: false,
//     error: null,
//   });

//   const create = useCallback(async (payload: CreateColumnRequest) => {
//     setState({ data: null, loading: true, error: null });
//     const result = await apiClient.createColumn(payload);
//     if (result.error) {
//       setState({ data: null, loading: false, error: result.error });
//     } else {
//       setState({ data: result.data || null, loading: false, error: null });
//     }
//     return result;
//   }, []);

//   return { ...state, create };
// }

// // useUpdateColumn
// export function useUpdateColumn() {
//   const [state, setState] = useState<UseAsyncState<Column>>({
//     data: null,
//     loading: false,
//     error: null,
//   });

//   const update = useCallback(
//     async (columnId: string, payload: UpdateColumnRequest) => {
//       setState({ data: null, loading: true, error: null });
//       const result = await apiClient.updateColumn(columnId, payload);
//       if (result.error) {
//         setState({ data: null, loading: false, error: result.error });
//       } else {
//         setState({ data: result.data || null, loading: false, error: null });
//       }
//       return result;
//     },
//     []
//   );

//   return { ...state, update };
// }

// // useReorderColumns
// export function useReorderColumns() {
//   const [state, setState] = useState<UseAsyncState<true>>({
//     data: null,
//     loading: false,
//     error: null,
//   });

//   const reorder = useCallback(async (payload: ReorderColumnsRequest) => {
//     setState({ data: null, loading: true, error: null });
//     const result = await apiClient.reorderColumns(payload);
//     if (result.error) {
//       setState({ data: null, loading: false, error: result.error });
//     } else {
//       setState({ data: result.data || null, loading: false, error: null });
//     }
//     return result;
//   }, []);

//   return { ...state, reorder };
// }

// // useCreateJob
// export function useCreateJob() {
//   const [state, setState] = useState<UseAsyncState<JobApplication>>({
//     data: null,
//     loading: false,
//     error: null,
//   });

//   const create = useCallback(async (payload: CreateJobRequest) => {
//     setState({ data: null, loading: true, error: null });
//     const result = await apiClient.createJob(payload);
//     if (result.error) {
//       setState({ data: null, loading: false, error: result.error });
//     } else {
//       setState({ data: result.data || null, loading: false, error: null });
//     }
//     return result;
//   }, []);

//   return { ...state, create };
// }

// // useUpdateJob
// export function useUpdateJob() {
//   const [state, setState] = useState<UseAsyncState<JobApplication>>({
//     data: null,
//     loading: false,
//     error: null,
//   });

//   const update = useCallback(
//     async (jobId: string, payload: UpdateJobRequest) => {
//       setState({ data: null, loading: true, error: null });
//       const result = await apiClient.updateJob(jobId, payload);
//       if (result.error) {
//         setState({ data: null, loading: false, error: result.error });
//       } else {
//         setState({ data: result.data || null, loading: false, error: null });
//       }
//       return result;
//     },
//     []
//   );

//   return { ...state, update };
// }

// // useDeleteJob
// export function useDeleteJob() {
//   const [state, setState] = useState<UseAsyncState<{ deleted: true; id: string }>>({
//     data: null,
//     loading: false,
//     error: null,
//   });

//   const delete_ = useCallback(async (jobId: string) => {
//     setState({ data: null, loading: true, error: null });
//     const result = await apiClient.deleteJob(jobId);
//     if (result.error) {
//       setState({ data: null, loading: false, error: result.error });
//     } else {
//       setState({ data: result.data || null, loading: false, error: null });
//     }
//     return result;
//   }, []);

//   return { ...state, delete: delete_ };
// }

// // useReorderJob
// export function useReorderJob() {
//   const [state, setState] = useState<UseAsyncState<JobApplication>>({
//     data: null,
//     loading: false,
//     error: null,
//   });

//   const reorder = useCallback(async (payload: ReorderJobRequest) => {
//     setState({ data: null, loading: true, error: null });
//     const result = await apiClient.reorderJob(payload);
//     if (result.error) {
//       setState({ data: null, loading: false, error: result.error });
//     } else {
//       setState({ data: result.data || null, loading: false, error: null });
//     }
//     return result;
//   }, []);

//   return { ...state, reorder };
// }

// // useUpdateBoard
// export function useUpdateBoard() {
//   const [state, setState] = useState<UseAsyncState<Board>>({
//     data: null,
//     loading: false,
//     error: null,
//   });

//   const update = useCallback(async (boardId: string, payload: UpdateBoardRequest) => {
//     setState({ data: null, loading: true, error: null });
//     const result = await apiClient.updateBoard(boardId, payload);
//     if (result.error) {
//       setState({ data: null, loading: false, error: result.error });
//     } else {
//       setState({ data: result.data || null, loading: false, error: null });
//     }
//     return result;
//   }, []);

//   return { ...state, update };
// }
