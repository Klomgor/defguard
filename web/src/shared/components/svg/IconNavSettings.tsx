import * as React from 'react';
import { SVGProps } from 'react';

const SvgIconNavSettings = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <defs>
      <style>{'\n      .icon-nav-settings_svg__b{fill:#899ca8}\n    '}</style>
    </defs>
    <path
      className="icon-nav-settings_svg__b"
      d="M18.375 1H5.625A5.631 5.631 0 0 0 0 6.625v7.688a5.63 5.63 0 0 0 5.624 5.624h12.751A5.631 5.631 0 0 0 24 14.313V6.625A5.631 5.631 0 0 0 18.375 1Zm3.75 13.313a3.754 3.754 0 0 1-3.75 3.75H5.624a3.753 3.753 0 0 1-3.749-3.749V6.625a3.754 3.754 0 0 1 3.75-3.75h12.75a3.754 3.754 0 0 1 3.75 3.75Zm-4.688 8.437a.937.937 0 0 1-.937.937h-9a.937.937 0 1 1 0-1.875h9a.937.937 0 0 1 .937.938Zm-.923-10.55-.625-.375a3.979 3.979 0 0 0 0-2.424l.625-.375a.938.938 0 0 0-.965-1.608l-.636.382a3.983 3.983 0 0 0-1.882-1.059v-.816a.938.938 0 1 0-1.875 0v.816A3.984 3.984 0 0 0 9.24 7.836l-.7-.417a.938.938 0 0 0-.965 1.608l.7.422a3.983 3.983 0 0 0 0 2.33l-.7.422a.937.937 0 1 0 .97 1.599l.7-.417a3.984 3.984 0 0 0 1.916 1.095v.822a.938.938 0 1 0 1.875 0v-.816a3.983 3.983 0 0 0 1.882-1.059l.636.382a.938.938 0 0 0 .965-1.608Zm-4.42.523a2.109 2.109 0 1 1 2.106-2.114 2.112 2.112 0 0 1-2.106 2.11Z"
    />
  </svg>
);

export default SvgIconNavSettings;
