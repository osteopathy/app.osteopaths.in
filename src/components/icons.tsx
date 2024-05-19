import type { SVGProps } from 'react'
import { cn } from '@/lib/utils'

export function Logo({ ...props }: { size?: number; className?: string }) {
	return (
		<svg
			shapeRendering="geometricPrecision"
			width={props?.size ?? 32}
			height={props?.size ?? 32}
			viewBox="0 0 125 125"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={cn('animate-spin [animation-duration:60s]', props?.className)}
		>
			<path
				d="M63.1067 62.0837L10.8749 62.7007"
				stroke="#22D3EE"
				style={{
					stroke: 'color(display-p3 0.1333 0.8275 0.9333)',
					strokeOpacity: 1,
				}}
				strokeWidth={16}
				strokeLinecap="round"
			/>
			<path
				d="M63.1066 62.0837L18.9181 33.0657"
				stroke="#3B82F6"
				style={{
					stroke: 'color(display-p3 0.2314 0.5098 0.9647)',
					strokeOpacity: 1,
				}}
				strokeWidth={16}
				strokeLinecap="round"
			/>
			<path
				d="M63.1066 62.0837L61.8034 10.0778"
				stroke="#6366F1"
				style={{
					stroke: 'color(display-p3 0.3882 0.4000 0.9451)',
					strokeOpacity: 1,
				}}
				strokeWidth={16}
				strokeLinecap="round"
			/>
			<path
				d="M63.1064 62.0837L91.5286 19.6398"
				stroke="#8B5CF6"
				style={{
					stroke: 'color(display-p3 0.5451 0.3608 0.9647)',
					strokeOpacity: 1,
				}}
				strokeWidth={16}
				strokeLinecap="round"
			/>
			<path
				d="M63.1066 62.0837L33.7972 104.746"
				stroke="#F97316"
				strokeOpacity="0.64"
				style={{
					stroke: 'color(display-p3 0.9765 0.4510 0.0863)',
					strokeOpacity: '0.64',
				}}
				strokeWidth={16}
				strokeLinecap="round"
			/>
			<path
				d="M63.1066 62.0837L62.8635 114.65"
				stroke="#F43F5E"
				strokeOpacity="0.56"
				style={{
					stroke: 'color(display-p3 0.9569 0.2471 0.3686)',
					strokeOpacity: '0.56',
				}}
				strokeWidth={16}
				strokeLinecap="round"
			/>
			<path
				d="M63.1067 62.0837L105.903 91.9512"
				stroke="#EC4899"
				strokeOpacity="0.5"
				style={{
					stroke: 'color(display-p3 0.9255 0.2824 0.6000)',
					strokeOpacity: '0.5',
				}}
				strokeWidth={16}
				strokeLinecap="round"
			/>
			<path
				d="M63.1066 62.0837L114.597 61.9606"
				stroke="#A855F7"
				style={{
					stroke: 'color(display-p3 0.6588 0.3333 0.9686)',
					strokeOpacity: 1,
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
				style={{ fill: 'white', fillOpacity: 1 }}
			/>
		</svg>
	)
}

export function GoogleIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262" {...props}>
			<path
				fill="#4285F4"
				d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
			></path>
			<path
				fill="#34A853"
				d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
			></path>
			<path
				fill="#FBBC05"
				d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
			></path>
			<path
				fill="#EB4335"
				d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
			></path>
		</svg>
	)
}
