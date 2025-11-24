import type { SocialIcon as SocialIconName } from "../../types/content";

type IconProps = {
  className?: string;
  title?: string;
};

const icons: Record<SocialIconName, (props: IconProps) => JSX.Element> = {
  facebook: ({ className, title }) => (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-hidden={title ? undefined : true} focusable="false">
      {title ? <title>{title}</title> : null}
      <path d="M13.8 21v-7.3h2.5l.4-2.9h-2.9V8.6c0-.8.2-1.3 1.4-1.3h1.5V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v2.9h2.5V21h3.3z" />
    </svg>
  ),
  instagram: ({ className, title }) => (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-hidden={title ? undefined : true} focusable="false">
      {title ? <title>{title}</title> : null}
      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7zm5 3.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm0 2A1.5 1.5 0 1 0 13.5 12 1.5 1.5 0 0 0 12 10.5zm4.3-3.8a.7.7 0 1 1-.7.7.7.7 0 0 1 .7-.7z" />
    </svg>
  ),
  twitter: ({ className, title }) => (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-hidden={title ? undefined : true} focusable="false">
      {title ? <title>{title}</title> : null}
      <path d="M20 7.4c.7-.5 1.2-1.1 1.6-1.8-.7.3-1.3.5-2 .6a3.5 3.5 0 0 0-6 2.4c0 .3 0 .6.1.8A10 10 0 0 1 4 5.6a3.5 3.5 0 0 0 1.1 4.6c-.5 0-1-.2-1.5-.4v.1a3.5 3.5 0 0 0 2.9 3.4c-.3.1-.7.1-1 .1h-.7a3.5 3.5 0 0 0 3.3 2.5A7 7 0 0 1 3 18.4a10 10 0 0 0 5.4 1.6c6.5 0 10-5.4 10-10V9c.7-.5 1.3-1.1 1.8-1.8-.6.3-1.3.5-2 .6.7-.4 1.2-1 1.5-1.6z" />
    </svg>
  )
};

type Props = IconProps & {
  name: SocialIconName;
};

export function SocialIcon({ name, className = "h-5 w-5 fill-current", title }: Props) {
  return icons[name]({ className, title });
}


