'use client'
import { Calendar } from '@/components/ui/calendar'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

type PatientDetails = {
	concern: string
	patientName: string
	contactNumber: string
	time: string
}

function Timeline({ time }: { time: string }) {
	return (
		<>
			<div className="flex h-[36px] items-center pt-[40px]">
				<p className="text-[12px] w-[80px] text-center">{time}</p>
				<div className="flex-[1_0_auto] ml-[12px] h-px bg-black"></div>
			</div>
		</>
	)
}

function Appointment({ concern, patientName, contactNumber, time }: PatientDetails) {
	return (
		<>
			<div className="pt-[24px]">
				<div className="grid grid-rows-[1fr] grid-cols-[80px_1fr]">
					<div className="text-center pt-[16px]">
						<h5 className="text-[17px] font-bold">{time}</h5>
						<p className="text-[11px]">AM</p>
					</div>
					<div className="border rounded-xl hover:shadow-lg h-[162px]">
						<div className="pt-[16px] px-[16px] pb-[20px] flex flex-col gap-[8px]">
							<p className="text-[12px] font-bold uppercase text-hide text-red-600/90">{concern}</p>
							<div className="">
								<div>
									<h5 className="text-[17px] text-hide font-bold">{patientName}</h5>
									<p className="text-[13px]">{contactNumber}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

function TimelineItem({
	date,
	patientDetails,
	setDate,
}: {
	date: Date
	setDate: Dispatch<SetStateAction<Date | undefined>>
	patientDetails?: PatientDetails | undefined
}) {
	const renderedDate = date.getDate() + ' ' + date.toLocaleString('default', { month: 'short' })

	const timelineRef = useRef<HTMLHeadingElement>(null)

	useEffect(() => {
		// Check if the item is at top
		window.addEventListener('scroll', () => {
			if (timelineRef)
				if (
					timelineRef.current!.getBoundingClientRect().y >= 0 &&
					timelineRef.current!.getBoundingClientRect().y <= 80
				) {
					// TODO: optimize this part
					setDate(date)
				}
		})

		return () => {
			window.removeEventListener('scroll', () => {})
		}
	}, [timelineRef, setDate, date])

	return (
		<div className="h-max py-[50px] w-full transition-all duration-500">
			<div className="sticky top-0 pt-[24px]">
				<h4
					id={renderedDate.replace(' ', '')}
					className="text-[21px] font-bold timeline-item "
					ref={timelineRef}
				>
					{renderedDate}
				</h4>
			</div>
			<Timeline time={'6 AM'} />
			{patientDetails && (
				<Appointment
					time="8:00"
					concern="Arthritis"
					patientName="George Orwell"
					contactNumber="+91 9999999999"
				/>
			)}
			<Timeline time={'7 AM'} />
		</div>
	)
}

export default function AppointmentsPage() {
	// TODO: Data fetching
	const [date, setDate] = useState<Date | undefined>(new Date())

	return (
		<>
			<div className="max-w-[800px] h-[4000px] flex gap-[54px] mx-auto justify-between">
				<div className="flex-[1_0_auto]">
					{/* Whole Timeline */}
					<div className="h-max w-full" id="timelinewrapper">
						<TimelineItem
							setDate={setDate}
							date={new Date('05/07/2024')}
							patientDetails={{
								time: '8:00',
								concern: 'Arthritis',
								patientName: 'George Orwell',
								contactNumber: '+91 9999999999',
							}}
						/>
						<TimelineItem date={new Date('05/08/2024')} setDate={setDate} />
						<TimelineItem
							setDate={setDate}
							date={new Date('05/09/2024')}
							patientDetails={{
								time: '8:00',
								concern: 'Arthritis',
								patientName: 'George Orwell',
								contactNumber: '+91 9999999999',
							}}
						/>
						<TimelineItem date={new Date('05/10/2024')} setDate={setDate} />
						<TimelineItem date={new Date('05/11/2024')} setDate={setDate} />
						<TimelineItem
							setDate={setDate}
							date={new Date('05/12/2024')}
							patientDetails={{
								time: '8:00',
								concern: 'Arthritis',
								patientName: 'George Orwell',
								contactNumber: '+91 9999999999',
							}}
						/>
					</div>
				</div>
				<div className="pt-[74px] sticky top-[74px] h-max">
					<Calendar
						mode="single"
						className="border"
						selected={date}
						onSelect={setDate}
						onDayClick={(date) => {
							const renderedDate = date.getDate() + date.toLocaleString('default', { month: 'short' })
							const href = window.location.href
							window.location.href = href.split('#')[0] + `#${renderedDate}`
						}}
					/>
				</div>
			</div>
		</>
	)
}
