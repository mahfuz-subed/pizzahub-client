/*
 * A hand-drawn style pizzeria illustration.
 * Built from simple shapes so it is easy to tweak, and it uses only the
 * brand colors (basil green, saffron, cream) with thick ink outlines.
 * No external image file, no AI, no gradients.
 */

const INK = "#1A1A1A"
const BASIL = "#1F5F4A"
const SAFFRON = "#F28C28"
const CREAM = "#FAF6EC"

// The awning is just eight stripes. Generating them keeps the JSX short.
const awningStripes = Array.from({ length: 8 }, (_, i) => ({
  d: `M ${140 + 65 * i} 170 L ${205 + 65 * i} 170 L ${190 + 70 * i} 250 L ${120 + 70 * i} 250 Z`,
  fill: i % 2 === 0 ? SAFFRON : CREAM,
}))

const scallops = Array.from({ length: 8 }, (_, i) => ({
  d: `M ${120 + 70 * i} 250 A 35 20 0 0 0 ${190 + 70 * i} 250 Z`,
}))

type PizzeriaIllustrationProps = {
  className?: string
}

export default function PizzeriaIllustration({
  className,
}: PizzeriaIllustrationProps) {
  return (
    <svg
      viewBox="0 0 800 680"
      role="img"
      aria-label="Illustration of a neighborhood pizzeria with a striped awning, a pizza in the window, and a pot of basil"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ground */}
      <path
        d="M 60 620 L 740 620"
        stroke={INK}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M 90 636 L 170 636 M 230 636 L 320 636 M 480 636 L 570 636 M 630 636 L 710 636"
        stroke={INK}
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.35}
      />

      {/* Shop wall */}
      <rect
        x={140}
        y={170}
        width={520}
        height={450}
        fill={CREAM}
        stroke={INK}
        strokeWidth={5}
      />

      {/* Sign board with a small pizza icon */}
      <rect
        x={115}
        y={80}
        width={570}
        height={100}
        rx={10}
        fill={BASIL}
        stroke={INK}
        strokeWidth={5}
      />
      <circle cx={400} cy={130} r={30} fill={SAFFRON} stroke={INK} strokeWidth={4} />
      <circle cx={390} cy={122} r={5} fill={BASIL} />
      <circle cx={410} cy={128} r={5} fill={BASIL} />
      <circle cx={397} cy={142} r={5} fill={BASIL} />
      <path
        d="M 355 90 L 365 90 M 435 90 L 445 90"
        stroke={CREAM}
        strokeWidth={4}
        strokeLinecap="round"
      />

      {/* Striped awning */}
      {awningStripes.map((stripe, i) => (
        <path
          key={i}
          d={stripe.d}
          fill={stripe.fill}
          stroke={INK}
          strokeWidth={2.5}
        />
      ))}
      {scallops.map((scallop, i) => (
        <path
          key={i}
          d={scallop.d}
          fill={BASIL}
          stroke={INK}
          strokeWidth={2.5}
        />
      ))}

      {/* Door */}
      <rect
        x={180}
        y={290}
        width={150}
        height={330}
        fill={CREAM}
        stroke={INK}
        strokeWidth={5}
      />
      <path
        d="M 205 320 L 205 600 M 230 320 L 230 600"
        stroke={INK}
        strokeWidth={2}
        opacity={0.2}
      />
      <circle cx={308} cy={460} r={7} fill={SAFFRON} stroke={INK} strokeWidth={3} />

      {/* Window with a pizza inside */}
      <rect
        x={370}
        y={290}
        width={250}
        height={200}
        rx={4}
        fill={CREAM}
        stroke={INK}
        strokeWidth={5}
      />
      <circle cx={495} cy={390} r={72} fill={SAFFRON} stroke={INK} strokeWidth={5} />
      <circle cx={470} cy={368} r={9} fill={BASIL} stroke={INK} strokeWidth={2} />
      <circle cx={520} cy={372} r={9} fill={BASIL} stroke={INK} strokeWidth={2} />
      <circle cx={495} cy={410} r={9} fill={BASIL} stroke={INK} strokeWidth={2} />
      <path
        d="M 448 400 q 12 -14 24 0 M 518 400 q 12 -14 24 0"
        stroke={INK}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
      />

      {/* Potted basil plant */}
      <path
        d="M 120 570 L 185 570 L 176 625 L 129 625 Z"
        fill={SAFFRON}
        stroke={INK}
        strokeWidth={4}
      />
      <path
        d="M 152 570 C 120 540 118 510 140 500 C 158 510 160 540 152 570 Z"
        fill={BASIL}
        stroke={INK}
        strokeWidth={4}
      />
      <path
        d="M 152 570 C 185 540 190 515 170 502 C 152 514 148 542 152 570 Z"
        fill={BASIL}
        stroke={INK}
        strokeWidth={4}
      />
      <path
        d="M 152 570 L 152 515"
        stroke={INK}
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* A couple of quiet sparkles */}
      <path
        d="M 700 130 L 700 150 M 690 140 L 710 140"
        stroke={SAFFRON}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M 110 110 L 110 124 M 103 117 L 117 117"
        stroke={SAFFRON}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </svg>
  )
}
