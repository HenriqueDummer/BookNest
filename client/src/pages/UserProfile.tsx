import Loading from "@/components/Loading"
import { getUserById } from "@/util/http"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

const UserProfile = () => {
  const { id } = useParams()
  if (!id) return <p className="text-zinc-400">No user ID provided.</p>

  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserById(id),
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
          <p>{user?.bio}</p>

        </div>
      </div>
      <div className="mt-10 w-full flex justify-center lg:justify-start flex-wrap gap-5 lg:p-5">
        <p className="text-zinc-400">User details will be displayed here.</p>
      </div>
    </section>
  )
}

export default UserProfile