import TiltCard from "@/components/TiltCard";

const ShowCard = () => {
  return (
    <div className="grid h-screen w-full place-content-center bg-gradient-to-br from-indigo-500 to-violet-500 px-4 py-12 text-slate-900">
      <TiltCard />
    </div>
  );
};

export default ShowCard;
// do api call here https://api.github.com/users/Tejas-pr
// http://localhost:3000/v1/share/showcard/f993db3d-6816-4aee-8bfb-0fb6dc97a5ec