import type { PrivateBook } from "@/Types/PrivateBook";
import type { PublicBook } from "@/Types/PublicBook";
import type { User } from "@/Types/User";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
const API_KEY = import.meta.env.VITE_API_KEY;

export const getMe = async (): Promise<User | undefined> => {
  try {
    const res = await fetch(API_KEY + "/auth/getme", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.error) return undefined;

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const submitLogIn = async (formData) => {
  const { email, password } = formData;

  try {
    const res = await fetch(API_KEY + "/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to log in!");
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const submitSignUp = async (formData) => {
  const { email, password, username } = formData;

  try {
    const res = await fetch(API_KEY + "/auth/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to sign up!");
    }
    console.log(data);

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export const logout = async () => {
  try {
    const res = await fetch(API_KEY + "/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async (
  id: string
): Promise<{ user: User; sharedBooks: PublicBook[] } | undefined> => {
  try {
    const res = await fetch(API_KEY + "/auth/user/" + id, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const getMyBooks = async (status: string) => {
  try {
    const res = await fetch(API_KEY + "/books/me?status=" + status, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch all books!");
  }
};

export const getPublicBooks = async (): Promise<PublicBook[]> => {
  try {
    const res = await fetch(API_KEY + "/books/public", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch all books!");
  }
};

export const shareBook = async (bookId: string) => {
  try {
    const res = await fetch(API_KEY + "/books/share/" + bookId, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to share book!");
  }
};

export const getBookById = async (
  id: string
): Promise<PrivateBook | undefined> => {
  try {
    const res = await fetch(API_KEY + "/books/book/" + id, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addBook = async (formData) => {
  try {
    const res = await fetch(API_KEY + "/books/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
      }),
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteBook = async (id) => {
  try {
    const res = await fetch(API_KEY + "/books/delete/" + id, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateBook = async (formData) => {
  const id = formData._id;

  try {
    const res = await fetch(API_KEY + "/books/update/" + id, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
      }),
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const copyBook = async (bookId: string) => {
  try {
    const res = await fetch(API_KEY + "/books/copy/" + bookId, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to copy book!");
  }
};
