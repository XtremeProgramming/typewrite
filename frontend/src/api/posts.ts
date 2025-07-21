import { apiUrl } from './utils';

export interface Author {
  id: string;
  full_name: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  author: Author;
}

export interface PostListResponse {
  items: Post[];
  total: number;
  has_next: boolean;
  has_prev: boolean;
}

export async function getPosts(
  page: number = 1,
  limit: number = 10,
): Promise<PostListResponse> {
  const res = await fetch(apiUrl(`/posts?page=${page}&limit=${limit}`), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: `${localStorage.getItem('access_token')}`,
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    console.error('Failed to fetch posts', error);
    throw new Error('Failed to fetch posts. ' + error?.detail);
  }
  return res.json();
}

export async function getPost(id: string): Promise<Post> {
  const res = await fetch(apiUrl(`/posts/${id}`), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: `${localStorage.getItem('access_token')}`,
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    console.error('Failed to fetch post', error);
    throw new Error('Failed to fetch post. ' + error?.detail);
  }
  return res.json();
}

export async function createPost(data: {
  title: string;
  content: string;
}): Promise<Post> {
  const res = await fetch(apiUrl('/posts'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: `${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    console.error('Failed to create post', error);
    throw new Error('Failed to create post. ' + error?.detail);
  }
  return res.json();
}

export async function updatePost(
  id: string,
  data: {
    title?: string;
    content?: string;
  },
): Promise<Post> {
  const res = await fetch(apiUrl(`/posts/${id}`), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: `${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    console.error('Failed to update post', error);
    throw new Error('Failed to update post. ' + error?.detail);
  }
  return res.json();
}

export async function deletePost(id: string): Promise<void> {
  const res = await fetch(apiUrl(`/posts/${id}`), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      token: `${localStorage.getItem('access_token')}`,
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    console.error('Failed to delete post', error);
    throw new Error('Failed to delete post. ' + error?.detail);
  }
}
