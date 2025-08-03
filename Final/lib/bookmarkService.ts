import { BookmarkResponse } from "@/types/job";

const BASE_URL = "https://akil-backend.onrender.com";

export class BookmarkService {
  private static getAuthHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  static async getBookmarks(): Promise<{ success: boolean; bookmarks?: string[]; message?: string }> {
    try {
      const response = await fetch(`${BASE_URL}/bookmarks`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, bookmarks: data.data || [] };
      } else {
        return { success: false, message: data.message || "Failed to fetch bookmarks" };
      }
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  }

  static async createBookmark(eventId: string): Promise<BookmarkResponse> {
    try {
      const response = await fetch(`${BASE_URL}/bookmarks/${eventId}`, {
        method: "POST",
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, message: data.message || "Failed to bookmark job" };
      }
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  }

  static async removeBookmark(eventId: string): Promise<BookmarkResponse> {
    try {
      const response = await fetch(`${BASE_URL}/bookmarks/${eventId}`, {
        method: "DELETE",
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        return { success: false, message: data.message || "Failed to remove bookmark" };
      }
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  }
}
