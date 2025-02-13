import { auth } from "@/auth";

const HomePage = async () => {
  const session = await auth();
  return (
    <div><h1>
        Novel Front
        </h1>
        <p className="text-sm font-medium text-gray-900 dark:text-white">{session?.user.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{session?.user.role}</p>
        </div>
  )
}

export default HomePage