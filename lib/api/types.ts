export interface Board {
  _id: string;
  name: string;
  userId: string;
  columns: Column[];
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  _id: string;
  name: string;
  boardId: string;
  order: number;
  jobApplications: JobApplication[];
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  _id: string;
  company: string;
  position: string;
  location: string;
  status: "wish-list" | "applied" | "interviewing" | "offered" | "rejected";
  columnId: string;
  boardId: string;
  userId: string;
  order: number;
  notes?: string | null;
  salary?: string | null;
  jobUrl?: string | null;
  appliedDate?: string | null;
  tags?: string[];
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  code: string;
  message: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

// Board Request Types
export interface UpdateBoardRequest {
  name: string;
}

// Column Request Types
export interface CreateColumnRequest {
  boardId: string;
  name: string;
  order?: number;
}

export interface UpdateColumnRequest {
  name?: string;
  order?: number;
}

export interface ReorderColumnsRequest {
  boardId: string;
  orderedColumnIds: string[];
}

// Job Request Types
export interface CreateJobRequest {
  boardId: string;
  columnId: string;
  company: string;
  position: string;
  location?: string;
  status?: JobApplication["status"];
  notes?: string;
  salary?: string;
  jobUrl?: string;
  description?: string;
  tags?: string[];
  order?: number;
}

export interface UpdateJobRequest {
  company?: string;
  position?: string;
  location?: string;
  status?: JobApplication["status"];
  notes?: string;
  salary?: string;
  jobUrl?: string;
  description?: string;
  tags?: string[];
}

export interface ReorderJobRequest {
  jobId: string;
  fromColumnId: string;
  toColumnId: string;
  toIndex: number;
}

// Response envelope types
export interface BoardResponse {
  board: Board;
}

export interface ColumnResponse {
  column: Column;
}

export interface JobResponse {
  job: JobApplication;
}

export interface ReorderResponse {
  updated: true;
}

export interface DeleteJobResponse {
  deleted: true;
  id: string;
}

export interface ReorderJobResponse {
  job: JobApplication;
  reordered: true;
}
