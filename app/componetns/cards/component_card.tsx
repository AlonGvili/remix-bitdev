import { Framework, Visibility } from "@prisma/client";

type CardComponentProps = {
  title: string;
  description?: string;
  image?: string;
  avatar?: React.ReactNode;
  version?: string;
  language?: Framework;
  visibility?: Visibility;
  color?: string;
  download?: number;
  size?: string;
};

export default function ComponentCard({
  title,
  description,
  image,
  color,
  language,
  size,
  version,
  visibility,
  avatar,
  download,
}: CardComponentProps) {
  return (
    <div className="aspect-video border space-y-4 border-gray-200 rounded-lg p-4 flex flex-col hover:shadow-md hover:shadow-violet-200 max-w-md">
      {avatar && (
        <div className="rounded-full w-16 h-16 object-scale-down bg-violet-500 p-4 flex justify-center items-center">
          {avatar}
        </div>
      )}
      <div className="space-y-2">
        <h3 className="font-bold text-lg uppercase">{title}</h3>
        <p className="text-gray-400 font-semibold break-words">{description}</p>
        <div className="flex space-x-2">
          {language && (
            <span className="text-gray-400 font-semibold">{language}</span>
          )}
          {version && (
            <span className="text-gray-400 font-semibold">{version}</span>
          )}
          {visibility && (
            <span className="text-gray-400 font-semibold">{visibility}</span>
          )}
          {download && (
            <span className="text-gray-400 font-semibold">
              {download} downloads
            </span>
          )}
          {size && <span className="text-gray-400 font-semibold">{size}</span>}
        </div>
      </div>
    </div>
  );
}
