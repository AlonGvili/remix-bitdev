import { RiLinksFill, RiMapPin3Fill, RiTeamFill } from "react-icons/ri";

export default function UserInfo({
  followers,
  following,
  location,
  homepage,
}: {
  followers?: number;
  following?: number;
  location?: string;
  homepage?: string;
}) {
  return (
    <div className="flex space-x-6">
      <h2 className="flex flex-col space-y-2">
        <span>Followers</span>
        <div className="flex items-center justify-start">
          <RiTeamFill className="mr-4" />
          <span className="text-gray-500">{followers || 0}</span>
        </div>
      </h2>

      <h2 className="flex flex-col space-y-2">
        <span>Following</span>
        <div className="flex items-center justify-start">
          <RiTeamFill className="mr-4" />
          <span className="text-gray-500">{following || 0}</span>
        </div>
      </h2>

      <h2 className="flex flex-col space-y-2">
        <span>Location</span>
        <div className="flex items-center justify-center">
          <RiMapPin3Fill className="mr-4" />
          <span className="text-gray-500">{location}</span>
        </div>
      </h2>

      <h2 className="flex flex-col space-y-2">
        <span>HomePage</span>
        <div className="flex items-center justify-center">
          <RiLinksFill className="mr-4" />
          <a href={homepage} className="text-violet-400">
            {homepage}
          </a>
        </div>
      </h2>
    </div>
  );
}
