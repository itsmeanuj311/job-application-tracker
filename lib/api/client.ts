import {
  Board,
  BoardResponse,
  Column,
  ColumnResponse,
  CreateColumnRequest,
  CreateJobRequest,
  DeleteJobResponse,
  JobApplication,
  JobResponse,
  ReorderColumnsRequest,
  ReorderJobRequest,
  ReorderJobResponse,
  UpdateBoardRequest,
  UpdateColumnRequest,
  UpdateJobRequest,
  ApiResponse,
  ApiError,
} from "./types";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl = "") {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown
  ): Promise<{ data?: T; error?: ApiError }> {
    const url = `${this.baseUrl}/api${path}`;
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      const json = (await response.json()) as ApiResponse<T>;

      if (!response.ok) {
        return { error: json.error };
      }

      return { data: json.data };
    } catch (error) {
      return {
        error: {
          code: "NETWORK_ERROR",
          message: error instanceof Error ? error.message : "Network error",
        },
      };
    }
  }

  // Board endpoints
  async getCurrentBoard(): Promise<{ data?: Board; error?: ApiError }> {
    return this.request<BoardResponse>("GET", "/boards/current").then(
      (res) => ({
        data: res.data?.board,
        error: res.error,
      })
    );
  }

  async updateBoard(
    boardId: string,
    payload: UpdateBoardRequest
  ): Promise<{ data?: Board; error?: ApiError }> {
    return this.request<BoardResponse>("PATCH", `/boards/${boardId}`, payload).then(
      (res) => ({
        data: res.data?.board,
        error: res.error,
      })
    );
  }

  // Column endpoints
  async createColumn(payload: CreateColumnRequest): Promise<{
    data?: Column;
    error?: ApiError;
  }> {
    return this.request<ColumnResponse>("POST", "/columns", payload).then(
      (res) => ({
        data: res.data?.column,
        error: res.error,
      })
    );
  }

  async updateColumn(
    columnId: string,
    payload: UpdateColumnRequest
  ): Promise<{ data?: Column; error?: ApiError }> {
    return this.request<ColumnResponse>(
      "PATCH",
      `/columns/${columnId}`,
      payload
    ).then((res) => ({
      data: res.data?.column,
      error: res.error,
    }));
  }

  async reorderColumns(
    payload: ReorderColumnsRequest
  ): Promise<{ data?: true; error?: ApiError }> {
    return this.request<{ updated: true }>(
      "POST",
      "/columns/reorder",
      payload
    ).then((res) => ({
      data: res.data?.updated,
      error: res.error,
    }));
  }

  // Job endpoints
  async createJob(payload: CreateJobRequest): Promise<{
    data?: JobApplication;
    error?: ApiError;
  }> {
    return this.request<JobResponse>("POST", "/jobs", payload).then((res) => ({
      data: res.data?.job,
      error: res.error,
    }));
  }

  async updateJob(
    jobId: string,
    payload: UpdateJobRequest
  ): Promise<{ data?: JobApplication; error?: ApiError }> {
    return this.request<JobResponse>("PATCH", `/jobs/${jobId}`, payload).then(
      (res) => ({
        data: res.data?.job,
        error: res.error,
      })
    );
  }

  async deleteJob(jobId: string): Promise<{
    data?: DeleteJobResponse;
    error?: ApiError;
  }> {
    return this.request<DeleteJobResponse>("DELETE", `/jobs/${jobId}`);
  }

  async reorderJob(payload: ReorderJobRequest): Promise<{
    data?: JobApplication;
    error?: ApiError;
  }> {
    return this.request<ReorderJobResponse>("POST", "/jobs/reorder", payload).then(
      (res) => ({
        data: res.data?.job,
        error: res.error,
      })
    );
  }
}

export const apiClient = new ApiClient();
export { ApiClient };
