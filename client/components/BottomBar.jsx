import Menu from "./Menu.jsx";

const BottomBar = () => {
  return (
    <div className="md:hidden sticky bottom-0 w-full h-[70px] bg-[#070707] border-t-2 border-gray-400">
      <div className="flex items-center justify-between gap-2 m-auto w-full px-4 h-full">
        <Menu />
      </div>
    </div>
  );
};

export default BottomBar;
