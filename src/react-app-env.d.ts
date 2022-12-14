/// <reference types="@types/node" />
/// <reference types="@types/react" />
/// <reference types="@types/react-dom" />

declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
      readonly PUBLIC_URL: string;
    }
  }
  declare module '*.avif' {
    const src: string;
    export default src;
  }

  declare module '*.bmp' {
    const src: string;
    export default src;
  }

  declare module '*.gif' {
    const src: string;
    export default src;
  }

  declare module '*.jpg' {
    const src: string;
    export default src;
  }

  declare module '*.jpeg' {
    const src: string;
    export default src;
  }

  declare module '*.png' {
    const src: string;
    export default src;
  }

  declare module '*.webp' {
    const src: string;
    export default src;
  }

  declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & { title?: string }
    >;

    const src: string;
    export default src;
  }

  declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }

  declare module '*.module.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }

  declare module '*.module.sass' {
    const classes: { readonly [key: string]: string };
    export default classes;
  }
}

declare interface BPMNContextPadProvider {
  $inject: string[];
}

declare interface BPMNModule {
  contextPadProvider: [string, BPMNContextPadProvider];
}

declare module 'bpmn-js-embedded-comments' {
  declare var m: BPMNModule;
  export default m;
}

declare module 'diagram-js-minimap' {
  declare var m: BPMNModule;
  export default m;
}

declare module 'camunda-transaction-boundaries' {
  declare var m: BPMNModule;
  export default m;
}
