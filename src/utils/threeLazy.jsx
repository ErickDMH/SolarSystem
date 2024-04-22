import { useState, useEffect, Suspense, lazy } from 'react'

const Canvas = lazy(() =>
  import("@react-three/fiber").then(module => {
    return { default: module.Canvas };
  })
);

const ThreeLazy = (props) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

  return (
    <>
        {!isMounted || navigator?.connection?.saveData ? null : (
            <Suspense fallback={null}>
                <Canvas {...props} />
            </Suspense>
        )}
    </>)
}

export default ThreeLazy