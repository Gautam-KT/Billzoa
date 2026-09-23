import PageTransition from "@/components/PageTransition";

// A template re-mounts on every navigation, which is what lets PageTransition play each time.
export default function Template({ children }) {
  return <PageTransition>{children}</PageTransition>;
}
