import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

type CookieToSet = {
  name: string;
  value: string;
  options?: Record<string, unknown>;
};

const customerProtectedPrefixes = [
  "/cart",
  "/checkout",
  "/payment",
  "/orders",
  "/profile"
];

function hasSupabaseEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!supabaseUrl || !supabaseAnonKey) {
    return false;
  }

  try {
    const url = new URL(supabaseUrl);

    if (url.protocol !== "https:" || !url.hostname.endsWith(".supabase.co")) {
      return false;
    }
  } catch {
    return false;
  }

  return Boolean(
    supabaseAnonKey.startsWith("eyJ") && supabaseAnonKey.length > 100
  );
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const needsCustomerAuth = customerProtectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  const isAdminRoute =
    pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");

  if (!hasSupabaseEnv()) {
    if (needsCustomerAuth) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/login";
      redirectUrl.searchParams.set("redirect", pathname);
      redirectUrl.searchParams.set("error", "supabase_config");
      return NextResponse.redirect(redirectUrl);
    }

    if (isAdminRoute) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/admin/login";
      redirectUrl.searchParams.set("error", "supabase_config");
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }

  let response = NextResponse.next({
    request
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.trim(),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response = NextResponse.next({
              request
            });
            response.cookies.set(name, value, options as never);
          });
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (needsCustomerAuth && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAdminRoute) {
    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/admin/login";
      redirectUrl.searchParams.set("error", "login_required");
      return NextResponse.redirect(redirectUrl);
    }

    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    const profile = data as { role?: "customer" | "admin" } | null;

    if (profile?.role !== "admin") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/admin/login";
      redirectUrl.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/checkout/:path*",
    "/payment/:path*",
    "/orders/:path*",
    "/profile/:path*",
    "/admin/:path*"
  ]
};
