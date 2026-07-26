// Asset module declarations for non-code imports used by
// interactive components (Lanyard, etc.)

declare module '*.glb' {
  const src: string;
  export default src;
}

declare module '*.gltf' {
  const src: string;
  export default src;
}
