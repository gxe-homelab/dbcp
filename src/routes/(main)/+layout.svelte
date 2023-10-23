<script lang="ts">
	import { page } from '$app/stores';
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	import {
		ChartPieSolid,
		ArrowRightToBracketSolid,
		UsersSolid,
		DatabaseSolid,
		UserCircleSolid
	} from 'flowbite-svelte-icons';

	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: activeUrl = $page.url.pathname;
</script>

<div class="flex grow w-full gap-5">
	<Sidebar {activeUrl} class="border-r border-neutral-300 pr-2">
		<SidebarWrapper divClass="flex h-full flex-col justify-between">
			<SidebarGroup>
				<SidebarItem label="Dashboard" href="/">
					<svelte:fragment slot="icon">
						<ChartPieSolid
							class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						/>
					</svelte:fragment>
				</SidebarItem>

				<SidebarItem label="Databases" href="/databases">
					<svelte:fragment slot="icon">
						<DatabaseSolid
							class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						/>
					</svelte:fragment>
				</SidebarItem>

				<SidebarItem label="Users" href="/users">
					<svelte:fragment slot="icon">
						<UsersSolid
							class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						/>
					</svelte:fragment>
				</SidebarItem>
			</SidebarGroup>

			<SidebarGroup>
				<SidebarItem href="/logout?id={data.user?.id}" label="Logout">
					<svelte:fragment slot="icon">
						<ArrowRightToBracketSolid
							class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						/>
					</svelte:fragment>
				</SidebarItem>

				<SidebarItem label={data.user?.username}>
					<svelte:fragment slot="icon">
						<UserCircleSolid
							class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
						/>
					</svelte:fragment>
				</SidebarItem>
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>

	<div class="grow">
		<slot />
	</div>
</div>
