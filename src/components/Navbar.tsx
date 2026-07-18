import Link from "next/link"
import { auth, signOut } from "@/auth"

export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-blue-600">
            PhotoMarket
          </Link>
          <div className="hidden space-x-4 md:flex">
            <Link href="/explore" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Explore
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Pricing
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Link href="/upload" className="text-sm font-medium text-blue-600 hover:text-blue-500 mr-4">
                Upload Photo
              </Link>
              <span className="text-sm text-gray-700">Hi, {session.user.name || session.user.email}</span>
              <form action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}>
                <button type="submit" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Sign in
              </Link>
              <Link href="/register" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
                Join
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
