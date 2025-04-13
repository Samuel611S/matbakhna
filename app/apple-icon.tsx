import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = "image/png"

// Image generation
export default function Icon() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 100,
        background: "linear-gradient(to bottom right, #16a34a, #22c55e)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        borderRadius: "22%",
      }}
    >
      M
    </div>,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported size metadata
      // config to also set the ImageResponse width and height.
      ...size,
    },
  )
}
