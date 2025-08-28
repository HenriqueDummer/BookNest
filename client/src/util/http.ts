import type { Note } from "@/Types/Note";
import type { PrivateBook } from "@/Types/PrivateBook";
import type { PublicBook } from "@/Types/PublicBook";
import type { User } from "@/Types/User";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
const API_KEY = import.meta.env.VITE_API_KEY;

export const getMe = async (): Promise<User | null> => {
  try {
    const res = await fetch(API_KEY + "/auth/getme", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.error) return null;

    return data;
  } catch (err) {
    console.log(err);
    return null;
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

export const updateProgress = async ({
  bookId,
  updatedCurrentPage,
}: {
  bookId: string;
  updatedCurrentPage: number;
}) => {
  try {
    const res = await fetch(`${API_KEY}/books/update/progress/${bookId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updatedCurrentPage: updatedCurrentPage }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update book progress");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update book progress");
  }
};

export const addNote = async ({
  bookId,
  formData,
}: {
  bookId: string;
  formData: Note;
}) => {
  try {
    console.log(bookId);
    const res = await fetch(`${API_KEY}/books/update/add_note/${bookId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note: formData }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add note");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update book progress");
  }
};

export const deleteNote = async ({
  bookId,
  noteId,
}: {
  bookId: string;
  noteId: string;
}) => {
  try {
    console.log(bookId);
    const res = await fetch(`${API_KEY}/books/update/delete_note/${bookId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteId: noteId }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to add note");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update book progress");
  }
};
