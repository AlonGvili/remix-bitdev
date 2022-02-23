import { Scope } from "@prisma/client";
import { Link } from "remix";
import { RiFolderFill } from "react-icons/ri";

export default function ScopeCard({ scope, to }: { scope: Scope; to: string }) {
  return (
    <Link to={to} className="max-w-max">
      <div className="flex flex-col items-start">
        <RiFolderFill className="text-8xl text-violet-600 pl-2" />
        <h1 className="text-gray-600 font-bold text-lg ml-4">{scope?.name}</h1>
        <h3 className="text-gray-400 font-bold text-sm ml-4 text-ellipsis">
          {scope?.description}
        </h3>
      </div>
    </Link>
  );
}
