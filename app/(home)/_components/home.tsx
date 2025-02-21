import React from "react";
import Header from "./header";
import FormOption from "./form-option";

const Home = () => {
  return (
    <div className="flex flex-col px-4 gap-4 items-center justify-start pt-10 2xl:pt-20 bg-blacky h-full w-full overflow-y-hidden fixed top-0 left-0 ">
      <Header />
      <div className="md:h-[500px] h-fit overflow-y-scroll w-full sm:w-fit border p-2 md:p-4 rounded-md mb-10 md:mb-0">
        <FormOption />
      </div>
    </div>
  );
};

export default Home;
