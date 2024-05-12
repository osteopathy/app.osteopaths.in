import { cn } from "@/lib/utils";

export function Logo({ ...props }: { size?: number, className?: string }) {

    return <svg
        shapeRendering="geometricPrecision"
        width={props?.size ?? 32}
        height={props?.size ?? 32}
        viewBox="0 0 125 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("animate-spin [animation-duration:60s]", props?.className)}
    >
        <path
            d="M63.1067 62.0837L10.8749 62.7007"
            stroke="#22D3EE"
            style={{
                stroke: "color(display-p3 0.1333 0.8275 0.9333)",
                strokeOpacity: 1
            }}
            strokeWidth={16}
            strokeLinecap="round"
        />
        <path
            d="M63.1066 62.0837L18.9181 33.0657"
            stroke="#3B82F6"
            style={{
                stroke: "color(display-p3 0.2314 0.5098 0.9647)",
                strokeOpacity: 1
            }}
            strokeWidth={16}
            strokeLinecap="round"
        />
        <path
            d="M63.1066 62.0837L61.8034 10.0778"
            stroke="#6366F1"
            style={{
                stroke: "color(display-p3 0.3882 0.4000 0.9451)",
                strokeOpacity: 1
            }}
            strokeWidth={16}
            strokeLinecap="round"
        />
        <path
            d="M63.1064 62.0837L91.5286 19.6398"
            stroke="#8B5CF6"
            style={{
                stroke: "color(display-p3 0.5451 0.3608 0.9647)",
                strokeOpacity: 1
            }}
            strokeWidth={16}
            strokeLinecap="round"
        />
        <path
            d="M63.1066 62.0837L33.7972 104.746"
            stroke="#F97316"
            strokeOpacity="0.64"
            style={{
                stroke: "color(display-p3 0.9765 0.4510 0.0863)",
                strokeOpacity: "0.64"
            }}
            strokeWidth={16}
            strokeLinecap="round"
        />
        <path
            d="M63.1066 62.0837L62.8635 114.65"
            stroke="#F43F5E"
            strokeOpacity="0.56"
            style={{
                stroke: "color(display-p3 0.9569 0.2471 0.3686)",
                strokeOpacity: "0.56"
            }}
            strokeWidth={16}
            strokeLinecap="round"
        />
        <path
            d="M63.1067 62.0837L105.903 91.9512"
            stroke="#EC4899"
            strokeOpacity="0.5"
            style={{
                stroke: "color(display-p3 0.9255 0.2824 0.6000)",
                strokeOpacity: "0.5"
            }}
            strokeWidth={16}
            strokeLinecap="round"
        />
        <path
            d="M63.1066 62.0837L114.597 61.9606"
            stroke="#A855F7"
            style={{
                stroke: "color(display-p3 0.6588 0.3333 0.9686)",
                strokeOpacity: 1
            }}
            strokeWidth={16}
            strokeLinecap="round"
        />
        <rect
            x="53.6289"
            y="59.225"
            width={14}
            height={14}
            rx={7}
            transform="rotate(-28.2161 53.6289 59.225)"
            fill="white"
            style={{ fill: "white", fillOpacity: 1 }}
        />
    </svg>

}