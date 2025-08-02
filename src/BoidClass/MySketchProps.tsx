// ============================================================================
// PROPS FUNCTION

import type { SketchProps } from "@p5-wrapper/react"

// ============================================================================
export type MySketchProps = SketchProps &{
    n: number
    draw: boolean
    size: number | undefined,
    pool: number | undefined
}
