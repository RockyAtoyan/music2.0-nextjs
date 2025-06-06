'use client'

import { PlayerButton } from '@/components/Player/PlayerButton'
import { Button } from '@/components/ui/button'
import { downloadAudio } from '@/lib/services/audio.service'
import { ISong } from '@/lib/types/ISong'
import { cn } from '@/lib/utils'
import { Download } from 'lucide-react'
import Image from 'next/image'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

interface Props {
	song: ISong
	playlist: ISong[]
}

export function PopularSong({ song, playlist }: Props) {
	const [isPending, startTransition] = useTransition()

	const [downloadPending, setDownloadPending] = useState(false)

	return (
		<div
			className={cn(
				'select-none flex flex-col gap-4 rounded-xl bg-secondary p-2'
			)}
		>
			<div className='p-[2px] bg-gradient-to-r from-teal-400 to-yellow-200 rounded-lg'>
				<Image
					src={song.image || '/logo.png'}
					alt={'user'}
					width={500}
					height={500}
					className={cn(
						'rounded-lg w-full aspect-square object-cover object-center'
					)}
				/>
			</div>
			<div className='flex flex-col items-center gap-3'>
				<div className={cn('flex flex-col items-center gap-2 w-full')}>
					<h3 className='text-lg font-semibold text-nowrap w-full overflow-hidden text-center px-3'>
						{song.title}
					</h3>
					<h4 className='text-sm text-zinc-500 font-semibold'>{song.author}</h4>
				</div>
				<div className='flex items-center gap-2'>
					<PlayerButton song={song} playlist={playlist} />
					{song.file && (
						<Button
							size={'icon'}
							variant={'outline'}
							disabled={isPending || downloadPending}
							onClick={() => {
								setDownloadPending(true)
								startTransition(() => {
									downloadAudio(song.file, song.title + '.mp3')
										.then(file => {
											if (!file) {
												return toast.error('Error')
											}
											toast.success('Downloaded!')
										})
										.catch(reason => {
											const e = reason as Error
											toast.error(reason.message)
										})
										.finally(() => {
											setDownloadPending(false)
										})
								})
							}}
						>
							<Download />
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}
