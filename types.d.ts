// types.d.ts
export interface Post {
    _id: string;
    title: string;
    body: string;
  }
  
  export interface PaginatedResponse {
    docs: Post[];
    total: number;
    limit: number;
    page: number;
    pages: number;
  }
  