import Image from 'next/image';

type PropType = {
  selected: boolean;
  imageSrc: string;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = ({ selected, imageSrc, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`border-2 rounded overflow-hidden ${
        selected ? 'border-black' : 'border-transparent opacity-60'
      } transition-opacity duration-200 hover:opacity-100`}
    >
      <Image
        src={imageSrc}
        alt="Thumbnail"
        width={64}
        height={64}
        className="w-16 h-16 object-cover"
      />
    </button>
  );
};
