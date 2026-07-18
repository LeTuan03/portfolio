import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function UploadPage() {
  const session = await auth()

  // Require login to upload
  if (!session?.user) {
    redirect("/login")
  }

  // Optional: check if user role is SELLER
  // if (session.user.role !== "SELLER" && session.user.role !== "ADMIN") {
  //   return <div>Access Denied. You must be a registered seller to upload photos.</div>
  // }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Upload New Photo
          </h2>
        </div>
      </div>

      <form className="mt-8 space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Photo file
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <div className="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/jpeg, image/png" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, RAW up to 50MB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Title
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Description
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full max-w-2xl rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                Price (USD)
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0 relative max-w-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="price"
                  id="price"
                  step="0.01"
                  min="0"
                  className="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
              <label htmlFor="license" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                License Type
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  id="license"
                  name="license"
                  className="block w-full max-w-xs rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                  <option value="standard">Standard (Royalty-free)</option>
                  <option value="extended">Extended License</option>
                  <option value="editorial">Editorial Use Only</option>
                </select>
              </div>
            </div>
            
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end gap-x-3">
            <button type="button" className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              Upload Photo
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
