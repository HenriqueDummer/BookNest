import BookCollection from "@/components/BookCollection"
import Loading from "@/components/Loading"
import { getUserById } from "@/util/http"
import { useQuery } from "@tanstack/react-query"
import { Book } from "lucide-react"
import { useParams } from "react-router-dom"

const UserProfile = () => {
  const { id } = useParams()
  if (!id) return <p className="text-zinc-400">No user ID provided.</p>

  const { data, isLoading } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: () => getUserById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const {user, sharedBooks} = data || {}

  if (isLoading) return <Loading message="Fetching user profile..." />

  return (
    <section className="flex-grow p-4 sm:p-10 lg:p-20 justify-center overflow-auto
 bg-dark_bg">
      <div className="flex gap-10 bg-center bg-cover items-center">
        <img className="w-[10rem] aspect-square bg-cover bg-center rounded-full" style={{ backgroundImage: `url(${user?.profileImg})` }} alt="" />
        <div>
          <h1 className="text-3xl sm:text-4xl text-zinc-300 font-semibold">{user?.username}</h1>
          <p className="text-zinc-400 mt-2">{user?.bio}</p>
        </div>
      </div>
      <h2 className="text-zinc-300 text-2xl mt-10">Shared books</h2>
      <BookCollection books={sharedBooks}/>
    </section>
  )
}

export default UserProfile