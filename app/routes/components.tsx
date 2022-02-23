import { RiFunctionFill, RiDashboardLine } from "react-icons/ri";
import ComponentCard from "~/componetns/cards/component_card";
import { LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { getComponents } from "~/actions";
import { GetComponents } from "../actions";

export const meta: MetaFunction = () => {
  return { title: "Discover Components - Bit.dev" };
};

export let loader: LoaderFunction = async ({ request }) => {
  let components = await getComponents({});
  return components;
};

export default function Components() {
  let loaderData = useLoaderData<GetComponents>();
  return (
    <div>
      <h1 className="text-xl font-bold">Components from the community</h1>
      {loaderData?.map((component) => (
        <ComponentCard
          title={component.name}
          description={component.description!}
          version={component.versions[-1].number}
          avatar={<RiDashboardLine className="w-24 h-24 text-white" />}
          download={component.downloads}
          language={component.framework}
          visibility={component.visibility}
        />
      ))}
    </div>
  );
}
