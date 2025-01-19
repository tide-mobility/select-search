import React from "react";

interface ImageProps {
  ariaHidden?: boolean;
  src: string;
  alt: string;
  width: number;
  height: number;
  // Add any other props you need
}

const Image: React.FC<ImageProps> = ({
  ariaHidden,
  src,
  alt,
  width,
  height,
}) => {
  return (
    <img
      aria-hidden={ariaHidden}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

const Footer: React.FC = () => {
  const searchHref =
    typeof window !== "undefined"
      ? `${window.location.origin}/search`
      : "/search";
  const searchSabreHref =
    typeof window !== "undefined"
      ? `${window.location.origin}/search-sabre`
      : "/search-sabre";
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://luxury-select.co.kr"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/globe.svg"
          alt="Globe icon"
          width={16}
          height={16}
        />
        Go to luxury-select →
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        // href="https://select-search-zeta.vercel.app/search"
        // href={`${window.location.origin}/search`}
        href={searchHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/file.svg"
          alt="File icon"
          width={16}
          height={16}
        />
        셀렉트 통합 검색 →
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        // href="https://select-search-zeta.vercel.app/search-sabre"
        // href={`${window.location.origin}/search-sabre`}
        href={searchSabreHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/file.svg"
          alt="File icon"
          width={16}
          height={16}
        />
        세이버 Sabre Search (Total 127334 시설!) →
      </a>
    </footer>
  );
};

export default Footer;
