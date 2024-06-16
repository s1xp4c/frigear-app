import Link from "next/link";

const NavLink = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link
      href={href}
      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
    >
      {title}
    </Link>
  );
};

export default NavLink;
