/**
 * simple text mark rendered as svg so Brand.tsx can do a clean left->right fill.
 */
export default function BrandMark() {
  return (
    <svg
      width="220"
      height="26"
      viewBox="0 0 220 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="isaac seiler"
    >
      <text
        x="0"
        y="19"
        fill="currentColor"
        fontSize="20"
        fontWeight="400"
        letterSpacing="-0.4"
        opacity="0.96"
        fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
      >
        ISAAC SEILER
      </text>
    </svg>
  );
}
