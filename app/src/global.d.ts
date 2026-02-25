export { };

declare module '*.glb' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module 'meshline' {
  export class MeshLineGeometry {
    setPoints(points: any[]): void;
  }
  export class MeshLineMaterial {
    constructor(props?: any);
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: React.DetailedHTMLProps<any, any>;
      meshLineMaterial: React.DetailedHTMLProps<any, any>;
    }
  }
}
