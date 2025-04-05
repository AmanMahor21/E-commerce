import Favprodc from './Favprodc/page';

export default function page() {
  return (
    <div className="w-full h-full justify-center flex flex-col items-center lg:items-start">
      <div className=" text-3xl md:text-[36px] font-[600] text-center text-black flex justify-center md:justify-start md:items-start w-11/12  md:pl-24">
        Eat what makes you happy
      </div>
      <div className="flex flex-wrap  justify-center items-center  pr-24 pl-24">
        <Favprodc />
        <Favprodc />
        <Favprodc />
        <Favprodc />
        <Favprodc />
      </div>
    </div>
  );
}
