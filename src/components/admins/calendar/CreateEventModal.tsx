import { createEvent, getEventTypes } from "@/api/calendarAPI"
import ErrorMessage from "@/components/ErrorMessage"
import { EventFormData } from "@/types/index"
import { Transition, Dialog, TransitionChild, DialogPanel, DialogTitle } from "@headlessui/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Fragment } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { dateInTimezone, getDateInTimezone } from "@/utils/index"

const hours = () => {
	const hoursArray = []

	for (let i = 0; i <= 24; i++) {
		hoursArray.push(i)
	}

	return hoursArray
}

const defaultValues = {
	eventType: '',
	startTime: '',
	attendeeName1: '',
	attendeeName2: '',
	attendeeEmail: ''
}

const CreateEventModal = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const searchParams = new URLSearchParams(location.search)

	const createEventQuery = searchParams.get('createEvent')

	const show = !!createEventQuery

	const queryClient = useQueryClient()

	const { data } = useQuery({
		queryKey: ['eventTypes'],
		queryFn: getEventTypes,
		refetchOnWindowFocus: false,
		retry: 3
	})

	const { mutate } = useMutation({
		mutationFn: createEvent,
		onError: error => toast.error(error.message),
		onSuccess: data => {
			toast.success(data)
			queryClient.invalidateQueries({ queryKey: ['calendarEvents'] })
			reset()
			navigate(location.pathname, { replace: true })
		}
	})

	const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues })

	const handleForm = (formData: typeof defaultValues) => {
		console.log(formData)

		let selectedDate = queryClient.getQueryData<Date>(['selectedDate'])

		const eventType = data?.find(et => et._id === formData.eventType)

		if (!selectedDate) {
			selectedDate = dateInTimezone(new Date())
		} else {
			selectedDate = dateInTimezone(new Date(selectedDate))
		}

		console.log(selectedDate.setHours(0, 0, 0, 0))

		console.log(selectedDate)

		if (!eventType) {
			toast.error('No hay un tipo de evento seleccionado para crear la cita')
			return
		}

		const event: EventFormData = {
			summary: eventType.name,
			start: {
				dateTime: getDateInTimezone(selectedDate.setHours(+formData.startTime))
			},
			end: {
				dateTime: getDateInTimezone(selectedDate.setHours(+formData.startTime + eventType.duration))
			},
			sentToCalendar: false,
			attendees: [
				{
					name: formData.attendeeName1,
					email: formData.attendeeEmail
				},
				{
					name: formData.attendeeName2,
					email: formData.attendeeEmail
				}
			]
		}

		mutate(event)

		console.log('====== Cita a crear ======')
		console.log(event)
	}

	const handleClose = () => {
		reset()
		navigate(location.pathname, { replace: true })
	}

	if (data && data.length) return (
		<Transition appear show={show} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={handleClose}>
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/60" />
				</TransitionChild>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-50"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-50"
						>
							<DialogPanel
								className="w-full max-w-4xl flex flex-col gap-4
                                            rounded-2xl bg-white items-center
                                            shadow-xl p-16"

							>
								<DialogTitle>
									<h3
										className="font-bold text-2xl text-center"
									>Crear Tipo de Cita</h3>
								</DialogTitle>

								<form
									className="flex flex-col gap-4 w-full text-left"
									noValidate
									onSubmit={handleSubmit(handleForm)}
								>
									<div
										className="flex flex-col gap-2"
									>
										<label
											htmlFor="eventType"
											className="text-slate-600 font-semibold"
										>Tipo de Cita</label>
										<select
											id="eventType"
											defaultValue=""
											{...register('eventType', {
												required: 'Este campo es obligatorio'
											})}
										>
											<option
												value=""
												disabled
												hidden
											>Selecciona el Tipo de Cita</option>
											{data.map(et => (
												<option
													value={et._id}
												>{et.name} ({et.duration}hrs)</option>
											))}
										</select>
										{errors.eventType && errors.eventType.message && (
											<ErrorMessage message={errors.eventType.message} />
										)}
									</div>
									<div
										className="flex flex-col gap-2"
									>
										<label
											htmlFor="startTime"
											className="text-slate-600 font-semibold"
										>Hora de inicio</label>
										<select
											id="startTime"
											defaultValue=""
											{...register('startTime', {
												required: 'Este campo es obligatorio',
												validate: {
													min: val => {
														if (+val < 0) return 'El valor no puede ser menor que 0'
													},
													max: val => {
														if (+val > 24) return 'El valor no puede ser mayor que 24'
													}
												}
											})}
										>
											<option disabled value='' hidden>Seleccione una hora</option>
											{hours().map(hour => (
												<option key={hour} value={hour}>{hour}</option>
											))}
										</select>
										{errors.startTime && errors.startTime.message && (
											<ErrorMessage
												message={errors.startTime.message}
											/>
										)}
									</div>

									<h3
										className="text-lg text-slate-700 font-bold"
									>Quienes se casan?</h3>

									<div
										className="flex flex-col gap-2 pl-4"
									>
										<div
											className="flex flex-col gap-2"
										>
											<label
												htmlFor="attendeeName1"
												className="text-slate-600 font-semibold"
											>Nombre completo 1</label>
											<input
												id="attendeeName1"
												type="text"
												{...register('attendeeName1', {
													required: 'Este campo es obligatorio'
												})}
											/>
											{errors.attendeeName1 && errors.attendeeName1.message && (
												<ErrorMessage message={errors.attendeeName1.message} />
											)}
										</div>
										<div
											className="flex flex-col gap-2"
										>
											<label
												htmlFor="attendeeName2"
												className="text-slate-600 font-semibold"
											>Nombre completo 2</label>
											<input
												id="attendeeName2"
												type="text"
												{...register('attendeeName2', {
													required: 'Este campo es obligatorio'
												})}
											/>
											{errors.attendeeName2 && errors.attendeeName2.message && (
												<ErrorMessage message={errors.attendeeName2.message} />
											)}
										</div>
									</div>


									<div
										className="flex flex-col gap-2"
									>
										<label
											htmlFor="attendeeEmail"
											className="text-slate-600 font-semibold"
										>Correo electrónico de participante</label>
										<input
											id="attendeeEmail"
											type="text"
											{...register('attendeeEmail', {
												required: 'Este campo es obligatorio'
											})}
										/>
										{errors.attendeeEmail && errors.attendeeEmail.message && (
											<ErrorMessage message={errors.attendeeEmail.message} />
										)}
									</div>

									<input
										type="submit"
										value="Agregar Cita"
										className="bg-rose-700 text-white font-bold px-4 py-2 hover:bg-rose-500 hover:cursor-pointer"
									/>
								</form>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default CreateEventModal
