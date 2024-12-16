import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-center">
      <section className="space-y-1">
        <h1 className="text-xl xl:text-2xl font-semibold text-black text-center">
          React Js Starter Templating
        </h1>
        <p className="text-sm font-medium text-zinc-500 text-center md:hidden">
          The faster way to bootstrap your express app,
          Choose your dependencies and we will take care of the rest
        </p>
        <p className="text-sm font-medium text-zinc-500 text-center hidden md:block">
          The faster way to bootstrap your express app,
          <br /> Choose your dependencies and we will take care of the rest
        </p>
        <ul className="text-xs font-medium text-zinc-500 text-start bg-zinc-300 p-1 rounded-sm space-y-1 list-disc">
          <li> Choose your packages and when your done.</li>
          <li>Hit Submit!</li>
          <li>Check your download folder for the downloaded zip file.</li>
          <li>
            Run <code className="p-[2px] bg-zinc-500 text-white rounded-sm">npm i</code> to install dependencies.
          </li>
          <li>
            Run <code className="p-[2px] bg-zinc-500 text-white rounded-sm">npm dev</code> to start the development server.
          </li>
        </ul>
      </section>
    </header>
  );
};

export default Header;
