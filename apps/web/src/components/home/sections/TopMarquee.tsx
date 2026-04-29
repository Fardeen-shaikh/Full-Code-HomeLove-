const ITEMS = [
  'Bathroom',
  'Smart Living',
  'Interior Design',
  'Free Entry',
  'Furniture',
  'Home Appliances',
  'Renovation',
  'Kitchen',
  'Bedroom',
  'Mattresses',
  'Home Security',
  'Flooring',
]

export function TopMarquee() {
  // Three copies + 33.333% loop (instead of two copies + 50%) keeps the
  // wrap-around inside fully rendered content, so sub-pixel rounding errors
  // can't open a visible gap mid-loop.
  return (
    <div className="marquee-section">
      <div className="marquee-track marquee-track-x3">
        {[0, 1, 2].flatMap(copy =>
          ITEMS.map((label, i) => (
            <span className="marquee-item" key={`${copy}-${i}`}>{label}</span>
          )),
        )}
      </div>
    </div>
  )
}
