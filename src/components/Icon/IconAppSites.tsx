import * as React from 'react';

import cn from 'classnames';

export const IconSites = React.memo<JSX.IntrinsicElements['svg']>(
  ({className}) => (
    <svg
      className={cn('inline', className)}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.9589 18.3432V28.7917C7.77124 27.6147 3.6881 23.5313 2.51041 18.3438L12.9589 18.3432ZM17.4376 18.3432L17.4369 28.7917C22.6246 27.6147 26.7085 23.5313 27.8854 18.3438L17.4376 18.3432ZM12.9589 3.4169V13.8653L2.51041 13.8654C3.68736 8.67771 7.77124 4.59396 12.9589 3.4169ZM26.3928 3.41675C27.2174 3.41675 27.8854 4.08503 27.8854 4.9094V13.8653H17.4369V3.41675H26.3928Z"
        fill="#812991"
      />
    </svg>
  )
);

IconSites.displayName = 'IconSites';
