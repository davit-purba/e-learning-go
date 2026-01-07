export const dynamic = "force-dynamic";


import { Study } from "@/blocks/dashboard/study"

export default async function page() {
//   const post = await getPost(slug)
 
  return (
    <div>
      <Study />
    </div>
  )
}