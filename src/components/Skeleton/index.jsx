
import ContentLoader from "react-content-loader"

export const Skeleton = (props) => (
    <ContentLoader 
    speed={2}
    width={240}
    height={540}
    viewBox="0 0 300 600"
    backgroundColor="#d8d5d5"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="41" ry="41" width="300" height="540" />
  </ContentLoader>
)

