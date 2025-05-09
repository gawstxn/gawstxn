import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="w-full h-[100dvh] flex justify-center items-center overflow-hidden">
      <div className="flex flex-col items-center z-10">
        <Image src={"/img/logo.png"} width={416} height={273} alt="" draggable={false} className="puff-in-center animate-ease-in-out mb-5 z-10 scale-75 md:scale-100 object-cover"/>
        <p className="text-8xl puff-in-center animate-ease-in-out">*</p>
        <div className="flex items-center gap-4 puff-in-center animate-ease-in-out ">
          <Link href={"https://github.com/gawstxn"} target="_blank" className="hover:underline text-xl -mt-8 uppercase font-extrabold z-20">
            Github
          </Link>
          <Link href={"https://www.instagram.com/gawstxn/"} target="_blank" className="hover:underline text-xl -mt-8 uppercase font-extrabold z-20">
            Instagram
          </Link>
          <Link href={"https://www.facebook.com/xnotswagz/"} target="_blank" className="hover:underline text-xl -mt-8 uppercase font-extrabold z-20">
            FACEBOOK
          </Link>
        </div>
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-[1]"></div>
      <Image src={"/img/bg.jpg"} width={1920} height={1080} alt="" draggable={false} className="bg-puff-in-center animate-ease-in-out fixed top-0 left-0 w-[100vw] h-[100vh] bg-center object-cover"/>
    </main>
  )
}
