import Favprodc from './Favprodc/page';

export default function page() {
  return (
    <div className="w-full h-full justify-center flex flex-col items-center lg:items-start">
      <div className="text-[36px] font-[600]  text-black flex justify-start items-start w-11/12 pl-24">
        Eat what makes you happy
      </div>
      <div className="flex flex-wrap  justify-start items-center  pr-24 pl-24">
        <Favprodc />
        <Favprodc />
        <Favprodc />
        <Favprodc />
        <Favprodc />
      </div>
    </div>
  );
}
