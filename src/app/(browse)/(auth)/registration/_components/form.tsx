'use client'

import { registration } from '@/actions/auth.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

export const Form = () => {
	const router = useRouter()

	const [file, setFile] = useState<File | null>(null)

	const [isPending, startTransition] = useTransition()

	const submitHandler = async (data: FormData) => {
		startTransition(() => {
			registration(data).then(res => {
				if (res && typeof res !== 'string') {
					toast.success('You sign up successfully!')
					setFile(null)
					router.push('/login')
				} else {
					toast.error(res || 'Error! Try again.')
				}
			})
		})
	}

	return (
		<form action={submitHandler} className='flex flex-col gap-[20px] w-full'>
			<div className={'flex flex-col gap-3'}>
				<label className={'text-primary text-sm font-semibold'} htmlFor='login'>
					Login
				</label>
				<Input id={'login'} placeholder={'Login'} name={'login'} />
			</div>
			<div className={'flex flex-col gap-3'}>
				<label
					className={'text-primary text-sm font-semibold'}
					htmlFor='password'
				>
					Password
				</label>
				<Input
					id={'password'}
					placeholder={'Password'}
					name={'password'}
					type={'password'}
				/>
			</div>
			<div className={'flex flex-col gap-3'}>
				<label className={'text-primary text-sm font-semibold'} htmlFor='image'>
					Profile image
				</label>
				<Input
					id={'image'}
					name={'image'}
					file={file}
					setFile={setFile}
					type={'file'}
				/>
			</div>
			<Button
				className={'text-white bg-gradient-to-r from-fuchsia-500 to-cyan-500'}
				type={'submit'}
				disabled={isPending}
			>
				Sign up
			</Button>
		</form>
	)
}
