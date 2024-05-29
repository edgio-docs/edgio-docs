import Image from 'next/image';

export default function useThemedImageIcon(
  /**
   * The name of the icon as it appears in the `public/icons` directory, without the `.svg` extension.
   */
  iconName: string,

  /**
   * Props to pass to the `Image` component.
   */
  imgProps?: any,

  /**
   * Determines whether the icon should be toggled with the theme. This requires that 2 icons exist in
   * the `public/icons` directory, one with the name `${iconName}.svg` and one with the name
   * `${iconName}-dark.svg`. Set to `false` to only use `${iconName}.svg` icon regardless of theme.
   *
   * Defaults to `true`.
   */
  toggleWithTheme: boolean = true
) {
  const defaultProps = {
    width: 32,
    height: 32,
    priority: true,
    style: {
      backgroundColor: 'var(--image-icon-fill)',
    },
  };

  const props = {...defaultProps, ...imgProps};

  if (!toggleWithTheme) {
    return <Image src={`/icons/${iconName}.svg`} alt={iconName} {...props} />;
  }

  return (
    <>
      <div id="dark-theme">
        <Image src={`/icons/${iconName}.svg`} alt={iconName} {...props} />
      </div>
      <div id="light-theme">
        <Image src={`/icons/${iconName}-dark.svg`} alt={iconName} {...props} />
      </div>
    </>
  );
}
