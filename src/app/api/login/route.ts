import { apiRoutes } from "@/lib/redux/constants/api_routes";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await axios.post(apiRoutes.login, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      return new Response("Invalid credentials", { status: 401 });
    }

    const { token } = response.data;

    const cookieStore = await cookies();

    cookieStore.set("session", JSON.stringify({ token }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      sameSite: "lax",
      path: "/",
    });

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error: AxiosError | unknown) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({
        message: (error as AxiosError).message || "Internal Server Error",
      }),
      { status: 500 }
    );
  }
}
