// app/layout.tsx — DROP-IN REPLACEMENT
import "./globals.css";

export const metadata = {
  title: "Isaac Seiler",
  description: "Isaac Seiler",
};

const BG_SCRIPT = `
(function () {
  var COLORS = ["#4053d4", "#c495d1", "#95d1b1", "#67b6cf"];
  var KEY = "isaac_bg_last_v2";
  var last = null;

  try { last = localStorage.getItem(KEY); } catch (e) {}

  var isValid = last && COLORS.indexOf(last) !== -1;
  var start = isValid ? last : COLORS[Math.floor(Math.random() * COLORS.length)];

  // choose a new color different from start
  var next = start;
  if (COLORS.length > 1) {
    for (var i = 0; i < 10; i++) {
      var c = COLORS[Math.floor(Math.random() * COLORS.length)];
      if (c !== start) { next = c; break; }
    }
  }

  var root = document.documentElement;
  root.style.setProperty("--bg", start);

  // first-ever load: set + store, no transition jump from default
  if (!isValid) {
    try { localStorage.setItem(KEY, start); } catch (e) {}
    return;
  }

  // store next now; then trigger transition after first frame
  try { localStorage.setItem(KEY, next); } catch (e) {}
  requestAnimationFrame(function () {
    root.style.setProperty("--bg", next);
  });
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: BG_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
