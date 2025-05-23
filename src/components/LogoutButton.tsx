'use client'

import { logout } from '@/actions/auth.actions'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import {
	setCurrentPlaylist,
	setCurrentSong,
} from '@/store/reducers/audio/reducer'
import { LogOut } from 'lucide-react'
import { FC, useState, useTransition } from 'react'

interface Props {
	inNavbar?: boolean
}

export const LogoutButton: FC<Props> = ({ inNavbar }) => {
	const dispatch = useAppDispatch()

	const [isPending, startTransition] = useTransition()

	const [open, setOpen] = useState(false)

	const clickHandler = async () => {
		startTransition(() => {
			logout().then(() => {
				setOpen(false)
				dispatch(setCurrentSong(null))
				dispatch(setCurrentPlaylist(null))
			})
		})
	}

	return (
		<Dialog
			open={open}
			onOpenChange={value => {
				if (!isPending) setOpen(value)
			}}
		>
			<DialogTrigger asChild>
				<Button
					variant={inNavbar ? 'default' : 'destructive'}
					disabled={isPending}
					size={'sm'}
				>
					<span className={'hidden lg:inline'}>Log out</span>
					<LogOut className={'lg:hidden'} />
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogDescription>
						Are you sure you want to log out of your account?
					</DialogDescription>
				</DialogHeader>
				<div className='flex justify-end gap-3'>
					<Button variant={'destructive'} onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button onClick={clickHandler} disabled={isPending}>
						Log out
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
