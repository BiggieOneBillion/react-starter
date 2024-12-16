import React from "react";
import Header from "./header";
import FormOption from "./form-option";


const Home = () => {
  return (
    <div className="flex flex-col px-4 gap-4 items-center justify-start pt-10 2xl:pt-20 bg-blacky h-full w-full overflow-y-hidden fixed top-0 left-0 ">
      <Header />
      <div className="h-[500px] overflow-y-scroll border p-4 rounded-md">
        <FormOption />
      </div>
    </div>
  );
};

export default Home;
