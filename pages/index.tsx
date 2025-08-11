import React from "react";
import type { GetStaticProps } from "next";
import { Layout } from "../components/Layout";
import type { Patch, PatchMap } from "../util/databaseSingleton";
import { PatchSection } from "../components/patch/PatchSection";
import formatDate from "../util/formatDate.fn";
import { Img } from "../components/layout/Img";

const Home = ({ patchMap }: { patchMap: PatchMap }) => {
  const today = new Date().valueOf();
  const majorPatches: Patch[] = Object.values(patchMap).filter(
    (a: Patch) => a.type === "major"
  );
  const globalPatch = majorPatches.reduce((prev: Patch, curr: Patch) => {
    const currDiff = new Date(curr.releaseDate).valueOf() - today;

    if (currDiff > 0) return prev;

    return curr;
  });

  const cnPatch: Patch = majorPatches.pop()!;
  return (
    <Layout>
      <div className="flex flex-grow flex-col bg-black">
        <div className="flex flex-row justify-center">
          <Img
            src={"/web/banner.jpg"}
            className="inline"
            width={2300}
            height={850}
          ></Img>
        </div>

        <div className="flex flex-col justify-center text-center">
          <PatchSection
            patch={globalPatch}
            header={`Most Recent Global Patch (${formatDate(
              globalPatch.releaseDate
            )})`}
          />
          <PatchSection
            patch={cnPatch}
            header={`Most Recent CN Patch (${formatDate(
              cnPatch.cnReleaseDate
            )})`}
          />
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { DBSingleton } = await import("../util/databaseSingleton");
  const patchMap = DBSingleton.getInstance().getPatchMap();

  return {
    props: {
      patchMap,
    },
  };
};

export default Home;
