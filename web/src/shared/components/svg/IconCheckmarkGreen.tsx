import * as React from 'react';
import { SVGProps } from 'react';

const SvgIconCheckmarkGreen = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} {...props}>
    <defs>
      <clipPath id="icon-checkmark-green_svg__a">
        <path className="icon-checkmark-green_svg__a" d="M0 0h22v22H0z" />
      </clipPath>
      <style>
        {
          '\n      .icon-checkmark-green_svg__a,.icon-checkmark-green_svg__c{fill:#14bc6e}.icon-checkmark-green_svg__a{opacity:0}.icon-checkmark-green_svg__b{clip-path:url(#icon-checkmark-green_svg__a)}\n    '
        }
      </style>
    </defs>
    <g className="icon-checkmark-green_svg__b" transform="rotate(90 11 11)">
      <rect
        className="icon-checkmark-green_svg__c"
        width={12}
        height={2}
        rx={1}
        transform="rotate(45 -.036 10.5)"
      />
      <rect
        className="icon-checkmark-green_svg__c"
        width={8}
        height={2}
        rx={1}
        transform="rotate(-45 23.616 -2.775)"
      />
    </g>
  </svg>
);

export default SvgIconCheckmarkGreen;