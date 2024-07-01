import { usePathname } from "next/navigation";
export const PathNameFinder = () => {
  const pathname = usePathname();
  const symbolRegex = /[!@#\$%\^&\*\(\)_\+\{\}\[\]:;"'<>,.?/\\|`~\-=]/g;
  const [secondLast, Last] = pathname
    .split("/")
    .slice(1)
    .map((item) => item.replace(symbolRegex, " "));
  return { secondLast, Last };
};

// import { usePathname } from "next/navigation";

// export const PathNameFinder = () => {
//   const pathname = usePathname();
//   const symbolRegex = /[!@#\$%\^&\*\(\)_\+\{\}\[\]:;"'<>,.?/\\|`~\-=]/g;
//   const pathNames = pathname.split("/").filter(item => item.trim() !== ''); // Remove empty items
//   const lastPathName = pathNames[pathNames.length - 1].replace(symbolRegex, " ");
//   return lastPathName;
// };
