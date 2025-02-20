import { Sort } from '@/app/(browse)/(main)/_components/Sort'
import { PlaylistCard } from '@/app/(browse)/(main)/songs/[page]/_components/PlaylistCard'
import { Pagination } from '@/components/Pagination'
import { AudioApi, PlaylistsSortType } from '@/lib/api/api.audio'
import { NextPage } from 'next'
import { notFound } from 'next/navigation'

interface Props {
	params: {
		page: string
	}
	searchParams: {
		search?: string
		size?: string
		sortBy?: PlaylistsSortType
	}
}

export const revalidate = 3600

const PlaylistsPage: NextPage<Props> = async ({ params, searchParams }) => {
	if (isNaN(+params.page)) notFound()

	const { playlists, total } = await AudioApi.getPlaylists(
		+params.page - 1,
		Number(searchParams.size) || 12,
		searchParams.search,
		searchParams.sortBy
	)

	if (!total) {
		return <h2 className='text-xl text-destructive'>No playlists!</h2>
	}

	return (
		<div>
			<div className={'mb-5 flex justify-end'}>
				<Sort
					items={[
						{ label: 'Popular', value: '/playlists/1?sortBy=popular' },
						{ label: 'Name', value: '/playlists/1?sortBy=name' },
						{ label: 'Created at (desc)', value: '/playlists/1?sortBy=new' },
						{ label: 'Created at (asc)', value: '/playlists/1?sortBy=old' },
					]}
					defaultValue={
						searchParams.sortBy && `/playlists/1?sortBy=${searchParams.sortBy}`
					}
				/>
			</div>
			<div className='grid grid-cols-4 mb:max-md:grid-cols-1 mb:max-md:gap-8 gap-5 max-w-[1600px] mx-auto'>
				{playlists.map(playlist => {
					return <PlaylistCard key={playlist.id} playlist={playlist} />
				})}
			</div>
			<div>
				<Pagination
					page={+params.page}
					size={Number(searchParams.size) || 8}
					total={total}
					baseLink={'/playlists'}
					params={`${
						searchParams.search ? `search=${searchParams.search}&` : ''
					}${searchParams.sortBy ? `sortBy=${searchParams.sortBy}&` : ''}`}
				/>
			</div>
		</div>
	)
}

export default PlaylistsPage
