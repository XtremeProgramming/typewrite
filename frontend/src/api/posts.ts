import { apiUrl } from './utils';

export interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
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
